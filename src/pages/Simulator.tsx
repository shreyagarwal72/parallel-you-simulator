import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation } from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import abstractBg from "@/assets/abstract-bg.jpg";
import { SimulatorSetup, SimulationConfig } from "@/components/simulator/SimulatorSetup";
import { SimulatorActive } from "@/components/simulator/SimulatorActive";
import { LifeTimeline } from "@/components/simulator/LifeTimeline";
import { LifeSummary } from "@/components/simulator/LifeSummary";

const Simulator = () => {
  const [user, setUser] = useState<any>(null);
  const [simulation, setSimulation] = useState<any>(null);
  const [currentEvent, setCurrentEvent] = useState<any>(null);
  const [lifeSummary, setLifeSummary] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (!session) {
        navigate("/auth");
      } else {
        setUser(session.user);
        loadActiveSimulation(session.user.id);
      }
    });
  }, [navigate]);

  const loadActiveSimulation = async (userId: string) => {
    const { data, error } = await supabase
      .from("simulations")
      .select("*")
      .eq("user_id", userId)
      .eq("is_alive", true)
      .maybeSingle();

    if (data) {
      setSimulation(data);
      await processTimeElapsed(data);
    }
  };

  const processTimeElapsed = async (sim: any) => {
    const now = new Date();
    const lastUpdate = new Date(sim.last_updated);
    const daysSince = Math.floor((now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60 * 24));
    
    if (daysSince > 0) {
      // 1 real day = 2 virtual months
      const newMonths = sim.virtual_months_elapsed + (daysSince * 2);
      const newAge = Math.floor(newMonths / 12);
      
      if (newAge >= 90 || sim.health_score <= 0) {
        await endSimulation(sim);
        return;
      }

      const updatedSim = {
        ...sim,
        virtual_months_elapsed: newMonths,
        current_age: newAge,
      };

      const { error } = await supabase
        .from("simulations")
        .update({
          virtual_months_elapsed: newMonths,
          current_age: newAge,
          last_updated: now.toISOString(),
        })
        .eq("id", sim.id);

      if (!error) {
        setSimulation(updatedSim);
        
        // Only generate event if we hit a milestone age
        const milestoneAges = [0, 5, 10, 13, 16, 18, 22, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85];
        const hasEventForAge = sim.life_events?.some((e: any) => e.age === newAge);
        
        if (milestoneAges.includes(newAge) && !hasEventForAge) {
          await generateNextEvent(updatedSim);
        } else if (sim.life_events && sim.life_events.length > 0) {
          setCurrentEvent(sim.life_events[sim.life_events.length - 1]);
        } else {
          await generateNextEvent(updatedSim);
        }
      }
    } else {
      if (sim.life_events && sim.life_events.length > 0) {
        const lastEvent = sim.life_events[sim.life_events.length - 1];
        if (!lastEvent.completed) {
          setCurrentEvent(lastEvent);
        } else {
          await generateNextEvent(sim);
        }
      } else {
        await generateNextEvent(sim);
      }
    }
  };

  const generateNextEvent = async (sim: any) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-life-event", {
        body: {
          age: sim.current_age,
          country: sim.country,
          education: sim.education,
          personality: sim.personality,
          career: sim.career_path,
          riskTolerance: sim.risk_tolerance,
          username: sim.username,
          currentStats: {
            happiness: sim.happiness_score,
            wealth: sim.wealth_level,
            health: sim.health_score,
            legacy: sim.legacy_score,
          },
          previousEvents: sim.life_events || [],
        },
      });

      if (error) throw error;

      const newEvent = {
        ...data,
        age: sim.current_age,
        completed: false,
      };

      setCurrentEvent(newEvent);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to generate life event. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleStartSimulation = async (config: SimulationConfig) => {
    if (!user) return;

    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("simulations")
        .insert({
          user_id: user.id,
          username: config.username,
          country: config.country,
          education: config.education,
          personality: config.personality,
          career_path: config.career,
          risk_tolerance: config.riskTolerance,
          current_age: 18,
          virtual_months_elapsed: 18 * 12,
          is_alive: true,
          happiness_score: 50,
          health_score: 100,
          legacy_score: 0,
          wealth_level: "Starting Out",
          life_events: [],
        })
        .select()
        .single();

      if (error) throw error;

      setSimulation(data);
      await generateNextEvent(data);

      toast({
        title: "Life Begins!",
        description: "Your parallel life has started at age 18.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleMakeChoice = async (choiceIndex: number) => {
    if (!simulation || !currentEvent) return;

    setLoading(true);
    try {
      const impact = choiceIndex >= 0 && currentEvent.choices?.[choiceIndex]
        ? currentEvent.choices[choiceIndex].impact
        : currentEvent.impact;

      const newHappiness = Math.max(0, Math.min(100, simulation.happiness_score + (impact.happiness || 0)));
      const newHealth = Math.max(0, Math.min(100, simulation.health_score + (impact.health || 0)));
      const newLegacy = Math.max(0, Math.min(100, simulation.legacy_score + (impact.legacy || 0)));

      let wealthLevel = simulation.wealth_level;
      const wealthImpact = impact.wealth || 0;
      const levels = ["Struggling", "Starting Out", "Comfortable", "Wealthy", "Very Wealthy"];
      const currentIndex = levels.indexOf(wealthLevel);
      if (wealthImpact > 10 && currentIndex < levels.length - 1) {
        wealthLevel = levels[currentIndex + 1];
      } else if (wealthImpact < -10 && currentIndex > 0) {
        wealthLevel = levels[currentIndex - 1];
      }

      const completedEvent = {
        ...currentEvent,
        completed: true,
        choiceIndex,
      };

      const updatedEvents = [...(simulation.life_events || []), completedEvent];

      const { error } = await supabase
        .from("simulations")
        .update({
          happiness_score: newHappiness,
          health_score: newHealth,
          legacy_score: newLegacy,
          wealth_level: wealthLevel,
          life_events: updatedEvents,
          last_updated: new Date().toISOString(),
        })
        .eq("id", simulation.id);

      if (error) throw error;

      const updatedSim = {
        ...simulation,
        happiness_score: newHappiness,
        health_score: newHealth,
        legacy_score: newLegacy,
        wealth_level: wealthLevel,
        life_events: updatedEvents,
      };

      setSimulation(updatedSim);
      setCurrentEvent(null);

      if (newHealth <= 0 || simulation.current_age >= 90) {
        await endSimulation(updatedSim);
      } else {
        setTimeout(() => {
          generateNextEvent(updatedSim);
        }, 500);
      }
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const endSimulation = async (sim: any) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("generate-life-summary", {
        body: {
          age: sim.current_age,
          events: sim.life_events || [],
          stats: {
            happiness: sim.happiness_score,
            wealth: sim.wealth_level,
            health: sim.health_score,
            legacy: sim.legacy_score,
          },
          profile: {
            country: sim.country,
            education: sim.education,
            personality: sim.personality,
            career: sim.career_path,
          },
        },
      });

      if (error) throw error;

      await supabase
        .from("simulations")
        .update({ is_alive: false })
        .eq("id", sim.id);

      setLifeSummary(data.summary);
      setSimulation({ ...sim, is_alive: false });
      
      toast({
        title: "Life Complete",
        description: "Your parallel life has come to an end.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to generate life summary.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleRestart = async () => {
    setSimulation(null);
    setCurrentEvent(null);
    setLifeSummary("");
  };

  const handleShare = () => {
    toast({
      title: "Shared!",
      description: "Your life story has been added to the leaderboard.",
    });
    navigate("/leaderboard");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen relative flex flex-col">
      <Navigation />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${abstractBg})` }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8 pt-24 pb-16 flex-1">
        {!simulation && (
          <SimulatorSetup onStart={handleStartSimulation} loading={loading} />
        )}

        {simulation && simulation.is_alive && !lifeSummary && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2 order-2 lg:order-1">
              <SimulatorActive
                simulation={simulation}
                currentEvent={currentEvent}
                onMakeChoice={handleMakeChoice}
                onEndLife={() => endSimulation(simulation)}
                loading={loading}
              />
            </div>
            <div className="order-1 lg:order-2">
              <LifeTimeline 
                events={simulation.life_events || []} 
                currentAge={simulation.current_age}
              />
            </div>
          </div>
        )}

        {simulation && !simulation.is_alive && lifeSummary && (
          <LifeSummary
            simulation={simulation}
            summary={lifeSummary}
            onRestart={handleRestart}
            onShare={handleShare}
          />
        )}
      </div>
    </div>
  );
};

export default Simulator;

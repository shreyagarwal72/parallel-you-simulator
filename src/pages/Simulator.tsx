import { useState } from "react";
import { Navigation } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import abstractBg from "@/assets/abstract-bg.jpg";

const Simulator = () => {
  const [step, setStep] = useState(1);
  const [simulation, setSimulation] = useState({
    country: "",
    education: "",
    personality: "",
    risk: "",
    luck: "",
    career: "",
  });
  const { toast } = useToast();

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    }
  };

  const handleRestart = () => {
    setStep(1);
    setSimulation({
      country: "",
      education: "",
      personality: "",
      risk: "",
      luck: "",
      career: "",
    });
  };

  const generateSummary = () => {
    toast({
      title: "Life Summary Generated",
      description: "Your parallel life story has been created!",
    });
  };

  return (
    <div className="min-h-screen relative">
      <Navigation />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${abstractBg})` }}
      />

      <div className="relative z-10 container mx-auto px-4 pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
            Life Simulator
          </h1>

          <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow">
            <CardHeader>
              <CardTitle>Step {step} of 4</CardTitle>
              <CardDescription>
                {step === 1 && "Choose your origin"}
                {step === 2 && "Define your personality"}
                {step === 3 && "Life events unfold"}
                {step === 4 && "Your parallel life"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {step === 1 && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Country</label>
                    <Select
                      value={simulation.country}
                      onValueChange={(value) =>
                        setSimulation({ ...simulation, country: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select country" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="usa">United States</SelectItem>
                        <SelectItem value="uk">United Kingdom</SelectItem>
                        <SelectItem value="japan">Japan</SelectItem>
                        <SelectItem value="brazil">Brazil</SelectItem>
                        <SelectItem value="india">India</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Education</label>
                    <Select
                      value={simulation.education}
                      onValueChange={(value) =>
                        setSimulation({ ...simulation, education: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select education" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high-school">High School</SelectItem>
                        <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                        <SelectItem value="master">Master's Degree</SelectItem>
                        <SelectItem value="phd">PhD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Personality</label>
                    <Select
                      value={simulation.personality}
                      onValueChange={(value) =>
                        setSimulation({ ...simulation, personality: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select personality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="introvert">Introvert</SelectItem>
                        <SelectItem value="extrovert">Extrovert</SelectItem>
                        <SelectItem value="ambivert">Ambivert</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Risk Tolerance</label>
                    <Select
                      value={simulation.risk}
                      onValueChange={(value) =>
                        setSimulation({ ...simulation, risk: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select risk level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Career Path</label>
                    <Select
                      value={simulation.career}
                      onValueChange={(value) =>
                        setSimulation({ ...simulation, career: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select career" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="tech">Technology</SelectItem>
                        <SelectItem value="medical">Medical</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold">Random Life Events</h3>
                  <div className="space-y-3 text-muted-foreground">
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      • Met a mentor who changed your perspective
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      • Started a side project that gained traction
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 }}
                    >
                      • Overcame a significant challenge
                    </motion.p>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-4">
                  <h3 className="text-xl font-semibold gradient-text">Your Parallel Life</h3>
                  <div className="p-4 bg-muted/20 rounded-lg space-y-2">
                    <p><strong>Age:</strong> 45</p>
                    <p><strong>Happiness:</strong> 8/10</p>
                    <p><strong>Wealth:</strong> Comfortable</p>
                    <p><strong>Career:</strong> Successful {simulation.career} professional</p>
                    <p className="text-muted-foreground mt-4">
                      You built a fulfilling life in {simulation.country}, leveraging your {simulation.education} education. 
                      Your {simulation.personality} nature helped you navigate challenges with grace.
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button onClick={handleRestart} variant="outline" className="flex-1">
                      Restart Simulation
                    </Button>
                    <Button onClick={generateSummary} className="flex-1 glow">
                      Share My Story
                    </Button>
                  </div>
                </div>
              )}

              {step < 4 && (
                <Button onClick={handleNext} className="w-full glow" size="lg">
                  Continue
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Simulator;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { Heart, DollarSign, Activity, Trophy } from "lucide-react";

interface SimulatorActiveProps {
  simulation: any;
  currentEvent: any;
  onMakeChoice: (choiceIndex: number) => void;
  onEndLife: () => void;
  loading: boolean;
}

export const SimulatorActive = ({
  simulation,
  currentEvent,
  onMakeChoice,
  onEndLife,
  loading
}: SimulatorActiveProps) => {
  const lifeProgress = (simulation.current_age / 90) * 100;
  const monthsThisYear = simulation.virtual_months_elapsed % 12;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with age and stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl gradient-text">
                  {simulation.username}'s Life
                </CardTitle>
                <CardDescription>
                  Age {simulation.current_age} years, {monthsThisYear} months
                </CardDescription>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Life Progress</p>
                <p className="text-2xl font-bold">{Math.round(lifeProgress)}%</p>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Progress value={lifeProgress} className="mb-6" />
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                <Heart className="text-primary w-8 h-8" />
                <div>
                  <p className="text-xs text-muted-foreground">Happiness</p>
                  <p className="text-xl font-bold">{Math.round(simulation.happiness_score)}/100</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                <DollarSign className="text-primary w-8 h-8" />
                <div>
                  <p className="text-xs text-muted-foreground">Wealth</p>
                  <p className="text-xl font-bold">{simulation.wealth_level}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                <Activity className="text-primary w-8 h-8" />
                <div>
                  <p className="text-xs text-muted-foreground">Health</p>
                  <p className="text-xl font-bold">{Math.round(simulation.health_score)}/100</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 bg-muted/20 rounded-lg">
                <Trophy className="text-primary w-8 h-8" />
                <div>
                  <p className="text-xs text-muted-foreground">Legacy</p>
                  <p className="text-xl font-bold">{Math.round(simulation.legacy_score)}/100</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Current Event */}
      {currentEvent && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          key={currentEvent.title}
        >
          <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow-strong">
            <CardHeader>
              <CardTitle className="text-2xl">{currentEvent.title}</CardTitle>
              <CardDescription>Age {simulation.current_age}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-lg">{currentEvent.description}</p>

              {currentEvent.hasChoice && currentEvent.choices ? (
                <div className="space-y-3 pt-4">
                  <p className="font-semibold text-primary">What will you do?</p>
                  {currentEvent.choices.map((choice: any, index: number) => (
                    <Button
                      key={index}
                      onClick={() => onMakeChoice(index)}
                      disabled={loading}
                      variant="outline"
                      className="w-full text-left h-auto py-4 px-4 border-primary/20 hover:border-primary"
                    >
                      {choice.text}
                    </Button>
                  ))}
                </div>
              ) : (
                <div className="pt-4">
                  <Button
                    onClick={() => onMakeChoice(-1)}
                    disabled={loading}
                    className="w-full glow"
                  >
                    {loading ? "Living your life..." : "Continue"}
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* End Life Button */}
      <div className="text-center">
        <Button
          onClick={onEndLife}
          variant="destructive"
          className="opacity-50 hover:opacity-100"
        >
          End Simulation
        </Button>
      </div>
    </div>
  );
};

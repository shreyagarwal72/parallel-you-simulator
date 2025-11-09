import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Heart, DollarSign, Activity, Trophy, Share2 } from "lucide-react";

interface LifeSummaryProps {
  simulation: any;
  summary: string;
  onRestart: () => void;
  onShare: () => void;
}

export const LifeSummary = ({ simulation, summary, onRestart, onShare }: LifeSummaryProps) => {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow-strong">
          <CardHeader>
            <CardTitle className="text-3xl gradient-text text-center">
              Life Complete
            </CardTitle>
            <p className="text-center text-muted-foreground">
              {simulation.username} lived to {simulation.current_age} years
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Final Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex flex-col items-center gap-2 p-4 bg-muted/20 rounded-lg">
                <Heart className="text-primary w-10 h-10" />
                <p className="text-xs text-muted-foreground">Happiness</p>
                <p className="text-2xl font-bold">{Math.round(simulation.happiness_score)}/100</p>
              </div>
              
              <div className="flex flex-col items-center gap-2 p-4 bg-muted/20 rounded-lg">
                <DollarSign className="text-primary w-10 h-10" />
                <p className="text-xs text-muted-foreground">Wealth</p>
                <p className="text-lg font-bold">{simulation.wealth_level}</p>
              </div>
              
              <div className="flex flex-col items-center gap-2 p-4 bg-muted/20 rounded-lg">
                <Activity className="text-primary w-10 h-10" />
                <p className="text-xs text-muted-foreground">Health</p>
                <p className="text-2xl font-bold">{Math.round(simulation.health_score)}/100</p>
              </div>
              
              <div className="flex flex-col items-center gap-2 p-4 bg-muted/20 rounded-lg">
                <Trophy className="text-primary w-10 h-10" />
                <p className="text-xs text-muted-foreground">Legacy</p>
                <p className="text-2xl font-bold">{Math.round(simulation.legacy_score)}/100</p>
              </div>
            </div>

            {/* AI Summary */}
            <div className="bg-muted/10 p-6 rounded-lg border border-primary/10">
              <h3 className="font-semibold text-lg mb-3 gradient-text">Life Story</h3>
              <p className="text-foreground/90 whitespace-pre-wrap leading-relaxed">
                {summary}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                onClick={onRestart}
                variant="outline"
                className="flex-1 border-primary/20"
              >
                Start New Life
              </Button>
              <Button
                onClick={onShare}
                className="flex-1 glow"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Story
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
};

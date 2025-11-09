import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import abstractBg from "@/assets/abstract-bg.jpg";
import { Trophy, Heart, DollarSign } from "lucide-react";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  const loadLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from("simulations")
        .select("*")
        .eq("is_alive", false)
        .order("legacy_score", { ascending: false })
        .limit(20);

      if (error) throw error;
      setLeaderboard(data || []);
    } catch (error) {
      console.error("Error loading leaderboard:", error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (rank: number) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return `#${rank}`;
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
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
            Hall of Lives
          </h1>

          <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="w-6 h-6 text-primary" />
                Leaderboard
              </CardTitle>
              <CardDescription>
                The most remarkable parallel lives ever lived
              </CardDescription>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8 text-muted-foreground">
                  Loading leaderboard...
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground">
                  No completed lives yet. Be the first!
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-3 font-semibold">Rank</th>
                        <th className="text-left p-3 font-semibold">Name</th>
                        <th className="text-left p-3 font-semibold">Age</th>
                        <th className="text-left p-3 font-semibold">Career</th>
                        <th className="text-left p-3 font-semibold">
                          <div className="flex items-center gap-1">
                            <Heart className="w-4 h-4" />
                            Happiness
                          </div>
                        </th>
                        <th className="text-left p-3 font-semibold">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            Wealth
                          </div>
                        </th>
                        <th className="text-left p-3 font-semibold">
                          <div className="flex items-center gap-1">
                            <Trophy className="w-4 h-4" />
                            Legacy
                          </div>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {leaderboard.map((entry, index) => (
                        <motion.tr
                          key={entry.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                          className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                        >
                          <td className="p-3">
                            <span className={`font-bold text-lg ${index < 3 ? 'text-primary' : ''}`}>
                              {getMedalEmoji(index + 1)}
                            </span>
                          </td>
                          <td className="p-3 font-medium">{entry.username}</td>
                          <td className="p-3">{entry.current_age}</td>
                          <td className="p-3 capitalize">{entry.career_path}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${entry.happiness_score}%` }}
                                />
                              </div>
                              <span className="text-sm">{Math.round(entry.happiness_score)}</span>
                            </div>
                          </td>
                          <td className="p-3">{entry.wealth_level}</td>
                          <td className="p-3">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full"
                                  style={{ width: `${entry.legacy_score}%` }}
                                />
                              </div>
                              <span className="text-sm font-semibold">{Math.round(entry.legacy_score)}</span>
                            </div>
                          </td>
                        </motion.tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;

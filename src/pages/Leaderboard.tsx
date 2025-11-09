import { useState, useEffect } from "react";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
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
    <div className="min-h-screen relative flex flex-col">
      <Navigation />
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-10"
        style={{ backgroundImage: `url(${abstractBg})` }}
      />

      <div className="relative z-10 container mx-auto px-4 py-8 pt-24 pb-16 flex-1">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8 gradient-text">
            Hall of Lives
          </h1>

          <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow">
            <CardHeader className="p-4 md:p-6">
              <CardTitle className="flex items-center gap-2 text-xl md:text-2xl">
                <Trophy className="w-5 h-5 md:w-6 md:h-6 text-primary" />
                Leaderboard
              </CardTitle>
              <CardDescription className="text-sm">
                The most remarkable parallel lives ever lived
              </CardDescription>
            </CardHeader>
            <CardContent className="p-2 md:p-6">
              {loading ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  Loading leaderboard...
                </div>
              ) : leaderboard.length === 0 ? (
                <div className="text-center py-8 text-muted-foreground text-sm">
                  No completed lives yet. Be the first!
                </div>
              ) : (
                <div className="overflow-x-auto -mx-2 md:mx-0">
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-2 md:p-3 font-semibold text-xs md:text-sm">Rank</th>
                        <th className="text-left p-2 md:p-3 font-semibold text-xs md:text-sm">Name</th>
                        <th className="text-left p-2 md:p-3 font-semibold text-xs md:text-sm">Age</th>
                        <th className="text-left p-2 md:p-3 font-semibold text-xs md:text-sm">Career</th>
                        <th className="text-left p-2 md:p-3 font-semibold text-xs md:text-sm">
                          <div className="flex items-center gap-1">
                            <Heart className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="hidden sm:inline">Happiness</span>
                            <span className="sm:hidden">H</span>
                          </div>
                        </th>
                        <th className="text-left p-2 md:p-3 font-semibold text-xs md:text-sm hidden md:table-cell">
                          <div className="flex items-center gap-1">
                            <DollarSign className="w-4 h-4" />
                            Wealth
                          </div>
                        </th>
                        <th className="text-left p-2 md:p-3 font-semibold text-xs md:text-sm">
                          <div className="flex items-center gap-1">
                            <Trophy className="w-3 h-3 md:w-4 md:h-4" />
                            <span className="hidden sm:inline">Legacy</span>
                            <span className="sm:hidden">L</span>
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
                          <td className="p-2 md:p-3">
                            <span className={`font-bold text-base md:text-lg ${index < 3 ? 'text-primary' : ''}`}>
                              {getMedalEmoji(index + 1)}
                            </span>
                          </td>
                          <td className="p-2 md:p-3 font-medium text-xs md:text-sm">{entry.username}</td>
                          <td className="p-2 md:p-3 text-xs md:text-sm">{entry.current_age}</td>
                          <td className="p-2 md:p-3 capitalize text-xs md:text-sm">{entry.career_path}</td>
                          <td className="p-2 md:p-3">
                            <div className="flex items-center gap-1 md:gap-2">
                              <div className="w-12 md:w-16 bg-muted rounded-full h-1.5 md:h-2">
                                <div 
                                  className="bg-primary h-1.5 md:h-2 rounded-full"
                                  style={{ width: `${entry.happiness_score}%` }}
                                />
                              </div>
                              <span className="text-xs">{Math.round(entry.happiness_score)}</span>
                            </div>
                          </td>
                          <td className="p-2 md:p-3 text-xs md:text-sm hidden md:table-cell">{entry.wealth_level}</td>
                          <td className="p-2 md:p-3">
                            <div className="flex items-center gap-1 md:gap-2">
                              <div className="w-12 md:w-16 bg-muted rounded-full h-1.5 md:h-2">
                                <div 
                                  className="bg-primary h-1.5 md:h-2 rounded-full"
                                  style={{ width: `${entry.legacy_score}%` }}
                                />
                              </div>
                              <span className="text-xs font-semibold">{Math.round(entry.legacy_score)}</span>
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
      <Footer />
    </div>
  );
};

export default Leaderboard;

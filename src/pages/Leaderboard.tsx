import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import abstractBg from "@/assets/abstract-bg.jpg";

const mockLeaderboard = [
  { rank: 1, name: "Alex_Parallel", age: 52, happiness: 9.5, wealth: "Very Wealthy", career: "Tech Founder" },
  { rank: 2, name: "Sarah_Alt", age: 48, happiness: 9.2, wealth: "Wealthy", career: "Doctor" },
  { rank: 3, name: "Mike_Universe", age: 45, happiness: 9.0, wealth: "Comfortable", career: "Artist" },
  { rank: 4, name: "Emma_Branch", age: 50, happiness: 8.8, wealth: "Wealthy", career: "Professor" },
  { rank: 5, name: "John_Timeline", age: 47, happiness: 8.5, wealth: "Comfortable", career: "Entrepreneur" },
];

const Leaderboard = () => {
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
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
            Top Parallel Lives
          </h1>

          <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow">
            <CardHeader>
              <CardTitle>Leaderboard</CardTitle>
              <CardDescription>The most successful parallel lives simulated</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left p-3 font-semibold">Rank</th>
                      <th className="text-left p-3 font-semibold">Name</th>
                      <th className="text-left p-3 font-semibold">Age</th>
                      <th className="text-left p-3 font-semibold">Happiness</th>
                      <th className="text-left p-3 font-semibold">Wealth</th>
                      <th className="text-left p-3 font-semibold">Career</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockLeaderboard.map((entry, index) => (
                      <motion.tr
                        key={entry.rank}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="border-b border-border/50 hover:bg-muted/20 transition-colors"
                      >
                        <td className="p-3">
                          <span className={`font-bold ${entry.rank <= 3 ? 'text-primary' : ''}`}>
                            #{entry.rank}
                          </span>
                        </td>
                        <td className="p-3">{entry.name}</td>
                        <td className="p-3">{entry.age}</td>
                        <td className="p-3">{entry.happiness}/10</td>
                        <td className="p-3">{entry.wealth}</td>
                        <td className="p-3">{entry.career}</td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default Leaderboard;

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Circle } from "lucide-react";

interface LifeTimelineProps {
  events: any[];
  currentAge: number;
}

export const LifeTimeline = ({ events, currentAge }: LifeTimelineProps) => {
  const getEventIcon = (type: string) => {
    const icons: Record<string, string> = {
      career: "💼",
      education: "🎓",
      relationship: "❤️",
      health: "🏥",
      financial: "💰",
      personal: "⭐",
    };
    return icons[type] || "📌";
  };

  const getEventColor = (impact: any) => {
    if (!impact) return "text-muted-foreground";
    const totalImpact = (impact.happiness || 0) + (impact.wealth || 0) + (impact.health || 0);
    if (totalImpact > 10) return "text-green-500";
    if (totalImpact < -10) return "text-red-500";
    return "text-yellow-500";
  };

  return (
    <Card className="bg-card/50 backdrop-blur-md border-primary/20">
      <CardHeader>
        <CardTitle>Life Timeline</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {events.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex gap-4 items-start"
              >
                <div className="flex flex-col items-center">
                  <div className={`text-2xl ${getEventColor(event.impact)}`}>
                    {getEventIcon(event.type)}
                  </div>
                  {index < events.length - 1 && (
                    <div className="w-px h-12 bg-border" />
                  )}
                </div>
                
                <div className="flex-1 pb-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-primary">
                      Age {event.age}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {event.type}
                    </span>
                  </div>
                  <p className="text-sm font-medium mt-1">{event.title}</p>
                  {event.description && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {event.description}
                    </p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

import { Navigation } from "@/components/Navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import abstractBg from "@/assets/abstract-bg.jpg";

const About = () => {
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
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
            About Parallel You
          </h1>

          <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow">
            <CardHeader>
              <CardTitle className="text-2xl">The Concept</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-muted-foreground">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-lg leading-relaxed"
              >
                Every choice you make creates another you. Step into your parallel world.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-4"
              >
                <p>
                  Parallel You is an AI-powered life simulator that lets you explore alternate 
                  versions of your life based on different choices and circumstances. What if 
                  you had chosen a different career? What if you lived in another country? 
                  What if you took that risk?
                </p>

                <p>
                  Using advanced simulation algorithms and AI-generated scenarios, we create 
                  unique life paths that show you the infinite possibilities of your existence. 
                  Each simulation is a window into a parallel universe where you made different 
                  choices.
                </p>

                <p>
                  Our mission is to inspire reflection, curiosity, and appreciation for the 
                  life you're living while exploring the beautiful complexity of alternate 
                  possibilities.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="pt-6 border-t border-border"
              >
                <p className="text-center text-sm">
                  Crafted by <span className="text-primary font-semibold">Nextup Studio</span>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default About;

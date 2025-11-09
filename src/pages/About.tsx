import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";
import abstractBg from "@/assets/abstract-bg.jpg";

const About = () => {
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
          className="max-w-3xl mx-auto"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-6 md:mb-8 gradient-text">
            About Parallel You
          </h1>

          <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow">
            <CardHeader>
              <CardTitle className="text-xl md:text-2xl">The Concept</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 md:space-y-6 text-muted-foreground text-sm md:text-base">
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-base md:text-lg leading-relaxed"
              >
                Every choice you make creates another you. Step into your parallel world.
              </motion.p>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="space-y-3 md:space-y-4"
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
                className="pt-4 md:pt-6 border-t border-border"
              >
                <p className="text-center text-xs md:text-sm">
                  Crafted by{" "}
                  <a 
                    href="https://nextup-studio.vercel.app" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-primary font-semibold hover:underline"
                  >
                    Nextup Studio
                  </a>
                </p>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default About;

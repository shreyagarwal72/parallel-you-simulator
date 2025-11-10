import { motion } from "framer-motion";

export const LoadingAnimation = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8"
      >
        <h1 className="text-5xl font-bold mb-3 gradient-text">
          Parallel You
        </h1>
        <p className="text-muted-foreground text-sm">
          Powered by{" "}
          <a 
            href="https://nextup-studio.vercel.app" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-primary hover:text-secondary transition-colors"
          >
            Nextup Studio
          </a>
        </p>
      </motion.div>
      
      <div className="relative">
        <motion.div
          className="w-20 h-20 border-4 border-primary/20 rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-primary border-r-secondary rounded-full"
          animate={{ rotate: 360 }}
          transition={{
            duration: 1,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute inset-2 w-16 h-16 border-4 border-accent/30 rounded-full"
          animate={{ rotate: -360 }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
      
      <motion.p
        className="mt-6 text-foreground/70"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        Loading your parallel life...
      </motion.p>
    </div>
  );
};

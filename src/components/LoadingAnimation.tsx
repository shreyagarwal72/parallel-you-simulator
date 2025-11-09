import { motion } from "framer-motion";

export const LoadingAnimation = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <motion.div
        className="w-20 h-20 border-4 border-primary/20 border-t-primary rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear",
        }}
      />
    </div>
  );
};

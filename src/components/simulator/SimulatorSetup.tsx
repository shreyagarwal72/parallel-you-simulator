import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";

interface SimulatorSetupProps {
  onStart: (config: SimulationConfig) => void;
  loading: boolean;
}

export interface SimulationConfig {
  username: string;
  country: string;
  education: string;
  personality: string;
  career: string;
  riskTolerance: string;
}

export const SimulatorSetup = ({ onStart, loading }: SimulatorSetupProps) => {
  const [config, setConfig] = useState<SimulationConfig>({
    username: "",
    country: "",
    education: "",
    personality: "",
    career: "",
    riskTolerance: "",
  });

  const isValid = Object.values(config).every(v => v !== "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-2xl mx-auto"
    >
      <h1 className="text-4xl md:text-5xl font-bold text-center mb-8 gradient-text">
        Create Your Parallel Life
      </h1>

      <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow">
        <CardHeader>
          <CardTitle>Define Your Starting Point</CardTitle>
          <CardDescription>
            Choose your origin story. These choices will shape your journey.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name</label>
            <Input
              value={config.username}
              onChange={(e) => setConfig({ ...config, username: e.target.value })}
              placeholder="Enter your name"
              className="bg-background/50 border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Country</label>
            <Select
              value={config.country}
              onValueChange={(value) => setConfig({ ...config, country: value })}
            >
              <SelectTrigger className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Select country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">United States</SelectItem>
                <SelectItem value="uk">United Kingdom</SelectItem>
                <SelectItem value="japan">Japan</SelectItem>
                <SelectItem value="brazil">Brazil</SelectItem>
                <SelectItem value="india">India</SelectItem>
                <SelectItem value="germany">Germany</SelectItem>
                <SelectItem value="france">France</SelectItem>
                <SelectItem value="canada">Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Education Level</label>
            <Select
              value={config.education}
              onValueChange={(value) => setConfig({ ...config, education: value })}
            >
              <SelectTrigger className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Select education" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                <SelectItem value="master">Master's Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Personality Type</label>
            <Select
              value={config.personality}
              onValueChange={(value) => setConfig({ ...config, personality: value })}
            >
              <SelectTrigger className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Select personality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="introvert">Introvert</SelectItem>
                <SelectItem value="extrovert">Extrovert</SelectItem>
                <SelectItem value="ambivert">Ambivert</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Career Path</label>
            <Select
              value={config.career}
              onValueChange={(value) => setConfig({ ...config, career: value })}
            >
              <SelectTrigger className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Select career" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="medical">Medical</SelectItem>
                <SelectItem value="arts">Arts & Entertainment</SelectItem>
                <SelectItem value="business">Business</SelectItem>
                <SelectItem value="education">Education</SelectItem>
                <SelectItem value="engineering">Engineering</SelectItem>
                <SelectItem value="science">Science & Research</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Risk Tolerance</label>
            <Select
              value={config.riskTolerance}
              onValueChange={(value) => setConfig({ ...config, riskTolerance: value })}
            >
              <SelectTrigger className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Select risk level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">Conservative</SelectItem>
                <SelectItem value="medium">Balanced</SelectItem>
                <SelectItem value="high">Adventurous</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={() => onStart(config)}
            disabled={!isValid || loading}
            className="w-full glow-strong"
            size="lg"
          >
            {loading ? "Starting Your Life..." : "Begin Your Journey"}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

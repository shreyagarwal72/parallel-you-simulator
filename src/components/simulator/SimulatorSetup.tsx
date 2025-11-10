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
        Start Your Parallel Life
      </h1>

      <Card className="bg-card/50 backdrop-blur-md border-primary/20 glow">
        <CardHeader>
          <CardTitle>Set Up Your Life</CardTitle>
          <CardDescription>
            Make simple choices to start your journey
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">What's your name?</label>
            <Input
              value={config.username}
              onChange={(e) => setConfig({ ...config, username: e.target.value })}
              placeholder="Enter your name"
              className="bg-background/50 border-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Where are you from?</label>
            <Select
              value={config.country}
              onValueChange={(value) => setConfig({ ...config, country: value })}
            >
              <SelectTrigger className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Choose your country" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="usa">🇺🇸 United States</SelectItem>
                <SelectItem value="uk">🇬🇧 United Kingdom</SelectItem>
                <SelectItem value="japan">🇯🇵 Japan</SelectItem>
                <SelectItem value="brazil">🇧🇷 Brazil</SelectItem>
                <SelectItem value="india">🇮🇳 India</SelectItem>
                <SelectItem value="germany">🇩🇪 Germany</SelectItem>
                <SelectItem value="france">🇫🇷 France</SelectItem>
                <SelectItem value="canada">🇨🇦 Canada</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">What's your education?</label>
            <Select
              value={config.education}
              onValueChange={(value) => setConfig({ ...config, education: value })}
            >
              <SelectTrigger className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Pick your education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">📚 High School</SelectItem>
                <SelectItem value="bachelor">🎓 Bachelor's Degree</SelectItem>
                <SelectItem value="master">🎯 Master's Degree</SelectItem>
                <SelectItem value="phd">🏆 PhD</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">What's your personality like?</label>
            <Select
              value={config.personality}
              onValueChange={(value) => setConfig({ ...config, personality: value })}
            >
              <SelectTrigger className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Choose your personality" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="introvert">🤫 Introvert (Quiet & Thoughtful)</SelectItem>
                <SelectItem value="extrovert">🎉 Extrovert (Outgoing & Social)</SelectItem>
                <SelectItem value="ambivert">⚖️ Ambivert (Mix of Both)</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">What career do you want?</label>
            <Select
              value={config.career}
              onValueChange={(value) => setConfig({ ...config, career: value })}
            >
              <SelectTrigger className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Pick your dream career" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Data Scientist">💻 Data Scientist</SelectItem>
                <SelectItem value="Doctor">⚕️ Doctor</SelectItem>
                <SelectItem value="Artist">🎨 Artist</SelectItem>
                <SelectItem value="Entrepreneur">💼 Entrepreneur</SelectItem>
                <SelectItem value="Teacher">📖 Teacher</SelectItem>
                <SelectItem value="Engineer">🔧 Engineer</SelectItem>
                <SelectItem value="Researcher">🔬 Researcher</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">How adventurous are you?</label>
            <Select
              value={config.riskTolerance}
              onValueChange={(value) => setConfig({ ...config, riskTolerance: value })}
            >
              <SelectTrigger className="bg-background/50 border-primary/20">
                <SelectValue placeholder="Choose your style" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="low">🛡️ Play it Safe</SelectItem>
                <SelectItem value="medium">⚡ Take Some Risks</SelectItem>
                <SelectItem value="high">🚀 Live Dangerously</SelectItem>
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

import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { motion } from "framer-motion";

export const Navigation = () => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/");
  };

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border"
    >
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold gradient-text">
          Parallel You
        </Link>

        <div className="hidden md:flex items-center gap-6">
          <Link to="/" className="text-foreground/80 hover:text-primary transition-colors">
            Home
          </Link>
          <Link to="/simulator" className="text-foreground/80 hover:text-primary transition-colors">
            Simulator
          </Link>
          <Link to="/leaderboard" className="text-foreground/80 hover:text-primary transition-colors">
            Leaderboard
          </Link>
          <Link to="/about" className="text-foreground/80 hover:text-primary transition-colors">
            About
          </Link>
          <Link to="/contact" className="text-foreground/80 hover:text-primary transition-colors">
            Contact
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <div className="hidden md:flex items-center gap-3">
                {user.user_metadata?.avatar_url && (
                  <img 
                    src={user.user_metadata.avatar_url} 
                    alt="Profile"
                    className="w-8 h-8 rounded-full border-2 border-primary"
                  />
                )}
                <span className="text-sm text-muted-foreground">
                  {user.user_metadata?.name || user.email}
                </span>
              </div>
              <Button onClick={handleLogout} variant="outline" className="glow">
                Logout
              </Button>
            </>
          ) : (
            <Button asChild className="glow">
              <Link to="/auth">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </motion.nav>
  );
};

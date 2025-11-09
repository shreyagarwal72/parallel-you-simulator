-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT UNIQUE,
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Create simulations table
CREATE TABLE public.simulations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  
  -- Simulation config
  country TEXT NOT NULL,
  education TEXT NOT NULL,
  personality TEXT NOT NULL,
  risk_tolerance TEXT NOT NULL,
  career_path TEXT NOT NULL,
  
  -- Current state
  current_age INT DEFAULT 0,
  virtual_months_elapsed INT DEFAULT 0,
  is_alive BOOLEAN DEFAULT true,
  
  -- Stats
  happiness_score DECIMAL(5,2) DEFAULT 50.0,
  wealth_level TEXT DEFAULT 'Starting Out',
  health_score DECIMAL(5,2) DEFAULT 100.0,
  legacy_score DECIMAL(5,2) DEFAULT 0.0,
  
  -- Timeline
  life_events JSONB DEFAULT '[]'::jsonb,
  
  -- Timestamps
  simulation_start_date TIMESTAMPTZ DEFAULT NOW(),
  last_updated TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.simulations ENABLE ROW LEVEL SECURITY;

-- Simulations policies
CREATE POLICY "Users can view own simulations"
  ON public.simulations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own simulations"
  ON public.simulations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own simulations"
  ON public.simulations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own simulations"
  ON public.simulations FOR DELETE
  USING (auth.uid() = user_id);

-- Create leaderboard view (public access to completed simulations)
CREATE POLICY "Everyone can view completed simulations for leaderboard"
  ON public.simulations FOR SELECT
  USING (is_alive = false);

-- Trigger to auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, username, avatar_url)
  VALUES (
    new.id,
    COALESCE(new.raw_user_meta_data->>'name', new.email),
    new.raw_user_meta_data->>'avatar_url'
  );
  RETURN new;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Function to update last_updated timestamp
CREATE OR REPLACE FUNCTION public.update_simulation_timestamp()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.last_updated = NOW();
  RETURN NEW;
END;
$$;

CREATE TRIGGER update_simulations_timestamp
  BEFORE UPDATE ON public.simulations
  FOR EACH ROW EXECUTE FUNCTION public.update_simulation_timestamp();
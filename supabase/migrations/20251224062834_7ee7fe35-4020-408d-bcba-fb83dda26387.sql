-- Create players table
CREATE TABLE public.players (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  grade INTEGER NOT NULL,
  animal TEXT NOT NULL CHECK (animal IN ('elephant', 'panda')),
  diamonds INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create daily_stats table
CREATE TABLE public.daily_stats (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  diamonds INTEGER NOT NULL DEFAULT 0,
  UNIQUE(player_id, date)
);

-- Insert default players
INSERT INTO public.players (name, grade, animal) VALUES 
  ('Tuệ Anh', 3, 'elephant'),
  ('Phúc Khang', 2, 'panda');

-- Enable RLS but allow public access for this family app
ALTER TABLE public.players ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.daily_stats ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read players" ON public.players FOR SELECT USING (true);
CREATE POLICY "Allow public update players" ON public.players FOR UPDATE USING (true);

CREATE POLICY "Allow public read stats" ON public.daily_stats FOR SELECT USING (true);
CREATE POLICY "Allow public insert stats" ON public.daily_stats FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update stats" ON public.daily_stats FOR UPDATE USING (true);
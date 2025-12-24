-- Create admin_logs table for parent rewards/punishments
CREATE TABLE public.admin_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  diamond_change INTEGER NOT NULL,
  reason TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.admin_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read admin_logs" ON public.admin_logs FOR SELECT USING (true);
CREATE POLICY "Allow public insert admin_logs" ON public.admin_logs FOR INSERT WITH CHECK (true);
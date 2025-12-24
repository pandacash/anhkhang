-- Create voucher_redemptions table
CREATE TABLE public.voucher_redemptions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id UUID NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  diamonds_spent INTEGER NOT NULL,
  voucher_value INTEGER NOT NULL,
  redeemed_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  used BOOLEAN NOT NULL DEFAULT false,
  used_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS
ALTER TABLE public.voucher_redemptions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read voucher_redemptions" ON public.voucher_redemptions FOR SELECT USING (true);
CREATE POLICY "Allow public insert voucher_redemptions" ON public.voucher_redemptions FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update voucher_redemptions" ON public.voucher_redemptions FOR UPDATE USING (true);
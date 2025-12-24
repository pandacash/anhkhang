-- Add DELETE policy for daily_stats table
CREATE POLICY "Allow public delete stats" 
ON public.daily_stats 
FOR DELETE 
USING (true);

-- Add DELETE policy for admin_logs table
CREATE POLICY "Allow public delete admin_logs" 
ON public.admin_logs 
FOR DELETE 
USING (true);

-- Add DELETE policy for voucher_redemptions table  
CREATE POLICY "Allow public delete voucher_redemptions"
ON public.voucher_redemptions
FOR DELETE 
USING (true);
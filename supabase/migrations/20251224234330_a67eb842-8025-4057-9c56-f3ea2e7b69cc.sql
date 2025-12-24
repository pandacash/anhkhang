
-- Create items table for shop inventory
CREATE TABLE public.items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  description text,
  price integer NOT NULL DEFAULT 5,
  category text NOT NULL, -- 'hat', 'armor', 'weapon', 'shoes', 'accessory'
  animal_type text NOT NULL, -- 'elephant', 'panda', 'both'
  image_key text NOT NULL, -- key to identify which image to show
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Create player_items table to track purchased and equipped items
CREATE TABLE public.player_items (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  player_id uuid NOT NULL REFERENCES public.players(id) ON DELETE CASCADE,
  item_id uuid NOT NULL REFERENCES public.items(id) ON DELETE CASCADE,
  equipped boolean NOT NULL DEFAULT false,
  purchased_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(player_id, item_id)
);

-- Enable RLS
ALTER TABLE public.items ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.player_items ENABLE ROW LEVEL SECURITY;

-- RLS policies for items (public read)
CREATE POLICY "Allow public read items" ON public.items FOR SELECT USING (true);

-- RLS policies for player_items
CREATE POLICY "Allow public read player_items" ON public.player_items FOR SELECT USING (true);
CREATE POLICY "Allow public insert player_items" ON public.player_items FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update player_items" ON public.player_items FOR UPDATE USING (true);
CREATE POLICY "Allow public delete player_items" ON public.player_items FOR DELETE USING (true);

-- Insert default items for panda
INSERT INTO public.items (name, description, price, category, animal_type, image_key) VALUES
('Giáp chiến binh', 'Bộ giáp oai phong cho gấu trúc', 5, 'armor', 'panda', 'panda_armor'),
('Giày thể thao', 'Đôi giày năng động', 5, 'shoes', 'panda', 'panda_shoes'),
('Kiếm đồ chơi', 'Thanh kiếm nhựa an toàn', 5, 'weapon', 'panda', 'panda_sword'),
('Súng nước', 'Súng bắn nước vui nhộn', 5, 'weapon', 'panda', 'panda_watergun'),
('Nơ đỏ', 'Nơ xinh xắn màu đỏ', 5, 'accessory', 'panda', 'panda_bow'),
('Mũ ninja', 'Mũ ninja bí ẩn', 5, 'hat', 'panda', 'panda_ninja_hat');

-- Insert default items for elephant
INSERT INTO public.items (name, description, price, category, animal_type, image_key) VALUES
('Mũ công chúa', 'Vương miện lấp lánh', 5, 'hat', 'elephant', 'elephant_crown'),
('Mũ hoa', 'Mũ đính hoa xinh đẹp', 5, 'hat', 'elephant', 'elephant_flower_hat'),
('Khăn quàng', 'Khăn quàng cổ ấm áp', 5, 'accessory', 'elephant', 'elephant_scarf'),
('Chuông lục lạc', 'Chuông đeo chân vui nhộn', 5, 'accessory', 'elephant', 'elephant_bells'),
('Áo choàng', 'Áo choàng công chúa', 5, 'armor', 'elephant', 'elephant_cape'),
('Giày bốt', 'Đôi bốt dễ thương', 5, 'shoes', 'elephant', 'elephant_boots');

-- Add pet care columns to players table
ALTER TABLE public.players 
ADD COLUMN hunger_level integer NOT NULL DEFAULT 100,
ADD COLUMN thirst_level integer NOT NULL DEFAULT 100,
ADD COLUMN last_fed_at timestamp with time zone NOT NULL DEFAULT now(),
ADD COLUMN last_watered_at timestamp with time zone NOT NULL DEFAULT now(),
ADD COLUMN is_sick boolean NOT NULL DEFAULT false;

-- Add food and drink items to the shop
INSERT INTO public.items (name, description, price, category, animal_type, image_key) VALUES
-- Food items (category: 'food')
('Bánh mì', 'Bánh mì thơm ngon, +20 no', 5, 'food', 'both', 'food_bread'),
('Táo đỏ', 'Táo tươi ngon, +25 no', 8, 'food', 'both', 'food_apple'),
('Chuối vàng', 'Chuối chín mọng, +30 no', 10, 'food', 'both', 'food_banana'),
('Hamburger', 'Burger bò phô mai, +40 no', 15, 'food', 'both', 'food_burger'),
('Pizza', 'Pizza phô mai, +50 no', 20, 'food', 'both', 'food_pizza'),
('Cơm hộp', 'Cơm với thịt rau, +60 no', 25, 'food', 'both', 'food_bento'),
('Buffet mini', 'Nhiều món ngon, +80 no', 35, 'food', 'both', 'food_buffet'),
('Tiệc hoàng gia', 'Bữa tiệc sang trọng, +100 no', 50, 'food', 'both', 'food_feast'),

-- Drink items (category: 'drink')
('Nước lọc', 'Nước tinh khiết, +20 khát', 5, 'drink', 'both', 'drink_water'),
('Nước cam', 'Nước cam tươi, +25 khát', 8, 'drink', 'both', 'drink_orange'),
('Sữa tươi', 'Sữa bò tươi, +30 khát', 10, 'drink', 'both', 'drink_milk'),
('Trà sữa', 'Trà sữa trân châu, +40 khát', 15, 'drink', 'both', 'drink_boba'),
('Sinh tố', 'Sinh tố hoa quả, +50 khát', 20, 'drink', 'both', 'drink_smoothie'),
('Nước dừa', 'Nước dừa tươi, +60 khát', 25, 'drink', 'both', 'drink_coconut'),
('Cocktail trái cây', 'Đồ uống cao cấp, +80 khát', 35, 'drink', 'both', 'drink_cocktail'),
('Nước tiên', 'Đồ uống thần kỳ, +100 khát', 50, 'drink', 'both', 'drink_magic');

-- Create function to calculate current hunger/thirst based on time decay
-- Decay rate: loses 30 points per 8 hours (so ~90 points per day, need to feed at least once)
CREATE OR REPLACE FUNCTION public.get_pet_status(p_player_id uuid)
RETURNS TABLE(
  current_hunger integer,
  current_thirst integer,
  is_currently_sick boolean
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_hunger integer;
  v_thirst integer;
  v_last_fed timestamp with time zone;
  v_last_watered timestamp with time zone;
  v_hours_since_fed numeric;
  v_hours_since_watered numeric;
  v_hunger_decay integer;
  v_thirst_decay integer;
  v_final_hunger integer;
  v_final_thirst integer;
  v_sick boolean;
BEGIN
  SELECT p.hunger_level, p.thirst_level, p.last_fed_at, p.last_watered_at
  INTO v_hunger, v_thirst, v_last_fed, v_last_watered
  FROM public.players p
  WHERE p.id = p_player_id;

  IF v_hunger IS NULL THEN
    RAISE EXCEPTION 'Player not found';
  END IF;

  -- Calculate hours since last fed/watered
  v_hours_since_fed := EXTRACT(EPOCH FROM (now() - v_last_fed)) / 3600;
  v_hours_since_watered := EXTRACT(EPOCH FROM (now() - v_last_watered)) / 3600;

  -- Decay: 4 points per hour (so 96 points per day - needs ~20💎 worth of food/drink daily)
  v_hunger_decay := FLOOR(v_hours_since_fed * 4);
  v_thirst_decay := FLOOR(v_hours_since_watered * 4);

  v_final_hunger := GREATEST(0, v_hunger - v_hunger_decay);
  v_final_thirst := GREATEST(0, v_thirst - v_thirst_decay);

  -- Sick if either hunger or thirst is 0
  v_sick := (v_final_hunger = 0 OR v_final_thirst = 0);

  -- Update the sick status
  UPDATE public.players SET is_sick = v_sick WHERE id = p_player_id;

  RETURN QUERY SELECT v_final_hunger, v_final_thirst, v_sick;
END;
$$;

-- Function to feed the pet
CREATE OR REPLACE FUNCTION public.feed_pet(p_player_id uuid, p_food_value integer)
RETURNS TABLE(new_hunger integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_current_hunger integer;
  v_new_hunger integer;
BEGIN
  -- Get current calculated hunger
  SELECT current_hunger INTO v_current_hunger 
  FROM public.get_pet_status(p_player_id);

  -- Add food value, cap at 100
  v_new_hunger := LEAST(100, v_current_hunger + p_food_value);

  -- Update player
  UPDATE public.players 
  SET hunger_level = v_new_hunger, 
      last_fed_at = now(),
      is_sick = (v_new_hunger = 0 OR thirst_level = 0)
  WHERE id = p_player_id;

  RETURN QUERY SELECT v_new_hunger;
END;
$$;

-- Function to give water to the pet
CREATE OR REPLACE FUNCTION public.water_pet(p_player_id uuid, p_drink_value integer)
RETURNS TABLE(new_thirst integer)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_current_thirst integer;
  v_new_thirst integer;
BEGIN
  -- Get current calculated thirst
  SELECT current_thirst INTO v_current_thirst 
  FROM public.get_pet_status(p_player_id);

  -- Add drink value, cap at 100
  v_new_thirst := LEAST(100, v_current_thirst + p_drink_value);

  -- Update player
  UPDATE public.players 
  SET thirst_level = v_new_thirst, 
      last_watered_at = now(),
      is_sick = (hunger_level = 0 OR v_new_thirst = 0)
  WHERE id = p_player_id;

  RETURN QUERY SELECT v_new_thirst;
END;
$$;
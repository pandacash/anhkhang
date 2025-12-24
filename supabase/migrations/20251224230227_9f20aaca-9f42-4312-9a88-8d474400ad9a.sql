-- Fix search_path warning: recreate function with explicit search_path
CREATE OR REPLACE FUNCTION public.apply_player_diamond_delta(
  p_player_id uuid,
  p_change integer
)
RETURNS TABLE (
  player_id uuid,
  old_diamonds integer,
  new_diamonds integer
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_old integer;
  v_new integer;
BEGIN
  SELECT diamonds
  INTO v_old
  FROM public.players
  WHERE id = p_player_id
  FOR UPDATE;

  IF v_old IS NULL THEN
    RAISE EXCEPTION 'Player not found';
  END IF;

  v_new := GREATEST(0, v_old + p_change);

  UPDATE public.players
  SET diamonds = v_new
  WHERE id = p_player_id;

  INSERT INTO public.daily_stats (player_id, date, diamonds)
  VALUES (p_player_id, CURRENT_DATE, p_change)
  ON CONFLICT (player_id, date)
  DO UPDATE SET diamonds = public.daily_stats.diamonds + EXCLUDED.diamonds;

  RETURN QUERY SELECT p_player_id, v_old, v_new;
END;
$$;
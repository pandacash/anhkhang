-- Ensure daily_stats has a unique row per player per day (required for safe upserts)
CREATE UNIQUE INDEX IF NOT EXISTS daily_stats_player_date_uidx
ON public.daily_stats (player_id, date);

-- Atomically apply a diamond delta based on the latest DB value, and keep daily_stats in sync
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
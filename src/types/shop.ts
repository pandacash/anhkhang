export type ItemCategory = 'hat' | 'armor' | 'weapon' | 'shoes' | 'accessory' | 'pet';
export type AnimalType = 'elephant' | 'panda' | 'both';

export type ShopItem = {
  id: string;
  name: string;
  description: string | null;
  price: number;
  category: ItemCategory;
  animal_type: AnimalType;
  image_key: string;
  created_at: string;
};

export type PlayerItem = {
  id: string;
  player_id: string;
  item_id: string;
  equipped: boolean;
  purchased_at: string;
  item?: ShopItem;
};

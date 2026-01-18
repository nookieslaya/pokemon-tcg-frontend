export type Card = {
  id: string;
  name: string;
  images?: {
    small?: string;
    large?: string;
  };
  types?: string[];
  subtypes?: string[];
  hp?: string;
  rarity?: string;
  supertype?: string;
  artist?: string;
  set?: {
    id?: string;
    name?: string;
    series?: string;
    releaseDate?: string;
  };
  [key: string]: unknown;
};

export type CollectionCard = Card & {
  quantity: number;
};

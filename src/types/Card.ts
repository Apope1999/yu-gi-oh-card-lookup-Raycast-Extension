export type CardSet = {
  set_name: string;
  set_code: string;
  set_rarity: string;
  set_rarity_code: string;
  set_price: string;
};

export type CardPrice = {
  cardmarket_price: string;
  tcgplayer_price: string;
  ebay_price: string;
  amazon_price: string;
  coolstuffinc_price: string;
};

export type Card = {
  id: string;
  name: string;
  typeline: string[];
  type: string;
  humanReadableCardType: string;
  frameType: string;
  desc: string;
  atk: number;
  def: number;
  level: number;
  attribute: string;
  archetype: string;
  ygoprodeck_url: string;
  card_sets?: CardSet[];
  card_prices?: CardPrice[];
};
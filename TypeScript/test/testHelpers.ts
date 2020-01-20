import { Item  } from '../app/gilded-rose';

export const INITIAL_QUALITY = 10;
export const INITIAL_SELL_IN = 20;
export const EXPIRED_SELL_IN = -1;

export function createItem(itemType: string, sellIn: number = INITIAL_SELL_IN, quality: number = INITIAL_QUALITY): Item {
    return new Item(itemType, sellIn, quality);
  }
import { Item, GildedRose } from '../app/gilded-rose';

export const createItem = (
    name: string, 
    sellIn: number, 
    quality: number) => new Item(name, sellIn, quality);
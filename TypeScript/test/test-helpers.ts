import { expect } from 'chai';
import { Item } from '../app/gilded-rose';

export const createItem = (
        name: string, 
        sellIn: number, 
        quality: number
    ) => new Item(name, sellIn, quality);

export const checkItem = (
        item: Item,
        expectedSellIn: number,
        expectedQuality: number
    ) => {
        expect(item.quality).to.equal(expectedQuality);
        expect(item.sellIn).to.equal(expectedSellIn);
    }
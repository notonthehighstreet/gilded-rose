import { expect } from 'chai';
import { GildedRose, Item } from '../app/gilded-rose';

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
};

export const checkResults = (
    gildedRose: GildedRose, 
    expectedResults: Array<{sellIn: number, quality: number}>
) => {
    expectedResults.forEach((expectedResult) => {
        gildedRose.updateQuality();
        checkItem(
            gildedRose.items[0], 
            expectedResult.sellIn, 
            expectedResult.quality
        );
    });
};


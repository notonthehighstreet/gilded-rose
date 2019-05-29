import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

function itemWithNamedProperties({name, sellIn, quality}: { name: string, sellIn: number, quality: number}) {
    return new Item(name, sellIn, quality);
}

describe('Gilded Rose', function () {
    describe('for generic items', () => {
        const itemName = 'generic item';
        describe('should reduce sell by date', function() {
            [-2, -1, 0, 1, 2, 3, 4, 5].forEach((sellByDate) => {
                it(`from ${sellByDate} to ${sellByDate-1}`, () => {
                    const gildedRose = new GildedRose([
                        itemWithNamedProperties({
                            name: itemName,
                            sellIn: sellByDate,
                            quality: 0
                        })
                    ]);
                    const items = gildedRose.updateQuality();
                    expect(items[0].sellIn).to.equal(sellByDate-1);
                })
            });
        });
    });
});

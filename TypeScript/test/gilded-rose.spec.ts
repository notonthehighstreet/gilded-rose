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
        describe('when not expired', () => {
            const notExpiredSellByDate = 1;
            describe('should reduce quality by 1, lower bound by 0', function() {
                [
                    {in: 0, out: 0},
                    {in: 1, out: 0},
                    {in: 2, out: 1},
                    {in: 3, out: 2},
                ].forEach((testCase) => {
                    const originalQuality = testCase.in;
                    const expectedQuality = testCase.out;
                    it(`from ${originalQuality} to ${expectedQuality}`, () => {
                        const gildedRose = new GildedRose([
                            itemWithNamedProperties({
                                name: itemName,
                                sellIn: notExpiredSellByDate,
                                quality: originalQuality
                            })
                        ]);
                        const items = gildedRose.updateQuality();
                        expect(items[0].quality).to.equal(expectedQuality);
                    })
                });
            });
        });
        describe('when expired', () => {
            const expiredSellByDate = 0;
            describe('should reduce quality by 2, lower bound by 0', function() {
                [
                    {in: 0, out: 0},
                    {in: 1, out: 0},
                    {in: 2, out: 0},
                    {in: 3, out: 1},
                    {in: 4, out: 2},
                ].forEach((testCase) => {
                    const originalQuality = testCase.in;
                    const expectedQuality = testCase.out;
                    it(`from ${originalQuality} to ${expectedQuality}`, () => {
                        const gildedRose = new GildedRose([
                            itemWithNamedProperties({
                                name: itemName,
                                sellIn: expiredSellByDate,
                                quality: originalQuality
                            })
                        ]);
                        const items = gildedRose.updateQuality();
                        expect(items[0].quality).to.equal(expectedQuality);
                    })
                });
            });
        });
    });
});

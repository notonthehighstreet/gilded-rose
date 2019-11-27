import { expect } from 'chai';
import { GildedRose } from '../app/gilded-rose';
import { createItem, checkItem, checkResults } from './test-helpers';

describe('Gilded Rose', function () {

    describe('construction', () => {

        it('should set items parameter to items property', () => {
            const testItems = [
                createItem('TestItem1', 1, 1),
                createItem('TestItem2', 2, 2),
                createItem('TestItem3', 3, 3),
            ];
            const gildedRose = new GildedRose(testItems);
            expect(gildedRose.items).to.deep.equal(testItems);
        });
    });

    describe('standard item', () => {
        it('should degrade in quality by one each day when sell by date not exceeded', () => {
            
            const testItem = createItem('TestItem1', 3, 3);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 2,
                    quality: 2
                },
                {
                    sellIn: 1,
                    quality: 1
                },
                {
                    sellIn: 0,
                    quality: 0
                }
            ];
            checkResults(gildedRose, expectedResults);

        });

        it('should not degrade in quality further than 0', () => {
            const testItem = createItem('TestItem1', 3, 0);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 2,
                    quality: 0
                }
            ];
            checkResults(gildedRose, expectedResults);
        });

        it('should degrade in quality twice as fast once the sell by date has been exceeded', () => {
            const testItem = createItem('TestItem1', 2, 10);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 1,
                    quality: 9
                },
                {
                    sellIn: 0,
                    quality: 8
                },
                {
                    sellIn: -1,
                    quality: 6
                },
                {
                    sellIn: -2,
                    quality: 4
                }
            ];
            checkResults(gildedRose, expectedResults);
        });
    });

    describe('Aged Brie', () => {
        it('should improve in quality by one each day', () => {
            const testItem = createItem('Aged Brie', 3, 3);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 2,
                    quality: 4
                },
                {
                    sellIn: 1,
                    quality: 5
                },
                {
                    sellIn: 0,
                    quality: 6
                }
            ];
            checkResults(gildedRose, expectedResults);
        });

        it('should not improve in quality beyond 50', () => {
            const testItem = createItem('Aged Brie', 3, 50);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 2,
                    quality: 50
                }
            ];
            checkResults(gildedRose, expectedResults);
        });

        it('should improve in quality twice as fast once the expiry has been reached', () => {
            const testItem = createItem('Aged Brie', 2, 10);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 1,
                    quality: 11
                },
                {
                    sellIn: 0,
                    quality: 12
                },
                {
                    sellIn: -1,
                    quality: 14
                },
                {
                    sellIn: -2,
                    quality: 16
                }
            ];
            checkResults(gildedRose, expectedResults);
        });
    });

    describe('Sulfuras', () => {
        it('should never need to be sold, and it`s quality is eternal', () => {
            const testItem = createItem('Sulfuras, Hand of Ragnaros', 1, 80);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 1,
                    quality: 80
                },
                {
                    sellIn: 1,
                    quality: 80
                },
                {
                    sellIn: 1,
                    quality: 80
                }
            ];
            checkResults(gildedRose, expectedResults);
        });

        it('should always have the sellIn and Quality values it is initialised with', () => {
            const testItem = createItem('Sulfuras, Hand of Ragnaros', -2, 61);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: -2,
                    quality: 61
                },
                {
                    sellIn: -2,
                    quality: 61
                },
                {
                    sellIn: -2,
                    quality: 61
                }
            ];
            checkResults(gildedRose, expectedResults);
        });
    });

    describe('Backstage Passes', () => {
        it('should improve in quality by one each day when the gig is greater than 10 days away', () => {
            const testItem = createItem('Backstage passes to a TAFKAL80ETC concert', 13, 3);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 12,
                    quality: 4
                },
                {
                    sellIn: 11,
                    quality: 5
                },
                {
                    sellIn: 10,
                    quality: 6
                }
            ];
            checkResults(gildedRose, expectedResults);
        });

        it('should not improve in quality beyond 50', () => {
            const testItem = createItem('Backstage passes to a TAFKAL80ETC concert', 13, 50);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 12,
                    quality: 50
                }
            ];
            checkResults(gildedRose, expectedResults);
        });

        it('should improve in quality twice as fast when there are fewer than 10 days and greater than 5 days before the gig', () => {
            const testItem = createItem('Backstage passes to a TAFKAL80ETC concert', 11, 10);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 10,
                    quality: 11
                },
                {
                    sellIn: 9,
                    quality: 13
                },
                {
                    sellIn: 8,
                    quality: 15
                },
                {
                    sellIn: 7,
                    quality: 17
                },
                {
                    sellIn: 6,
                    quality: 19
                },
                {
                    sellIn: 5,
                    quality: 21
                }
            ];
            checkResults(gildedRose, expectedResults);
        });

        it('should improve in quality three times as fast when there are fewer than 5 days before the gig', () => {
            const testItem = createItem('Backstage passes to a TAFKAL80ETC concert', 6, 10);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 5,
                    quality: 12
                },
                {
                    sellIn: 4,
                    quality: 15
                },
                {
                    sellIn: 3,
                    quality: 18
                },
                {
                    sellIn: 2,
                    quality: 21
                },
                {
                    sellIn: 1,
                    quality: 24
                },
                {
                    sellIn: 0,
                    quality: 27
                }
            ];
            checkResults(gildedRose, expectedResults);
        });

        it('should become worthless once the concert is over', () => {
            const testItem = createItem('Backstage passes to a TAFKAL80ETC concert', 1, 10);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 0,
                    quality: 13
                },
                {
                    sellIn: -1,
                    quality: 0
                },
                {
                    sellIn: -2,
                    quality: 0
                }
            ];
            checkResults(gildedRose, expectedResults);
        });
    });

    describe('Conjured Items', () => {
        it('should degrade in quality by two each day when sell by date not exceeded', () => {
            
            const testItem = createItem('Conjured Mana Cake', 3, 8);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 2,
                    quality: 6
                },
                {
                    sellIn: 1,
                    quality: 4
                },
                {
                    sellIn: 0,
                    quality: 2
                }
            ];
            checkResults(gildedRose, expectedResults);

        });

        it('should not degrade in quality further than 0', () => {
            const testItem = createItem('Conjured Mana Cake', 3, 0);
            const gildedRose = new GildedRose([testItem]);
            const expectedResults = [
                {
                    sellIn: 2,
                    quality: 0
                }
            ];
            checkResults(gildedRose, expectedResults);
        });
    });

});

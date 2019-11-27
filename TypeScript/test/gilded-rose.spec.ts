import { expect } from 'chai';
import { GildedRose } from '../app/gilded-rose';
import { createItem, checkItem } from './test-helpers';

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
        it('should degrade quality by one each day when sell by date not exceeded', () => {
            
            const testItem = createItem('TestItem1', 3, 3);
            const gildedRose = new GildedRose([testItem]);

            gildedRose.updateQuality();
            let resultItem = gildedRose.items[0];
            checkItem(resultItem, 2, 2);

            gildedRose.updateQuality();
            checkItem(resultItem, 1, 1);

            gildedRose.updateQuality();
            checkItem(resultItem, 0, 0);

        });

        it('should not degrade quality further than 0', () => {
            const testItem = createItem('TestItem1', 3, 0);
            const gildedRose = new GildedRose([testItem]);

            gildedRose.updateQuality();
            let resultItem = gildedRose.items[0];
            checkItem(resultItem, 2, 0);
        });

        it('should degrade quality twice as fast once the sell by date has been exceeded', () => {
            const testItem = createItem('TestItem1', 2, 10);
            const gildedRose = new GildedRose([testItem]);

            gildedRose.updateQuality();
            let resultItem = gildedRose.items[0];
            checkItem(resultItem, 1, 9);

            gildedRose.updateQuality();
            checkItem(resultItem, 0, 8);

            gildedRose.updateQuality();
            checkItem(resultItem, -1, 6);

            gildedRose.updateQuality();
            checkItem(resultItem, -2, 4);
        });
    });

});

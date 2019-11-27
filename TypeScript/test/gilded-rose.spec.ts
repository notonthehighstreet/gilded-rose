import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';
import { createItem } from './test-helpers';

describe('Gilded Rose', function () {

    describe('construction', () => {

        it('should set items parameter to items property', () => {
            const testItems = [
                createItem('TestItem1', 1, 1),
                createItem('TestItem2', 2, 2),
                createItem('TestItem3', 3, 3),
            ]
            const gildedRose = new GildedRose(testItems);
            expect(gildedRose.items).to.deep.equal(testItems);
        });

    });

});

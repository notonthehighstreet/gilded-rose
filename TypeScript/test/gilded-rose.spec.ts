import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

function itemWithNamedProperties({name, sellIn, quality}: { name: string, sellIn: number, quality: number}) {
    return new Item(name, sellIn, quality);
}

describe('Gilded Rose', function () {
    describe('for generic items', () => {
        const itemName = 'generic item';
        it('should reduce sell by date by 1', function() {
            const gildedRose = new GildedRose([ 
                itemWithNamedProperties({
                    name: itemName,
                    sellIn: 5,
                    quality: 0
                }) 
            ]);
            const items = gildedRose.updateQuality();
            expect(items[0].sellIn).to.equal(4);
        });
    });
});

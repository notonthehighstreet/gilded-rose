import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {

  it('should foo', function () {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
  });

  describe("When quality is updated", () => {

    describe("Normal Items", () => {

      it("should decrease in quality by one", () => {
        const initialQuality = 10;
        const normalItem = new Item('normal item', 10, initialQuality);
        const gildedRose = new GildedRose([normalItem]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(initialQuality - 1);
      });

      it("After sell by date past, quality should degrade twice as fast", () => {
        const initialQuality = 10;
        const normalItem = new Item('normal item', -1, initialQuality);
        const gildedRose = new GildedRose([normalItem]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(initialQuality - 2);
      });

      it("quality can never be less than 0", () => {
        const initialQuality = 0;
        const normalItem = new Item('normal item', "4", initialQuality);
        const gildedRose = new GildedRose([normalItem]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
      });
      
    });
  });


});

import { expect } from 'chai';
import { Item, GildedRose, ItemTypes } from '../app/gilded-rose';

describe('Gilded Rose', function () {

  const INITIAL_QUALITY = 10;
  const INITIAL_SELL_IN = 20;
  const EXPIRED_SELL_IN = -1;
  function createItem(itemType: ItemTypes, sellIn: number = INITIAL_SELL_IN, quality: number = INITIAL_QUALITY) {
    return new Item(itemType, sellIn, quality);
  }
  it('should foo', function () {
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).to.equal('foo');
  });

  describe("When quality is updated", () => {

    describe("Normal Items", () => {

      it("should decrease in quality by one", () => {
        const normalItem = createItem(ItemTypes.NORMAL_ITEM);
        const gildedRose = new GildedRose([normalItem]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(INITIAL_QUALITY - 1);
      });

      it("After sell by date past, quality should degrade twice as fast", () => {
        const normalItem = createItem(ItemTypes.NORMAL_ITEM, EXPIRED_SELL_IN);
        const gildedRose = new GildedRose([normalItem]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(INITIAL_QUALITY - 2);
      });

      it("quality can never be less than 0", () => {
        const initialQuality = 0;
        const normalItem = createItem(ItemTypes.NORMAL_ITEM, 4, initialQuality);
        const gildedRose = new GildedRose([normalItem]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(0);
      });
      
    });

    describe("Aged Brie", () => {
      it("increases in Quality the older it gets", () => {
        const agedBrie = createItem(ItemTypes.AGED_BRIE);
        const gildedRose = new GildedRose([agedBrie]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(INITIAL_QUALITY + 1);
      });
    });

    describe("Sulfuras", () => {
      it("never descreases in quality", () => {
        const sulfuras = createItem(ItemTypes.SULFURAS);
        const gildedRose = new GildedRose([sulfuras]);
        const items = gildedRose.updateQuality();
        expect(items[0].quality).to.equal(INITIAL_QUALITY);
      });

      it("never has to be sold", () => {
        const sulfuras = createItem(ItemTypes.SULFURAS);
        const gildedRose = new GildedRose([sulfuras]);
        const items = gildedRose.updateQuality();
        expect(items[0].sellIn).to.equal(INITIAL_SELL_IN);
      });
    });
  });


});

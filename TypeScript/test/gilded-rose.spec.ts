import { expect } from "chai";
import { Item, GildedRose } from "../app/gilded-rose";

describe("Gilded Rose", () => {
  let items;
  let gildedRose;

  beforeEach(() => {
    items = [
      new Item("+5 Dexterity Vest", 10, 20), //
      new Item("Aged Brie", 2, 0), //
      new Item("Elixir of the Mongoose", 5, 7), //
      new Item("Sulfuras, Hand of Ragnaros", 0, 80), //
      new Item("Sulfuras, Hand of Ragnaros", -1, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 40),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 48),
      new Item("Backstage passes to a TAFKAL80ETC concert", -1, 48),
      // this conjured item does not work properly yet
      new Item("Conjured Mana Cake", 3, 6)
    ];
    gildedRose = new GildedRose(items);
    gildedRose.updateQuality();
  });

  it("should reduce Quality and SellIn for standard items", () => {
    expect(gildedRose.items[0].sellIn).to.equal(9);
    expect(gildedRose.items[0].quality).to.equal(19);
  });

  it("should increase the quality of Aged Brie", () => {
    expect(gildedRose.items[1].quality).to.equal(1);
  });

  it("should leave Sulfuras with no change in quality", () => {
    expect(gildedRose.items[3].quality).to.equal(80);
  });

  it("should increase the quality by 2 for tickets with 10 days left", () => {
    expect(gildedRose.items[6].quality).to.equal(42);
  });

  it("should increase the quality by 3 for tickets with 5 days", () => {
    expect(gildedRose.items[7].quality).to.equal(50);
  });

  it("should set the quality to 0 for tickets past sale", () => {
    expect(gildedRose.items[8].quality).to.equal(0);
  });

  it("should decrease the quality twice as fast for conjured items", () => {
    expect(gildedRose.items[9].quality).to.equal(4);
  });
});

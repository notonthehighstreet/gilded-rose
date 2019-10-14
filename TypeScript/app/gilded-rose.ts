export class Item {
  name: string;
  sellIn: number;
  quality: number;

  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

export class GildedRose {
  items: Array<Item>;

  constructor(items = [] as Array<Item>) {
    this.items = items;
  }

  updateQuality() {
    // Iterate through items, update Quality and SellIn values
    const updatedItems = this.items.map(item => {
      switch (item.name) {
        case "Aged Brie": {
          item.quality += 1;
          break;
        }
        case "Backstage passes to a TAFKAL80ETC concert": {
          if (item.sellIn <= 10 && item.sellIn > 5) {
            item.quality += 2;
          } else if (item.sellIn <= 5 && item.sellIn > 0) {
            item.quality += 3;
          } else if (item.sellIn < 0) {
            item.quality = 0;
          } else {
            item.quality += 1;
          }
          break;
        }
        case "Sulfuras, Hand of Ragnaros": {
          item.quality = 80;
          break;
        }
        default: {
          // TODO - Add variation for "Conjured" items
          if (item.quality > 0) {
            if (item.sellIn < 0) {
              // Past sell by date, item decreases twice as fast
              item.quality -= 2;
            } else {
              // Not past sell by date, default quality reduction
              item.quality -= 1;
            }
          }
        }
      }

      // Reset quality to max limit if it has gone over
      if (item.name !== "Sulfuras, Hand of Ragnaros" && item.quality > 50) {
        item.quality = 50;
      }

      // Reset quality to min limit if it has gone under
      if (item.quality < 0) {
        item.quality = 0;
      }

      item.sellIn -= 1;

      return item;
    });

    return updatedItems;
  }
}

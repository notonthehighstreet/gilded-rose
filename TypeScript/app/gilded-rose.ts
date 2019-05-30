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
        for (let i = 0; i < this.items.length; i++) {
            switch (this.items[i].name) {
                case 'Aged Brie':
                    if (this.items[i].sellIn <= 0) {
                        this.items[i].quality = Math.min(this.items[i].quality + 2, 50);
                    } else {
                        this.items[i].quality = Math.min(this.items[i].quality + 1, 50);
                    }
                    this.items[i].sellIn = this.items[i].sellIn - 1;
                    continue;
                break;
                case 'Sulfuras, Hand of Ragnaros':
                    // no change to quality or sellIn
                    continue;
                break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    if (this.items[i].sellIn > 10) {
                        this.items[i].quality = Math.min(this.items[i].quality + 1, 50);
                    } else if (this.items[i].sellIn > 5) {
                        this.items[i].quality = Math.min(this.items[i].quality + 2, 50);
                    } else if (this.items[i].sellIn > 0) {
                        this.items[i].quality = Math.min(this.items[i].quality + 3, 50);
                    } else {
                        this.items[i].quality = 0;
                    }
                    this.items[i].sellIn = this.items[i].sellIn - 1;
                    continue;
                break;
                default:
                    if (this.items[i].sellIn > 0) {
                        this.items[i].quality = Math.max(this.items[i].quality - 1, 0);
                    } else {
                        this.items[i].quality = Math.max(this.items[i].quality - 2, 0);
                    }
                    this.items[i].sellIn = this.items[i].sellIn - 1;
                    continue;
                break;
            }
        }

        return this.items;
    }
}

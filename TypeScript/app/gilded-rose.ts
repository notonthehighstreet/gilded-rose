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
                    if (isExpired(this.items[i])) {
                       increaseItemQuality(this.items[i], 2);
                    } else {
                       increaseItemQuality(this.items[i], 1);
                    }
                    ageItem(this.items[i]);
                break;
                case 'Sulfuras, Hand of Ragnaros':
                    // no change to quality or sellIn
                break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    if (this.items[i].sellIn > 10) {
                       increaseItemQuality(this.items[i], 1);
                    } else if (this.items[i].sellIn > 5) {
                       increaseItemQuality(this.items[i], 2);
                    } else if (this.items[i].sellIn > 0) {
                       increaseItemQuality(this.items[i], 3);
                    } else {
                        this.items[i].quality = 0;
                    }
                    ageItem(this.items[i]);
                break;
                default:
                    if (isExpired(this.items[i])) {
                        decreaseItemQuality(this.items[i], 2);
                    } else {
                        decreaseItemQuality(this.items[i], 1);
                    }
                    ageItem(this.items[i]);
                break;
            }
        }

        return this.items;
    }
}

function increaseItemQuality(item, amount) {
    item.quality = Math.min(item.quality + amount, 50);
}

function decreaseItemQuality(item, amount) {
    item.quality = Math.max(item.quality - amount, 0);
}

function ageItem(item) {
    item.sellIn = item.sellIn - 1;
}

function isExpired(item) {
    return item.sellIn <= 0;
}
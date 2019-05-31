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
            const item = this.items[i];
            switch (item.name) {
                case 'Aged Brie':
                    if (isExpired(item)) {
                       increaseItemQuality(item, 2);
                    } else {
                       increaseItemQuality(item, 1);
                    }
                    ageItem(item);
                break;
                case 'Sulfuras, Hand of Ragnaros':
                    // no change to quality or sellIn
                break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    if (item.sellIn > 10) {
                       increaseItemQuality(item, 1);
                    } else if (item.sellIn > 5) {
                       increaseItemQuality(item, 2);
                    } else if (item.sellIn > 0) {
                       increaseItemQuality(item, 3);
                    } else {
                        item.quality = 0;
                    }
                    ageItem(item);
                break;
                default:
                    if (isExpired(item)) {
                        isConjured(item) ? decreaseItemQuality(item, 4) : decreaseItemQuality(item, 2);
                    } else {
                        isConjured(item) ? decreaseItemQuality(item, 2) : decreaseItemQuality(item, 1);
                    }
                    ageItem(item);
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

function isConjured(item) {
    return item.name.indexOf('Conjured ') === 0;
}
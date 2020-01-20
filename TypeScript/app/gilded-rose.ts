import { getItemUpdater } from './itemUpdaters';

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

    updateQuality(): Array<Item> {
        for (let i = 0; i < this.items.length; i++) {
            const itemUpdater = getItemUpdater(this.items[i]);
            itemUpdater.adjustQuality();
            itemUpdater.adjustSetIn();
        }
        return this.items;
    }
}

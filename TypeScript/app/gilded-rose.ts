export enum ItemTypes {
    AGED_BRIE = 'Aged Brie',
    SULFURAS = 'Sulfuras, Hand of Ragnaros',
    BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
    NORMAL_ITEM = 'normal item'
}

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

interface ItemUpdater {
    adjustSetIn: () => void;
}

class DefaultItemUpdater implements ItemUpdater {

    protected readonly item;

    constructor(item: Item) {
        this.item = item;
    }
    
    adjustSetIn(): void {
        this.item.sellIn --;
    }

}

class SulfurasItemUpdater extends DefaultItemUpdater {
    adjustSetIn(): void {
       return;
    }
}


const ItemUpdaterMap = {
    [ItemTypes.SULFURAS]: SulfurasItemUpdater,
}

function getItemUpdater(item: Item): ItemUpdater {
    const Updater = ItemUpdaterMap[item.name] || DefaultItemUpdater;
    return new Updater(item);
}

export class GildedRose {
    items: Array<Item>;

    constructor(items = [] as Array<Item>) {
        this.items = items;
    }

    updateQuality(): Array<Item> {
        for (let i = 0; i < this.items.length; i++) {
            const itemUpdater = getItemUpdater(this.items[i]);
            if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                if (this.items[i].quality > 0) {
                    if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                        this.items[i].quality = this.items[i].quality - 1
                    }
                }
            } else {
                if (this.items[i].quality < 50) {
                    this.items[i].quality = this.items[i].quality + 1
                    if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].sellIn < 11) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                        if (this.items[i].sellIn < 6) {
                            if (this.items[i].quality < 50) {
                                this.items[i].quality = this.items[i].quality + 1
                            }
                        }
                    }
                }
            }
            itemUpdater.adjustSetIn();
            if (this.items[i].sellIn < 0) {
                if (this.items[i].name != 'Aged Brie') {
                    if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
                        if (this.items[i].quality > 0) {
                            if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                                this.items[i].quality = this.items[i].quality - 1
                            }
                        }
                    } else {
                        this.items[i].quality = this.items[i].quality - this.items[i].quality
                    }
                } else {
                    if (this.items[i].quality < 50) {
                        this.items[i].quality = this.items[i].quality + 1
                    }
                }
            }
        }

        return this.items;
    }
}

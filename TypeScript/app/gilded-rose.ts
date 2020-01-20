import { 
    AgedBrieItemUpdater,
    BackStagePassItemUpdater,
    SulfurasItemUpdater,
    ConjuredItemUpdater,
    DefaultItemUpdater,
    ItemUpdater
} from './itemUpdaters';

export enum ItemTypes {
    AGED_BRIE = 'Aged Brie',
    SULFURAS = 'Sulfuras, Hand of Ragnaros',
    BACKSTAGE_PASSES = 'Backstage passes to a TAFKAL80ETC concert',
    CONJURED_ITEM = 'Conjured Item',
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

const ItemUpdaterMap = {
    [ItemTypes.SULFURAS]: SulfurasItemUpdater,
    [ItemTypes.AGED_BRIE]: AgedBrieItemUpdater,
    [ItemTypes.BACKSTAGE_PASSES]: BackStagePassItemUpdater,
    [ItemTypes.CONJURED_ITEM]: ConjuredItemUpdater
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
            itemUpdater.adjustQuality();
            itemUpdater.adjustSetIn();
        }
        return this.items;
    }
}

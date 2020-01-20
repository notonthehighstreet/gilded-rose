import { Item } from '../gilded-rose';

export interface ItemUpdaterConstructor {
    new (item: Item): ItemUpdaterInterface;
}
export interface ItemUpdaterInterface {
    updateItem: () => Item;
}

export default class DefaultItemUpdater implements ItemUpdaterInterface {

    private readonly item: Item;
    private readonly minQualityThreshold = 0;
    private readonly maxQualityThreshold = 50;

    constructor(item: Item) {
        this.item = item;
    }

    private canQualityBeAdjusted(item: Item): boolean {
        const { quality } = item;
        return quality > this.minQualityThreshold &&
        quality < this.maxQualityThreshold;
    }
    
    protected getQualityDifference(item: Item): number {
        return item.sellIn > 0 ? -1 : -2;
    }
    
    protected adjustSetIn(item: Item): Item {
        return {...item, sellIn: item.sellIn - 1};
    }

    protected adjustQuality(item: Item): Item {
        if(!this.canQualityBeAdjusted(item)) {
            return item;
        }
        const updatedQuality = item.quality + this.getQualityDifference(item);
        return {...item, quality: updatedQuality }
    }

    updateItem(): Item {
        return this.adjustQuality(this.adjustSetIn(this.item));
    }
 
}
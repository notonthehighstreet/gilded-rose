import { Item } from '../gilded-rose';

export interface ItemUpdater {
    updateItem: () => Item;
}

export default class DefaultItemUpdater implements ItemUpdater {

    private readonly item: Item;
    private readonly minQualityThreshold = 0;
    private readonly maxQualityThreshold = 50;

    constructor(item: Item) {
        this.item = item;
    }
    
    protected getQualityDifference(item: Item): number {
        return item.sellIn > 0 ? -1 : -2;
    }
    
    protected adjustSetIn(item: Item): Item {
        return {...item, sellIn: item.sellIn - 1};
    }

    protected adjustQuality(item: Item): Item {
        const { quality } = item;
        if(quality > this.minQualityThreshold && quality < this.maxQualityThreshold) {
            const updatedQuality = quality + this.getQualityDifference(item);
            return {...item, quality: updatedQuality }
        }
        return item;
    }

    updateItem(): Item {
        return this.adjustQuality(this.adjustSetIn(this.item));
    }
 
}
import { Item } from '../gilded-rose';

export interface ItemUpdater {
    adjustSetIn: () => Item;
    adjustQuality: () => Item;
}

export default class DefaultItemUpdater implements ItemUpdater {

    protected readonly item;
    private readonly minQualityThreshold = 0;
    private readonly maxQualityThreshold = 50;

    constructor(item: Item) {
        this.item = item;
    }
    
    protected getValuationChangeRate(): number {
        return this.item.sellIn > 0 ? -1 : -2;
    }
    
    adjustSetIn(): Item {
        this.item.sellIn --;
        return this.item;
    }

    adjustQuality(): Item {
        const { quality } = this.item;
        if(quality > this.minQualityThreshold && quality < this.maxQualityThreshold) {
            this.item.quality += this.getValuationChangeRate();
        }
        return this.item;
    }
 
}
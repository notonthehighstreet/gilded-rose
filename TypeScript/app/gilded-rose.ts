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

    updateBrie(brie: Item) {
        brie.sellIn -= 1;
        if(brie.quality < 50) {
            let qualityAdjustment = 1;
            if(brie.sellIn < 0) {
                qualityAdjustment = 2;
            }
            brie.quality += qualityAdjustment;
            if(brie.quality > 50) {
                brie.quality = 50;
            }
        }
        return brie;
    };

    updateStandardItem(item: Item) {
        item.sellIn -= 1;
        if(item.quality > 0) {
            let qualityAdjustment = 1;
            if(item.sellIn < 0) {
                qualityAdjustment = 2;
            }
            item.quality -= qualityAdjustment;
            if(item.quality < 0) {
                item.quality = 0;
            }
        }
        return item;
    };

    updateLegendaryItem(legendaryItem: Item) {
        return legendaryItem;
    };

    updateBackstagePass(backstagePass: Item) {
        if(backstagePass.sellIn > 0) {
            if(backstagePass.quality < 50) {
                let qualityAdjustment = 1;
                if(backstagePass.sellIn <= 5) {
                    qualityAdjustment = 3;
                } else if(backstagePass.sellIn <= 10) {
                    qualityAdjustment =  2;
                }
                backstagePass.quality += qualityAdjustment;

                if(backstagePass.quality > 50) {
                    backstagePass.quality = 50;
                }
            }
        } else {
            backstagePass.quality = 0;
        }
        backstagePass.sellIn -= 1;
        return backstagePass;
    };

    updateConjuredItem(conjuredItem: Item) {
        conjuredItem.sellIn -= 1;
        conjuredItem.quality -= 2;

        if(conjuredItem.quality < 0) {
            conjuredItem.quality = 0;
        }
    };

    updateQuality() {
        this.items.forEach((item: Item) => {
            switch(item.name) {
                case 'Aged Brie': 
                    this.updateBrie(item);
                    break;
                case 'Sulfuras, Hand of Ragnaros':
                    this.updateLegendaryItem(item);
                    break;
                case 'Backstage passes to a TAFKAL80ETC concert':
                    this.updateBackstagePass(item);
                    break;
                case 'Conjured Mana Cake':
                    this.updateConjuredItem(item);
                    break;
                default:
                    this.updateStandardItem(item);
            }
        });
        return this.items;
    }
}

package com.gildedrose;

import com.gildedrose.strategy.BaseItemStrategy;
import com.gildedrose.strategy.GenericItemStrategy;

class GildedRose {
    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        BaseItemStrategy strategy = null;
        for (Item item : items) {
            if (item.name.equals("Aged Brie")) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;
                }
                item.sellIn = item.sellIn - 1;

                if (item.sellIn < 0) {
                    if (item.quality < 50) {
                        item.quality = item.quality + 1;
                    }
                }
            } else if (item.name.equals("Backstage passes to a TAFKAL80ETC concert")) {
                if (item.quality < 50) {
                    item.quality = item.quality + 1;

                    if (item.sellIn < 11) {
                        if (item.quality < 50) {
                            item.quality = item.quality + 1;
                        }
                    }

                    if (item.sellIn < 6) {
                        if (item.quality < 50) {
                            item.quality = item.quality + 1;
                        }
                    }
                }
                item.sellIn = item.sellIn - 1;

                if (item.sellIn < 0) {
                    item.quality = 0;
                }
            } else if (item.name.equals("Sulfuras, Hand of Ragnaros")) {
                //Ignore

            } else if (item.name.startsWith("Conjured")) {
                if (item.quality > 0) {
                    item.quality = item.quality - 1;
                    if (item.quality > 0) {
                        item.quality = item.quality - 1;
                    }
                }
                item.sellIn = item.sellIn - 1;

                if (item.sellIn < 0) {
                    if (item.quality > 0) {
                        item.quality = item.quality - 1;
                        if (item.quality > 0) {
                            item.quality = item.quality - 1;
                        }
                    }
                }
            } else {
                strategy = new GenericItemStrategy();
            }

            if(strategy != null) {
                strategy.updateItem(item);
            }
        }
    }
}
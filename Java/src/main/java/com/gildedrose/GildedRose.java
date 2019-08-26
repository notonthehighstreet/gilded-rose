package com.gildedrose;

import com.gildedrose.domain.factory.ItemStrategyFactory;
import com.gildedrose.domain.factory.strategy.BaseItemStrategy;

class GildedRose {
    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        for (Item item : items) {
            BaseItemStrategy strategy = ItemStrategyFactory.getItemStrategy(item);
            strategy.updateItem(item);
        }
    }
}
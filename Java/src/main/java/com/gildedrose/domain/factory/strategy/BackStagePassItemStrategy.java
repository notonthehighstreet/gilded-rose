package com.gildedrose.domain.factory.strategy;

import com.gildedrose.Item;

public class BackStagePassItemStrategy extends BaseItemStrategy {

    @Override
    int getQualityChange(Item item) {
        if (item.sellIn < 0) {
            return -item.quality;
        } else if (item.sellIn < 6) {
            return 3;
        } else if (item.sellIn < 11) {
            return 2;
        } else {
            return 1;
        }
    }
}

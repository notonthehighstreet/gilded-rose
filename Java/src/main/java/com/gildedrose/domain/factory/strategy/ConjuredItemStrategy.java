package com.gildedrose.domain.factory.strategy;

import com.gildedrose.Item;

public class ConjuredItemStrategy extends BaseItemStrategy {
    @Override
    int getQualityChange(Item item) {
        if (item.sellIn < 1) {
            return -4;
        }
        return -2;
    }
}

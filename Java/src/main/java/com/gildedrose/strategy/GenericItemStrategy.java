package com.gildedrose.strategy;

import com.gildedrose.Item;

public class GenericItemStrategy extends BaseItemStrategy {

    @Override
    int getQualityChange(Item item) {
        if(item.sellIn < 1) {
            return -2;
        }
        return -1;
    }
}

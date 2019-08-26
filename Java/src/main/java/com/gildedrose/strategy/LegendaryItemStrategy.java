package com.gildedrose.strategy;

import com.gildedrose.Item;

public class LegendaryItemStrategy extends BaseItemStrategy {

    private static final int MINIMUM_QUALITY = 80;
    private static final int MAXIMUM_QUALITY = 80;

    @Override
    int getQualityChange(Item item) {
        return 0;
    }

    @Override
    int getSellInChange(Item item) {
        return 0;
    }

    @Override
    int getMinimumQuality() {
        return MINIMUM_QUALITY;
    }

    @Override
    int getMaximumQuality() {
        return MAXIMUM_QUALITY;
    }
}

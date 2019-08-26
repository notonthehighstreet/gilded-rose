package com.gildedrose.strategy;

import com.gildedrose.Item;

public abstract class BaseItemStrategy {

    private static final int DEFAULT_SELL_IN_CHANGE = -1;
    private static final int MINIMUM_QUALITY = 0;
    private static final int MAXIMUM_QUALITY = 50;

    final public void updateItem(Item item) {
        item.sellIn = item.sellIn + getSellInChange(item);
        int tempQuality = item.quality + getQualityChange(item);
        //Gate quality value between min and max values
        if(tempQuality < getMinimumQuality()) {
            tempQuality = getMinimumQuality();
        } else if(tempQuality > getMaximumQuality()) {
            tempQuality = getMaximumQuality();
        }
        item.quality = tempQuality;
    }

    int getSellInChange(Item item) {
        return DEFAULT_SELL_IN_CHANGE;
    }

    int getMinimumQuality() {
        return MINIMUM_QUALITY;
    }

    int getMaximumQuality() {
        return MAXIMUM_QUALITY;
    }

    abstract int getQualityChange(Item item);
}

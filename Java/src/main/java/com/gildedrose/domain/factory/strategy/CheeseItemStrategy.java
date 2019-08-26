package com.gildedrose.domain.factory.strategy;

import com.gildedrose.Item;

public class CheeseItemStrategy extends BaseItemStrategy {


    //Note to interviewer:
    //This logic confuses me, as the problem statement reads:
    //"Once the sell by date has passed, Quality degrades twice as fast"
    //but cheese does not degrade?
    @Override
    int getQualityChange(Item item) {
        if (item.sellIn < 1) {
            return 2;
        }
        return 1;
    }
}

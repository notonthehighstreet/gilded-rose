package com.gildedrose.domain.factory;

import com.gildedrose.Item;
import com.gildedrose.domain.factory.strategy.*;

/**
 * Factory to get an implementation of BaseItemStrategy based on an Item
 * NOTE: we could added caching here if the requirement were ever added
 * NOTE: use of static here for development speed purposes, in a real world app, I would have used an instance to ease testing
 * (ie inject a different factory for tests - make this one implement an interface)
 */
public class ItemStrategyFactory {

    private static final String CHEESE_NAME = "Aged Brie";
    private static final String BACKSTAGE_PASS_NAME = "Backstage passes to a TAFKAL80ETC concert";
    private static final String LEGENDARY_NAME = "Sulfuras, Hand of Ragnaros";
    private static final String CONJURED_PREFIX_NAME = "Conjured";

    public static BaseItemStrategy getItemStrategy(Item item) {
        if (item == null) {
            throw new IllegalArgumentException("item can no be null");
        }
        BaseItemStrategy strategy;
        if (CHEESE_NAME.equals(item.name)) {
            strategy = new CheeseItemStrategy();
        } else if (BACKSTAGE_PASS_NAME.equals(item.name)) {
            strategy = new BackStagePassItemStrategy();
        } else if (LEGENDARY_NAME.equals(item.name)) {
            ///Note to interviewer:
            //Used startsWith as it's not clear if any item can be conjured
            //Based on other logic provided as valid state, I assume not, but will begin to cater for it here
            //since the problem statement reads "Conjured" but the TexttestFixture.class reads "Conjured Mana Cake"
            strategy = new LegendaryItemStrategy();
        } else if (item.name != null && item.name.startsWith(CONJURED_PREFIX_NAME)) {
            strategy = new ConjuredItemStrategy();
        } else {
            strategy = new GenericItemStrategy();
        }
        return strategy;
    }
}

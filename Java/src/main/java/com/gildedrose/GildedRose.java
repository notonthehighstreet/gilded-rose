package com.gildedrose;

import com.gildedrose.strategy.*;

class GildedRose {
    Item[] items;

    public GildedRose(Item[] items) {
        this.items = items;
    }

    public void updateQuality() {
        BaseItemStrategy strategy = null;
        for (Item item : items) {
            if (item.name.equals("Aged Brie")) {
                strategy = new CheeseItemStrategy();
            } else if (item.name.equals("Backstage passes to a TAFKAL80ETC concert")) {
                strategy = new BackStagePassItemStrategy();
            } else if (item.name.equals("Sulfuras, Hand of Ragnaros")) {
                ///Note to interviewer:
                //Used startsWith as it's not clear if any item can be conjured
                //Based on other logic provided as valid state, I assume not, but will begin to cater for it here
                //since the problem statement reads "Conjured" but the TexttestFixture.class reads "Conjured Mana Cake"
                strategy = new LegendaryItemStrategy();
            } else if (item.name.startsWith("Conjured")) {
                strategy = new ConjuredItemStrategy();
            } else {
                strategy = new GenericItemStrategy();
            }
            strategy.updateItem(item);
        }
    }
}
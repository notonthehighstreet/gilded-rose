package com.gildedrose.domain.factory;

import com.gildedrose.Item;
import com.gildedrose.domain.factory.strategy.*;
import org.junit.Test;

import static com.google.common.truth.Truth.assertThat;


public class ItemStrategyFactoryTest {

    @Test(expected = IllegalArgumentException.class)
    public void getItemStrategy_For_Null_Item() {
        ItemStrategyFactory.getItemStrategy(null);
    }

    @Test
    public void getItemStrategy_For_Cheese() {
        Item item = new Item("Aged Brie", 2, 0);
        BaseItemStrategy itemStrategy = ItemStrategyFactory.getItemStrategy(item);
        assertThat(itemStrategy).isInstanceOf(CheeseItemStrategy.class);
    }

    @Test
    public void getItemStrategy_For_BackstagePass() {
        Item item = new Item("Backstage passes to a TAFKAL80ETC concert", 2, 0);
        BaseItemStrategy itemStrategy = ItemStrategyFactory.getItemStrategy(item);
        assertThat(itemStrategy).isInstanceOf(BackStagePassItemStrategy.class);
    }

    @Test
    public void getItemStrategy_For_Legendary() {
        Item item = new Item("Sulfuras, Hand of Ragnaros", 2, 0);
        BaseItemStrategy itemStrategy = ItemStrategyFactory.getItemStrategy(item);
        assertThat(itemStrategy).isInstanceOf(LegendaryItemStrategy.class);
    }

    @Test
    public void getItemStrategy_For_Conjured() {
        Item item = new Item("Conjured", 2, 0);
        BaseItemStrategy itemStrategy = ItemStrategyFactory.getItemStrategy(item);
        assertThat(itemStrategy).isInstanceOf(ConjuredItemStrategy.class);
    }
    @Test
    public void getItemStrategy_For_Generic() {
        Item item = new Item("+5 Dexterity Vest", 2, 0);
        BaseItemStrategy itemStrategy = ItemStrategyFactory.getItemStrategy(item);
        assertThat(itemStrategy).isInstanceOf(GenericItemStrategy.class);
    }


}
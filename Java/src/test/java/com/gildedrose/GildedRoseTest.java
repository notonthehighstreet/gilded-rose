package com.gildedrose;

import org.junit.Test;

import static com.google.common.truth.Truth.assertThat;

public class GildedRoseTest {

    //NOTE: Outside of a interview test environment, I would delete this test as,
    //static item order is not enforced in the problem statement
    @Test
    public void testItemPositionUnmodified() {
        Item item_1 = new Item("item_1", 0, 0);
        Item item_2 = new Item("item_2", 0, 0);
        Item item_3 = new Item("item_3", 0, 0);
        Item[] items = new Item[]{item_1, item_2, item_3};
        GildedRose app = new GildedRose(items);
        app.updateQuality();
        assertThat(item_1.name).isEqualTo(app.items[0].name);
    }

}

package com.gildedrose;

import org.junit.Test;
import org.junit.experimental.runners.Enclosed;
import org.junit.runner.RunWith;

import static com.google.common.truth.Truth.assertThat;
import static com.google.common.truth.Truth.assertWithMessage;

@RunWith(Enclosed.class)
public class GildedRoseTest {

    private enum ITEM_EXPIRE_BENCHMARKS {
        HIGH_EXPIRE(20),
        MEDIUM_EXPIRE(10),
        LOW_EXPIRE(5),
        EXPIRED(0);

        private final int days;

        ITEM_EXPIRE_BENCHMARKS(int days) {

            this.days = days;
        }
    }

    private static Item createItem(String itemName, ITEM_EXPIRE_BENCHMARKS expire_benchmark, int quality) {
        return new Item(itemName, expire_benchmark.days, quality);
    }

    /**
     * Tests on the item list itself as well as tests unrelated to item type
     */
    public static class Items_List {
        //NOTE: Outside of a interview test environment, I would delete this test as,
        //static item order is not enforced in the problem statement
        @Test
        public void item_Position_Unmodified() {
            Item item_1 = new Item("item_1", 0, 0);
            Item item_2 = new Item("item_2", 0, 0);
            Item item_3 = new Item("item_3", 0, 0);
            Item[] items = new Item[]{item_1, item_2, item_3};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertThat(item_1.name).isEqualTo(app.items[0].name);
        }

        @Test
        public void item_name_Unmodified() {
            String item_1Name = "item_1";
            Item item_1 = new Item(item_1Name, 0, 0);
            Item item_2 = new Item("item_2", 0, 0);
            Item item_3 = new Item("item_3", 0, 0);
            Item[] items = new Item[]{item_1, item_2, item_3};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertThat(item_1Name).isEqualTo(app.items[0].name);
        }

    }

    /**
     * Generic item (items without any unique characteristics) tests
     */
    public static class Item_Generic {

        private static final String ITEM_NAME = "+5 Dexterity Vest";

        private Item createItem(ITEM_EXPIRE_BENCHMARKS expire_benchmark, int quality) {
            return GildedRoseTest.createItem(ITEM_NAME, expire_benchmark, quality);
        }

        @Test
        public void high_Expire() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.HIGH_EXPIRE, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.HIGH_EXPIRE.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(quality - 1);
        }

        @Test
        public void medium_Expire() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.MEDIUM_EXPIRE, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.MEDIUM_EXPIRE.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(quality - 1);
        }

        @Test
        public void low_Expire() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.LOW_EXPIRE, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.LOW_EXPIRE.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(quality - 1);
        }


        @Test
        public void expired() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.EXPIRED, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.EXPIRED.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(0);
        }

    }

    /**
     * Appreciating in value item(cheese) tests
     */
    public static class Item_Cheese {

        private static final String ITEM_NAME = "Aged Brie";

        private Item createItem(ITEM_EXPIRE_BENCHMARKS expire_benchmark, int quality) {
            return GildedRoseTest.createItem(ITEM_NAME, expire_benchmark, quality);
        }

        @Test
        public void high_Expire() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.HIGH_EXPIRE, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.HIGH_EXPIRE.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(quality + 1);
        }

        @Test
        public void medium_Expire() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.MEDIUM_EXPIRE, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.MEDIUM_EXPIRE.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(quality + 1);
        }

        @Test
        public void low_Expire() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.LOW_EXPIRE, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.LOW_EXPIRE.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(quality + 1);
        }


        @Test
        public void expired() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.EXPIRED, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.EXPIRED.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(quality + 2);
        }

    }

    /**
     * Appreciating in value item(backstage passes) tests
     */
    public static class Item_Backstage_Passes {

        private static final String ITEM_NAME = "Backstage passes to a TAFKAL80ETC concert";

        private Item createItem(ITEM_EXPIRE_BENCHMARKS expire_benchmark, int quality) {
            return GildedRoseTest.createItem(ITEM_NAME, expire_benchmark, quality);
        }

        @Test
        public void high_Expire() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.HIGH_EXPIRE, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.HIGH_EXPIRE.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(quality + 1);
        }

        @Test
        public void medium_Expire() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.MEDIUM_EXPIRE, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.MEDIUM_EXPIRE.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(quality + 2);
        }

        @Test
        public void low_Expire() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.LOW_EXPIRE, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.LOW_EXPIRE.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(quality + 3);
        }


        @Test
        public void expired() {
            int quality = 1;
            Item newItem = createItem(ITEM_EXPIRE_BENCHMARKS.EXPIRED, quality);
            Item[] items = new Item[]{newItem};
            GildedRose app = new GildedRose(items);
            app.updateQuality();
            assertWithMessage("Sellin").that(newItem.sellIn).isEqualTo(ITEM_EXPIRE_BENCHMARKS.EXPIRED.days - 1);
            assertWithMessage("Quality").that(newItem.quality).isEqualTo(0);
        }

    }


}

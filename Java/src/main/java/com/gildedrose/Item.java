package com.gildedrose;

import java.util.function.Function;

public class Item {

    public String name;

    public int sellIn;

    public int quality;

    public Function<Item, Item> stateFunction;
    /**
     Same here we gonna pass the state function as an input to the constructor
     this is the beauty of Java 8 functional programming
     */
    public Item(String name, int sellIn, int quality, Function<Item, Item> stateFunc) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
        this.stateFunction = stateFunc;
    }

   @Override
   public String toString() {
        return this.name + ", " + this.sellIn + ", " + this.quality;
    }

    /**
     Update the quality of its own by using stateFunction
     */
    public void updateQuality() {
        Item updatedItem = stateFunction.apply(this);
        this.sellIn = updatedItem.sellIn;
        this.quality = updatedItem.quality;
    }
}

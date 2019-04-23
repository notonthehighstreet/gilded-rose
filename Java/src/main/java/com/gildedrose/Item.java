package com.gildedrose;

public class Item {

    public String name;

    public int sellIn;

    public int quality;

    public Function stateFunction;
    /**
    Same here we gonna pass the state function as an input to the constructor
     */
    public Item(String name, int sellIn, int quality, Function<Item, String> stateFunc) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
        this.stateFunction = stateFunc;
    }

   @Override
   public String toString() {
        return this.name + ", " + this.sellIn + ", " + this.quality;
    }

    public void updateQuality() {
        
    }
}

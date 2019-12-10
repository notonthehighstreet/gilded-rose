import Foundation

public class GildedRose {
    var items:[Item]
    
    required public init(items:[Item]) {
        self.items = items
    }
    
    public func updateQuality() {
        
        for i in 0..<items.count {
            if (items[i].name != "Aged Brie" && items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
                if (items[i].quality > 0) {
                    if (items[i].name != "Sulfuras, Hand of Ragnaros") {
                        // "Conjured" items degrade in Quality twice as fast as normal items
                        if(items[i].name.lowercased().contains("conjured")) {
                            // [Rupali]: This is first way of checking the quantity for 'Conjured Mana Cake'
                            items[i].quality = items[i].quality > 1 ? items[i].quality - 2 : 0
                        } else {
                            items[i].quality = items[i].quality - 1
                        }
                    }
                }
            } else {
                // The Quality of an item is never more than 50
                if (items[i].quality < 50) {
                    items[i].quality = items[i].quality + 1
                    
                    // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches;
                    if (items[i].name == "Backstage passes to a TAFKAL80ETC concert") {
                        // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less but
                        if (items[i].sellIn < 11) {
                            if (items[i].quality < 50) {
                                items[i].quality = items[i].quality + 1
                            }
                        }
                        
                        if (items[i].sellIn < 6) {
                            if (items[i].quality < 50) {
                                items[i].quality = items[i].quality + 1
                            }
                        }
                    }
                }
            }
            
            // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
            if (items[i].name != "Sulfuras, Hand of Ragnaros") {
                items[i].sellIn = items[i].sellIn - 1
            }
            
            if (items[i].sellIn < 0) {
                if (items[i].name != "Aged Brie") {
                    if (items[i].name != "Backstage passes to a TAFKAL80ETC concert") {
                        // The Quality of an item is never negative
                        if (items[i].quality > 0) {
                            if (items[i].name != "Sulfuras, Hand of Ragnaros") {
                                items[i].quality = items[i].quality - 1
                                // "Conjured" items degrade in Quality twice as fast as normal items
                                // [Rupali]: This is second way of checking the quantity for 'Conjured Mana Cake'
                                if (items[i].name.lowercased().contains("conjured") && items[i].quality > 0) {
                                    items[i].quality = items[i].quality - 1
                                }
                            }
                        }
                    } else {
                        // Quality drops to zero after the conccert. backstage passes to concert
                        items[i].quality = items[i].quality - items[i].quality
                    }
                } else {
                    // "Aged Brie" actually increases in Quality the older it gets
                    if (items[i].quality < 50) {
                        items[i].quality = items[i].quality + 1
                    }
                }
            }
        }
    }
}

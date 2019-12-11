
public class GildedRose {
    var items:[Item]
    
    required public init(items:[Item]) {
        self.items = items
    }
    
    public func updateQuality() {
        for i in 0..<items.count {
            // "Sulfuras", being a legendary item, never has to be sold or decreases in Quality
            if items[i].name == "Sulfuras, Hand of Ragnaros" {
                continue
            }
            
            items[i].sellIn = items[i].sellIn - 1
            
            switch items[i].name {
            case "Aged Brie":
                items[i].quality = items[i].quality < 50 ? items[i].quality + 1 : items[i].quality
                if items[i].sellIn < 0 {
                    // "Aged Brie" actually increases in Quality the older it gets
                    items[i].quality = items[i].quality < 50 ? items[i].quality + 1 : items[i].quality
                }
                break
                
            case "Backstage passes to a TAFKAL80ETC concert":
                // "Backstage passes", like aged brie, increases in Quality as its SellIn value approaches
                if items[i].sellIn >= 0 {
                    items[i].quality = items[i].quality < 50 ? items[i].quality + 1 : items[i].quality
                    // Quality increases by 2 when there are 10 days or less and by 3 when there are 5 days or less
                    items[i].quality = (items[i].quality < 50 && items[i].sellIn < 10) ? items[i].quality + 1 : items[i].quality
                    items[i].quality = (items[i].quality < 50 && items[i].sellIn < 5) ? items[i].quality + 1 : items[i].quality
                } else {
                    // Quality drops to zero after the conccert
                    items[i].quality = 0
                }
                break
                
            case "Conjured Mana Cake":
                // "Conjured" items degrade in Quality twice as fast as normal items
                items[i].quality = items[i].quality > 1 ? items[i].quality - 2 : 0
                if items[i].sellIn < 0 {
                    items[i].quality = items[i].quality > 1 ? items[i].quality - 2 : 0
                }
                break
                
            default:
                items[i].quality = items[i].quality > 0 ? items[i].quality - 1 : 0
                // Once the sell by date has passed, Quality degrades twice as fast
                if items[i].sellIn < 0 {
                    // The Quality of an item is never negative
                    items[i].quality = items[i].quality > 0 ? items[i].quality - 1 : 0
                }
                break
            }
        }
    }
}

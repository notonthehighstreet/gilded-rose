protocol Visitor {
    func visit(item: inout Item)
}

extension Item {
    struct ItemCategory {
        static var _category: Category = .NoCategory
    }
    
    var category: Category {
        get {
            return ItemCategory._category
        }
        
        set(newValue) {
            ItemCategory._category = newValue
        }
    }
}

enum Category: String {
    case AgedBrie = "Aged Brie"
    case BackstagePasses = "Backstage passes to a TAFKAL80ETC concert"
    case Sulfuras = "Sulfuras, Hand of Ragnaros"
    case Conjured = "Conjured Mana Cake"
    case NoCategory = ""
}


class CategoryVisitor: Visitor {
    func visit(item: inout Item) {
        switch item.name {
        case Category.Sulfuras.rawValue:
            item.category = .Sulfuras
        case Category.AgedBrie.rawValue:
             item.category = .AgedBrie
        case Category.BackstagePasses.rawValue:
            item.category = .BackstagePasses
        case Category.Conjured.rawValue:
            item.category = .Conjured
        default:
            item.category = .NoCategory
        }
    }
}

class QualityHandlerVisitor: Visitor {
    func visit(item: inout Item) {
        switch item.category {
        
        case .Sulfuras:
            break
        
        case .AgedBrie:
            decreaseSellIn(item: &item)
            increaseQuality(item: &item)
            
            if (item.sellIn < 0) {
                increaseQuality(item: &item)
            }

        case .BackstagePasses:
            increaseQuality(item: &item)
            
            if (item.sellIn <= 10) {
                increaseQuality(item: &item)
            }
            
            if (item.sellIn <= 5) {
                increaseQuality(item: &item)
            }
            
            if (item.sellIn < 0) {
                item.quality = 0
            }
            // It can be issue? Why in old version it decrease SellIn at end of day?
            decreaseSellIn(item: &item)
            
        case .Conjured:
            decreaseSellIn(item: &item)
            decreaseQuality(item: &item)
            decreaseQuality(item: &item)
            
        default:
            decreaseSellIn(item: &item)
            decreaseQuality(item: &item)
            
            if (item.sellIn < 0) {
                decreaseQuality(item: &item)
            }
        }
    }
    
    func decreaseSellIn(item: inout Item) {
        item.sellIn -= 1
    }
    
    func increaseQuality(item: inout Item) {
        item.quality = min(item.quality + 1, 50)
    }
    
    func decreaseQuality(item: inout Item) {
        item.quality = max(item.quality - 1, 0)
    }
}

public class GildedRose {
    var items:[Item]
    
    required public init(items:[Item]) {
        self.items = items
    }
    
    public func updateQuality() {
        let categoryVisitor = CategoryVisitor()
        let qualityHandlerVisitor = QualityHandlerVisitor()
        for var item in items {
            categoryVisitor.visit(item: &item)
            qualityHandlerVisitor.visit(item: &item)
        }
    }
}

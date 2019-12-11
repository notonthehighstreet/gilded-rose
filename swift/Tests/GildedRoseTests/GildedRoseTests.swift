import Foundation
import XCTest

@testable import GildedRose

class GildedRoseTests: XCTestCase {
    
    func testFoo() {
        let items = [Item(name: "foo", sellIn: 0, quality: 0)]
        let app = GildedRose(items: items)
        app.updateQuality()
        XCTAssertEqual("foo", app.items[0].name)
    }
    
    func testDefaultItem() {
        let items = [Item(name: "+5 Dexterity Vest", sellIn: 3, quality: 8),
                     Item(name: "Elixir of the Mongoose", sellIn: 1, quality: 10),
                     Item(name: "Elixir of the Mongoose", sellIn: 1, quality: 0),]
        
        let app = GildedRose(items: items)
        
        let days = 2
        for _ in 0..<days {
            app.updateQuality()
        }
        
        // sellIn value
        XCTAssertEqual(1, app.items[0].sellIn)
        XCTAssertEqual(-1, app.items[1].sellIn)
        XCTAssertEqual(-1, app.items[2].sellIn)

        // quality value
        XCTAssertEqual(6, app.items[0].quality)
        XCTAssertEqual(7, app.items[1].quality) //once the sell by date has passed, quality degrades twice as fast
        XCTAssertEqual(0, app.items[2].quality) //The Quality of an item is never negative
    }

    func testSulfurasItem() {
        let items = [Item(name: "Sulfuras, Hand of Ragnaros", sellIn: 1, quality: 80),
                     Item(name: "Sulfuras, Hand of Ragnaros", sellIn: -1, quality: 50)]
        
        let app = GildedRose(items: items)
        
        let days = 2
        for _ in 0..<days {
            app.updateQuality()
        }
        
        // sellIn value
        XCTAssertEqual(1, app.items[0].sellIn)  //no change in sellIn
        XCTAssertEqual(-1, app.items[1].sellIn)

        // quality value
        XCTAssertEqual(80, app.items[0].quality)    //no change in quality
        XCTAssertEqual(50, app.items[1].quality)
    }

    func testAgedBrie() {
        let items = [Item(name: "Aged Brie", sellIn: 2, quality: 0),
                     Item(name: "Aged Brie", sellIn: -1, quality: 50)]
        
        let app = GildedRose(items: items)
        
        let days = 1
        for _ in 0..<days {
            app.updateQuality()
        }
        
        // sellIn value
        XCTAssertEqual(1, app.items[0].sellIn)
        XCTAssertEqual(-2, app.items[1].sellIn)
        
        // quality value
        XCTAssertEqual(1, app.items[0].quality)     //increases in Quality the older it gets
        XCTAssertEqual(50, app.items[1].quality)    //quality of an item is never more than 50
    }
    
    func testBackstagePasses() {
        let items = [Item(name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 0, quality: 49),
                     Item(name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 15, quality: 20),
                     Item(name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 10, quality: 30),
                     Item(name: "Backstage passes to a TAFKAL80ETC concert", sellIn: 5, quality: 25)]
        
        let app = GildedRose(items: items)
        
        let days = 1
        for _ in 0..<days {
            app.updateQuality()
        }
        
        // sellIn value
        XCTAssertEqual(-1, app.items[0].sellIn)
        XCTAssertEqual(14, app.items[1].sellIn)
        XCTAssertEqual(9, app.items[2].sellIn)
        XCTAssertEqual(4, app.items[3].sellIn)
        
        // quality value
        XCTAssertEqual(0, app.items[0].quality)     //quality drops to zero after the concert
        XCTAssertEqual(21, app.items[1].quality)    //increases in Quality as its SellIn value approaches
        XCTAssertEqual(32, app.items[2].quality)    //Quality increases by 2 when there are 10 days or less
        XCTAssertEqual(28, app.items[3].quality)    //Quality increases by 3 when there are 5 days or less
    }

    
    func testConjuredItemQuality() {
        let items = [Item(name: "Conjured Mana Cake", sellIn: 4, quality: 6),
                     Item(name: "Conjured Mana Cake", sellIn: 2, quality: 10)]
        let app = GildedRose(items: items)
        
        let days = 3
        for _ in 0..<days {
            app.updateQuality()
        }
        
        XCTAssertEqual(0, app.items[0].quality) //Before sellIn - degrade in Quality twice as fast as normal items
        XCTAssertEqual(2, app.items[1].quality) //After sellIn - degrade in Quality twice as fast as normal items
    }

}

#if os(Linux)
extension GildedRoseTests {
    static var allTests : [(String, (GildedRoseTests) -> () throws -> Void)] {
        return [
            ("testFoo", testFoo),
        ]
    }    
}
#endif

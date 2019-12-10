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
    
    func testConjuredItemQualityBeforeSellIn() {
        let days = 1
        let items = [Item(name: "Conjured Mana Cake", sellIn: days, quality: 6)]
        let app = GildedRose(items: items)
        
        for _ in 0..<days {
            app.updateQuality()
        }
        
        XCTAssertEqual(4, app.items[0].quality)
    }
    
    func testConjuredItemQualityAfterSellIn() {
        let days = 3
        let items = [Item(name: "Conjured Cake1", sellIn: days, quality: 2)]
        let app = GildedRose(items: items)
        
        for _ in 0..<days {
            app.updateQuality()
        }
        
        XCTAssertEqual(0, app.items[0].quality)
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

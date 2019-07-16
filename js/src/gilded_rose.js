function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
      if (items[i].quality > 0) {
        if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
          items[i].quality = items[i].quality - 1
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].sell_in < 11) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
          if (items[i].sell_in < 6) {
            if (items[i].quality < 50) {
              items[i].quality = items[i].quality + 1
            }
          }
        }
      }
    }
    if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (items[i].name != 'Aged Brie') {
        if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
          if (items[i].quality > 0) {
            if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
              items[i].quality = items[i].quality - 1
            }
          }
        } else {
          items[i].quality = items[i].quality - items[i].quality
        }
      } else {
        if (items[i].quality < 50) {
          items[i].quality = items[i].quality + 1
        }
      }
    }
  }
}

function update_quality_refactored() {
  items.forEach(function (item, index, array) {
    var name = item.name
    var quality = item.quality
    var sell_in = item.sell_in

    switch (name) {
      case "Aged Brie":
        quality = quality == 50 ? 50 : quality + 1
        break;
      case "Backstage passes to a TAFKAL80ETC concert":
        var increaseCounter = 0
        if (sell_in < 6 && sell_in > -1) {
          increaseCounter = 3
          quality = quality == 50 ? 50 : quality + increaseCounter
        }
        else if (sell_in < 11 && sell_in > 5) {
          increaseCounter = 2
          quality = quality == 50 ? 50 : quality + increaseCounter
        }
        else if (sell_in > 10) {
          increaseCounter = 1
          quality = quality == 50 ? 50 : quality + increaseCounter
        }
        else {
          quality = 0
        }
        break
      case "Sulfuras, Hand of Ragnaros":
        quality = 80
        break;
      case "Conjured Mana Cake":
        quality = sell_in > 0 ? quality - 2 : quality - 4
        if (quality < 0) quality = 0
        break
      default:
        quality = sell_in > 0 ? quality - 1 : quality - 2
        if (quality < 0) quality = 0
        break
    }

    item.quality = quality
    item.sell_in = name == "Sulfuras, Hand of Ragnaros" ? sell_in : sell_in - 1

  });
}

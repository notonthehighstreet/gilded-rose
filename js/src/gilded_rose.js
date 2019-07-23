function Item(name, sell_in, quality) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
}

var items = []

function update_quality() {
  for (var i = 0; i < items.length; i++) {
    const itemName = items[i].name;
    if (itemName != 'Aged Brie' && !itemName.toLowerCase().includes('backstage pass')) {
      if (items[i].quality > 0) {
        if (itemName != 'Sulfuras, Hand of Ragnaros') {
          if (itemName.toLowerCase().includes('conjured')) {
            items[i].quality = items[i].quality - 2
          } else {
            items[i].quality = items[i].quality - 1
          }
        }
      }
    } else {
      if (items[i].quality < 50) {
        items[i].quality = items[i].quality + 1
        if (itemName.toLowerCase().includes('backstage pass')) {
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
    if (itemName != 'Sulfuras, Hand of Ragnaros') {
      items[i].sell_in = items[i].sell_in - 1;
    }
    if (items[i].sell_in < 0) {
      if (itemName != 'Aged Brie') {
        if (!itemName.toLowerCase().includes('backstage pass')) {
          if (items[i].quality > 0) {
            if (itemName != 'Sulfuras, Hand of Ragnaros') {
              if (itemName.toLowerCase().includes('conjured')) {
                items[i].quality = items[i].quality - 2
              } else {
                items[i].quality = items[i].quality - 1
              }    
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

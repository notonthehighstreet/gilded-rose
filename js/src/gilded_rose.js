/**
 * create an item with initial state
 * @param {String} name 
 * @param {Number} sell_in 
 * @param {Number} quality 
 * @param {function} stateFunc
 * @example state_function should look like state_func = (previousState, events = null ) => (nextState);
 */
function Item(name, sell_in, quality, state_func) {
  this.name = name;
  this.sell_in = sell_in;
  this.quality = quality;
  this.state_function = state_func;
}

var items = []

/**
 * This will update an item based on events and previous state
 * @param {Object} item previous state of the item
 * @param {String} events events item is passing by
 */
function update_item(item, events) {
  item = item.state_function(item, events);
}

/**
 * Sample of how to create an item with state function
 */
const aged_brie = Item('Aged Brie', 20, 10, (prev, events) => {
  let next = prev;
  if (prev.quality < 50) {
    next.quality = prev.quality + 1;
    next.sell_in = prev.sell_in - 1;
  }
  return next;
});

/**
 * New update quality function will be more readable
 */
function new_update_quality() {
  for (let i=0; i < items.length; i++) {
    items[i] = update_item(items[i]);
  }
}

/**
 * This is pretty much unreadable
 * with couple of down falls:
 * 1- Hard to maintain/debug
 * 2- Hard to extend
 * 3- Almost impossible to read ;)
 * @todo Convert it to the following structure
 * @example every product category will have its own state function
 * @see state-functions,state-machines
 */
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

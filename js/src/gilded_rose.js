function Item(name, sell_in, quality) {
	this.name = name;
	this.sell_in = sell_in;
	this.quality = quality;
}

var items = []

function update_item_quality(item) {
	const updatedItem = { ...item };

	if (updatedItem.name === 'Sulfuras, Hand of Ragnaros') {
		return updatedItem;
	}

	if (updatedItem.name === 'Aged Brie') {
		if (updatedItem.quality < 50) {
			updatedItem.quality++;
			updatedItem.sell_in--;
		}
		return updatedItem;
	}

	if (updatedItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
		if (updatedItem.quality > 0) {
			updatedItem.quality = updatedItem.quality - 1
		}
	} else {
		if (updatedItem.quality < 50) {
			updatedItem.quality = updatedItem.quality + 1
			if (updatedItem.name == 'Backstage passes to a TAFKAL80ETC concert') {
				if (updatedItem.sell_in < 11) {
					if (updatedItem.quality < 50) {
						updatedItem.quality = updatedItem.quality + 1
					}
				}
				if (updatedItem.sell_in < 6) {
					if (updatedItem.quality < 50) {
						updatedItem.quality = updatedItem.quality + 1
					}
				}
			}
		}
	}

	updatedItem.sell_in = updatedItem.sell_in - 1;

	if (updatedItem.sell_in < 0) {
		if (updatedItem.name != 'Backstage passes to a TAFKAL80ETC concert') {
			if (updatedItem.quality > 0) {
				updatedItem.quality = updatedItem.quality - 1
			}
		} else {
			updatedItem.quality = 0;
		}
	}

	return updatedItem;
};

function update_quality(items) {
	return items.map(update_item_quality);
}

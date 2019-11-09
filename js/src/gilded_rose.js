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

	if (updatedItem.name === 'Backstage passes to a TAFKAL80ETC concert') {
		if (updatedItem.sell_in <= 0) {
			updatedItem.quality = 0;
		} else {
			const qualityIncrease = updatedItem.sell_in <= 5
				? 3
				: updatedItem.sell_in <= 10
					? 2
					: 1;

			updatedItem.quality = Math.min(
				updatedItem.quality + qualityIncrease,
				50
			);
		}

		updatedItem.sell_in--;

		return updatedItem;
	}

	if (updatedItem.quality > 0) {
		updatedItem.quality = updatedItem.quality - 1
	}

	updatedItem.sell_in = updatedItem.sell_in - 1;

	if (updatedItem.sell_in < 0) {
		if (updatedItem.quality > 0) {
			updatedItem.quality = updatedItem.quality - 1
		}
	}

	return updatedItem;
};

function update_quality(items) {
	return items.map(update_item_quality);
}

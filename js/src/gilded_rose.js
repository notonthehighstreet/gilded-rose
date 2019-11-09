function Item(name, sell_in, quality) {
	this.name = name;
	this.sell_in = sell_in;
	this.quality = quality;
}

var items = []

function update_item_quality(item) {
	const updatedItem = { ...item };

	switch (updatedItem.name) {
		case 'Sulfuras, Hand of Ragnaros':
			return updatedItem;

		case 'Aged Brie':
			if (updatedItem.quality < 50) {
				updatedItem.quality++;
			}
			break;

		case 'Backstage passes to a TAFKAL80ETC concert':
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
			break;

		default:
			const qualityDecrease = updatedItem.sell_in <= 0
				? 2
				: 1;

			updatedItem.quality = Math.max(
				updatedItem.quality - qualityDecrease,
				0
			);
			break;
	}

	updatedItem.sell_in--;
	return updatedItem;
};

function update_quality(items) {
	return items.map(update_item_quality);
}

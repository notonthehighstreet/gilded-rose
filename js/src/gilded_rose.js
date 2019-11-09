function Item(name, sell_in, quality) {
	this.name = name;
	this.sell_in = sell_in;
	this.quality = quality;
}

var items = []

function update_backstage_pass_quality(sell_in, quality) {
	if (sell_in <= 0) {
		return 0;
	}

	const qualityIncrease = sell_in <= 5
		? 3
		: sell_in <= 10
			? 2
			: 1;

	return Math.min(quality + qualityIncrease, 50);
}

function update_aged_brie_quality(quality) {
	return quality < 50
		? quality + 1
		: quality;
}

function update_general_quality(sell_in, quality) {
	const qualityDecrease = sell_in <= 0
		? 2
		: 1;

	return Math.max(quality - qualityDecrease, 0);
}

function update_item_quality(item) {
	let quality;

	switch (item.name) {
		case 'Sulfuras, Hand of Ragnaros':
			return item;

		case 'Aged Brie':
			quality = update_aged_brie_quality(item.quality);
			break;

		case 'Backstage passes to a TAFKAL80ETC concert':
			quality = update_backstage_pass_quality(item.sell_in, item.quality);
			break;

		default:
			quality = update_general_quality(item.sell_in, item.quality);
			break;
	}

	return new Item(item.name, item.sell_in - 1, quality);
};

function update_quality(items) {
	return items.map(update_item_quality);
}

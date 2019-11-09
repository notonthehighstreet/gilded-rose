describe('Gilded Rose', function() {
	describe('general rules', () => {
		it('should reduce the Quality and SellIn values by 1', () => {
			const testItems = [new Item('Leestian evil juice', 5, 3)];
			const results = update_items(testItems);
			expect(results[0].sell_in).toEqual(4);
			expect(results[0].quality).toEqual(2);
		});

		describe('an item with a Quality of zero', () => {
			it('should not reduce the Quality to below zero', () => {
				const testItems = [new Item('Leestian evil juice', 0, 0)];
				const results = update_items(testItems);
				expect(results[0].quality).toEqual(0);
			});
		});

		describe('once the sell by date has passed', () => {
			it('should reduce the Quality twice as fast', () => {
				const testItems = [new Item('Leestian evil juice', 0, 5)];
				const results = update_items(testItems);
				expect(results[0].quality).toEqual(3);
			});
		});
	});

	describe('product specific rules', () => {
		describe('Sulfuras', () => {
			it('should not reduce the Quality or SellIn values', () => {
				const testItems = [
					new Item('Sulfuras, Hand of Ragnaros', 10, 80),
					new Item('Sulfuras, Hand of Ragnaros', -1, 80)
				];
				const results = update_items(testItems);
				expect(results[0].sell_in).toEqual(10);
				expect(results[0].quality).toEqual(80);
				expect(results[1].sell_in).toEqual(-1);
				expect(results[1].quality).toEqual(80);
			});
		});

		describe('Aged Brie', () => {
			it('should increases in Quality the older it gets', () => {
				const testItems = [
					new Item('Aged Brie', 2, 0),
					new Item('Aged Brie', -1, 0)
				];
				const results = update_items(testItems);
				expect(results[0].quality).toEqual(1);
				expect(results[0].sell_in).toEqual(1);
				expect(results[1].quality).toEqual(1);
				expect(results[1].sell_in).toEqual(-2);
			});
		});

		describe('Backstage passes', () => {
			it('should increases in Quality the older it gets', () => {
				const testItems = [
					new Item('Backstage passes to a TAFKAL80ETC concert', 11, 0)
				];
				const results = update_items(testItems);
				expect(results[0].quality).toEqual(1);
				expect(results[0].sell_in).toEqual(10);
			});

			describe('when there are 10 days or less left', () => {
				it('should increase in Quality by 2', () => {
					const testItems = [
						new Item('Backstage passes to a TAFKAL80ETC concert', 10, 0)
					];
					const results = update_items(testItems);
					expect(results[0].quality).toEqual(2);
					expect(results[0].sell_in).toEqual(9);
				});
			});

			describe('when there are 5 days or less left', () => {
				it('should increase in Quality by 3', () => {
					const testItems = [
						new Item('Backstage passes to a TAFKAL80ETC concert', 5, 0)
					];
					const results = update_items(testItems);
					expect(results[0].quality).toEqual(3);
					expect(results[0].sell_in).toEqual(4);
				});
			});

			describe('when there are no days left', () => {
				it('should set the Quality to zero', () => {
					const testItems = [
						new Item('Backstage passes to a TAFKAL80ETC concert', 0, 10)
					];
					const results = update_items(testItems);
					expect(results[0].quality).toEqual(0);
					expect(results[0].sell_in).toEqual(-1);
				});
			});
		});

		describe('Conjured items', () => {
			it('should reduce the Quality twice as fast as normal items', () => {
				const testItems = [
					new Item('Conjured Mana Cake', 3, 6),
					new Item('Conjured Mana Cake', 0, 6)
				];
				const results = update_items(testItems);
				expect(results[0].sell_in).toEqual(2);
				expect(results[0].quality).toEqual(4);
				expect(results[1].sell_in).toEqual(-1);
				expect(results[1].quality).toEqual(2);
			});
		});


		describe('items that increase in value', () => {
			it('should never increase in Quantity beyond 50', () => {
				const testItems = [
					new Item('Aged Brie', 2, 50),
					new Item('Backstage passes to a TAFKAL80ETC concert', 11, 50),
					new Item('Backstage passes to a TAFKAL80ETC concert', 10, 50),
					new Item('Backstage passes to a TAFKAL80ETC concert', 5, 50)
				];
				const results = update_items(testItems);
				results.map(({quality}) => {
					expect(quality).toEqual(50);
				});
			});
		});
	});
});

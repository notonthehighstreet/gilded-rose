describe('Gilded Rose', function() {

  it('should have name foo', function() {
    const data = [ {name: 'foo', sell_in: 0, quality: 0}];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].name).toEqual('foo');
  });

  it('should decrease sellin and quality by 1', function() {
    const data = [ {name: 'foo', sell_in: 10, quality: 10}];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].sell_in).toEqual(9);
    expect(items[0].quality).toEqual(9);
  });

  it('should decrease quality by 2 when sellin date has passed', function() {
    const data = [ 
      {name: 'foo', sell_in: 0, quality: 10},
      {name: 'foo', sell_in: -1, quality: 20}
    ];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(8);
    expect(items[1].quality).toEqual(18);
  });

  it('should never have negative quality', function() {
    const data = [ 
      {name: 'foo', sell_in: 0, quality: 0},
      {name: 'bar', sell_in: 0, quality: -1}
    ];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(0);
    expect(items[1].quality).toEqual(0);
  });

  it('should have negative sellin', function() {
    const data = [ {name: 'foo', sell_in: 0, quality: 0}];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].sell_in).toEqual(-1);
  });

  it('should increase quality by 1 for "Aged Brie"', function() {
    const data = [ {name: 'Aged Brie', sell_in: 10, quality: 10}];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(11);
  });

  it('should not increase quality if quality is 50', function() {
    const data = [ 
      {name: 'Aged Brie', sell_in: 10, quality: 50},
      {name: 'Aged Brie', sell_in: 10, quality: 60}
    ];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(50);
    expect(items[1].quality).toEqual(50);
  });

  it('should always set quality for "Sulfuras, Hand of Ragnaros" to 80', function() {
    const data = [ {name: 'Sulfuras, Hand of Ragnaros', sell_in: 10, quality: 10}];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(80);
  });

  it('should increase quality by 1 for "Backstage passes" when sellin value is more than 10', function() {
    const data = [ {name: 'Backstage passes to a TAFKAL80ETC concert', sell_in: 11, quality: 10}];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(11);
  });

  it('should increase quality by 2 for "Backstage passes" when sellin value is 10 or less', function() {
    const data = [ 
      {name: 'Backstage passes to a TAFKAL80ETC concert', sell_in: 10, quality: 10},
      {name: 'Backstage passes to a TAFKAL80ETC concert', sell_in: 9, quality: 10}
    ];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(12);
    expect(items[1].quality).toEqual(12);
  });

  it('should increase quality by 3 for "Backstage passes" when sellin value is 5 or less', function() {
    const data = [ 
      {name: 'Backstage passes to a TAFKAL80ETC concert', sell_in: 5, quality: 10},
      {name: 'Backstage passes to a TAFKAL80ETC concert', sell_in: 4, quality: 10}
    ];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(13);
    expect(items[1].quality).toEqual(13);
  });

  it('should drop the quality to 0 for "Backstage passes" when sellin value is 0 or less', function() {
    const data = [ 
      {name: 'Backstage passes to a TAFKAL80ETC concert', sell_in: 0, quality: 10},
      {name: 'Backstage passes to a TAFKAL80ETC concert', sell_in: -1, quality: 10}
    ];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(0);
    expect(items[1].quality).toEqual(0);
  });

  it('should decrease quality by 2 for "Conjured Mana Cake" items', function() {
    const data = [ {name: 'Conjured Mana Cake', sell_in: 10, quality: 10}];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(8);
  });

  it('should decrease quality by 4 for "Conjured Mana Cake" items when selling date has passed', function() {
    const data = [ 
      {name: 'Conjured Mana Cake', sell_in: 0, quality: 10},
      {name: 'Conjured Mana Cake', sell_in: -1, quality: 20}
    ];
    const items = createItems(data);
    updateQuality(items);
    expect(items[0].quality).toEqual(6);
    expect(items[1].quality).toEqual(16);
  });
});

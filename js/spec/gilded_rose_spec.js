describe('Gilded Rose', function() {

  it('should decrease quality by one whilst in sell by date', function() {
    items = [new Item('dexterity potion', 3, 35)];
    update_quality();
    expect(items[0].sell_in).toEqual(2);
    expect(items[0].quality).toEqual(34);
  });

  it('should decrease quality by two after passing the sell by date', function() {
    items = [new Item('dexterity potion', 0, 35)];
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(33);
  });

  it('should not decrease the quality after reaching zero', function() {
    items = [new Item('dexterity potion', 2, 0)];
    update_quality();
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(0);
  });

  it('should increase the quality if the item is Aged Brie', function() {
    items = [new Item('Aged Brie', 2, 30)];
    update_quality();
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(31);
  });

  it('should not increase the quality of Aged Brie if the quality is 50', function() {
    items = [new Item('Aged Brie', 2, 50)];
    update_quality();
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(50);
  });

  it('should not alter the sell by date or quality if the item is Sulfuras', function() {
    items = [new Item('Sulfuras, Hand of Ragnaros', 2, 80)];
    update_quality();
    expect(items[0].sell_in).toEqual(2);
    expect(items[0].quality).toEqual(80);
  });

  it('should increase the quality by one if the item is a backstage pass and more than 10 days within sell by date', function() {
    items = [new Item('Backstage passes to a TAFKAL80ETC concert', 11, 30)];
    update_quality();
    expect(items[0].sell_in).toEqual(10);
    expect(items[0].quality).toEqual(31);
  });

  it('should increase the quality by two if the item is a backstage pass and between 5-10 days within sell by date', function() {
    items = [new Item('Backstage passes to a TAFKAL80ETC concert', 9, 30)];
    update_quality();
    expect(items[0].sell_in).toEqual(8);
    expect(items[0].quality).toEqual(32);
  });

  it('should increase the quality by three if the item is a backstage pass and under 5 days within sell by date', function() {
    items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 30)];
    update_quality();
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(33);
  });

  it('should drop the quality to zero if the item is a backstage pass and past sell by date', function() {
    items = [new Item('Backstage passes to a TAFKAL80ETC concert', -1, 30)];
    update_quality();
    expect(items[0].sell_in).toEqual(-2);
    expect(items[0].quality).toEqual(0);
  });

  it("should decrease the quality by two if the item is conjured and within sell by date", function() {
    items = [ new Item("Conjured margaritas", 2, 30) ];
    update_quality();
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(28);
  });

  it("should decrease the quality by four if the item is conjured and past its sell by date", function() {
    items = [ new Item("Conjured margaritas", 0, 30) ];
    update_quality();
    expect(items[0].sell_in).toEqual(-1);
    expect(items[0].quality).toEqual(26);
  });

  it("should recognise any sort of conjured item", function() {
    items = [ new Item("A pair of conjured snow boots", 2, 30) ];
    update_quality();
    expect(items[0].sell_in).toEqual(1);
    expect(items[0].quality).toEqual(28);
  });

  it("should recognise any sort of backstage passes", function() {
    items = [ new Item("Backstage pass to Wizard Rock", 5, 30) ];
    update_quality();
    expect(items[0].sell_in).toEqual(4);
    expect(items[0].quality).toEqual(33);
  });

});

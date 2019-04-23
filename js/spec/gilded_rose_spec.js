describe("Gilded Rose", function() {

  /**
   * This is not a good test
   * As we moved to state functions,
   * I guess the best approach is using BDD Style
   * GIVEN,WHEN,THEN style is creating more meaningful tests
   */
  it("GIVEN we have a aged brie, WHEN quality is 21, AND sell in is 10, THEN ...", function() {
    items = [ aged_brie ];
    new_update_quality();
    expect(items[0].name).toEqual("Aged Brie");
    expect(items[0].quality).toEqual(21);
    expect(items[0].sell_in).toEqual(9);
  });
  /**
   * Old test which is also a bit hard to follow
   */
  it("should foo", function() {
    items = [ new Item("foo", 0, 0) ];
    update_quality();
    expect(items[0].name).toEqual("fixme");
  });

});

class Item {
  constructor(name, sell_in, quality){
      this.name = name;
      this.sell_in = sell_in;
      this.quality = quality;
  }
};

const createItems = data => {
  let items = [];
  data.forEach(entity => {
      items.push(new Item(entity.name, entity.sell_in, entity.quality));
  });
  return items;
};

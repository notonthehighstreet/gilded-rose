const showHeaderFor = day => {
  $('.container__data').append('<div class="container__data--header">-------- Day ' + day + ' --------</div>');
  $('.container__data').append('<div class="container__data--row">Name</div><div class="container__data--row">SellIn</div><div class="container__data--row">Quality</div>');
};

const showItems = items => {
  items.forEach(item => {
    $('.container__data').append('<div class="container__data--row">' + item.name + '</div><div class="container__data--row">' + item.sell_in + '</div><div class="container__data--row">' + item.quality + '</div>');
  });
};

$( document ).ready(() => {
  const days = 2;
  const items = createItems(globalData);
    
  for (let i = 0; i < days; i++) {
    showHeaderFor(i);
    showItems(items);
    updateQuality(items);
  }
});

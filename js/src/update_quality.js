const minQuality = 0;
const fixedQuality = 80;
const increaseQualityByOne = 1;
const increaseQualityByTwo = 2;
const increaseQualityByThree = 3;
const decreaseByOne = 1;
const maxQuality = 50;
const expiredDate = 0;
const fiveDaysToExpire = 5;
const tenDaysToExpire = 10;

const limitQuality = (quality, number) => (quality + number) < maxQuality? (quality + number) : maxQuality;

const double = decreaseBy => decreaseBy * 2;
  
const increaseQuality = quality => limitQuality(quality, increaseQualityByOne);

const decreaseQuality = ({ sell_in, quality }, normalDecrease = decreaseByOne) => {
    let newQuality;
    if (sell_in > expiredDate) {
        newQuality = quality - normalDecrease;
    } else {
        newQuality = quality - double(normalDecrease);
    }
    return newQuality > minQuality ? newQuality : minQuality;
};

const variableQuality = ({ name, sell_in, quality } ) => {
    switch (name) {
        case 'Sulfuras, Hand of Ragnaros':
            return fixedQuality;
        case 'Conjured Mana Cake':
            const decrease = double(decreaseByOne);
            return decreaseQuality({ sell_in, quality }, decrease);
        case 'Backstage passes to a TAFKAL80ETC concert':
            if (sell_in <= expiredDate) {
                return minQuality;
            } 
            if (sell_in > expiredDate && sell_in <= fiveDaysToExpire) {
                return limitQuality(quality, increaseQualityByThree);
            }
            if (sell_in > fiveDaysToExpire && sell_in <= tenDaysToExpire) {
                return limitQuality(quality, increaseQualityByTwo);
            }
        default:
            return increaseQuality(quality);
    }
};

const decreaseSellIn = sellin => sellin - decreaseByOne;

const updateQuality = items => {
    items.forEach(element => {
        if (!specialItems.includes(element.name)){
            element.quality = decreaseQuality(element);
        } else {
            element.quality = variableQuality(element);
        }
        element.sell_in = decreaseSellIn(element.sell_in);    
    });
};

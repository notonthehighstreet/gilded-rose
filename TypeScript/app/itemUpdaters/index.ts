import { Item } from '../gilded-rose';
import { ItemTypes } from '../constants';
import AgedBrieItemUpdater from './AgedBrie';
import BackStagePassItemUpdater from './BackStagePass';
import SulfurasItemUpdater from './Sulfuras';
import ConjuredItemUpdater from './ConjuredItem';
import DefaultItemUpdater, { ItemUpdater } from './Default';

const ItemUpdaterMap = {
    [ItemTypes.SULFURAS]: SulfurasItemUpdater,
    [ItemTypes.AGED_BRIE]: AgedBrieItemUpdater,
    [ItemTypes.BACKSTAGE_PASSES]: BackStagePassItemUpdater,
    [ItemTypes.CONJURED_ITEM]: ConjuredItemUpdater
}

export function getItemUpdater(item: Item): ItemUpdater {
    const Updater = ItemUpdaterMap[item.name] || DefaultItemUpdater;
    return new Updater(item);
}
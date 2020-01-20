import { Item } from '../gilded-rose';
import { ItemTypes } from '../constants';
import AgedBrieItemUpdater from './AgedBrie';
import BackStagePassItemUpdater from './BackStagePass';
import SulfurasItemUpdater from './Sulfuras';
import ConjuredItemUpdater from './ConjuredItem';
import DefaultItemUpdater, { ItemUpdaterInterface, ItemUpdaterConstructor } from './Default';

const ItemUpdaterMap: Record<ItemTypes, ItemUpdaterConstructor> = {
    [ItemTypes.SULFURAS]: SulfurasItemUpdater,
    [ItemTypes.AGED_BRIE]: AgedBrieItemUpdater,
    [ItemTypes.BACKSTAGE_PASSES]: BackStagePassItemUpdater,
    [ItemTypes.CONJURED_ITEM]: ConjuredItemUpdater
}

export function getItemUpdater(item: Item): ItemUpdaterInterface {
    const Updater = ItemUpdaterMap[item.name] || DefaultItemUpdater;
    return new Updater(item);
}
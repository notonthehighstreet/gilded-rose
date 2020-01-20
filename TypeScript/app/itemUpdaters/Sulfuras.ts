import DefaultItemUpdater from './Default';
import { Item } from '../gilded-rose';

export default class SulfurasItemUpdater extends DefaultItemUpdater {
    adjustSetIn(item: Item): Item {
       return item;
    }

    protected getQualityDifference(): number {
        return 0;
    }
}
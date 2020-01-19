import DefaultItemUpdater from './Default';
import { Item } from '../gilded-rose';

export default class SulfurasItemUpdater extends DefaultItemUpdater {
    adjustSetIn(): Item {
       return this.item;
    }

    protected getValuationChangeRate(): number {
        return 0;
    }
}
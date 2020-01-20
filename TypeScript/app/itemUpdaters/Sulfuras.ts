import DefaultItemUpdater from './Default';
import { Item } from '../gilded-rose';

export default class SulfurasItemUpdater extends DefaultItemUpdater {

    private readonly SULFURAS_QUALITY = 80;

    adjustSetIn(item: Item): Item {
       return item;
    }

    protected adjustQuality(item: Item): Item {
        return {...item, quality: this.SULFURAS_QUALITY };
    }

    protected getQualityDifference(): number {
        return 0;
    }
}
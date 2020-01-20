import { inRange } from 'lodash';
import DefaultItemUpdater from './Default';
import { Item } from '../gilded-rose';


export default class BackStagePassItemUpdater extends DefaultItemUpdater {

    protected getQualityDifference(item: Item): number {
        const { sellIn } = item;
        if(inRange(sellIn, 6, 11)) {
            return 2;
        } else if(inRange(sellIn, 0, 6)) {
            return 3
        } else if(sellIn < 0) {
            return -item.quality;
        } else {
            return 1;
        }
    }
}

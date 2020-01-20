import { inRange } from 'lodash';
import DefaultItemUpdater from './Default';
import { Item } from '../gilded-rose';

const DOUBLE_RATE_MAX_RANGE = 11;
const DOUBLE_RATE_MIN_RANGE = 6;

const TRIPPLE_RATE_MAX_RANGE = 6;
const TRIPPLE_RATE_MIN_RANGE = 0;


export default class BackStagePassItemUpdater extends DefaultItemUpdater {

    protected getQualityDifference(item: Item): number {
        const { sellIn } = item;
        if(inRange(sellIn, DOUBLE_RATE_MIN_RANGE, DOUBLE_RATE_MAX_RANGE)) {
            return 2;
        } else if(inRange(sellIn, TRIPPLE_RATE_MIN_RANGE, TRIPPLE_RATE_MAX_RANGE)) {
            return 3
        } else if(sellIn < 0) {
            return -item.quality;
        } else {
            return 1;
        }
    }
}

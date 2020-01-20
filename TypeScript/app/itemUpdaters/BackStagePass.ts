import { inRange } from 'lodash';
import DefaultItemUpdater from './Default';
import { Item } from '../gilded-rose';

const DOUBLE_RATE_MAX_RANGE = 11;
const DOUBLE_RATE_MIN_RANGE = 6;

const TRIPPLE_RATE_MAX_RANGE = 6;
const TRIPPLE_RATE_MIN_RANGE = 0;


export default class BackStagePassItemUpdater extends DefaultItemUpdater {

    private usesDoubleRate(item: Item): boolean {
        return inRange(item.sellIn, DOUBLE_RATE_MIN_RANGE, DOUBLE_RATE_MAX_RANGE);
    }

    private usesTrippleRate(item: Item): boolean {
        return inRange(item.sellIn, TRIPPLE_RATE_MIN_RANGE, TRIPPLE_RATE_MAX_RANGE);
    }

    private isConcertOver(item: Item): boolean {
        return item.sellIn < 0;
    }

    protected getQualityDifference(item: Item): number {
        if(this.usesDoubleRate(item)) {
            return 2;
        } else if(this.usesTrippleRate(item)) {
            return 3
        } else if(this.isConcertOver(item)) {
            return -item.quality;
        } else {
            return 1;
        }
    }
}

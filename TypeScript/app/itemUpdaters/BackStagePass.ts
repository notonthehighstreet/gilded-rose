import { inRange } from 'lodash';
import DefaultItemUpdater from './Default';


export default class BackStagePassItemUpdater extends DefaultItemUpdater {

    protected getValuationChangeRate(): number {
        const { sellIn } = this.item;
        if(inRange(sellIn, 6, 11)) {
            return 2;
        } else if(inRange(sellIn, 0, 6)) {
            return 3
        } else if(sellIn < 0) {
            return -this.item.quality;
        } else {
            return 1;
        }
    }
}

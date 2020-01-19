
import DefaultItemUpdater from './Default';

export default class AgedBrieItemUpdater extends DefaultItemUpdater {

    protected getValuationChangeRate(): number {
        return +1;
    }
}
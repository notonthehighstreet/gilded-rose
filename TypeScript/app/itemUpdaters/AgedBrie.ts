
import DefaultItemUpdater from './Default';

export default class AgedBrieItemUpdater extends DefaultItemUpdater {

    protected getQualityDifference(): number {
        return +1;
    }
}
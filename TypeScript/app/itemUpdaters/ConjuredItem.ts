
import DefaultItemUpdater from './Default';

export default class ConjuredItemUpdater extends DefaultItemUpdater {

    protected getQualityDifference(): number {
        return -2;
    }
}

import DefaultItemUpdater, { ItemUpdaterInterface } from './Default';

export default class AgedBrieItemUpdater extends DefaultItemUpdater implements ItemUpdaterInterface {

    protected getQualityDifference(): number {
        return +1;
    }
}
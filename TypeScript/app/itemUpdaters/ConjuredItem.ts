
import DefaultItemUpdater from './Default';

export default class ConjuredItemUpdater extends DefaultItemUpdater {

    protected getValuationChangeRate(): number {
        return -2;
    }
}
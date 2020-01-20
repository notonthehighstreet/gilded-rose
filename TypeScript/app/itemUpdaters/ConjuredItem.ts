
import DefaultItemUpdater from './Default';
import { Item } from '../gilded-rose';

export default class ConjuredItemUpdater extends DefaultItemUpdater {

    protected getQualityDifference(): number {
        return -2;
    }
}
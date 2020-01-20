import { expect } from 'chai';
import AgedBrieItemUpdater from './AgedBrie';
import ConjuredItemUpdater from './ConjuredItem';
import BackStagePassItemUpdater from './BackStagePass';
import SulfurasItemUpdater from './Sulfuras';
import DefaultItemUpdater from './Default';
import { getItemUpdater } from './index';
import { ItemTypes } from '../constants';
import { createItem } from '../../test/testHelpers';

describe("Item Updaters", () => {
    it("Aged Brie Items should use AgedBrieItemUpdater", () => {
        const agedBrie = createItem(ItemTypes.AGED_BRIE);
        const itemUpdater = getItemUpdater(agedBrie);
        expect(itemUpdater).to.be.an.instanceof(AgedBrieItemUpdater);
    });

    it("Sulfuras Items should use SulfurasItem Updater", () => {
        const sulfuras = createItem(ItemTypes.SULFURAS);
        const itemUpdater = getItemUpdater(sulfuras);
        expect(itemUpdater).to.be.an.instanceof(SulfurasItemUpdater);
    });

    it("BackStagePasses Items should use BackStagePasses Updater", () => {
        const backstagePasses = createItem(ItemTypes.BACKSTAGE_PASSES);
        const itemUpdater = getItemUpdater(backstagePasses);
        expect(itemUpdater).to.be.an.instanceof(BackStagePassItemUpdater);
    });

    it("Conjured Items should use ConjuredItem Updater", () => {
        const conjuredItem = createItem(ItemTypes.CONJURED_ITEM);
        const itemUpdater = getItemUpdater(conjuredItem);
        expect(itemUpdater).to.be.an.instanceof(ConjuredItemUpdater);
    });

    it("should use DefaultItem Updater if no match found", () => {
        const someItem = createItem("a new item");
        const itemUpdater = getItemUpdater(someItem);
        expect(itemUpdater).to.be.an.instanceof(DefaultItemUpdater);
    });
})
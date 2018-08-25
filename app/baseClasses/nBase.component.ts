// Base component 
import { NDataModel } from './nDataModel.class';
export class NBaseComponent {
    dm: NDataModel;
    constructor() {
        this.dm = new NDataModel();
    }
}
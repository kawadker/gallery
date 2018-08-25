import { userdatamodel } from '../src/app/models/userdatamodel.model';
import { images } from '../src/app/models/images.model';
import { typeOfImages } from '../src/app/models/typeOfImages.model';
import { galleryDb } from '../src/app/models/galleryDb.model';
//IMPORT NEW DATAMODEL

export class NDataModel {
userdatamodel: userdatamodel;
images: images;
typeofimages: typeOfImages;
gallerydb: galleryDb;
//DECLARE NEW VARIABLE

constructor() {
this.userdatamodel = new userdatamodel();
this.images = new images();
this.typeofimages = new typeOfImages();
this.gallerydb = new galleryDb();
//CREATE NEW DM INSTANCE
    }
}
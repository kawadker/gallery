/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE CLASS NAME*/
import { Injectable } from '@angular/core';
import { NDataModelService } from 'neutrinos-seed-services';

import { galleryDb } from '../../models/galleryDb.model';

@Injectable()
export class imagedataService {
    user = 'user '
    // images=[];
    galleryDb;
    // systemService;

    images: any = [
        {
            "user": {
                "name": "user",
                "dob": "02/02/2010"
            },
        },
        {
            "images": [
                {
                    "name": "Nature",
                    "images": [
                        {
                            "src": "https://www.keralatourism.org/images/neelakurinji/kurinji-1994.jpg",
                            "title": "Nature"
                        },
                        {
                            "src": "http://www.packagesworldwide.com/upload_data/cities/2014-08-23-11-23-27.jpg",
                            "title": "Forest"
                        },
                        {
                            "src": "https://buckleyins.com/wp-content/uploads/2018/03/nature-sky-twilight-grass-9198-450x450.jpg",
                            "title": "sky"
                        },
                        {
                            "src": "https://www.madisonartery.com/wp-content/uploads/2014/12/art-3-1000x923-450x450.jpg",
                            "title": "sky"
                        },
                        {
                            "src": "https://buckleyins.com/wp-content/uploads/2018/03/nature-sky-twilight-grass-9198-450x450.jpg",
                            "title": "sky"
                        },
                        {
                            "src": "https://waterfeaturepros.com/wp-content/uploads/2016/12/ERLK-305-450x450.jpg",
                            "title": "sky"
                        },
                        {
                            "src": "https://www.madisonartery.com/wp-content/uploads/2014/12/art-3-1000x923-450x450.jpg",
                            "title": "sky"
                        },
                        {
                            "src": "https://media-cdn.tripadvisor.com/media/photo-s/0f/f1/26/45/river-narmada-flowing.jpg",
                            "title": "River Narmada"
                        },
                        {
                            "src": "https://buckleyins.com/wp-content/uploads/2018/03/nature-sky-twilight-grass-9198-450x450.jpg",
                            "title": "sky"
                        },
                        {
                            "src": "https://waterfeaturepros.com/wp-content/uploads/2017/03/UC-450x450.jpg",
                            "title": "sky"
                        }
                    ]
                },
                {
                    "name": "Water Fall",
                    "images": [
                        {
                            "src": "https://media-cdn.tripadvisor.com/media/photo-s/06/7c/a7/2a/pachmarhi.jpg",
                            "title": "Dhuadhar "
                        },
                        {
                            "src": "https://www.madisonartery.com/wp-content/uploads/2014/12/art-3-1000x923-450x450.jpg",
                            "title": "Water fall"
                        },
                        {
                            "src": "https://buckleyins.com/wp-content/uploads/2018/03/nature-sky-twilight-grass-9198-450x450.jpg",
                            "title": "Water fall"
                        },
                        {
                            "src": "https://media-cdn.tripadvisor.com/media/photo-s/11/92/b2/a7/photo2jpg.jpg",
                            "title": "Niagara Water fall"
                        },
                        {
                            "src": "https://onepurlrow.files.wordpress.com/2017/06/dd300-0fujxh4ziolypmnrx.jpg?w=450&h=450&crop=1",
                            "title": "Canada Water fall"
                        },
                        {
                            "src": "https://images-na.ssl-images-amazon.com/images/I/71fdCUDF-XL._SY450_.jpg",
                            "title": "Water fall"
                        },
                        {
                            "src": "https://buckleyins.com/wp-content/uploads/2018/03/nature-sky-twilight-grass-9198-450x450.jpg",
                            "title": "Water fall"
                        },
                        {
                            "src": "https://www.madisonartery.com/wp-content/uploads/2014/12/art-3-1000x923-450x450.jpg",
                            "title": "Water fall"
                        },
                        {
                            "src": "https://buckleyins.com/wp-content/uploads/2018/03/nature-sky-twilight-grass-9198-450x450.jpg",
                            "title": "Water fall"
                        },
                        {
                            "src": "https://buckleyins.com/wp-content/uploads/2018/03/nature-sky-twilight-grass-9198-450x450.jpg",
                            "title": "Water fall"
                        }
                    ]
                },
                {
                    "name": "Mountain",
                    "images": [
                        {
                            "src": "https://20dqe434dcuq54vwy1wai79h-wpengine.netdna-ssl.com/wp-content/uploads/2017/02/Telluride-Mount-Wilson-OutThere-Colorado-450x450.jpg",
                            "title": "Mountain"
                        },
                        {
                            "src": "https://20dqe434dcuq54vwy1wai79h-wpengine.netdna-ssl.com/wp-content/uploads/2017/02/Boulder-OutThere-Colorado-450x450.jpg",
                            "title": "Mountain"
                        },
                        {
                            "src": "https://bainstravel.com/wp-content/uploads/2015/08/hill-1-1189705-450x450.jpg",
                            "title": "Himalaya"
                        },
                        {
                            "src": "https://media-cdn.tripadvisor.com/media/photo-s/09/5f/a3/36/hgr-its-surroundingsnature.jpg",
                            "title": "Himalaya"
                        },
                        {
                            "src": "https://i5.walmartimages.com/asr/3d921d6f-27f4-46c9-b7ca-5aa29f73690f_1.195dbb298679b8a8716181c48a8f6e05.jpeg?odnHeight=450&odnWidth=450&odnBg=FFFFFF",
                            "title": "Rocky "
                        },
                        {
                            "src": "https://i.pinimg.com/736x/3f/73/7e/3f737ea96b696e7288062f6b40f0dddf--the-western-one-day.jpg",
                            "title": "Nilgiri "
                        },
                        {
                            "src": "https://buckleyins.com/wp-content/uploads/2018/03/nature-sky-twilight-grass-9198-450x450.jpg",
                            "title": "sky"
                        },
                        {
                            "src": "https://www.madisonartery.com/wp-content/uploads/2014/12/art-3-1000x923-450x450.jpg",
                            "title": "sky"
                        },
                        {
                            "src": "https://buckleyins.com/wp-content/uploads/2018/03/nature-sky-twilight-grass-9198-450x450.jpg",
                            "title": "sky"
                        },
                        {
                            "src": "https://buckleyins.com/wp-content/uploads/2018/03/nature-sky-twilight-grass-9198-450x450.jpg",
                            "title": "sky"
                        }
                    ]
                }
            ]
        }
    ]
}

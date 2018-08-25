import {JsonProperty, JsonObject} from '../lib/tj.deserializer'
import { userdatamodel } from './userdatamodel.model';
import { images } from './images.model';

@JsonObject
export class galleryDb {
  @JsonProperty('user', userdatamodel, true)
  public user: userdatamodel = new userdatamodel();

  @JsonProperty('images', [images], true)
  public images: images[] = [];

}
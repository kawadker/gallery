import {JsonProperty, JsonObject} from '../lib/tj.deserializer'
import { typeOfImages } from './typeOfImages.model';

@JsonObject
export class images {
  @JsonProperty('name', String, true)
  public name: string = undefined;

  @JsonProperty('image', typeOfImages, true)
  public image: typeOfImages = new typeOfImages();

}
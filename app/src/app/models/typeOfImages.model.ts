import {JsonProperty, JsonObject} from '../lib/tj.deserializer'

@JsonObject
export class typeOfImages {
  @JsonProperty('src', String, true)
  public src: string = undefined;

  @JsonProperty('title', String, true)
  public title: string = undefined;

}
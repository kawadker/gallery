import {JsonProperty, JsonObject} from '../lib/tj.deserializer'

@JsonObject
export class userdatamodel {
  @JsonProperty('name', String, true)
  public name: string = undefined;

  @JsonProperty('dob', String, true)
  public dob: string = undefined;

}
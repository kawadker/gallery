import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { Observable } from "rxjs/Observable"


@Injectable()
export class NDataSourceService {

  constructor(private http: HttpClient) { }
  getDataSource() {
    return new Promise((resolve, reject) => {
      this.http.get('constants/app.const.json').subscribe(result => {
        window['neutrinos'] = result;
        return resolve(result);
      }, error => {
        return reject(error);
      })
    });
  }

}

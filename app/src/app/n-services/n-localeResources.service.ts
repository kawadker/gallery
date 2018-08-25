import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { NSnackbarService } from 'neutrinos-seed-services';

@Injectable()
export class NLocaleResource {
    defaultLcid;
    locale = {};
    constructor(public http: HttpClient, private nSnackbarService: NSnackbarService) {
        if (!this.defaultLcid) {
            this.defaultLcid = "en-us";
        }
        this.getlanguageResource(this.defaultLcid);
    }

    /**
     * 
     * @param lcid 
     * Reads resource object based on lcid and  
     */
    private getlanguageResource(lcid) {
        this.getLangResObj(lcid, (resObj) => {
            this.constructBundle(resObj['properties']);
        });
    }

    /**
     * 
     * @param lang 
     * @param key 
     * 
     * Returns value based on lcid and key
     */
    getVal(lcid, key) {
        return this.getLangResObj(lcid, (resObj) => {
            return (resObj[key])
        });
    }

    /**
     * 
     * @param lcid 
     * @param callback 
     * 
     * Reads and returns the resource object based on the lcid 
     */
    private getLangResObj(lcid, callback) {
        this.http.get(`locales/locale_${lcid}.json`).subscribe(resObj => {
            callback(resObj);
        }, error => {
            if (error && error.status == 404) {
                this.nSnackbarService.openSnackBar(` locale file for language ${lcid} not found`);
            } else {
                this.nSnackbarService.openSnackBar(error.error);
            }

        });
    }

    /**
     * 
     * @param resourceObj object
     * Adds key and value pair into 'this'
     */
    private constructBundle(resourceObj) {
        var keys = Object.keys(resourceObj);
        for (let att = 0; att < keys.length; att++) {
            this.locale[keys[att]] = resourceObj[keys[att]]
        }
    }

    /**
     * returns user selected language
     */
    get language() {
        return this.defaultLcid;
    }

    /**
     * set the user selected language and updates the resource object based on user selected language
     */
    set language(lcid) {
        this.getLocales().subscribe(localesObj => {
            if (localesObj[lcid]) {
                this.defaultLcid = lcid;
                this.getlanguageResource(lcid);
            }
            else {
                this.locale = {};
                this.nSnackbarService.openSnackBar(` locale ${lcid} is not valid`);
            }
        });
    }

    /**
     * return locales list created by developer
     */

    getLocales() {
        return this.http.get('locales/locales.json').map(res => {
            return res;
        }, error => {
            this.nSnackbarService.openSnackBar(error.error);
        });
    }

}

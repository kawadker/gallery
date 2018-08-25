/*DEFAULT GENERATED TEMPLATE. DO NOT CHANGE SELECTOR TEMPLATE_URL AND CLASS NAME*/
import { Component, OnInit } from '@angular/core'
import { ModelMethods } from '../../lib/model.methods';
import { NDataModelService } from 'neutrinos-seed-services';
import { NLoginService } from 'neutrinos-seed-services';
import { Router } from '@angular/router';
import { NSessionStorageService } from 'neutrinos-seed-services';
import { NSystemService } from 'neutrinos-seed-services';

/**
* Model import Example :
* import { HERO } from '../models/hero.model';
*/

/**
 * Service import Example :
 * import { HeroService } from '../services/hero/hero.service';
 */

@Component({
    selector: 'bh-home',
    templateUrl: './home.template.html'
})

export class homeComponent implements OnInit {
    dm: ModelMethods;
    user;
    username;
    password;
     remember;

    rememberVal: boolean;
    instance;

    constructor(
        private bdms: NDataModelService,
        private loginService: NLoginService,
        private router: Router,
        private local: NSessionStorageService
    ) {
        this.dm = new ModelMethods(bdms);
          this.instance = NSystemService.getInstance();
    }

    ngOnInit() {
          if (this.instance.deviceType != 'browser') {
            this.rememberVal = true;
        }
    }

    submit() {
        this.loginService.login(this.username, this.password).subscribe(data => {
            if (data) {
                this.router.navigate(['home']);
                console.log(data)            
            }
        });
        //   this.loginService.login(this.username, this.password, this.remember).subscribe(data => {
        //     console.log(JSON.stringify(data.accessToken));
        //         console.log(data)            
            
        //     if (JSON.stringify(data['accessToken'])) {
        //         this.router.navigate(['/home2']);
        //         console.log(true)
        //     }
        //     else {
        //         console.log(false)
        //     }
        // });
    }
    get(dataModelName, filter?, keys?, sort?, pagenumber?, pagesize?) {
        this.dm.get(dataModelName, this, filter, keys, sort, pagenumber, pagesize,
            result => {
                // On Success code here
            },
            error => {
                // Handle errors here
            });
    }

    getById(dataModelName, dataModelId) {
        this.dm.getById(dataModelName, dataModelId,
            result => {
                // On Success code here
            },
            error => {
                // Handle errors here
            })
    }

    put(dataModelName, dataModelObject) {
        this.dm.put(dataModelName, dataModelObject,
            result => {
                // On Success code here
            }, error => {
                // Handle errors here
            })
    }

    validatePut(formObj, dataModelName, dataModelObject) {
        this.dm.validatePut(formObj, dataModelName, dataModelObject,
            result => {
                // On Success code here
            }, error => {
                // Handle errors here
            })
    }

    update(dataModelName, update, filter, options) {
        const updateObject = {
            update: update,
            filter: filter,
            options: options
        };
        this.dm.update(dataModelName, updateObject,
            result => {
                //  On Success code here
            }, error => {
                // Handle errors here
            })
    }

    delete(dataModelName, filter) {
        this.dm.delete(dataModelName, filter,
            result => {
                // On Success code here
            }, error => {
                // Handle errors here
            })
    }

    deleteById(dataModelName, dataModelId) {
        this.dm.deleteById(dataModelName, dataModelId,
            result => {
                // On Success code here
            }, error => {
                // Handle errors here
            })
    }

    updateById(dataModelName, dataModelId, dataModelObj) {
        this.dm.updateById(dataModelName, dataModelId, dataModelObj,
            result => {
                // On Success code here
            }, error => {
                // Handle errors here
            })
    }


}

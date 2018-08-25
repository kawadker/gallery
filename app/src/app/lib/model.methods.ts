import { NgForm } from '@angular/forms';
import * as models from '../models';
import { JsonConvert } from './tj.deserializer';

import { NDataModelService } from 'neutrinos-seed-services';

export class ModelMethods {

    private jsonConvert: JsonConvert = new JsonConvert();

    private INVALID_FORM = 'INVALID_FORM';
    private INVALID_MODEL_NAME = 'INVALID_MODEL_NAME';
    private INVALID_DATA_MODEL_INSTANCE = 'INVALID_DATA_MODEL_INSTANCE';
    private INVALID_RESULT_CALLBACK = 'INVALID_RESULT_CALLBACK';
    private INVALID_ERROR_CALLBACK = 'INVALID_ERROR_CALLBACK';


    constructor(private dmService: NDataModelService) { };

    public get(dataModelName: string, componentInstance, filter?, keys?, sort?, pagenumber?, pagesize?, resultCallback?: (result) => void,
        errorCallback?: (erroObject: Error) => void) {
        if (this.checkModelExits(dataModelName)) {
            this.dmService.get(dataModelName, filter, keys, sort, pagenumber, pagesize).subscribe(result => {
                resultCallback(result);
            }, error => {
                this.errorCallbackAssign(errorCallback, error);
            });
        } else {
            const invalidDmString = `${this.INVALID_MODEL_NAME}: ${dataModelName}`;
            this.errorCallbackAssign(errorCallback, new Error(invalidDmString))
        }
    }

    public put(dataModelName: string, dataModelObject, resultCallback?: (result) => void, errorCallback?: (errorObject: Error) => void) {
        if (this.checkModelExits(dataModelName)) {
            if (dataModelObject) {
                dataModelObject = Object.assign({}, dataModelObject);
                const des = this.deserializingTest(dataModelName, dataModelObject);
                if (des.errors && des.errors.length === 0) {
                    const deepChecked = this.rDeepCheckModel(dataModelName, dataModelObject, errorCallback, 'update');
                    if (deepChecked && deepChecked.valid) {
                        this.dmService.put(dataModelName, deepChecked.dmObject).subscribe(result => {
                            this.resultCallbackAssign(resultCallback, result);
                        }, error => {
                            this.errorCallbackAssign(errorCallback, error);
                        })
                    } else {
                        this.errorCallbackAssign(errorCallback, new Error(`${this.INVALID_DATA_MODEL_INSTANCE}: ${JSON.stringify(dataModelObject)} for Data Model ${dataModelName}`))
                    }
                } else {
                    errorCallback(des.errors);
                }

            } else {
                this.errorCallbackAssign(errorCallback, new Error(`${this.INVALID_DATA_MODEL_INSTANCE}: ${JSON.stringify(dataModelObject)} for Data Model ${dataModelName}`))
            }
        } else {
            const invalidDmString = `${this.INVALID_MODEL_NAME}: ${dataModelName}`;
            this.errorCallbackAssign(errorCallback, new Error(invalidDmString));
        }
    }

    public validatePut(formObj: NgForm, dataModelName: string, dataModelObject, resultCallback?: (result) => void,
        errorCallback?: (errorObject) => void) {
        const errorArr = [];
        if (formObj && formObj.valid) {
            this.put(dataModelName, dataModelObject, resultCallback, errorCallback);
        } else if (typeof errorCallback === 'function') {
            errorCallback(this.createErrorArr(formObj));
        }
    }

    public update(dataModelName: string, updateObject,
        resultCallback?: (result) => void, errorCallback?: (errorObject: Error) => void) {
        if (this.checkModelExits(dataModelName)) {
            if (updateObject && updateObject['update'] && updateObject['filter']) {
                this.dmService.update(dataModelName, updateObject).subscribe(result => {
                    this.resultCallbackAssign(resultCallback, result);
                }, error => {
                    this.errorCallbackAssign(errorCallback, error);
                });
            } else {
                this.errorCallbackAssign(errorCallback, new Error(`'INVALID_UPDATE_OBJECT : \n
                                        updateObject Eg: { "filter": {}, "update": {}, "options": {}}'`))
            }
        } else {
            const invalidDmString = `${this.INVALID_MODEL_NAME}: ${dataModelName}`;
            this.errorCallbackAssign(errorCallback, new Error(`${invalidDmString}`))
        }
    }

    public validateUpdate(formObj: NgForm, dataModelName: string, updateObject, resultCallback?: (result) => void,
        errorCallback?: (errorObject) => void) {
        if (formObj && formObj.valid) {
            this.update(dataModelName, updateObject, resultCallback, errorCallback);
        } else if (typeof errorCallback === 'function') {
            errorCallback(this.createErrorArr(formObj));
        }
    }

    public delete(dataModelName: string, filter, resultCallback?: (result) => void,
        errorCallback?: (errorObject: Error) => void) {
        if (this.checkModelExits(dataModelName)) {
            if (filter) {
                this.dmService.delete(dataModelName, filter).subscribe(result => {
                    this.resultCallbackAssign(resultCallback, result);
                }, error => {
                    this.errorCallbackAssign(errorCallback, error);
                });
            } else {
                this.errorCallbackAssign(errorCallback, new Error('Invalid filter for ' + dataModelName + '.'));
            }

        } else {
            const invalidDmString = `${this.INVALID_MODEL_NAME}: ${dataModelName}`;
            this.errorCallbackAssign(errorCallback, new Error(invalidDmString));
        }

    }


    public getById(dataModelName: string, dataModelId, resultCallback?: (result) => void, errorCallback?: (error) => void) {
        if (this.checkModelExits(dataModelName)) {
            if (dataModelId) {
                this.dmService.getById(dataModelName, dataModelId).subscribe(result => {
                    this.resultCallbackAssign(resultCallback, result);
                }, error => {
                    this.errorCallbackAssign(errorCallback, error);
                });
            } else {
                const invalidDmString = `INVALID MODEL ID: ${dataModelId}`;
                this.errorCallbackAssign(errorCallback, new Error(invalidDmString));
            }

        } else {
            const invalidDmString = `${this.INVALID_MODEL_NAME}: ${dataModelName}`;
            this.errorCallbackAssign(errorCallback, new Error(invalidDmString))
        }
    }


    public deleteById(dataModelName, dataModelId, resultCallback?: (result) => void,
        errorCallback?: (errorObject: Error) => void) {
        if (this.checkModelExits(dataModelName)) {
            if (dataModelId) {
                this.dmService.deleteById(dataModelName, dataModelId).subscribe(result => {
                    this.resultCallbackAssign(resultCallback, result);
                }, error => {
                    this.errorCallbackAssign(errorCallback, error);
                });
            } else {
                const invalidDmString = `INVALID MODEL ID: ${dataModelId}`;
                this.errorCallbackAssign(errorCallback, new Error(invalidDmString));
            }
        } else {
            const invalidDmString = `${this.INVALID_MODEL_NAME}: ${dataModelName}`;
            this.errorCallbackAssign(errorCallback, new Error(invalidDmString));
        }
    }

    public updateById(dataModelName: string, dataModelId, dataModelObject, resultCallback?: (result) => void, errorCallback?: (erroObject) => void) {
        if (dataModelId) {
            if (this.checkModelExits(dataModelName)) {
                if (dataModelObject) {
                    dataModelObject = Object.assign({}, dataModelObject);
                    const des = this.deserializingTest(dataModelName, dataModelObject);
                    if (des.errors && des.errors.length === 0) {
                        const deepChecked = this.rDeepCheckModel(dataModelName, dataModelObject, errorCallback, 'update');
                        if (deepChecked && deepChecked.valid) {
                            this.dmService.updateById(dataModelName, dataModelId, deepChecked.dmObject).subscribe(result => {
                                this.resultCallbackAssign(resultCallback, result);
                            }, error => {
                                this.errorCallbackAssign(errorCallback, new Error(`${this.INVALID_DATA_MODEL_INSTANCE}: ${JSON.stringify(dataModelObject)} for Data Model ${dataModelName}`))
                            })
                        } else {
                            this.errorCallbackAssign(errorCallback, new Error(`${this.INVALID_DATA_MODEL_INSTANCE}: ${JSON.stringify(dataModelObject)} for Data Model ${dataModelName}`))
                        }
                    } else {
                        errorCallback(des.errors);
                    }
                } else {
                    this.errorCallbackAssign(errorCallback, new Error(`${this.INVALID_DATA_MODEL_INSTANCE}: ${JSON.stringify(dataModelObject)} for Data Model ${dataModelName}`))
                }
            } else {
                const invalidDmString = `${this.INVALID_MODEL_NAME}: ${dataModelName}`;
                this.errorCallbackAssign(errorCallback, new Error(invalidDmString));
            }
        } else {
            const invalidDmString = `INVALID MODEL ID: ${dataModelId}`;
            this.errorCallbackAssign(errorCallback, new Error(invalidDmString));
        }
    }

    private resultCallbackAssign(resultCallback, result) {
        if (resultCallback) {
            this.callbackAssign(resultCallback, result, 'INVALID_RESULT_CALLBACK');
        } else {
            console.log(result);
        }
    }

    private errorCallbackAssign(errorCallback, errorObj: Error) {
        const errorArr = [];
        if (errorCallback) {
            errorArr.push(errorObj);
            this.callbackAssign(errorCallback, errorArr, 'INVALID_ERROR_CALLBACK');
        } else {
            console.error(errorObj);
        }
    }

    private callbackAssign(callback, returnObj, errorMessage?, errorObj?: Error) {
        if (typeof callback === 'function') {
            callback(returnObj);
        }
    }

    private createErrorArr(formObj: NgForm) {
        const errorObjArr = [];
        const controls = Object.keys(formObj.controls);
        if (formObj) {
            for (let i = 0; i < controls.length; i++) {
                if (!formObj.controls[controls[i]].valid) {
                    errorObjArr.push(new Error(`INVALID_FIELD: ${controls[i]} - ${JSON.stringify(formObj.controls[controls[i]].errors)}`))
                }
            }
        } else {
            errorObjArr.push(new Error(`INVALID_FORM: Invalid form object.`))
        }
        return errorObjArr;
    }

    private checkModelExits(modelName) {
        if (models && models[modelName]) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Recursively checking extra properties error
     */
    private rDeepCheckModel(modelName, dmObject, errorCallback, type?) {
        let checkObjectAgaistModel: any = {};
        if (type == 'update' && dmObject.hasOwnProperty('_id')) {
            delete dmObject['_id'];
        }
        checkObjectAgaistModel = this.checkExtraProperties(modelName, dmObject, errorCallback);
        if (checkObjectAgaistModel && checkObjectAgaistModel.valid) {
            var keysList = Object.keys(dmObject);
            for (var key = 0; key < keysList.length; key++) {
                if (typeof dmObject[keysList[key]] === 'object') {
                    if (Object.prototype.toString.call(dmObject[keysList[key]]) === '[object Date]') {
                        dmObject[keysList[key]] = {
                            '$date': dmObject[keysList[key]]
                        }
                        continue;
                    }
                    const classPropertyName = this.getClassPropertyName(modelName, keysList[key]);
                    if (classPropertyName && dmObject[keysList[key]]) {
                        return this.rDeepCheckModel(classPropertyName, dmObject[keysList[key]], errorCallback);
                    } else {
                        // throw new Error(`INVALID_MODEL_INSTANCE : ${key} for ${classPropertyName} in ${modelName}`)
                        this.errorCallbackAssign(errorCallback,
                            new Error(`INVALID_MODEL_INSTANCE : ${keysList[key]} for ${classPropertyName} in ${modelName}`));
                    }
                }
            }
            return {
                valid: true,
                dmObject: dmObject
            };
        } else {
            this.throwExtraPropertiesError(checkObjectAgaistModel.extraKeysArr, modelName, errorCallback);
        }
    }

    private getClassPropertyName(modelName, propertyName) {
        const keyName = modelName + '.' + propertyName;
        const instanceMappingsArr: Array<any> = new models[modelName]()['__jsonconvert__mapping__'];
        if (instanceMappingsArr[keyName]) {
            return instanceMappingsArr[keyName]['expectedJsonType']['name'];
        } else {
            return null;
        }
    }

    /**
     * Checks if extra properties are present if present return array of those extra invalid properties with
     * valid = false else {valid: true, extraKeyArr: []}
     */
    private checkExtraProperties(modelName, dmObject, errorCallback): { valid: boolean, extraKeysArr: Array<any> } {
        if (modelName && models[modelName]) {
            if (dmObject) {
                const tempModelObjectKeysArr = Object.keys(dmObject);
                const tempDataModelKeysArr = Object.keys(new models[modelName]());
                const extraKeysArr = this.arrDiff(tempDataModelKeysArr, tempModelObjectKeysArr);
                if (extraKeysArr.length > 0) {
                    return {
                        valid: false,
                        extraKeysArr: extraKeysArr
                    }
                } else {
                    return {
                        valid: true,
                        extraKeysArr: []
                    }
                }
            } else {
                this.errorCallbackAssign(errorCallback, new Error(`${this.INVALID_DATA_MODEL_INSTANCE} ${dmObject} of ${modelName}`));
            }
        } else {
            this.errorCallbackAssign(errorCallback, new Error(`${this.INVALID_MODEL_NAME}: ${modelName}`));
        }
    }

    /**
     * Returns difference between objectKeysArr and modelKeysArr
     * Examples,
     * 1.
     * Model: {
     *  A: undefined,
     *  B: undefined
     * }
     * ModelArr = [A, B]
     *
     * Object: {
     *  A: 'A',
     *  B: 'B',
     *  C: 'C'
     * }
     * ObjectArr = [A, B, C]
     * arr(ModelArr, ObjectArr) returns [C]
     *
     * 2.
     * ModelArr = [C]
     * ObjectArr = [A, B]
     * arrDiff(ModelArr, ObjectArr) returns [C]
     *
     */
    private arrDiff(modelKeysArr: Array<any>, objectKeysArr: Array<any>): Array<any> {
        return objectKeysArr.filter(function (i) { return modelKeysArr.indexOf(i) < 0; });
    }

    /**
     * Return if invalid properties are present in the object
     */
    private throwExtraPropertiesError(invalidPropertiesList: Array<any>, modelName, errorCallback) {
        let errorString = 'INVALID_MODEL_PROPERTIES of ' + modelName + ': ';
        if (invalidPropertiesList.length > 1) {
            for (let i = 0; i < invalidPropertiesList.length; i++) {
                if (i !== invalidPropertiesList.length - 1) {
                    errorString += invalidPropertiesList[i] + ', ';
                } else {
                    errorString += invalidPropertiesList[i];
                }
            }
        } else {
            errorString += invalidPropertiesList[0];
        }
        this.errorCallbackAssign(errorCallback, new Error(errorString));
    }

    private deserializingTest(dataModelName: string, dataModelObject: Object) {
        if (dataModelName && dataModelObject) {
            /**
             *  jsonConvert returns {
             *      instance: classInstance/ classInstances,
             *      errors: []
             * }
             */
            const des = this.jsonConvert.deserialize(dataModelObject, models[dataModelName]);
            return des;
        }
    }

}

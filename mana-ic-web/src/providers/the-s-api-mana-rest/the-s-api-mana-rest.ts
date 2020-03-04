import { HttpClient } from '@angular/common/http';
import { ITheSManaLibProvider, confirmMessage } from '../mana-service/i-thes-mana-lib-provider';

/*
  Generated class for the TheSApiManaRestProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class TheSApiManaRestProvider implements ITheSManaLibProvider {

  private apiBase: string;
  private apiUrls: Map<string, string> = new Map<string, string>();

  constructor(apiBaseUrl: string, private http: HttpClient) {
    console.log('Hello TheSApiManaRestProvider Provider');
    this.apiBase = apiBaseUrl;
  }

  public initPageApi(mcontentid: string): Promise<any> {
    return new Promise<any>((resolver, rejector) => {
      if (this.apiUrls.has(mcontentid)) {
        resolver(this.apiUrls.get(mcontentid));
      } else {
        console.log('Get mcid: ' + mcontentid);
        this.http.get<InitPageAPI>(this.apiBase + "/api/mcontent/form/" + mcontentid).subscribe(data => {
          this.apiUrls.set(mcontentid, data.url);
          resolver(data.url);
        }, err => rejector(err));
      }
    });
  }

  public initPageApiWithCallBack(mcontentid: string, fn: () => void): Promise<any> {
    return new Promise<any>((resolver, rejector) => {
      if (this.apiUrls.has(mcontentid)) {
        resolver(this.apiUrls.get(mcontentid));
      } else {
        console.log('Get mcid: ' + mcontentid);
        this.http.get<InitPageAPI>(this.apiBase + "/api/mcontent/form/" + mcontentid).subscribe(data => {
          this.apiUrls.set(mcontentid, data.url);
          resolver(data.url);
        }, err => rejector(err));
      }
    });
  }

  public getApiData(mcid: string): Promise<any> {
    return this.initPageApi(mcid).then(url => {
      console.log('[getApiData]: ' + url);
      return this.http.get(url).toPromise()
    });
  }

  public getApiDataWithEndpointId(mcid: string, endpointId: string): Promise<any> {
    return this.initPageApi(mcid).then(url => {
      console.log('[getApiData]: ' + url);
      return this.http.get(url + "/" + endpointId).toPromise()
    });
  }

  public submitFormData(mcid: string, data: any, manualClose: boolean = true) {
    var prom = this.initPageApi(mcid).then(url => this.http.post(url, data).toPromise());
    if (!manualClose) {

    }
    return prom;
  }

  public submitFormDataWithEndpointId(mcid: string, data: any, endpointId: string, manualClose: boolean) {
    var prom = this.initPageApi(mcid).then(url => this.http.post(url + "/" + endpointId, data).toPromise());
    if (!manualClose) {

    }
    return prom;
  }

  public callApiGet(mcid: string, url: string): Promise<any> {
    return this.http.get(url).toPromise();
  }

  public callApiPost(mcid: string, data: any): Promise<any> {
    var prom = this.initPageApi(mcid).then(url => this.http.post(url, data).toPromise());
    return prom;
  }

  public callApiDelete(mcid: string): Promise<any> {
    return this.initPageApi(mcid).then(url => this.http.delete(url).toPromise());
  }

  public visitEndpoint(mcid: string, url: string) {
    switch (url) {
      default: window.location.assign(url); break;
    }
  }

  public getAppBridge(): Promise<any> {
    return new Promise<any>(() => { });
  }

  public callTrigger(mcid: string, triggerName: string) {
    switch (triggerName) {
      default: window.location.assign(triggerName); break;
    }
  }

  validForm(valid: boolean) {
    console.log("form validation status :" + valid)
  }

  confirmForm(meesage: confirmMessage): Promise<any> {
    throw new Error("Method not implemented.");
  }

  public selectImage(mcid: string): Promise<any> {
    return new Promise<any>(() => { });
  }

  setButtonVisibility(isVisible: boolean) {
    console.log("setButtonVisibility:" + isVisible)
  }

  setStateChangedHandler(fn: (param) => void) {
    console.log("setStateChangedHandler")
  }

  addToolbarAction(fn: (action) => void) {
    console.log("addToolbarItem")
  }

  showOptionDialog(mcid: any, params: any): Promise<any> {
    return new Promise<any>(() => { });
  }

  public async initOptionDialog(mcid: string, fn: (param) => any): Promise<any> {
    return new Promise<any>(() => { });
  }
}

interface InitPageAPI {
  url: string;
}
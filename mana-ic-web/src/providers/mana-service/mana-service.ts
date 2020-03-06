import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';

import { TheSApiManaRestProvider } from '../the-s-api-mana-rest/the-s-api-mana-rest';
import { TheSAppManaBridgeProvider } from '../the-s-app-mana-bridge/the-s-app-mana-bridge';
import { ITheSManaLibProvider, confirmMessage } from './i-thes-mana-lib-provider';

@Injectable()
export class ManaServiceProvider {

  private apiBase = "https://api-mana-from.azurewebsites.net";

  constructor(public http: HttpClient, private zone: NgZone) {
    TheSAppManaBridgeProvider.InitAppBridge(new TheSApiManaRestProvider(this.apiBase, http), this.zone);
  }

  public async initPageApi(mcid: string) {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    manaSvc.initPageApi(mcid);
  }

  public async initPageApiWithCallBack(mcid: string, fn: () => void) {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    manaSvc.initPageApiWithCallBack(mcid, fn);
  }

  public async getApiData(mcid: string): Promise<any> {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return this.retry(() => manaSvc.getApiData(mcid));
  }

  public async getApiDataWithEndpointId(mcid: string, endpointId: string): Promise<any> {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return this.retry(() => manaSvc.getApiDataWithEndpointId(mcid, endpointId));
  }

  public async submitFormData(mcid: string, data: any, manualClose: boolean = false) {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return manaSvc.submitFormData(mcid, data, manualClose);
  }

  public async submitFormDataWithEndpointId(mcid: string, data: any, manualClose: boolean, endpointId: string) {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return manaSvc.submitFormDataWithEndpointId(mcid, data, endpointId, manualClose);
  }

  public async callApiGet(mcid: string, url: string): Promise<any> {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return this.retry(() => manaSvc.callApiGet(mcid, url));
  }

  public async callApiPost(mcid: string, data: any): Promise<any> {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return manaSvc.callApiPost(mcid, data);
  }

  public async callApiDelete(mcid: string): Promise<any> {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return manaSvc.callApiDelete(mcid);
  }

  public async visitEndpoint(mcid: string, url: string) {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    manaSvc.visitEndpoint(mcid, url);
  }

  public async callTrigger(mcid: string, triggerName: string) {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    manaSvc.callTrigger(mcid, triggerName);
  }

  public async validForm(valid: boolean) {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    manaSvc.validForm(valid);
  }

  public async confirmForm(message: confirmMessage): Promise<any> {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return manaSvc.confirmForm(message);
  }

  public async selectImage(mcid: string): Promise<any> {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return manaSvc.selectImage(mcid);
  }

  public async setButtonVisibility(isVisible: boolean): Promise<any> {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return manaSvc.setButtonVisibility(isVisible);
  };

  public async setStateChangedHandler(fn: (paeam) => void) {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    manaSvc.setStateChangedHandler(fn);
  }

  public async addToolbarAction(fn: (action) => void) {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    manaSvc.addToolbarAction(fn);
  }

  public async showOptionDialog(mcid: any, params: any): Promise<any> {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return manaSvc.showOptionDialog(mcid, params);
  }

  public async initOptionDialog(mcid: string, fn: (param) => any): Promise<any> {
    var manaSvc = await TheSAppManaBridgeProvider.GetService();
    return this.retry(() => manaSvc.initOptionDialog(mcid, fn));
  }

  private retry(fn: () => Promise<{}>, intervals = [250, 250, 222, 200]) {
    return new Promise((resolve, reject) => {
      let fn2call = fn;
      if (intervals.length > 0) {
        let waitTime = 2 * +intervals[intervals.length - 1];
        fn2call = () => this.circuitBreaker(fn, waitTime);
      }
      fn2call()
        .then(resolve)
        .catch((error) => {
          if (intervals.length == 0) {
            // reject('maximum retries exceeded');
            reject(error);
            return;
          } else {
            var interval = intervals.pop();
            setTimeout(() => {
              // Passing on "reject" is the important part
              this.retry(fn, intervals).then(resolve, reject);
            }, interval);
          }
        });
    });
  }

  private circuitBreaker(fn: () => Promise<{}>, internval: number): Promise<{}> {
    return new Promise((resolve, reject) => {
      let timer = setTimeout(() => {
        reject({ timeout: true });
      }, internval);
      let prom = fn();
      prom.then(it => {
        clearTimeout(timer);
        resolve(it);
      }).catch(reject);
    });
  }

}
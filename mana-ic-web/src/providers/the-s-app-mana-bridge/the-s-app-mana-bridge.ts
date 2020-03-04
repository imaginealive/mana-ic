import { ITheSManaLibProvider, confirmMessage } from '../mana-service/i-thes-mana-lib-provider';
import { ReplaySubject, Observable } from 'rxjs';
import { ManaServiceProvider } from '../mana-service/mana-service';
import { NgZone } from '@angular/core';


declare function TheSHybridCall(methodName: string, parameter: any): void;
declare function TheSHybridFunc(methodName: string, parameter: string, callback: any): void;

// (<any>window).TheSAppHybridFuncsReady = () => {
//   TheSAppManaBridgeProvider.IsRunInApp = true;
// };

/*
  Generated class for the TheSAppManaBridgeProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
export class TheSAppManaBridgeProvider implements ITheSManaLibProvider {

  public static IsRunInApp: boolean = false;
  private static webConnect: ITheSManaLibProvider;
  private static appBridge: ITheSManaLibProvider;
  private static zone: NgZone;

  private static isPushTemp: Boolean = false;

  private callBackFunc: () => void;
  private onStateChangedFunc: (param) => void;
  private onSelectToolbar: (action) => void;
  private onOptionSelected: (response) => any;

  public static InitAppBridge(restConnect: ITheSManaLibProvider, zone: NgZone): void {
    // TheSAppManaBridgeProvider.IsRunInApp = true;//(<any>window).TheSAppHybridAvail != undefined;

    this.webConnect = restConnect;
    this.zone = zone;
    this.appBridge = new TheSAppManaBridgeProvider();
  }

  // public static async GetService(): Promise<ITheSManaLibProvider> {
  //   return await new Promise<ITheSManaLibProvider>((resolver, rejector) => {
  //     resolver(this.appBridge.getAppBridge());
  //   });
  // }

  public static async GetService(): Promise<ITheSManaLibProvider> {
    return await new Promise<ITheSManaLibProvider>((resolver, rejector) => {
      resolver(this.appBridge.getAppBridge());
    });
  }

  constructor() {
    // if (true) { //(TheSAppManaBridgeProvider.IsRunInApp) {
    //   this.hideContent();
    // }
    this.hideContent();

    (<any>window).refreshOnGoBack = () => { this.executeCallBackFunc() };

    (<any>window).OnStateChanged = (param) => { this.executeOnStateChanged(param) };

    (<any>window).OnSelectToolbar = (action) => { this.excuteToolbarItemFunc(action) };

    (<any>window).onOptionSelected = (response) => { return this.excuteOnOptionSelected(response) };

    console.log('Hello TheSAppManaBridgeProvider Provider');
  }

  initPageApi(mcontentid: string): Promise<any> {
    this.hideContent();

    return TheSAppManaBridgeProvider.callAppMethod('initPageApi', mcontentid);
  }

  initPageApiWithCallBack(mcontentid: string, fn: () => void): Promise<any> {
    this.callBackFunc = fn;

    this.hideContent();

    return TheSAppManaBridgeProvider.callAppMethod('initPageApi', mcontentid);
  }

  getApiData(mcid: string): Promise<any> {
    return TheSAppManaBridgeProvider.callNativeFunc('getApiData', mcid);
  }
  getApiDataWithEndpointId(mcid: string, endpointId: string): Promise<any> {
    return TheSAppManaBridgeProvider.callNativeFunc('getApiDataWithEndpointId', JSON.stringify({ mcid: mcid, endpointId: endpointId }));
  }
  submitFormData(mcid: string, data: any, manualClose: boolean) {
    TheSAppManaBridgeProvider.callAppMethod('submitFormData', { mcid: mcid, data: data, shouldClose: !manualClose });
  }
  submitFormDataWithEndpointId(mcid: string, data: any, endpointId: string, manualClose: boolean) {
    TheSAppManaBridgeProvider.callAppMethod('submitFormDataWithEndpointId', { mcid: mcid, data: data, endpointId: endpointId, shouldClose: !manualClose });
  }
  callApiGet(mcid: string, url: string): Promise<any> {
    console.log("Hello callApiGet Bridge " + mcid);
    return TheSAppManaBridgeProvider.callNativeFunc('callApiGet', JSON.stringify({ mcid: mcid, url: url }));
  }
  callApiPost(mcid: string, data: any): Promise<any> {
    return TheSAppManaBridgeProvider.callNativeFunc('callApiPost', JSON.stringify({ mcid: mcid, data: data }))
  }
  callApiDelete(mcid: string): Promise<any> {
    return TheSAppManaBridgeProvider.callNativeFunc('getApiData', mcid);
  }
  visitEndpoint(mcid: string, url: string): void {
    TheSAppManaBridgeProvider.callNativeFunc('visitEndpoint', JSON.stringify({ mcid: mcid, url: url }));
  }
  callTrigger(mcid: string, triggerName: string): void {
    TheSAppManaBridgeProvider.callNativeFunc('callTrigger', JSON.stringify({ mcid: mcid, triggerName: triggerName }));
  }

  validForm(valid: boolean) {
    TheSAppManaBridgeProvider.callAppMethod('validForm', valid);
  }

  confirmForm(meesage: confirmMessage): Promise<any> {
    return TheSAppManaBridgeProvider.callNativeFunc('confirmForm', JSON.stringify(meesage));
  }

  getAppBridge(): Promise<any> {
    return this.retry(() => this.retryGetTheSHybridFunc(), [2000,2000, 1500, 999, 500, 200, 99, 50, 50, 50, 50, 20, 10]);
  }

  selectImage(mcid: string): Promise<any> {
    return TheSAppManaBridgeProvider.callNativeFunc('selectImage', mcid);
  }

  setButtonVisibility(isVisible: boolean) {
    TheSAppManaBridgeProvider.callAppMethod('setButtonVisibility', isVisible);
  }

  setStateChangedHandler(fn: (param) => void) {
    this.onStateChangedFunc = fn;
  }

  addToolbarAction(fn: (action) => void) {
    this.onSelectToolbar = fn;
  }

  showOptionDialog(mcid: any, params: any): Promise<any> {
    return TheSAppManaBridgeProvider.callNativeFunc('showOptionDialog', JSON.stringify({ mcid: mcid, params: params }));
  };

  public async initOptionDialog(mcid: string, fn: (response) => any): Promise<any> {
    this.onOptionSelected = fn;
    return TheSAppManaBridgeProvider.callNativeFunc('initOptionDialog', JSON.stringify({ mcid: mcid }));
  }

  retryGetTheSHybridFunc(): Promise<any> {
    return new Promise((resolver, rejector) => {
      if (typeof TheSHybridFunc == "undefined" || !TheSHybridFunc) {
        rejector();
      } else {
        resolver(this);
      }
    });
  }

  private hideContent() {
    var hideContentStyle = document.querySelector("style#app-hide-content");

    if (!hideContentStyle) {
      var style = document.createElement("style");
      style.setAttribute("id", "app-hide-content");
      style.type = "text/css";
      var css = "#app-form-submit {display: none;} ion-header:not(.home-header) {display: none;}";
      style.appendChild(document.createTextNode(css));
      document.head.appendChild(style);
    }
  }

  private static showContent() {
    var hideContentStyle = document.querySelector("style#app-hide-content");

    if (hideContentStyle) {
      document.head.removeChild(hideContentStyle);
    }
  }

  private static callAppMethod(fName: string, fParam: any) {
    return new Promise((resolve, reject) => {
      try {
        TheSHybridCall(fName, fParam);
        resolve({});
      } catch (error) {
        console.log(error);
        resolve(error);
      }
    });
  }

  private static callNativeFunc(fName: string, fParam: string) {
    return new Promise((resolve, reject) => {
      try {
        TheSHybridFunc(fName, fParam, rsp => resolve(rsp));
      } catch (error) {
        resolve(error);
      }
    });
  }

  private retry(fn: () => Promise<{}>, intervals = [150, 99, 89, 79]) {
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

  private executeCallBackFunc() {
    if (this.callBackFunc) {
      TheSAppManaBridgeProvider.zone.run(() => {
        this.callBackFunc();
      });
    }
  }

  private executeOnStateChanged(param) {
    if (this.onStateChangedFunc) {
      TheSAppManaBridgeProvider.zone.run(() => {
        this.onStateChangedFunc(param);
      });
    }
  }

  private excuteToolbarItemFunc(action) {
    if (this.onSelectToolbar) {
      TheSAppManaBridgeProvider.zone.run(() => {
        this.onSelectToolbar(action);
      });
    }
  }

  private excuteOnOptionSelected(response): any {
    if (this.onOptionSelected) {
      // TheSAppManaBridgeProvider.zone.run(() => { return this.onOptionSelected(response) });
      return this.onOptionSelected(response);
    }
  }
}
export interface ITheSManaLibProvider {

    initPageApi(mcontentid: string): Promise<any>;

    initPageApiWithCallBack(mcontentid: string, fn: () => void): Promise<any>;

    getApiData(mcid: string): Promise<any>;

    getApiDataWithEndpointId(mcid: string, endpointId: string): Promise<any>;

    submitFormData(mcid: string, data: any, manualClose: boolean);

    submitFormDataWithEndpointId(mcid: string, data: any, endpointId: string, manualClose: boolean);

    callApiGet(mcid: string, url: string): Promise<any>;

    callApiPost(mcid: string, data: any): Promise<any>;

    callApiDelete(mcid: string): Promise<any>;

    visitEndpoint(mcid: string, url: string): void;

    callTrigger(mcid: string, triggerName: string): void;

    validForm(valid: boolean);

    confirmForm(meesage: confirmMessage): Promise<any>;

    getAppBridge(): any;

    selectImage(mcid: string): Promise<any>;

    setButtonVisibility(isVisible: boolean);

    setStateChangedHandler(fn: (param) => void);

    addToolbarAction(fn: (action) => void);
    
    showOptionDialog(mcid: any, params: any): Promise<any>;
    
    initOptionDialog(mcid: string, fn: (param) => any): Promise<any>;
}

export class confirmMessage {
    title: string;
    message: string;
    confirmText: string;
    cancelText: string;
    constructor(title: string, message: string, confirmText?: string, cancelText?: string) {
        this.title = title;
        this.message = message;
        this.confirmText = confirmText;
        this.cancelText = cancelText;
    }
}
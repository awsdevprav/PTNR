export class RawModel {
    constructor() {

    }
    public link: string;
    public sa: string;
    public txn: string;
    public ch: string;
    public uid: string;
    public type: string;
    public environment: string;
    public ver: string
}

export class KYCModel {
    constructor() {
    }
    public uid: string;
    public subAuaCode: string;
    public pvflag: boolean;
    public terminalId: string;
    public txn: string;
    public environment: string;
    public version: string;
    public ac: string;
    public aualicense: string;
    public otp: string;
}


export class KYCConnectorResponseModelPoa {
    public co: string;
    public house: string;
    public street: string;
    public loc: string;
    public vtc: string;
    public dist: string;
    public state: string;
    public country: string;
    public pc: string;
}
export class KYCConnectorResponseModelPoi {
    public name: string;
    public dob: string;
}

export class KYCConnectorResponseModelPht {
    public text: string;
}
export class KYCStatusListModel {
    public aadharCard: string;
    public status: string;
    public username: string;
    public creationDateTime: string;
    isSelected: boolean = false;
}

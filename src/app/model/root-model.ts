export class RootModel {
    constructor() {

    }
    public name: string;
    public request: RequestModel;
    public response: Object[] = [];
}


export class RequestModel {
    constructor() {

    }
    public method: string;
    public header: Object[] = [];
    public body: BodyModel;
    public url: string;
}

export class BodyModel {
    constructor() {

    }
    public mode: string;
    public raw: any;//RawModel;
    public options: OptionsModel;
}

export class OptionsModel {
    constructor() {

    }
    public options: OptionsRawModel;

}
export class OptionsRawModel {
    constructor() {

    }
    public raw: OptionsRawLanguageModel;
}
export class OptionsRawLanguageModel {
    constructor() {

    }
    public language: string;
}
declare namespace Base {
    export interface IUser {
        username: any;
        firstName: any;
        lastName: any;
        email: any;
        password: any;
        confirmation: any;
        role: any;
        phone: any;
        comments: any;
        visits: any;
        provider: any;
        fee: any;
    }
    export interface IConfirmation {
        status: any;
        feedback: any;
    }

    export interface IFee {
        ammount: any;
        date: any;
    }
    export type Versionable<T> = T & { current: any, previous: Array<any> };
}
declare namespace Model {
    export interface IConfirmation {
        status: number;
        feedback: string;
    }
    export interface IFee {
        ammount: number;
        date: string;
    }
}
declare type Indexable<T> = T & { _id: any; };
declare type Versionable<T> = { current: T, previous: Array<T> };
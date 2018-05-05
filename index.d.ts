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
    }
    export interface IConfirmation {
        type: any;
        feedback: any;
    }
}
declare type Indexable<T> = T & { _id: any; };
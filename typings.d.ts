declare namespace Base {
    export interface IUser {
        firstName: any;
        lastName: any;
        email: any;
        password: any;
        confirmation: any;
        role: any;
        phone: any;
        comments: any;
        visits: any;
    }
    export interface IConfirmation {
        type: any;
        feedback: any;
    }
}
declare type Indexable<T> = T & { _id: any; };
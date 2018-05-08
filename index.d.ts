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

declare module 'express-hbs' {
    interface Options {
        //"{String/Array} [Required] Path to partials templates, one or several directories",
        partialsDir?: string | string[]

        // OPTIONAL settings
        //"{String} Override 'block' helper name.",
        blockHelperName?: string;
        //"{String} Override 'contentFor' helper name.",
        contentHelperName?: string;
        //"{String} Absolute path to default layout template",
        defaultLayout?: string;
        //"{String} Extension for templates & partials, defaults to `.hbs`",
        extname?: string;
        //"{Module} Use external handlebars instead of express-hbs dependency",
        handlebars?: any;
        //"{Object} i18n object",
        i18n?: string;
        //"{String} Path to layout templates",
        layoutsDir?: string;
        //"{Object} options to pass to template()",
        templateOptions?: string;
        //"{Boolean} whether to pretty print HTML, see github.com/einars/js-beautify .jsbeautifyrc,
        beautify?: boolean;

        // override the default compile
        onCompile?(exhbs: any, source:string, filename:string): any;
}

function express4(options: Options): Function;
}

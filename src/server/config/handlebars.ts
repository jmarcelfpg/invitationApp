import hbs from 'express-hbs';

export default function () {
    hbs.registerHelper('list', function (context, options) {
        let ret = '<ul class="navigator">';

        for (let i = 0, j = context.length; i < j; i++) {
            ret = ret + options.fn(context[i]);
        }

        return ret + '</ul>';
    });
}

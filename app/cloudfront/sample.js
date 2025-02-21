function handler(event) {
    const request = event.request;
    const uri = request.uri;

    if(uri === '/') {
        // home to jump page
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers:
                { "location": { "value": '/jump' } } // override ur"i"
        }
    } else if(request.uri.match(/\A\/index.html?\z/)) {
        // /index.html -> /
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers:
                { "location": { "value": '/' } } // override ur"i"
        }
    } else if (uri === '/jump') {
        // Jump Page, You must consider SECURITIES
        // 本当は、ここでcookie を参照して url の分岐をしたい
        let lang = 'en';
//    if(request["accept-language"]['value'].split(/,|;/).filter((lang) => ( lang === 'en')).length() >= 1) {
//        lang = 'en';
//    }
        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers:
                {
                    "location": { "value": `https://${lang}.umaxica.com`},
                    'x-frame-options' : { 'value' : 'DENY'} // - Click jacking
                }
         }
    } else if (uri !== '/' && uri.endsWith('/')) {
        // all index pages should be index.html without homepage.
       return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers:
                { "location": { "value": `${request.uri}index.html` } }
        }
    } else if (uri !== '/'&& !uri.endsWith('/') && !uri.includes('.') ) {
        // uri regulation (e.g. /sample -> /sample/)
        return {
            statusCode: 301,
            statusDescription: 'Moved Permanently',
            headers:
                { "location": { "value": `${uri}/` } }
        }
     }

    return request;
}

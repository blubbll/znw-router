//znw-router by blubbll
//© 2019

"use strict";

const//imports
express = require('express'),
proxy = require('http-proxy-middleware'),
compression = require('compression');

//where to proxy to
let proxTo = "https://znw.eu-4.evennode.com";

var app = express();
app.listen(process.env.PORT, '0.0.0.0');

var forwarding = proxy({
    followRedirects: false,
    target: proxTo, // target host
    xfwd: true, //add forward headers
    changeOrigin: true, // needed for virtual hosted sites
    ws: true, // proxy websockets
    router: {
        proxTo: `${proxTo}/`,
        'znw.io': `${proxTo}/znw.io`,
        'www.znw.io': `${proxTo}/znw.io`,
        'zircon.network': `${proxTo}/zircon.network`,
        'www.zircon.network': `${proxTo}/www.zircon.network`
    }
});
app.use(compression()).use(forwarding);
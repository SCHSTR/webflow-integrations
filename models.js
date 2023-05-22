
export function stringToObject(str) {
    const obj = {};
    str.split(",").forEach((pair) => {
        const [key, value] = pair.split(":");
        obj[key] = parseInt(value);
    });
    return obj;
}

export function getOneTrustCookies(cookieJar) {
    let candy;
    cookieJar.split(" ").forEach(cookie => {
        let name = cookie.split("=")[0];
        if (name === "OptanonConsent") {
            candy = cookie
        }
    })
    return candy
}

export function getOneTrustPermissions(cookie) {
    let permissions;
    let groups;
    let vendors;
    let hosts;

    if (cookie.length == 0) return window.location.reload();
    cookie.split("&").forEach(category => {
        let name = category.split("=")[0];
        let content = category.split("=")[1]
        switch (name) {
            case "groups":
                groups = content
                break;

            case "genVendors":
                vendors = content
                break;

            case "hosts":
                hosts = content
                break;
        }
    })

    return permissions = {
        groups: decodeURIComponent(groups),
        genVendors: decodeURIComponent(vendors),
        hosts: decodeURIComponent(hosts)
    }
}

export function runAnalytics(serial) {
    window.ga = window.ga || function () { (ga.q = ga.q || []).push(arguments) }; ga.l = +new Date;
    ga('create', serial, 'auto');
    ga('send', 'pageview');
}
export function runGTag(serial) {
    window.dataLayer = window.dataLayer || [];
    function gtag() { dataLayer.push(arguments); }
    gtag('js', new Date());

    gtag('config', serial);
}
export function runMetaPixel(serial) {
    !function (f, b, e, v, n, t, s) {
        if (f.fbq) return; n = f.fbq = function () {
            n.callMethod ?
            n.callMethod.apply(n, arguments) : n.queue.push(arguments)
        };
        if (!f._fbq) f._fbq = n; n.push = n; n.loaded = !0; n.version = '2.0';
        n.queue = []; t = b.createElement(e); t.async = !0;
        t.src = v; s = b.getElementsByTagName(e)[0];
        s.parentNode.insertBefore(t, s)
    }(window, document, 'script',
        'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', serial);
    fbq('track', 'PageView');
}

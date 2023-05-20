var checkCookie = function () {
    var lastCookie = document.cookie; // 'static' memory between function calls
    return function () {
        var currentCookie = document.cookie;
        if (currentCookie != lastCookie) {
            // something useful like parse cookie, run a callback fn, etc.
            lastCookie = currentCookie; // store latest cookie
        }
    };
}();

//window.setInterval(checkCookie, 500);

window.addEventListener('load', function () {
    setTimeout(() => {
        window.setInterval(checkCookie, 500);

        let x = getOneTrustCookies(document.cookie)
        console.log(x)
        
        //console.log(this.permissionsRender)
      }, 1000)
})

let x = getOneTrustCookies(document.cookie)
console.log(x)

function getOneTrustCookies(cookieJar) {
    let candy;
    cookieJar.split(" ").forEach(cookie => {
        let name = cookie.split("=")[0];
        if (name === "OptanonConsent") {
            candy = cookie
        }
    })
    return candy
}
const { createApp } = Vue

createApp({
  data() {
    return {
      lastPermissions: null,
      permissionsRender: null,
      checkBiscoitos: () => {
        //console.log("Run 1")
        //console.log(document.cookie.length)
        let lastCookie = document.cookie;
        let lastOneTrust = this.getOneTrustCookies(lastCookie);
        this.lastPermissions = this.getOneTrustPermissions(lastOneTrust);

        //console.log(this.lastPermissions)
        this.filterScripts(this.lastPermissions.groups, "groups")
        this.filterScripts(this.lastPermissions.genVendors, "vendors")

        return () => {
          // console.log("Run 2")
          let currentCookie = document.cookie;
          let currentOneTrust = this.getOneTrustCookies(currentCookie);
          let currentPermission = this.getOneTrustPermissions(currentOneTrust);

          //console.log(this.lastPermissions)

          if(JSON.stringify(currentPermission) === JSON.stringify(this.lastPermissions)){
            //console.log("The objects are the same 🐐")
          }

          if(JSON.stringify(currentPermission) != JSON.stringify(this.lastPermissions)){
            //console.log("The objects are different 👹")
            window.location.reload()

            // store latest cookie
            this.lastPermissions = currentPermission
            lastCookie = currentCookie;
          }
        };
      }
    }
  },
  mounted() {
        setTimeout(() => {
          window.setInterval(this.checkBiscoitos(), 100);

          let cookies = Object.entries(this.lastPermissions);

          cookies.forEach(element => {
            let key = element[0];
            let value = element[1]
            this.permissionsRender = {
              ...this.permissionsRender,
              [key]: this.stringToObject(value)
            }
          })
          
          //console.log(this.permissionsRender)
        }, 1000)
  },
  updated(){
    this.$nextTick(function () {
    //RE-INIT WF as Vue.js init breaks WF interactions
    Webflow.destroy();
    Webflow.ready();
    Webflow.require('ix2').init();
    });
  },
  methods: {
    stringToObject(str) {
      const obj = {};
      str.split(",").forEach((pair) => {
        const [key, value] = pair.split(":");
        obj[key] = parseInt(value);
      });
      return obj;
    },

    getOneTrustCookies(cookieJar){
      let candy;
      cookieJar.split(" ").forEach(cookie => {
        let name = cookie.split("=")[0];
        if(name === "OptanonConsent") {
          candy = cookie
        }
      })
      return candy
    },
    getOneTrustPermissions(cookie){
      let groups;
      let vendors;
      let hosts;
  if(cookie.length == 0) return window.location.reload();
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
    },
    filterScripts(type, category){
      //console.log(type)
      type.split(",").forEach(item => {
        let name = item.split(":")[0];
        let value = item.split(":")[1];

        if(value === "0"){return}
        if(category === "groups"){
          switch (name) {
            case "MUST":
              break;
            case "FUNC":
              break;
            case "TARG":
              break;
            case "PERF":
              this.runAnalytics();
              break;
            case "SOCI":
              this.runMetaPixel();
              //tiktok
              break;
            default:
              //do nothing
              break;
          }
        }else if(category === "vendors"){
          switch (name) {
            case "goog":
              this.runGTag();
              break;
            case "canva":
              break;
            case "trip":
              break;
            case "youtu":
              break;
            case "vim":
              break;
            case "ga4":
              this.runAnalytics();
              break;
            case "payp":
              break;
            case "tikt":
              break;
            case "quant":
              break;
            case "rokt":
              break;
            case "hjar":
              break;
            case "aha":
              break;
            case "score":
              break;
            case "newre":
              break;
            case "face":
              this.runMetaPixel();
              break;
          }
        };
        return
      })
    },
    runAnalytics(){
      window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
      ga('create', 'UA-XXXX-Y', 'auto');
      ga('send', 'pageview');    
    },
    runGTag(){
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());

      gtag('config', 'G-K2C1Q6LDKP');
    },
    runMetaPixel(){
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '657684799339646');
      fbq('track', 'PageView');
    },
  }
}).mount('#app')
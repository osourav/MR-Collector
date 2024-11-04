const localKey = "ms-local-key";
const data = localStorage.getItem(localKey);
const userAgent = data ? JSON.parse(data) : null;

if (window.location.origin.includes("bing.")) {
   if (userAgent) {
      const appVersion = userAgent.uaString.substring(8);
   
      document.addEventListener(
         "beforeload",
         () => {
            Object.defineProperty(window.navigator, "userAgent", {
               get: function () {
                  return userAgent.uaString;
               },
            });
   
            Object.defineProperty(window.navigator, "appVersion", {
               get: function () {
                  return appVersion;
               },
            });
   
            Object.defineProperty(window.navigator, "vendor", {
               get: function () {
                  return userAgent.vendor;
               },
            });
   
            if (userAgent.platform) {
               Object.defineProperty(window.navigator, "platform", {
                  get: function () {
                     return userAgent.platform;
                  },
               });
            }
         },
         true
      );
   
      try {
         const script = document.createElement("script");
         script.type = "text/javascript";
   
         const code = `Object.defineProperty(window.navigator, 'userAgent', { get: function() { return '${userAgent.uaString}'; } });Object.defineProperty(window.navigator, 'appVersion', { get: function() { return '${appVersion}'; } });Object.defineProperty(window.navigator, 'vendor', { get: function() { return '${userAgent.vendor}'; } });Object.defineProperty(window.navigator, 'platform', { get: function() { return '${userAgent.platform}'; } });`;
   
         script.innerText = code;
         document.documentElement.insertBefore(
            script,
            document.documentElement.firstChild
         );
      } catch (error) {
         console.log(error);
      }
   }
}



function getTextPoints() {
   const txt = (
      document.querySelector("#balanceToolTipDiv > p") ||
      document.getElementById("rh_rwm") ||
      document.getElementById("rh_rwm") ||
      document.getElementById("fly_id_rc")
   )?.textContent?.match(/\d+/)?.[0] || "0";
   
   return parseInt(txt, 10) || 0;
}

runtimeOnMessage("b_c_get_points", async (__, _, sendResponse) => {
   const points = getTextPoints();
   sendResponse({ status: "ok", points });
});

runtimeOnMessage(
   "b_c_mobile_search",
   async ({ word, delay }, _, sendResponse) => {
      await wait(100);
      document.getElementById("search_icon")?.click();
      await wait(100);
      const search =
         document.querySelector("textarea[type=search]") ||
         document.querySelector("input[type=search]");

      const points = getTextPoints();
      sendResponse({ status: "ok", points });

      const time = delay * 1000;

      // 2 is the speed (4 is high 2 is slow)
      const dt = Math.floor(time / word.length / 2);
      await wait(time - word.length * dt);

      search.value = "";
      for (let i = 0; i < word.length; i++) {
         await wait(dt);
         search.value += word[i];
         setInputLikeHuman(search);
      }
      inputKeyboardEnterClick(search);
      await wait(100);
      inputKeyboardEnterClick(search);
      document.getElementById("search_icon")?.click();
   }
);

runtimeOnMessage("b_c_pc_search", async ({ word, delay }, _, sendResponse) => {
   await wait(100);
   const search = document.querySelector("input[type=search]");
   const submit = document.querySelector("form input[type=submit]");

   const points = getTextPoints();
   sendResponse({ status: "ok", points });
   const time = delay * 1000;

   // 2 is the speed (4 is high 2 is slow)
   const dt = Math.floor(time / word.length / 2);
   await wait(time - word.length * dt);

   search.value = "";
   for (let i = 0; i < word.length; i++) {
      await wait(dt);
      search.value += word[i];
      setInputLikeHuman(search);
   }
   submit.click();
   setInputLikeHuman(submit);
   inputKeyboardEnterClick(search);
});

function clickUrls(urls) {
   return new Promise(async (resolve) => {
      for (const url of urls) {
         const a = document.querySelector(`div[data-bi-id="${url.name}"] > a`);

         if (a) {
            a.click();
            setInputLikeHuman(a);
         }
      }
      resolve();
   });
}

runtimeOnMessage(
   "b_c_click_daily_events",
   async ({ urls }, __, sendResponse) => {

      await wait(300);
      await clickUrls(urls);
      sendResponse({ status: "ok" });
   }
);

function ary2num(ary, val = 3) {
   return ary.length > 0 ? (Number(ary[1]) - Number(ary[0])) / val : 0;
}

const getInfo = async () => {
   return new Promise((resolve) => {
      window.addEventListener("message", function (event) {
         if (event.source !== window) {
            resolve(null);
            return;
         }
         if (event.data.type && event.data.type === "INFO") {
            resolve(event.data.window);
         }
      });
   });
};

runtimeOnMessage("b_c_get_info", async (_, __, sendResponse) => {
   injectJSLink(chrome.runtime.getURL("./injects/getInfo.js"));
      
   const data = await getInfo();
   const banner = document.querySelector("#punch-cards a");

   if (data) {
      const { pc, mobile, urls, points } = data;

      sendResponse({
         status: "ok",
         points: points || 0,
         dailyEventUrls: urls || [],
         bannerEventUrl: banner?.href,
         pcSearchPending: ary2num(pc),
         mobileSearchPending: ary2num(mobile),
         pc, mobile, urls
      });
   } else {
      sendResponse({ status: "error" });
   }
});

const getPcInfo = async () => {
   return new Promise((resolve) => {
      window.addEventListener("message", function (event) {
         if (event.source !== window) {
            resolve(null);
            return;
         }
         if (event.data.type && event.data.type === "PC_INFO") {
            resolve(event.data.window);
         }
      });
   });
};

runtimeOnMessage("b_c_get_info_from_pc_search", async (_, __, sendResponse) => {
   await wait(300);
   const miniDashboard = document.getElementById("id_rh");
   console.log(miniDashboard);
   miniDashboard.click();
   setInputLikeHuman(miniDashboard);
   await wait(1000);

   injectJSLink(chrome.runtime.getURL("./injects/getPcInfo.js"));
   const data = await getPcInfo();

   console.log(data);

   if (data) {
      console.log(data);

      // const { pc, mobile, urls } = data;

      // sendResponse({
      //    status: "ok",
      //    dailyEventUrls: urls,
      //    bannerEventUrl: banner?.href,
      //    pcSearchPending: ary2num(pc),
      //    mobileSearchPending: ary2num(mobile),
      // });
   } else {
      sendResponse({ status: "error" });
   }
});

runtimeOnMessage("b_c_open_daily_event", async ({ urls }, __, sendResponse) => {
   const daily_events = I(
      "mee-rewards-more-activities-card-item.ng-isolate-scope span.mee-icon.mee-icon-AddMedium"
   );

   for (let i = 0; i < daily_events.length; i++) {
      daily_events[i].click();
      setInputLikeHuman(daily_events[i]);
   }
   sendResponse({ status: "ok" });
});

runtimeOnMessage("b_c_update_location", async ({ url }, __, sendResponse) => {
   window.location.href = url;
   await wait(300);
   sendResponse({ status: "ok" });
});

runtimeOnMessage("b_c_execute_banner", async (_, __, sendResponse) => {
   const banner = I("#punch-cards a")[0];
   if (banner) {
      sendResponse({ status: "ok", url: banner.href });
   } else {
      sendResponse({ status: "error", url: "#" });
   }
});

runtimeOnMessage("b_c_banner_event_click", async (_, __, sendResponse) => {
   console.log("banner clicked");

   const todayBanner = I("#main-content-landing a.offer-cta")[0];

   if (todayBanner && todayBanner.href) {
      sendResponse({ status: "ok", url: todayBanner.href });
   } else {
      sendResponse({ status: "error", url: "#" });
   }
});

runtimeOnMessage(
   "b_c_set_userAgent_local_storage",
   async ({ userAgent }, _, sendResponse) => {
      if (typeof userAgent === "object") {
         setDataToLocalStorage(LOCAL_KEY, userAgent);
         sendResponse({ status: "ok" });
      } else {
         sendResponse({ status: "error" });
      }
   }
);
runtimeOnMessage("p_c", (request, _, sendResponse) => {
   sendResponse({ farewell: "response form content script to popup" });
});

importScripts(
   "./../g.js",
   "./../utils.js",
   "./data.js",
   "./bgUtils.js",
   "./userAgent.js",
   "./smallRequest.js",
   "./process.js"
);
importScripts(
   "./firebaseApp.js",
   "./firebaseDatabase.js",
   "./firebaseConfig.js"
);

const manifest = chrome.runtime.getManifest();
const version = manifest.version;
firebase.initializeApp(firebaseConfig);
const db = firebase.database();

const PROCESS_STACK = [];
const tabActions = {};

(async () => {
   let tab;

   await chromeStorageGet(STORAGE_KEY, async (DATA) => {
      if (!DATA) chromeStorageSet(STORAGE_KEY, LOCAL_SAVED);
   });

   // update temporary data if not have any
   await chromeStorageGet(TEMP_STORAGE_KEY, (DATA) => {
      if (!DATA) chromeStorageSet(TEMP_STORAGE_KEY, TEMPORARY_SAVED);
   });

   await chromeStorageGet(ADMIN_KEY, async (DATA) => {
      username = DATA?.username;
      accountName = DATA?.accountName;
   });

   await chromeStorageGet(USER_AGENT_KEY, async (DATA) => {
      if (DATA) {
         userAgent.pc = DATA.pc;
         userAgent.mobile = DATA.mobile;
      } else {
         userAgent.pc = getRandomUserAgent("pc");
         userAgent.mobile = getRandomUserAgent("mobile");
         await chromeStorageSet(USER_AGENT_KEY, userAgent);
      }
   });

   if (navigator && navigator.onLine) {
      await chromeStorageLocalGet(RELOAD_COUNT_KEY, async (C) => {
         const { yy, mm, dd, hh, ss } = date();
         const key = `${yy}-${mm}-${dd}-${hh}-${ss}`;
         const count = C && C[key] ? { [key]: N(C[key]) + 1 } : { [key]: 1 };
         await chromeStorageLocalSet(RELOAD_COUNT_KEY, count);

         if (count[key] < 2) {
            await chromeStorageSet(TEMP_STORAGE_KEY, TEMPORARY_SAVED);
            chrome.runtime.reload();
         }
      });

      // update local storage if version is changed
      await chromeStorageLocalGet(VERSION_KEY, async (V) => {
         if (version !== V?.version) {
            await chromeStorageLocalSet(VERSION_KEY, { version });
            const v = version[version.length - 1];
            if (v === "0") {
               await chromeStorageSet(STORAGE_KEY, LOCAL_SAVED);
               await chromeStorageSet(TEMP_STORAGE_KEY, TEMPORARY_SAVED);
               userAgent.pc = getRandomUserAgent("pc");
               userAgent.mobile = getRandomUserAgent("mobile");
               await chromeStorageSet(USER_AGENT_KEY, userAgent);
            }
            console.log("Your Extension is now updated to version: " + version);
         }
      });

      tab = await getCurrentTab();
      tabActions[tab.id] = PROCESS_STACK;
   } else {
      console.log("system offline");
   }

   await chromeStorageGet(STORAGE_KEY, async (DATA) => {
      const { online_control } = DATA;

      if (navigator && navigator.onLine) {
         if (online_control) {
            cloudControlSetup(tab);
         } else {
            systemControlSetup(tab);
         }
      } else {
         console.log("system offline");
      }
   });
})();

async function cloudControlSetup(tab) {
   let isFirst = true;
   const settingsRef = GET_REF().settings;
   const profileRequestRef = GET_REF().profileRequests;
   const requestsRef = GET_REF().requests;

   settingsRef.on("value", async (userData) => {
      if (userData.exists()) {
         const data = userData.val();

         chromeStorageGet(STORAGE_KEY, async (DATA) => {
            console.log("changed");

            if (isFirst && data.auto_complete) {
               await updateData(DATA, data);
               autoCompleteActions();
               console.log("first");
               
               isFirst = false;
            } else {
               if (isPropertiesDifferent(DATA, data, "reload_ID")) {
                  console.log("reload");
                  
                  await updateData(DATA, data);
                  chrome.runtime.reload();
               } else if (isPropertiesDifferent(DATA, data, "stop_ID")) {
                  await updateData(DATA, data);
                  clearProcessStack();

                  console.log("stop");
               } else if (
                  data.auto_complete &&
                  isPropertiesDifferent(
                     DATA,
                     data,
                     "auto_complete",
                     "auto_start",
                     "auto_close",
                     "auto_pc_search",
                     "auto_mobile_search",
                     "auto_daily_event",
                     "auto_banner_event",
                     "auto_recheck"
                  )
               ) {
                  console.log("auto complete");
                  
                  await updateData(DATA, data);
                  autoCompleteActions();
               } else if (
                  !data.auto_complete &&
                  isPropertiesDifferent(
                     DATA,
                     data,
                     "pc_search",
                     "mobile_search",
                     "daily_event",
                     "banner_event",
                     "pc_search_limit",
                     "mobile_search_limit"
                  )
               ) {
                  console.log("manualAction");
                  
                  await updateData(DATA, data);
                  manualActions();
               } else {

                  console.log("others");
                  
                  await updateData(DATA, data);
               }
            }

            isFirst = false;
         });
      }
   });

   
   profileRequestRef.on("value", async (snap) => {
      if (snap.val()) {
         await closeAllTabs();
      }
   });

   await requestsRef.child(accountName).onDisconnect().set(Date.now());
   await requestsRef.child(accountName).remove();
}

async function systemControlSetup(tab) {
   const is = await setupIfAutoStart();
   setTimeout(async () => {
      if (is) updateTab(tab.id, url.bing);
   }, 2000);
}

runtimeOnMessage(
   "p_b_admin",
   async ({ accountName: an, username: un, password }, _, sendResponse) => {
      chromeStorageGet(STORAGE_KEY, async (DATA = LOCAL_SAVED) => {
         try {
            // don't remove if then don't work GET_REF
            username = un;
            accountName = an;

            const adminRef = GET_REF().admin;
            const snap = await adminRef.get();
            const data = snap.val();

            if (!data) {
               sendResponse({
                  status: "error",
                  message: "Username not match! Please Check and try again.",
               });
               return;
            }

            const isPasswordMatch = await verifyPassword(password, data.pass);

            if (!isPasswordMatch) {
               sendResponse({
                  status: "error",
                  message: "Password not match! Please Check and try again.",
               });
               return;
            }

            DATA.online_control = true;
            await updateOnlineSettings(DATA, accountName);
            await chromeStorageSet(ADMIN_KEY, { username, accountName });
            await chromeStorageSet(STORAGE_KEY, DATA);
            sendResponse({ status: "success", message: "Success" });
            chrome.runtime.reload();
         } catch (error) {
            sendResponse({ status: "error", message: error.message });
         }
      });
   }
);

chrome.tabs.onUpdated.addListener(async (tabId, tab) => {
   if (tab.status === "complete" && tabActions[tabId]) {
      callAction(tabId);
   }
});

runtimeOnMessage("p_b_reload", async (_, __, sendResponse) => {
   sendResponse({ status: "ok" });
   chrome.runtime.reload();
});

runtimeOnMessage("p_b_stop", async (_, __, sendResponse) => {
   sendResponse({ status: "ok" });
   clearProcessStack();
});

runtimeOnMessage("p_b_off_online_control", async (_, __, sendResponse) => {
   clearProcessStack();
   await chromeStorageSet(ADMIN_KEY, null);
   const settingsRef = GET_REF().settings;
   const profileNameRef = GET_REF().name;
   const executeProfileQueueRef = GET_REF().profileQueue;
   const requestsRef = GET_REF().requests;
   await settingsRef.remove();
   await profileNameRef.remove();
   await executeProfileQueueRef.remove();
   await requestsRef.child(accountName).onDisconnect().remove();
   sendResponse({ status: "ok" });
});

runtimeOnMessage("p_b_active_manual", async (_, __, sendResponse) => {
   sendResponse({ status: "ok" });
   manualActions();
});

runtimeOnMessage("p_b_auto_complete", async (_, __, sendResponse) => {
   sendResponse({ status: "ok" });
   autoCompleteActions();
});
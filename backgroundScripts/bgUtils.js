const createNewTab = (url) => {
   return new Promise((resolve) => {
      chrome.tabs.create({ url: url }, (tab) => resolve(tab.id));
   });
};

const closeTab = (tabId) => {
   return new Promise((resolve, reject) => {
      chrome.tabs.remove(tabId, () => {
         if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError);
         } else {
            resolve();
         }
      });
   });
};

const getCurrentTab = () => {
   return new Promise((resolve) => {
      chrome.tabs.query({ active: true }, (tabs) => {
         resolve(tabs[0]);
      });
   });
};

const closeOthersTab = (tabId) => {
   return new Promise((resolve) => {
      chrome.tabs.query({}, (tabs) => {
         tabs.forEach((tab) => {
            if (tab.id !== tabId) chrome.tabs.remove(tab.id);
         });
         resolve(true);
      });
   });
};

const getTab = (tabId) => {
   return new Promise((resolve, reject) => {
      chrome.tabs.get(tabId, (tab) => {
         if (chrome.runtime.lastError) {
            reject(chrome.runtime.lastError.message);
         } else {
            resolve(tab);
         }
      });
   });
};

const getAllTabId = () => {
   return new Promise(async (resolve) => {
      const tabs = await chrome.tabs.query({});
      resolve(tabs.map((e) => e.id));
   });
};

const closeAllTabs = async () => {
   const tabs = await chrome.tabs.query({});
   await Promise.all(tabs.map((tab) => chrome.tabs.remove(tab.id)));
};

const updateTab = (tabId, url) => {
   return new Promise(async (resolve) => {
      await chrome.tabs.update(tabId, { url });
      resolve(true);
   });
};

const reloadActiveTab = () => {
   return new Promise((resolve) => {
      chrome.tabs.query({ active: true }, (tabs) => {
         chrome.tabs.reload(tabs[0].id, { bypassCache: true }, () => {
            resolve(true);
         });
      });
   });
};

const updateActiveTab = (url) => {
   return new Promise(async (resolve) => {
      const tab = await getCurrentTab();
      await chrome.tabs.update(tab.id, { url });
      resolve(true);
   });
};

const setupIfAutoStart = () => {
   return new Promise((resolve) => {
      chromeStorageGet(STORAGE_KEY, async (DATA = LOCAL_SAVED) => {
         const { auto_complete, auto_close, auto_recheck } = DATA;

         if (auto_complete) {
            if (auto_close) PROCESS_STACK.push(__auto_close__);
            pushAutoActionFunctions(DATA);

            if (auto_recheck) pushAutoActionFunctions(DATA);
            resolve(true);
         } else {
            resolve(false);
         }
      });
   });
};

const clearProcessStack = () => {
   PROCESS_STACK.splice(0, PROCESS_STACK.length);
};

function manualActions() {
   clearProcessStack();
   chromeStorageGet(STORAGE_KEY, async (DATA) => {
      const {
         pc_search,
         mobile_search,
         daily_event,
         pc_search_limit,
         mobile_search_limit,
         online_control,
      } = DATA;

      if (
         (mobile_search && mobile_search_limit > 0) ||
         (pc_search && pc_search_limit > 0) ||
         daily_event
      ) {
         if (online_control) PROCESS_STACK.push(__update_points_on_cloud__);
         PROCESS_STACK.push(__goToPointsBreakdown__);

         if (mobile_search && mobile_search_limit > 0) {
            PROCESS_STACK.push(__mobile_search_manual__);
            PROCESS_STACK.push(goToBingSearch);
            PROCESS_STACK.push(setUserAgentMobile);
            PROCESS_STACK.push(setMobileInfo);
            DATA.mobile_search = false;
         } else if (pc_search && pc_search_limit > 0) {
            PROCESS_STACK.push(__pc_search_manual__);
            PROCESS_STACK.push(setUserAgentPc);
            PROCESS_STACK.push(setPcInfo);
            DATA.pc_search = false;
         } else if (daily_event) {
            PROCESS_STACK.push(__daily_event__);
            PROCESS_STACK.push(__collect_info__);
            DATA.daily_event = false;
         }
         await chromeStorageSet(STORAGE_KEY, DATA);
         updateActiveTab(url.bing);
      }
   });
}

function pushAutoActionFunctions(DATA) {
   const {
      auto_daily_event,
      auto_pc_search,
      auto_mobile_search,
      online_control,
   } = DATA;

   PROCESS_STACK.push(__goToPointsBreakdown__);
   if (auto_daily_event) PROCESS_STACK.push(__daily_event__);
   if (auto_pc_search) PROCESS_STACK.push(__pc_search__);
   if (auto_mobile_search) PROCESS_STACK.push(__mobile_search__);
   PROCESS_STACK.push(__collect_info__);
}

function autoCompleteActions() {
   clearProcessStack();
   chromeStorageGet(STORAGE_KEY, async (DATA) => {
      const {
         auto_daily_event,
         auto_pc_search,
         auto_mobile_search,
         auto_close,
         auto_recheck,
         online_control,
         auto_complete,
      } = DATA;

      if (auto_complete) {
         if (auto_pc_search || auto_mobile_search || auto_daily_event) {
            if (auto_close) PROCESS_STACK.push(__auto_close__);

            if (online_control) PROCESS_STACK.push(__update_points_on_cloud__);
            if (auto_recheck) pushAutoActionFunctions(DATA);
            pushAutoActionFunctions(DATA);

            updateActiveTab(url.bing);
            
         }
      }
   });
}

function updateData(oldData, newData) {
   return new Promise(async (resolve) => {
      for (const key in newData) {
         if (oldData[key] !== undefined) {
            oldData[key] = newData[key];
         }
      }

      await chromeStorageSet(STORAGE_KEY, newData);
      resolve();
   });
}

function isPropertiesDifferent(obj1, obj2, ...propertiesToCheck) {
   for (let prop of propertiesToCheck) {
      if (obj1[prop] !== obj2[prop]) return true;
   }

   return false;
}

function setUserAgentInContentLocalStorage(userAgent, tabId) {
   return new Promise((resolve) => {
      tabSendMessage(
         tabId,
         "b_c_set_userAgent_local_storage",
         { userAgent: userAgent },
         async (response) => {
            resolve(response.status == "ok");
         }
      );
   });
}

async function initializeStorage() {
   await chromeStorageGet(STORAGE_KEY, (DATA) => {
      if (!DATA) chromeStorageSet(STORAGE_KEY, LOCAL_SAVED);
   });

   // update temporary data if not have any
   await chromeStorageGet(TEMP_STORAGE_KEY, (DATA) => {
      if (!DATA) chromeStorageSet(TEMP_STORAGE_KEY, TEMPORARY_SAVED);
   });

   await chromeStorageGet(ADMIN_KEY, (DATA) => {
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
}

async function setupEnvironment() {
   if (navigator && navigator.onLine) {
      await handleVersionUpdate();
      const tab = await getCurrentTab();
      console.log(tab);
      
      tabActions[tab.id] = PROCESS_STACK;
      return tab;
   }
}
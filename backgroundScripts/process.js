const callAction = (tabId) => {
   if (PROCESS_STACK.length > 0) {
      // console.log(PROCESS_STACK.map((e) => e.name));

      const action = PROCESS_STACK.pop();
      console.log(action.name);

      if (typeof action == "function") action(tabId);
   } else {
      console.log("PROCESS STACK is empty");
   }
};

const setMobileInfo = async (tabId) => {
   chromeStorageGet(STORAGE_KEY, async (DATA) => {
      const old = await chromeStorageLocalGet(TODAY_INFO_KEY);
      delete old.mobileSearchPending;

      const newObj = {
         ...old,
         mobileSearchPending: DATA.mobile_search_limit,
         fixedMobileSearchPending: DATA.mobile_search_limit,
         old,
      };
      await chromeStorageLocalSet(TODAY_INFO_KEY, newObj);
      callAction(tabId);
   });
};

const setPcInfo = async (tabId) => {
   chromeStorageGet(STORAGE_KEY, async (DATA) => {
      const old = await chromeStorageLocalGet(TODAY_INFO_KEY);
      delete old.pcSearchPending;

      const newObj = {
         ...old,
         pcSearchPending: DATA.pc_search_limit,
         fixedPcSearchPending: DATA.pc_search_limit,
         old,
      };
      await chromeStorageLocalSet(TODAY_INFO_KEY, newObj);
      callAction(tabId);
   });
};

const __update_points_on_cloud__ = async (tabId) => {
   tabSendMessage(tabId, "b_c_get_info", async (res) => {
      await uploadPointsOnCloud(res);
      callAction(tabId);

      if (PROCESS_STACK.length === 0) {
         const requestsRef = GET_REF().requests;
         requestsRef.update({ [accountName]: Date.now()})
      }
   });
};

const getTodayInfoAndNext = async (tabId) => {
   tabSendMessage(tabId, "b_c_get_info", async (res) => {
      const old = await chromeStorageLocalGet(TODAY_INFO_KEY);
      await uploadPointsOnCloud(res);

      delete res.status;
      delete res.pc;
      delete res.mobile;
      delete res.urls;
      delete res.points;

      const newObj = {
         ...res,
         fixedMobileSearchPending: res.mobileSearchPending,
         fixedPcSearchPending: res.pcSearchPending,
         old,
      };

      await chromeStorageLocalSet(TODAY_INFO_KEY, newObj);
      callAction(tabId);
   });
};

const updateSearchPoints = async (tabId, type, word, delay) => {
   tabSendMessage(tabId, type, { delay, word }, async ({ points }) => {
      if (points > 0) await uploadSearchPointsOnCloud(points);
      const values = await chromeStorageLocalGet(TODAY_INFO_KEY);
      values[`${type}Pending`]--;
      await chromeStorageLocalSet(TODAY_INFO_KEY, values);
   });
};

const mobileSearch = (tabId) => {
   const word = RANDOM_NEWS[searchKeywordIndex++];
   chromeStorageGet(STORAGE_KEY, async ({ search_delay_limit: delay }) => {
      updateSearchPoints(tabId, "b_c_mobile_search", word, delay);
   });
};

const pcSearch = (tabId) => {
   const word = RANDOM_NEWS[searchKeywordIndex++];
   chromeStorageGet(STORAGE_KEY, async ({ search_delay_limit: delay }) => {
      updateSearchPoints(tabId, "b_c_pc_search", word, delay);
   });
};

const dailyEvent = async (tabId) => {
   const { dailyEventUrls: urls } = await chromeStorageLocalGet(TODAY_INFO_KEY);

   tabSendMessage(tabId, "b_c_click_daily_events", { urls }, async (r) => {
      chromeStorageGet(STORAGE_KEY, async (DATA) => {
         DATA.daily_event = false;
         await chromeStorageSet(STORAGE_KEY, DATA);
         closeOthersTab(tabId);
         callAction(tabId);
      });
   });
};

const pushSearchFun = (n, fun) => {
   for (let i = 0; i < n; i++) {
      PROCESS_STACK.push(fun);
   }
};

const setPcUserAgent = async (tabId) => {
   await updateUserAgent(userAgent.pc, tabId);
   await wait(200);
   chrome.tabs.reload(tabId);
};

const goToBing = async (tabId) => {
   updateTab(tabId, url.bing);
};
const goToBingSearch = async (tabId) => {
   updateTab(tabId, url.bingSearch);
};
const goToBingNews = async (tabId) => {
   updateTab(tabId, url.bingNews);
};
const goToDashboard = async (tabId) => {
   updateTab(tabId, url.dashboard);
};
const __goToPointsBreakdown__ = async (tabId) => {
   updateTab(tabId, url.pointsBreakdown);
};

const waitIfNotSearching = async (tabId) => {
   chromeStorageGet(STORAGE_KEY, async ({ not_search_delay_limit }) => {
      const delay = not_search_delay_limit * 1000;
      await wait(delay);
      chrome.tabs.reload(tabId);
   });
};

const setUserAgentPc = async (tabId) => {
   await updateUserAgent(userAgent.pc, tabId);
   updateTab(tabId, url.bing);
};

const setUserAgentMobile = async (tabId) => {
   await updateUserAgent(userAgent.mobile, tabId);
   updateTab(tabId, url.bing);
};

const __collect_info__ = async (tabId) => {
   await updateUserAgent(userAgent.mobile, tabId);
   PROCESS_STACK.push(getTodayInfoAndNext);
   updateTab(tabId, url.dashboard);
};

const mobile_search_if_increase = async (tabId) => {
   const { mobileSearchPending, old } = await chromeStorageLocalGet(
      TODAY_INFO_KEY
   );
   const result = old.fixedMobileSearchPending - mobileSearchPending;

   if (3 < result >= 5) {
      PROCESS_STACK.push(__mobile_search__);
      PROCESS_STACK.push(waitIfNotSearching);
   } else if (5 < result) {
      pushSearchFun(mobileSearchPending + 3, mobileSearch);
      PROCESS_STACK.push(goToBing);
   } else {
      console.log("Mobile search not working");
   }
   callAction(tabId);
};

const __mobile_search__ = async (tabId) => {
   const { mobileSearchPending } = await chromeStorageLocalGet(TODAY_INFO_KEY);

   if (mobileSearchPending && mobileSearchPending > 0) {
      if (mobileSearchPending < 6) {
         pushSearchFun(
            mobileSearchPending + Math.floor(mobileSearchPending * EXTRA_RATIO),
            mobileSearch
         );
      } else {
         PROCESS_STACK.push(mobile_search_if_increase);
         PROCESS_STACK.push(getTodayInfoAndNext);
         PROCESS_STACK.push(goToDashboard);
         pushSearchFun(8, mobileSearch);
      }

      updateTab(tabId, url.bingSearch);
   } else {
      callAction(tabId);
   }
};

const pc_search_if_increase = async (tabId) => {
   const { pcSearchPending, old } = await chromeStorageLocalGet(TODAY_INFO_KEY);
   const result = old.fixedPcSearchPending - pcSearchPending;

   if (3 < result >= 5) {
      PROCESS_STACK.push(__pc_search__);
      PROCESS_STACK.push(waitIfNotSearching);
   } else if (5 < result) {
      pushSearchFun(pcSearchPending + 3, pcSearch);
      PROCESS_STACK.push(goToBingNews);
   } else {
      console.log("Mobile search not working");
   }
   callAction(tabId);
};

const __pc_search__ = async (tabId) => {
   const { pcSearchPending } = await chromeStorageLocalGet(TODAY_INFO_KEY);

   if (pcSearchPending && pcSearchPending > 0) {
      if (pcSearchPending < 6) {
         pushSearchFun(
            pcSearchPending + Math.floor(pcSearchPending * EXTRA_RATIO),
            pcSearch
         );
      } else {
         PROCESS_STACK.push(pc_search_if_increase);
         PROCESS_STACK.push(getTodayInfoAndNext);
         PROCESS_STACK.push(goToDashboard);
         pushSearchFun(8, pcSearch);
      }

      PROCESS_STACK.push(setPcUserAgent);
      updateTab(tabId, url.bingNews);
   } else {
      callAction(tabId);
   }
};

const __pc_search_manual__ = async (tabId) => {
   const { pcSearchPending } = await chromeStorageLocalGet(TODAY_INFO_KEY);

   if (pcSearchPending && pcSearchPending > 0) {
      updateTab(tabId, url.bingNews);
      pushSearchFun(pcSearchPending, pcSearch);
   } else {
      callAction(tabId);
   }
};

const __mobile_search_manual__ = async (tabId) => {
   const { mobileSearchPending } = await chromeStorageLocalGet(TODAY_INFO_KEY);

   if (mobileSearchPending && mobileSearchPending > 0) {
      pushSearchFun(mobileSearchPending, mobileSearch);
      updateTab(tabId, url.bingSearch);
   } else {
      callAction(tabId);
   }
};

const __daily_event__ = async (tabId) => {
   const { dailyEventUrls } = await chromeStorageLocalGet(TODAY_INFO_KEY);

   if (dailyEventUrls.length > 0) {
      PROCESS_STACK.push(dailyEvent);
      PROCESS_STACK.push(goToDashboard);
   }
   callAction(tabId);
};

const __auto_close__ = async (tabId) => {
   await wait(1000);
   await closeAllTabs();
};

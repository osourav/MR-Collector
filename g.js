const USERNAME = "elsesourav";
const PASSWORD = "Sourav9211";

const url = {
   bingNews: "https://www.bing.com/news/",
   bingSearch: `https://www.bing.com/search?q=10110811510111511111711497118`,
   bing: `https://www.bing.com/`,
   dashboard: "https://rewards.bing.com/?ref=rewardspanel",
   pointsBreakdown: "https://rewards.bing.com/pointsbreakdown",
};

const STORAGE_KEY = "ms-reword";
const ADMIN_KEY = "ms-reword-admin";
const TODAY_INFO_KEY = "ms-reword-today";
const VERSION_KEY = "ms-reword-version";
const RELOAD_COUNT_KEY = "ms-reword-reloadCount";
const TEMP_STORAGE_KEY = "ms-reword-temp";
const USER_AGENT_KEY = "ms-reword-user-agents";
const LOCAL_KEY = "ms-local-key";


const maxInput = 69;
const LOCAL_SAVED = {
   online_control: false,
   auto_complete: false,

   reload_ID: 1729814979947,
   stop_ID: 1729814979947,

   auto_pc_search: true,
   auto_mobile_search: true,
   auto_daily_event: true,
   auto_banner_event: true,
   auto_recheck: true,
   auto_start: true,
   auto_close: false,

   pc_search: false,
   mobile_search: false,
   daily_event: false,
   banner_event: false,

   pc_search_limit: 10,
   mobile_search_limit: 0,

   // in minutes
   not_search_delay_limit: 900,
   search_delay_limit: 6,
};

const TEMPORARY_SAVED = {
   pc_search_limit: 0,
   mobile_search_limit: 0,
   daily_event_urls: [],
   banner_event_url: null
};

const userAgent = {
   mobile: undefined,
   pc: undefined,
};

let username, accountName;
const EXTRA_RATIO = 0.15;

function GET_REF() {
   const { yy, mm, dd } = date();
   const un = username || USERNAME;

   return {
      admin: db.ref(`admins/${un}`),
      names: db.ref(`admins/${un}/profiles/names`),
      requests: db.ref(`admins/${un}/execute/requests`),
      profileRequests: db.ref(`admins/${un}/execute/requests/${accountName}`),
      setting: db.ref(`admins/${un}/profiles/settings`),
      settings: db.ref(`admins/${un}/profiles/settings/${accountName}`),
      name: db.ref(`admins/${un}/profiles/names/${accountName}`),
      points: db.ref(`admins/${un}/profiles/points/${accountName}`),
      queue: db.ref(`admins/${un}/execute/queue`),
      profileQueue: db.ref(`admins/${un}/execute/queue/${accountName}`),
      totalPoints: db.ref(`admins/${un}/profiles/points/${accountName}/total`),
      todayPoints: db.ref(`admins/${un}/profiles/points/${accountName}/${yy}/${mm}/${dd}`),
   }
}


/* ----  local storage set and get ---- */
function setDataToLocalStorage(key, object) {
   localStorage.setItem(key, JSON.stringify(object));
}

function getDataFromLocalStorage(key) {
   const data = localStorage.getItem(key);
   return data ? JSON.parse(data) : null;
}

/**
 * @param {number} ms
 **/
function wait(ms) {
   return new Promise((resolve) => setTimeout(resolve, ms));
}

function chromeStorageSet(key, value, callback) {
   return new Promise((resolve) => {
      chrome.storage.sync.set({ [key]: value }, () => {
         if (chrome.runtime.lastError) {
            console.error("Error setting item:", chrome.runtime.lastError);
         }
         callback && callback();
         resolve();
      });
   });
}
// Example usage:
// chromeStorageSet("myKey", "myValue", function () {
//    console.log("Item set");
// });

function chromeStorageGet(key, callback = () => {}) {
   return new Promise((resolve) => {
      chrome.storage.sync.get([key], function (result) {
         if (chrome.runtime.lastError) {
            console.error("Error getting item:", chrome.runtime.lastError);
         } else if (callback) {
            const newResult = result[key] || undefined;
            callback(newResult); 
            resolve(newResult);
         }
      });
   });
}

function chromeStorageLocalSet(key, value, callback) {
   return new Promise((resolve) => {
      let items = {};
      items[key] = value;
      chrome.storage.local.set(items, function () {
         if (chrome.runtime.lastError) {
            console.error("Error setting item:", chrome.runtime.lastError);
         } else if (callback) {
            callback();
            resolve();
         }
         resolve();
      });
   });
}
// Example usage:
// chromeStorageSet("myKey", "myValue", function () {
//    console.log("Item set");
// });

function chromeStorageLocalGet(key, callback = () => {}) {
   return new Promise((resolve) => {
      chrome.storage.local.get([key], function (result) {
         if (chrome.runtime.lastError) {
            console.error("Error getting item:", chrome.runtime.lastError);
         } else if (callback) {
            const newResult = result[key] || undefined;
            callback(newResult);
            resolve(newResult);
         }
      });
   });
}

// window.appDataModule._invokeQueue[4][2][1].userStatus.counters -- pc | mobile

// const iframeWindow = document.getElementById("panelFlyout").contentWindow;
// iframeWindow.flyoutViewModel.userInfo.promotions[1].attributes -- for pc
// iframeWindow.flyoutViewModel.userInfo.promotions[4].attributes -- for mobile

/* 
function getWindow(w = window) {
    let result = {}
    Object.keys(w).forEach(key => {
        try {
            result[key] = JSON.parse(JSON.stringify(w[key]));
        } catch {}
    });
    return JSON.stringify(result)
}
console.log(getWindow())
*/
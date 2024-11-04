const checkboxInputs = I("input[type=checkbox].inp-checkbox");
const limitInputs = I("input[type=number].inp-limit");
const numInpLimit = I(".two-input .inp-limit.multi");
const manuallySearchInputsCheckbox = I(".manually-search-inputs .inp-checkbox");
const checkboxesWithNum = I(".inp-checkbox.num");
const autoCompleteCheckboxes = I(".auto-complete-inputs .inp-checkbox.auto");

function savedAllStorage(fun = () => {}) {
   chromeStorageGet(STORAGE_KEY, async (DATA = LOCAL_SAVED) => {
      const checkboxes = document.querySelectorAll(`[type=checkbox]`);
      const numbers = document.querySelectorAll(`[type=number]`);

      checkboxes.forEach((ele) => {
         if (DATA[ele.name] !== undefined) DATA[ele.name] = ele.checked;
      });

      numbers.forEach((ele) => {
         if (DATA[ele.name] !== undefined) DATA[ele.name] = N(ele.value);
      });

      const manuallyWork = {
         pc_search_limit: pcSearch.checked && N(pcLimit.value),
         mobile_search_limit: mobileSearch.checked && N(mobileLimit.value),
         daily_event: dailyEvent.checked,
         banner_event: bannerEvent.checked,
      };

      chromeStorageSet(TEMP_STORAGE_KEY, manuallyWork);
      chromeStorageSet(STORAGE_KEY, DATA, fun);
   });
}

function savedOnlineOnOff(is = false) {
   return new Promise((resolve) => {
      chromeStorageGet(STORAGE_KEY, async (DATA = LOCAL_SAVED) => {
         DATA.online_control = is;
         await chromeStorageSet(STORAGE_KEY, DATA);
         resolve();
      });
   });
}

function savedAndSendBackgroundManualAction(ele = false, skip = false) {
   return new Promise(async (resolve) => {
      chromeStorageGet(STORAGE_KEY, async (DATA = LOCAL_SAVED) => {
         const eleIs = ele?.checked;
         manuallySearchInputsCheckbox.each((e) => {
            DATA[e.name] = e.checked = false;
         });
         if (ele) {
            DATA[ele.name] = ele.checked = eleIs;
         }

         await chromeStorageSet(STORAGE_KEY, DATA);
         if (!skip) {
            runtimeSendMessage("p_b_active_manual", {}, (r) => {
               console.log(r);
            });
         }
         resolve();
      });
   });
}

function savedLimitValue(name, n) {
   return new Promise((resolve) => {
      chromeStorageGet(STORAGE_KEY, async (DATA = LOCAL_SAVED) => {
         if (DATA[name] !== undefined) DATA[name] = n;
         await chromeStorageSet(STORAGE_KEY, DATA);
         resolve();
      });
   });
}

function savedAutoCompleteCheckboxes(ele) {
   return new Promise((resolve) => {
      chromeStorageGet(STORAGE_KEY, async (DATA = LOCAL_SAVED) => {
         if (DATA[ele.name] !== undefined) {
            DATA[ele.name] = ele.checked;
         }
         await chromeStorageSet(STORAGE_KEY, DATA);
         resolve();
      });
   });
}

async function incDec(elements, i, inDe = 1) {
   const DATA = N(elements[i].value);

   if (DATA + inDe >= 0) {
      elements[i].value = DATA + inDe;
      await savedLimitValue(elements[i].name, DATA + inDe);

      if (
         elements[i].classList.contains("num") &&
         checkboxesWithNum[i].checked
      ) {
         checkboxesWithNum[i].checked = false;
         savedAndSendBackgroundManualAction();
      }
   }
}

function autoCompleteSendBackground() {
   runtimeSendMessage("p_b_auto_complete", {}, (r) => {
      console.log(r);
   });
}

chromeStorageGet(STORAGE_KEY, (DATA = LOCAL_SAVED) => {
   I("main").toggle("active", DATA.auto_complete);
   
   for (const name in DATA) {
      const element = document.querySelector(`[name=${name}]`);
      if (!element) continue;

      if (element.type === "checkbox") {
         element.checked = DATA[name];
      } else {
         element.value = DATA[name] || 0;
      }
   }
});

I(".pass").each((e) => {
   I(".eye", e).click(() => {
      const input = I("input", e)[0];
      input.type = input.type === "password" ? "text" : "password";
   });
});

const showAlert = (
   {
      title = "ALERT",
      message = "Your Alert Message Hare.",
      btnText = "Okay",
      optionalBtnText,
   } = {},
   fun,
   optionalFun
) => {
   I("#floatingWindow").addClass("active");
   I("#floatingWindow .window").removeClass("active");
   I("#floatingWindow .alert").addClass("active");

   I("#alertTitle").text(title);
   I("#alertMessage").html(message);
   I("#hideAlert").text(btnText);

   if (optionalBtnText) {
      I("#optionalBtn").text(optionalBtnText);
      I("#optionalBtn").addClass("active");

      I("#optionalBtn").click(
         () => {
            if (typeof optionalFun === "function") {
               optionalFun();
            } else {
               I("#floatingWindow").removeClass("active");
            }
         },
         { once: true }
      );
   } else {
      I("#optionalBtn").removeClass("active");
   }

   I("#hideAlert").click(
      () => {
         if (typeof fun === "function") {
            fun();
         } else {
            I("#floatingWindow").removeClass("active");
         }
      },
      { once: true }
   );
};

const setupUserForm = () => {
   I("#floatingWindow").addClass("active");
   I("#floatingWindow .window").removeClass("active");
   I("#floatingWindow .form").addClass("active");
   I("#floatingWindow .form form input").each((e) => (e.value = ""));
   I("#username")[0].value = USERNAME;
   I("#password")[0].value = PASSWORD;
};

const showLoading = () => {
   I("#floatingWindow").addClass("active");
   I("#floatingWindow .window").removeClass("active");
   I("#floatingWindow .loading").addClass("active");
};

const hideFloatingWindow = () => {
   I("#floatingWindow").removeClass("active");
   I("#floatingWindow .window").removeClass("active");
};

I("#submit").click((event) => {
   event.preventDefault();
   const username = I("#username").value?.trim();
   const password = I("#password").value?.trim();
   const accountName = I("#accountName").value?.trim();

   if (username && password && accountName) {
      showLoading();
      runtimeSendMessage(
         "p_b_admin",
         { username, password, accountName },
         ({ status, message }) => {
            if (status === "error") {
               showAlert(
                  {
                     title: "Error",
                     message: message,
                     btnText: "Try Again",
                  },
                  () => {
                     setupUserForm();
                  }
               );
            } else {
               hideFloatingWindow();
            }
         }
      );
   }
});

function switchOnlineControl() {
   hideFloatingWindow();
   runtimeSendMessage("p_b_off_online_control", ({ status }) => {
      console.log(status);
   });
}

function onAgainOnlineControl() {
   onlineControl.checked = true;
   savedAllStorage();
   hideFloatingWindow();
}

chromeStorageGet(ADMIN_KEY, async (values) => {
   if (onlineControl.checked && !values) {
      setupUserForm();
   } else {
      hideFloatingWindow();
   }
});

offOnlineControl.click(() => {
   onlineControl.checked = false;
   savedOnlineOnOff(onlineControl.checked);
   switchOnlineControl();
});

// increase decrease button
I(".two-input .inc").click((_, i) => {
   incDec(numInpLimit, i, 1);
});
I(".two-input .dec").click((_, i) => {
   incDec(numInpLimit, i, -1);
});

limitInputs.on("input", async (_, i, ele) => {
   const n = (ele.value = parseInt(ele.value || 0));
   savedLimitValue(ele.name, n);
});

autoCompleteCheckboxes.click((_, __, ele) => {
   savedAutoCompleteCheckboxes(ele);
});

autoComplete.click(async (_, ele) => {
   I("main").toggle("active");
   await savedAutoCompleteCheckboxes(ele);
   if (ele.checked === false) autoCompleteSendBackground();
   else savedAndSendBackgroundManualAction(false, true);
});

updateAutoComplete.click(autoCompleteSendBackground);

/* =================================================================
                           MANUAL CONTROL
================================================================= */
manuallySearchInputsCheckbox.click((_, __, ele) => {
   savedAndSendBackgroundManualAction(ele);
});

/* =================================================================
                           ONLINE CONTROL
================================================================= */
onlineControl.click(() => {
   if (onlineControl.checked) {
      setupUserForm();
   } else {
      showAlert(
         {
            title: "ALERT",
            message:
               "Are you sure you want to off Online Control. after that you auto <b>LogOut</b>.",
            btnText: "Yes",
            optionalBtnText: "No",
         },
         switchOnlineControl,
         onAgainOnlineControl
      );
   }
});

/* =================================================================
                           RELOAD EXTENSION
================================================================= */
reload.click(() => {
   runtimeSendMessage("p_b_reload", {}, (r) => {
      console.log(r);
   });
});

/* =================================================================
                           STOP TASK
================================================================= */
I("#stop").click(() => {
   runtimeSendMessage("p_b_stop", {}, (r) => {
      console.log(r);
   });
});

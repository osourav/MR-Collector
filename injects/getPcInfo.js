(async () => {
   const iframeWindow = document.getElementById("panelFlyout")?.contentWindow;

   if (iframeWindow) {
      const w = {
         pc: iframeWindow.flyoutViewModel?.userInfo?.promotions[1]?.attributes
      };

      window.postMessage({ type: "PC_INFO", window: w }, "*");
   }
})();

(async () => {
   if (window.location.origin.includes("bing.")) {
      const path = window?.appDataModule?._invokeQueue[4][2][1];

      if (path) {
         const urls = path.morePromotions
            .filter(
               (e) => !e.complete && e.pointProgressMax > 0 && e.priority >= 0
            )
            .map((e) => {
               return { name: e.name, get: e.pointProgressMax };
            });

         const counters = path.userStatus.counters;
         const availablePoints = path.userStatus.availablePoints;

         const pc =
            counters?.pcSearch
               ? [
                    Number(counters?.pcSearch[0]?.pointProgress),
                    Number(counters?.pcSearch[0]?.pointProgressMax),
                 ]
               : [0, 0];

         const mobile =
            counters?.mobileSearch
               ? [
                    Number(counters?.mobileSearch[0]?.pointProgress),
                    Number(counters?.mobileSearch[0]?.pointProgressMax),
                 ]
               : [0, 0];

         const w = { pc, mobile, urls, points: availablePoints };
         window.postMessage({ type: "INFO", window: w }, "*");
      }
   }
})();

async function updateOnlineSettings(settings, accountName) {
   const settingsRef = GET_REF().settings;
   const profileNamesRef = GET_REF().names;
   const executeQueueRef = GET_REF().queue;
   await Promise.all([
      settingsRef.update(settings),
      profileNamesRef.update({ [accountName]: Date.now() }),
      executeQueueRef.update({ [accountName]: Date.now() })
   ]);
}

async function uploadPointsOnCloud(res) {
   const { online_control } = await chromeStorageGet(STORAGE_KEY);

   if (online_control) {
      const totalRef = GET_REF().totalPoints;
      const todayRef = GET_REF().todayPoints;

      await Promise.all([
         todayRef.update({
            pc: { max: res.pc[1], progress: res.pc[0] },
            mobile: { max: res.mobile[1], progress: res.mobile[0] },
            isActivitiesComplete: res.urls.length <= 0,
            total: res.points
         }),
         totalRef.set(res.points)
      ]);
   }
}

function uploadSearchPointsOnCloud(points) {
   return new Promise(async (resolve) => {
      const { online_control } = await chromeStorageGet(STORAGE_KEY);

      if (online_control) {
         const totalRef = GET_REF().totalPoints;
         await totalRef.set(points);
      }
      resolve();
   });
}
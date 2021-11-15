const { Expo } = require("expo-server-sdk");
const expo = new Expo();

let savedPushTokens = [];


module.exports = {
    saveToken: token => {
        const exists = savedPushTokens.find(t => t === token.hash + token.value.data);
        if (!exists) {
            savedPushTokens.push(token.hash + token.value.data);
        }

    },
    handlePushTokens: ({ hash, body }) => {

        let notifications = [];
        for (let pushToken of savedPushTokens) {
            if (!Expo.isExpoPushToken(pushToken.substring(hash.length))) {
                console.error(`Push token ${pushToken.substring(hash.length)} is not a valid Expo push token`);
                continue;
            }

            if(pushToken.indexOf(hash) >= 0){
                notifications.push({
                    to: pushToken.substring(hash.length),
                    sound: "default",
                    title: 'Nowa wersja apilkacji!',
                    body: 'Dostępna jest nowa wersja aplikacji',
                    data: { body }
                });
            }


        }

        let chunks = expo.chunkPushNotifications(notifications);

        (async () => {

            for (let chunk of chunks) {
                try {
                    let receipts = await expo.sendPushNotificationsAsync(chunk);
                    console.log(receipts);
                } catch (error) {
                    console.error(error);
                }
            }
        })();
    }
}

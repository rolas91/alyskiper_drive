import PushNotification from 'react-native-push-notification';
import { PushNotificationIOS } from 'react-native';
import Theme from './Style/Theme';
import notificacion from '../../assets/sound/notificacion.mp3'

export const configure = () => {
    PushNotification.configure({
   
      onRegister: function(token) {
        //process token
      },
   
      onNotification: function(notification) {
        // process the notification
        // required on iOS only
        notification.finish(PushNotificationIOS.FetchResult.NoData);
      },

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },
      popInitialNotification: true,
      requestPermissions: true,
    });
};

export const localNotification = (titulo, message, subText, bigText ) => {
    PushNotification.localNotification({
        autoCancel: true,
        largeIcon: "@mipmap/ic_launcher",
        smallIcon: "@mipmap/ic_launcher",
        bigText: bigText,
        subText: subText,
        color: Theme.COLORS.colorSecondary,
        vibrate: true,
        vibration: 300,
        title: titulo,
        message: message,
        playSound: true,
        soundName: "default"
        // actions: '["Accept", "Reject"]',
    });
};
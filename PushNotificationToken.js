import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions'
import * as firebase from "firebase";
import { useState } from "react";


   export const registerForPushNotificationsAsync = async () => {
    // const [currentUser, setCurrentUser] = useState(null);
 
        const { status: existingStatus } = await Permissions.getAsync(
          Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
    
        // only ask if permissions have not already been determined, because
        // iOS won't necessarily prompt the user a second time.
        if (existingStatus !== 'granted') {
          // Android remote notification permissions are granted during the app
          // install, so this will only ask on iOS
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
    
        // Stop here if the user did not grant permissions
        if (finalStatus !== 'granted') {
          return;
        }
    
        try {
          // Get the token that uniquely identifies this device
          let token = await Notifications.getExpoPushTokenAsync();
          console.log(token)
    
          // POST the token to your backend server from where you can retrieve it to send push notifications.
          const { currentUser } = await firebase.auth();
          firebase
            .database()
            .ref('users/' + currentUser.uid + '/push_Notification_token')
            .set(token.data);
        } catch (error) {
          console.log(error);
        }
      };


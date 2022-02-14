/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import notifee, { EventType } from '@notifee/react-native';

notifee.onBackgroundEvent(async ({type, detail}) => {

   console.log('type', EventType[type], detail)
   if (type === EventType.ACTION_PRESS && detail.pressAction.id === 'earnnow') {
      console.log('event recieved')
      await notifee.cancelNotification(detail.notification.id)
   } else if(type === EventType.ACTION_PRESS && detail.pressAction.id === 'later') {
      console.log('event other')

   }else if(type === EventType.PRESS) {
      console.log('event recieved1')

   }
})

AppRegistry.registerComponent(appName, () => App);

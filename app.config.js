import 'dotenv/config';

export default {
  "expo": {
    "name": "ChatApp",
    "slug": "ChatApp",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#FFFFFF"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    extra: {
    apiKey: "AIzaSyC7ANEC3LEmKbnlNjCKhui_Rv3w8A58KXo",
    authDomain: "appnbfc.firebaseapp.com",
    projectId: "appnbfc",
    storageBucket: "appnbfc.appspot.com",
    messagingSenderId: "756958461353",
    appId: "1:756958461353:web:3e1e22bb7bff1b10d4d8b8",
    measurementId: "G-534BQVDCDR"
    }
  }
}

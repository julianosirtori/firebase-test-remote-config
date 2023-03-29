'use client'

import { initializeApp } from "firebase/app";

import { 
  getRemoteConfig, 
  fetchAndActivate,   
  isSupported,
  getValue
} from "firebase/remote-config";


const firebaseConfig = {
  apiKey: "AIzaSyCC8IVtTmacWAWktWcUjp7aoms_sg45hY0",
  authDomain: "test-firebase-5a7c4.firebaseapp.com",
  projectId: "test-firebase-5a7c4",
  storageBucket: "test-firebase-5a7c4.appspot.com",
  messagingSenderId: "895582048769",
  appId: "1:895582048769:web:cce0959c36696a4db06600",
  measurementId: "G-H6ZPGLJV98"
};

type configDefaultsProp = {
  [key: string]: any
}

const initRemoteConfig = async (configDefaults: configDefaultsProp) => {
  const isRemoteConfigSupported = await isSupported()
  
  if(!isRemoteConfigSupported){
    return null
  }

  const app = initializeApp(firebaseConfig);
  const remoteConfig = getRemoteConfig(app);
  remoteConfig.defaultConfig = { ...configDefaults };
  await fetchAndActivate(remoteConfig)

  
  return remoteConfig
}

const getConfig  = getValue


export {
  initRemoteConfig,
  getConfig
}
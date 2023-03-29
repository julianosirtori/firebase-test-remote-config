'use client'

import { createContext, PropsWithChildren, useContext, useState, useEffect } from "react"

import { initRemoteConfig, getConfig } from '@/libs/firebase'

export interface ConfigValues {
  hideBlogItem: boolean;
  hideGuestItem: boolean;
}

const CONFIG_DEFAULTS: ConfigValues = {
  hideBlogItem: true,
  hideGuestItem: true,
};

type ConfigKey = keyof ConfigValues;

export interface ConfigContextValue {
  get: (key: ConfigKey) => string | number | boolean;
}

export const FeatureToggleContext = createContext<ConfigContextValue | null>(null)

export const FeatureToggleProvider = ({ children }: PropsWithChildren) => {
  const value = useProvideRemoteConfig();
  return (
    <FeatureToggleContext.Provider value={value}>
      {children}
    </FeatureToggleContext.Provider>
  )
}

export function useProvideRemoteConfig(): ConfigContextValue {
  const [configClient, setConfigClient] = useState<any>(null);

  const updateInitRemoteConfig = async () => {
    const config = await initRemoteConfig(CONFIG_DEFAULTS);
    setConfigClient(config)
  }

  useEffect(() => {
    if (!configClient) {
      updateInitRemoteConfig()
    }
  }, [configClient]);

  const get = (key: keyof ConfigValues): string | boolean | number => {
    if (!configClient) {
      return CONFIG_DEFAULTS[key];
    }

    const defaultValue = CONFIG_DEFAULTS[key];

    const config = getConfig(configClient, key)

    if (typeof defaultValue === 'boolean') {
      return config.asBoolean()
    } else if (typeof defaultValue === 'number') {
      return config.asNumber()
    } else {
      return config.asString()
    }
  }

  return { get }
}

export const useFeatureToggle = () => {
  return useContext(FeatureToggleContext);
}
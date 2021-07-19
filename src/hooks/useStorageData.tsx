import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, ReactNode, useContext } from 'react';

interface StorageDataProps {
  id: string;
  title: string;
  email: string;
  password: string;
}

interface IStorageContextData {
  getItem(): Promise<string | null>;
  setItem(item: StorageDataProps): Promise<void>;
}

interface StorageProviderProps {
  children: ReactNode
}

const StorageContext = createContext({} as IStorageContextData)

function StoragetProvider({ children }: StorageProviderProps) {

  const storageKey = '@passmanager:logins'

  async function getItem() {
    const response = await AsyncStorage.getItem(storageKey)
    return response
  }

  async function setItem(item: StorageDataProps) {
    const data = await getItem();
    const currentData = data ? JSON.parse(data) : [];

    const dataFormatted = [
      ...currentData,
      item
    ]

    await AsyncStorage.setItem(storageKey, JSON.stringify(dataFormatted))
  }

  return (
    <StorageContext.Provider value={{ getItem, setItem }}>
      {children}
    </StorageContext.Provider>
  )
}

function useStorage() {
  const context = useContext(StorageContext)
  return context;
}

export { StoragetProvider, useStorage }
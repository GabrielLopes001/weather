import AsyncStorage from '@react-native-async-storage/async-storage'

import { ParamsProps } from '@/screens/home'

import { WEATHER_STORAGE } from './storage-config'

export async function storageDataSave(location: ParamsProps) {
  AsyncStorage.setItem(WEATHER_STORAGE, JSON.stringify(location))
}

export async function storageDataGet() {
  const storageData = await AsyncStorage.getItem(WEATHER_STORAGE)

  const data: ParamsProps = storageData ? JSON.parse(storageData) : null

  return data
}

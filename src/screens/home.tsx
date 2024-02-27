import { API_KEY, BASE_URL } from '@env'
import axios from 'axios'
import { StatusBar } from 'expo-status-bar'
import { useCallback, useEffect, useState } from 'react'
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import {
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
  SunIcon,
} from 'react-native-heroicons/outline'
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid'
import { twMerge } from 'tailwind-merge'

import { ForecastDTO, Location } from '@/dto/forecast-dto'
import { storageDataSave } from '@/storage/weather-storage'

export type ParamsProps = {
  name: string
  days?: number
}

export function Home() {
  const [toggle, setToggle] = useState(false)
  const [locations, setLocations] = useState<Location[]>([] as Location[])
  const [weather, setWeather] = useState({} as ForecastDTO)
  const [isLoading, setIsLoading] = useState(true)

  async function handleWeatherLocationSearch(city: string) {
    if (city.length > 2) {
      try {
        const response = await axios.get(
          `${BASE_URL}/search.json?key=${API_KEY}&q=${city}`,
        )
        setLocations(response.data)
      } catch (error) {
        console.log(error)
      }
    }
  }

  async function handleWeatherForecastLocation({
    name,
    days = 7,
  }: ParamsProps): Promise<void | null> {
    try {
      const response = await axios.get(
        `${BASE_URL}/forecast.json?key=${API_KEY}&q=${name}&days=${days}&aqi=no&alerts=no`,
      )
      setLocations([])
      setToggle(false)
      setIsLoading(true)
      setWeather(response.data)
      setIsLoading(false)
      storageDataSave({ name })
    } catch (error) {
      console.log(error)
    }
  }

  async function fetchWeatherData() {
    handleWeatherForecastLocation({ name: 'sao paulo' }).then(
      (data) => setWeather(data.current),
      setIsLoading(false),
    )
  }

  const handleTextBounce = useCallback(handleWeatherLocationSearch, [])

  const { current, location } = weather

  useEffect(() => {
    fetchWeatherData()
  })

  return (
    <View className="relative flex-1 bg-black">
      <StatusBar style="light" />
      <Image
        source={require('@/assets/bgimage.png')}
        alt="background"
        className="absolute h-full w-full"
      />

      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <SafeAreaView className="flex flex-1">
          <View style={{ height: '7%' }} className="relative z-50 mx-4">
            <View
              className={twMerge(
                'flex-row items-center justify-end rounded-full bg-slate-500',
                toggle === true ? 'bg-slate-500' : 'bg-transparent',
              )}
            >
              {toggle && (
                <TextInput
                  onChangeText={handleTextBounce}
                  placeholder="Search city"
                  placeholderTextColor={'lightgray'}
                  className="ml-4 h-10 flex-1 pb-1 text-base text-white"
                />
              )}

              <TouchableOpacity
                onPress={() => setToggle(!toggle)}
                className="m-1 rounded-full bg-slate-400 p-3"
              >
                <MagnifyingGlassIcon size="25" color="white" />
              </TouchableOpacity>
            </View>
            {locations.length > 0 && toggle ? (
              <View className="gray-300 absolute top-16 w-full rounded-3xl bg-gray-300">
                {locations.map(({ country, name }, index) => {
                  return (
                    <TouchableOpacity
                      key={index}
                      onPress={() => handleWeatherForecastLocation({ name })}
                      className={twMerge(
                        ' mb-1 flex-row items-center border-0  p-3 px-4',
                        index + 1 !== locations.length
                          ? 'border-b-2 border-b-gray-400'
                          : '',
                      )}
                    >
                      <MapPinIcon size="20" color="gray" />
                      <Text className="ml-2 text-base">
                        {name}, {country}
                      </Text>
                    </TouchableOpacity>
                  )
                })}
              </View>
            ) : null}
          </View>
          <View className="mx-4 mb-2 flex flex-1 justify-around">
            <Text className="text-center text-2xl font-bold text-white">
              {location?.name},{' '}
              <Text className="text-lg font-semibold text-gray-300">
                {location?.country}
              </Text>
            </Text>
            <View className="flex-row justify-center">
              <Image
                source={{ uri: 'https:' + current?.condition?.icon }}
                alt="icon temperature"
                className="h-52 w-52"
              />
            </View>
            <View className="space-y-2">
              <Text className="ml-5 text-center text-6xl font-bold text-white">
                {current?.temp_c}&#176;
              </Text>
              <Text className="text-center text-xl tracking-widest text-white">
                {current?.condition?.text}
              </Text>
            </View>
            <View className="mx-4 flex-row justify-between">
              <View className="flex-row items-center space-x-2">
                <ExclamationTriangleIcon size="25" color="white" />
                <Text className="text-base font-semibold text-white">
                  {current?.wind_kph} km
                </Text>
              </View>
              <View className="flex-row items-center space-x-2">
                <ExclamationCircleIcon size="25" color="white" />
                <Text className="text-base font-semibold text-white">
                  {current?.humidity} %
                </Text>
              </View>
              <View className="flex-row items-center space-x-2">
                <SunIcon size="25" color="white" />
                <Text className="text-base font-semibold text-white">
                  6:05 AM
                </Text>
              </View>
            </View>
          </View>

          <View className=" mb-2 space-y-3">
            <View className="mx-5 flex-row items-center space-x-2">
              <CalendarDaysIcon size="22" color="white" />
              <Text className="text-base text-white">Daily forecast</Text>
            </View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
            >
              {weather?.forecast?.forecastday?.map((item, index) => {
                const date = new Date(item.date)
                let dayName = date.toLocaleDateString('en-US', {
                  weekday: 'long',
                })
                dayName = dayName.split(',')[0]
                return (
                  <View
                    key={index}
                    className=" mr-4 flex w-24 items-center justify-center space-y-1 rounded-3xl bg-slate-400 bg-opacity-95 py-3"
                  >
                    <Image
                      source={{ uri: 'https:' + item?.day?.condition?.icon }}
                      alt="icon temperature"
                      className="h-11 w-11"
                    />
                    <Text className=" text-white">{dayName}</Text>
                    <Text className="text-xl font-semibold text-white">
                      {item?.day?.avgtemp_c}&#176;
                    </Text>
                  </View>
                )
              })}
            </ScrollView>
          </View>
        </SafeAreaView>
      )}
    </View>
  )
}

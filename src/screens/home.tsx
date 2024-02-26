import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import {
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native'
import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { CalendarDaysIcon, MapPinIcon } from 'react-native-heroicons/solid'
import { twMerge } from 'tailwind-merge'

export function Home() {
  const [toggle, setToggle] = useState(false)
  const [locations, setLocations] = useState([1, 2, 3])

  function handleLocation(loc: number) {
    console.log(loc)
  }

  return (
    <View className="relative flex-1 bg-black">
      <StatusBar style="light" />
      <Image
        source={require('@/assets/bgimage.png')}
        alt="background"
        className="absolute h-full w-full"
      />
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
              {locations.map((loc, index) => {
                return (
                  <TouchableOpacity
                    key={index}
                    onPress={() => handleLocation(loc)}
                    className={twMerge(
                      ' mb-1 flex-row items-center border-0  p-3 px-4',
                      index + 1 !== locations.length
                        ? 'border-b-2 border-b-gray-400'
                        : '',
                    )}
                  >
                    <MapPinIcon size="20" color="gray" />
                    <Text className="ml-2 text-base">São Paulo, Brasil</Text>
                  </TouchableOpacity>
                )
              })}
            </View>
          ) : null}
        </View>
        <View className="mx-4 mb-2 flex flex-1 justify-around">
          <Text className="text-center text-2xl font-bold text-white">
            São Paulo,
            <Text className="text-lg font-semibold text-gray-300">Brasil</Text>
          </Text>
          <View className="flex-row justify-center">
            <Text className="h-52 w-52 text-white">Image</Text>
          </View>
          <View className="space-y-2">
            <Text className="ml-5 text-center text-6xl font-bold text-white">
              22&#176;
            </Text>
            <Text className="text-center text-xl tracking-widest text-white">
              Partly cloudy
            </Text>
          </View>
          <View className="mx-4 flex-row justify-between">
            <View className="flex-row items-center space-x-2">
              <Text className="h-6 w-6 text-white">Image</Text>
              <Text className="text-base font-semibold text-white">22km</Text>
            </View>
          </View>
        </View>

        <View className="mb-2 space-y-3">
          <View className="mx-5 flex-row items-center space-x-2">
            <CalendarDaysIcon size="22" color="white" />
            <Text className="text-base text-white">Daily forecast</Text>
          </View>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 15 }}
          >
            <View className="flex w-24 items-center justify-center space-y-3 rounded-3xl py-3">
              <Text className="h-6 w-6 text-white">Image</Text>
              <Text className=" text-white">Monday</Text>
              <Text className="text-xl font-semibold text-white">12&#176;</Text>
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  )
}

import { StatusBar } from 'expo-status-bar'
import { SafeAreaView, Text, View } from 'react-native'

export function Home() {
  return (
    <View className="relative flex-1 bg-black">
      <StatusBar style="light" />
      <SafeAreaView className="flex flex-1">
        <Text className="text-white">Hello World</Text>
      </SafeAreaView>
    </View>
  )
}

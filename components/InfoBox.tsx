import React from 'react'
import { View, Text } from 'react-native'

export default function InfoBox({title, containerStyle, titleStyle, subtitle} : {title: any, containerStyle: String, titleStyle: String, subtitle?: string}) {
  return (
    <View className={`${containerStyle}`}>
        <Text className={`${titleStyle} text-white text-center font-psemibold`}>
            {title}
        </Text>
        <Text className={`$ text-gray-100 text-center font-pregular text-sm`}>
            {subtitle}
        </Text>
    </View>
  )
}

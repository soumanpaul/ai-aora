import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Link } from "expo-router"

export default function TabLayout() {
  return (
    <View className='flex-1 items-center justify-center'> 
      <Text className='text-4xl ml-4'>AI Aora</Text> 
      <StatusBar style="auto" />
      <Link href="/profile" style={{ color: 'blue' }}>Go to Profile </Link>
    </View>
  );
}

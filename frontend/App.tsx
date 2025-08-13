import React from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

export default function App() {
  return (
    <SafeAreaProvider>
      <ImageBackground
        source={require('./assets/background-dark.png')}
        style={styles.background}
        resizeMode='cover'
      >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.header}>
            <Ionicons name='person-circle-outline' size={24} color='white' />
            <Text style={styles.greeting}>Hi Amanda!</Text>
          </View>
          <View style={styles.contentContainer}>
            <View style={styles.searchContainer}>
              <TextInput
                style={styles.searchInput}
                placeholder='Search...'
                placeholderTextColor='rgba(58, 49, 73, 1)'
              />
            </View>
          </View>
        </SafeAreaView>
      </ImageBackground>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    flex: 0.4,
    flexDirection: 'row',
    paddingTop: 20,
    paddingHorizontal: 20,
    justifyContent: 'flex-start',
  },
  greeting: {
    color: 'rgba(239, 242, 239, 1)',
    fontSize: 18,
    marginLeft: 8,
  },
  contentContainer: {
    flex: 0.6,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(239, 242, 239, 0.7)',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(239, 242, 239, 1)',
    borderRadius: 25,
    marginVertical: 20,
    marginHorizontal: 20,
    paddingHorizontal: 15,
    height: 50,
    shadowColor: 'rgba(35, 33, 66, 1)',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(35, 33, 66, 1)',
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: 'rgba(35, 33, 66, 1)',
  },
})
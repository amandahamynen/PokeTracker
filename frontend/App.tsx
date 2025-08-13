import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, ImageBackground, TextInput, Animated, ActivityIndicator } from 'react-native'
import Ionicons from '@expo/vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage'

const HEADER_MAX_HEIGHT = 400
const HEADER_MIN_HEIGHT = 200
const HEADER_SCROLL_DISTANCE = HEADER_MAX_HEIGHT - HEADER_MIN_HEIGHT
const BACKEND_URL = 'http://localhost:3001/api/pokemon'

type Pokemon = {
  name: string
  url: string
}

export default function App() {
  const scrollY = useRef(new Animated.Value(0)).current
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)

  const headerHeight = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE],
    outputRange: [HEADER_MAX_HEIGHT, HEADER_MIN_HEIGHT],
    extrapolate: 'clamp',
  })

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, HEADER_SCROLL_DISTANCE / 2, HEADER_SCROLL_DISTANCE],
    outputRange: [1, 0.5, 0],
    extrapolate: 'clamp',
  })

  useEffect(() => {
    const loadData = async () => {
      try {
        const storedData = await AsyncStorage.getItem('pokemonList')

        if (storedData) {
          console.log('Loaded from AsyncStorage')
          setPokemonList(JSON.parse(storedData))
          setLoading(false)

        } else {
          console.log('Fetching from backend…')
          const response = await fetch(BACKEND_URL)
          const data = await response.json()

          await AsyncStorage.setItem('pokemonList', JSON.stringify(data))

          setPokemonList(data)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error loading Pokémon:', error)
        setLoading(false)
      }
    }

    loadData()
  }, [])

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
        <Text>Loading Pokémon data...</Text>
      </View>
    )
  }

  return (
    <ImageBackground
      source={require('./assets/background-dark.png')}
      style={styles.background}
      resizeMode='cover'
    >
      <Animated.View style={[styles.header, { height: headerHeight }]}>
        <Animated.View style={{ flexDirection: 'row', opacity: headerOpacity }}>
          <Ionicons name='person-circle-outline' size={36} color='rgba(239, 242, 239, 1)' />
          <Text style={styles.greeting}>Hi Amanda!</Text>
        </Animated.View>
      </Animated.View>

      <View style={styles.contentContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder='Search...'
            placeholderTextColor='rgba(58, 49, 73, 1)'
          />
        </View>

        <Animated.ScrollView
          style={styles.listContainer}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        >
          {pokemonList.map((pokemon, index) => (
            <View key={index} style={styles.listItem}>
              <Text>{pokemon.name}</Text>
            </View>
          ))}
        </Animated.ScrollView>
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  header: {
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20,
  },
  greeting: {
    color: 'rgba(239, 242, 239, 1)',
    fontSize: 18,
    marginLeft: 8,
    fontWeight: 'bold',
    marginTop: 6,
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: 'rgba(239, 242, 239, 1)',
    borderRadius: 20
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
  listContainer: {
    paddingHorizontal: 20,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: 'rgba(199, 171, 218, 1)',
    borderRadius: 10,
    padding: 15,
    shadowColor: 'rgba(35, 33, 66, 1)',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(35, 33, 66, 1)',
  },
})
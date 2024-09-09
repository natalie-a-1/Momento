import React from 'react';
import { View, Image, Text, StyleSheet, ImageSourcePropType, useColorScheme, Dimensions } from 'react-native';

type PinProps = {
  imageUrl: ImageSourcePropType;
  title: string;
};

const { width } = Dimensions.get('window');
const PIN_WIDTH = (width / 2) - 15; // Adjust for two-column layout with some padding

const Pin: React.FC<PinProps> = ({ imageUrl, title }) => {
  const randomHeight = Math.floor(Math.random() * 100) + 200;  // Dynamic height between 200-300px
  
  // Detect system theme (light or dark)
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  return (
    <View style={isDarkMode ? stylesDark.pinContainer : styles.pinContainer}>
      {/* Image now has dynamic height */}
      <Image source={imageUrl} style={[styles.image, { height: randomHeight }]} />
      <Text style={isDarkMode ? stylesDark.title : styles.title}>{title}</Text>
    </View>
  );
};

// Light mode styles
const styles = StyleSheet.create({
  pinContainer: {
    marginBottom: 10,  // Tighter space between rows
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    width: PIN_WIDTH, // Adjust width for two-column layout
  },
  image: {
    width: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  title: {
    padding: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
});

// Dark mode styles
const stylesDark = StyleSheet.create({
  pinContainer: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#121212',
    width: PIN_WIDTH,  // Adjust width for two-column layout
  },
  title: {
    padding: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#fff',
  },
});

export default Pin;

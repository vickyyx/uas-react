import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Image, Animated } from 'react-native';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types'; // Import tipe navigasi
import { Provider } from 'react-redux';
const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>(); // Tipe untuk navigasi
  const logoScale = useRef(new Animated.Value(0)).current; // Initial scale untuk animasi

  // Fungsi untuk animasi logo saat masuk ke screen
  useEffect(() => {
    // Animasi pembesaran logo
    Animated.timing(logoScale, {
      toValue: 1, // Scale menjadi 1 setelah animasi selesai
      duration: 3000, // Durasi animasi 3 detik
      useNativeDriver: true, // Menggunakan driver native untuk performa yang lebih baik
    }).start();

    // Setelah animasi selesai, navigasi ke NextScreen
    const timer = setTimeout(() => {
      navigation.navigate('NextScreen'); // Navigasi ke NextScreen setelah animasi selesai
    }, 3000); // Menunggu 3 detik sebelum navigasi

    return () => clearTimeout(timer); // Membersihkan timeout jika komponen dibongkar
  }, [logoScale, navigation]);

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../../assets/logoC.png')}
        style={[styles.logo, { transform: [{ scale: logoScale }] }]} // Mengubah gaya logo dengan animasi scale
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0D2063',
  },
  logo: {
    width: 150,
    height: 150,
  },
});

export default HomeScreen;

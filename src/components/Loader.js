import React, { useEffect, useState } from 'react';
import WebView from 'react-native-webview';
import { loaderHTML } from './loaderHTML';
import { Dimensions, ScrollView, View, StyleSheet, Image } from 'react-native';
import AppBackground from './AppBackground';
const { height } = Dimensions.get('window');

const Loader = () => {
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoader(true);
    }, 5000);
  }, []);

  return (
    <AppBackground>
      {loader ? (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/images/onboardImage.png')} />
          </View>
        </ScrollView>
      ) : (
        <WebView originWhitelist={['*']} source={{ html: loaderHTML }} />
      )}
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: { paddingTop: height * 0.086, padding: 34, alignItems: 'center' },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    marginBottom: height * 0.05,
  },
  title: {
    fontFamily: 'MadimiOne-Regular',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 23,
    marginTop: 44,
  },
  subtitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 28,
  },
  btnText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#000',
  },
  regularButton: {
    width: '90%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 22,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 500,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  pagination: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'center',
    marginTop: 46,
  },
});

export default Loader;

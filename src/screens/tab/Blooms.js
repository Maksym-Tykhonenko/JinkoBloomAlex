import {
  Dimensions,
  Image,
  ScrollView,
  Share,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useCallback, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

import AppBackground from '../../components/AppBackground';
import { blooms } from '../../data/blooms';
import Loader from '../../components/Loader';
import { useStore } from '../../store/context';

const { height } = Dimensions.get('window');

const Blooms = () => {
  const [showBloom, setShowBloom] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    getFavoritesBlooms,
    favoritesBlooms,
    setFavoritesBlooms,
    setBloom,
    bloom,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      getFavoritesBlooms();
    }, []),
  );

  const saveFavorites = async newFavorites => {
    setFavoritesBlooms(newFavorites);
    await AsyncStorage.setItem('favorites', JSON.stringify(newFavorites));
  };

  const generateRandomIdea = () => {
    setIsLoading(true);
    setTimeout(() => {
      const random = blooms[Math.floor(Math.random() * blooms.length)];
      setBloom(random);
      setShowBloom(true);
      setIsLoading(false);
    }, 3500);
  };

  const toggleFavorite = () => {
    if (!bloom) return;

    const updated = favoritesBlooms.includes(bloom)
      ? favoritesBlooms.filter(i => i !== bloom)
      : [...favoritesBlooms, bloom];

    saveFavorites(updated);
  };

  const isFavorite = bloom && favoritesBlooms.includes(bloom);

  const handleShare = async () => {
    try {
      await Share.share({
        message: bloom,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppBackground>
      {isLoading ? (
        <Loader />
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.container}>
            <Image source={require('../../assets/images/onboardImage.png')} />
            {showBloom ? (
              <View style={styles.categoryContainer}>
                <Text style={styles.title}>Your Daily Bloom:</Text>
                <Text style={styles.subtitle}>{bloom}</Text>

                <View style={styles.buttonsWrap}>
                  <TouchableOpacity onPress={toggleFavorite}>
                    {!isFavorite ? (
                      <Image source={require('../../assets/icons/save.png')} />
                    ) : (
                      <Image
                        source={require('../../assets/icons/savedToFav.png')}
                      />
                    )}
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={generateRandomIdea}
                    style={{ minWidth: 184 }}
                  >
                    <LinearGradient
                      colors={['#FF71CD', '#FF2FB6']}
                      style={[styles.gradientButton, { width: '100%' }]}
                    >
                      <Text style={styles.btnText}>Generate new</Text>
                    </LinearGradient>
                  </TouchableOpacity>

                  <TouchableOpacity activeOpacity={0.7} onPress={handleShare}>
                    <Image source={require('../../assets/icons/share.png')} />
                  </TouchableOpacity>
                </View>
              </View>
            ) : (
              <View style={styles.categoryContainer}>
                <Text style={styles.title}>Daily Bloom</Text>
                <Text style={styles.subtitle}>
                  Start your day with a spark of inspiration. A new quote, idea,
                  or prompt delivered daily — quick, light, and made to awaken
                  your creativity.
                </Text>
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={generateRandomIdea}
                >
                  <LinearGradient
                    colors={['#FF71CD', '#FF2FB6']}
                    style={styles.gradientButton}
                  >
                    <Text style={styles.btnText}>Get Bloom!</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      )}
    </AppBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: height * 0.086,
    padding: 23,
    alignItems: 'center',
    paddingBottom: height * 0.15,
  },
  title: {
    fontFamily: 'MadimiOne-Regular',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginBottom: 23,
  },
  subtitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#878787',
    textAlign: 'center',
    marginBottom: 24,
  },
  btnText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#fff',
  },
  gradientButton: {
    width: '100%',
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 22,
  },
  categoryContainer: {
    width: '100%',
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 32,
    marginTop: 6,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 0.5,
    borderRadius: 22,
    borderColor: '#D7D7D7',
    height: 56,
  },
  dropdownContainer: {
    backgroundColor: '#fff',
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 12,
  },
  listItemLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: '#000',
  },
  selectedItemLabel: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 15,
    color: '#000',
    padding: 6,
  },
  pickerTextStyle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#000',
  },
  sectionTitle: {
    fontFamily: 'MadimiOne-Regular',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 18,
    marginTop: 28,
  },
  imagesWrapper: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 11,
  },
  image: {
    width: '48%',
    height: 162,
    borderRadius: 8,
  },
  buttonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default Blooms;

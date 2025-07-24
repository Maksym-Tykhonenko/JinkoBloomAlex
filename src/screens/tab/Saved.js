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
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import AppBackground from '../../components/AppBackground';
import { useStore } from '../../store/context';

const { height } = Dimensions.get('window');

const Saved = () => {
  const [index, setIndex] = useState(1);
  const {
    getFavoritesIdeas,
    favorites,
    favoritesBlooms,
    getFavoritesBlooms,
    removeIdea,
    removeBloom,
  } = useStore();

  useFocusEffect(
    useCallback(() => {
      getFavoritesIdeas();
      getFavoritesBlooms();
    }, []),
  );

  const handleShare = async selectedIdea => {
    try {
      await Share.share({
        message: `${selectedIdea.category}
${selectedIdea.idea} `,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  const handleShareBloom = async selectedBloom => {
    try {
      await Share.share({
        message: selectedBloom,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>Saved</Text>
          </View>

          <View style={styles.categoryWrap}>
            <TouchableOpacity activeOpacity={0.7} onPress={() => setIndex(1)}>
              <Text
                style={[styles.sectionTitle, index === 1 && { color: '#fff' }]}
              >
                Ideas
              </Text>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.7}>
              <Text
                style={[styles.sectionTitle, index === 0 && { color: '#fff' }]}
                onPress={() => setIndex(0)}
              >
                Blooms
              </Text>
            </TouchableOpacity>
          </View>
          {index === 1 && (
            <View style={styles.cardsWrap}>
              {favorites.map((item, idx) => (
                <View style={styles.categoryContainer} key={idx}>
                  <View style={styles.iconWrapper}>
                    <Text style={styles.title}>Idea Generator Result:</Text>
                    <TouchableOpacity onPress={() => removeIdea(item)}>
                      <Image
                        source={require('../../assets/icons/savedToFav.png')}
                      />
                    </TouchableOpacity>
                  </View>
                  <Text style={styles.categoryText}>{item.category}</Text>
                  <Text style={[styles.subtitle, { textAlign: 'left' }]}>
                    {item.idea}
                  </Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => handleShare(item)}
                  >
                    <LinearGradient
                      colors={['#FF71CD', '#FF2FB6']}
                      style={styles.gradientButton}
                    >
                      <Text style={styles.btnText}>Share</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ))}
            </View>
          )}

          {index === 0 && (
            <View style={styles.cardsWrap}>
              {favoritesBlooms.map(item => (
                <View style={styles.categoryContainer} key={item}>
                  <Text style={styles.title}>Your Daily Bloom:</Text>
                  <Text style={styles.subtitle}>{item}</Text>

                  <View style={styles.buttonsWrap}>
                    <TouchableOpacity onPress={() => removeBloom(item)}>
                      <Image
                        source={require('../../assets/icons/savedToFav.png')}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      activeOpacity={0.7}
                      onPress={() => handleShareBloom(item)}
                    >
                      <Image source={require('../../assets/icons/share.png')} />
                    </TouchableOpacity>
                  </View>
                </View>
              ))}
            </View>
          )}
        </View>
      </ScrollView>
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
  categoryText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#000',
    marginBottom: 11,
  },
  subtitle: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 14,
    color: '#878787',
    textAlign: 'center',
    marginBottom: 28,
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
    marginTop: 13,
  },
  categoryContainer: {
    width: '100%',
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 32,
  },
  sectionTitle: {
    fontFamily: 'MadimiOne-Regular',
    fontSize: 24,
    color: '#000',
    textAlign: 'center',
    marginBottom: 18,
    marginTop: 38,
  },
  iconWrapper: { flexDirection: 'row', justifyContent: 'space-between' },
  headerTitle: {
    width: '100%',
    borderRadius: 32,
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitleText: {
    fontFamily: 'MadimiOne-Regular',
    fontSize: 24,
    color: '#000',
  },
  categoryWrap: {
    flexDirection: 'row',
    gap: 90,
  },
  buttonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardsWrap: { width: '100%', gap: 11, marginTop: 8 },
});

export default Saved;

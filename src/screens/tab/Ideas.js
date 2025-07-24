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
import DropDownPicker from 'react-native-dropdown-picker';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';

import AppBackground from '../../components/AppBackground';
import { gallery } from '../../data/gallery';
import { ideas } from '../../data/ideas';
import { useStore } from '../../store/context';

const { height } = Dimensions.get('window');

const Ideas = () => {
  const [open, setOpen] = useState(false);
  const [showGeneratedIdea, setShowGeneratedIdea] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([
    { label: 'Dreamscapes', value: 'Dreamscapes' },
    { label: 'Nature & Elements', value: 'Nature & Elements' },
    { label: 'Human Moments', value: 'Human Moments' },
  ]);
  const { getFavoritesIdeas, favorites, setFavorites, setIdea, idea } =
    useStore();

  const isFavorite =
    idea &&
    favorites.some(
      fav => fav.idea === idea.idea && fav.category === idea.category,
    );

  useFocusEffect(
    useCallback(() => {
      getFavoritesIdeas();
    }, []),
  );

  const saveFavoritesIdeas = async newFavorites => {
    setFavorites(newFavorites);
    await AsyncStorage.setItem('favoritesIdeas', JSON.stringify(newFavorites));
  };

  const generateIdea = () => {
    setShowGeneratedIdea(true);
    if (!category) return;
    const filtered = ideas.filter(i => i.category === category);
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    setIdea(random);
  };

  const toggleFavoriteIdeas = () => {
    if (!idea) return;
    const exists = favorites.some(
      fav => fav.idea === idea.idea && fav.category === idea.category,
    );
    const updated = exists
      ? favorites.filter(
          fav => fav.idea !== idea.idea || fav.category !== idea.category,
        )
      : [...favorites, idea];
    saveFavoritesIdeas(updated);
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: idea.idea,
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          {showGeneratedIdea ? (
            <View style={styles.categoryContainer}>
              <View style={styles.iconWrapper}>
                <Text style={styles.title}>Idea Generator Result:</Text>
                <TouchableOpacity onPress={toggleFavoriteIdeas}>
                  {!isFavorite ? (
                    <Image source={require('../../assets/icons/save.png')} />
                  ) : (
                    <Image
                      source={require('../../assets/icons/savedToFav.png')}
                    />
                  )}
                </TouchableOpacity>
              </View>
              <Text style={styles.categoryText}>{category}</Text>
              <Text style={[styles.subtitle, { textAlign: 'left' }]}>
                {idea.idea}
              </Text>
              <TouchableOpacity activeOpacity={0.7} onPress={generateIdea}>
                <LinearGradient
                  colors={['#FF71CD', '#FF2FB6']}
                  style={styles.gradientButton}
                >
                  <Text style={styles.btnText}>Generate new</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.categoryContainer}>
              <Text style={styles.title}>Idea Generator</Text>
              <Text style={styles.subtitle}>
                Just tap and explore!From nature to dreams — endless ideas
                await.
              </Text>
              <DropDownPicker
                open={open}
                value={category}
                items={categories}
                setOpen={setOpen}
                listMode="SCROLLVIEW"
                setValue={setCategory}
                style={styles.dropdown}
                dropDownContainerStyle={styles.dropdownContainer}
                listItemLabelStyle={styles.listItemLabel}
                selectedItemLabelStyle={styles.selectedItemLabel}
                placeholder="Category"
                showTickIcon={false}
                textStyle={styles.pickerTextStyle}
                ArrowDownIconComponent={() => (
                  <Image source={require('../../assets/icons/down.png')} />
                )}
                ArrowUpIconComponent={() => (
                  <Image source={require('../../assets/icons/up.png')} />
                )}
              />
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={generateIdea}
                disabled={!category}
              >
                <LinearGradient
                  colors={['#FF71CD', '#FF2FB6']}
                  style={styles.gradientButton}
                >
                  <Text style={styles.btnText}>Start</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {showGeneratedIdea ? (
            <TouchableOpacity
              style={styles.regularButton}
              activeOpacity={0.7}
              onPress={handleShare}
            >
              <Text style={styles.regularBtnText}>Share</Text>
            </TouchableOpacity>
          ) : (
            <View>
              <Text style={styles.sectionTitle}>Ideas Gallery</Text>
              <View style={styles.imagesWrapper}>
                {gallery.map(({ image }) => (
                  <Image source={image} style={styles.image} key={image} />
                ))}
              </View>
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
  regularBtnText: {
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
    marginTop: 20,
  },
  categoryContainer: {
    width: '100%',
    padding: 20,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 32,
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

    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 1,
    shadowRadius: 4,
    elevation: 10,
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
  iconWrapper: { flexDirection: 'row', justifyContent: 'space-between' },
  image: {
    width: '48%',
    height: 162,
    borderRadius: 8,
  },
});

export default Ideas;

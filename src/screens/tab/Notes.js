import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useCallback, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';

import AppBackground from '../../components/AppBackground';
import { useStore } from '../../store/context';
import { launchImageLibrary } from 'react-native-image-picker';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { height } = Dimensions.get('window');

const Notes = () => {
  const { savedNotes, saveNote, fetchNotes } = useStore();
  const [showEditor, setShowEditor] = useState(false);
  const [cardToEdit, setCardToEdit] = useState(null);
  const [inputTitle, setInputTitle] = useState('');
  const [inputNote, setInputNote] = useState('');
  const [image, setImage] = useState('');
  const [changeImage, setChangeImage] = useState(false);
  const [open, setOpen] = useState(false);
  const [category, setCategory] = useState(null);
  const [categories, setCategories] = useState([
    { label: 'Dreamscapes', value: 'Dreamscapes' },
    { label: 'Nature & Elements', value: 'Nature & Elements' },
    { label: 'Human Moments', value: 'Human Moments' },
  ]);

  const today = new Date();
  const day = String(today.getDate()).padStart(2, '0');
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const year = String(today.getFullYear()).slice(-4);

  const formattedDate = `${day}.${month}.${year}`;

  const isDisabled = !inputNote || !inputTitle || !image || !category;

  useFocusEffect(
    useCallback(() => {
      fetchNotes();

      return () => setShowEditor(false);
    }, []),
  );

  let options = {
    storageOptions: {
      path: 'image',
      maxHeight: 700,
      maxWidth: 700,
    },
  };

  const imagePicker = () => {
    launchImageLibrary(options, response => {
      if (response.didCancel) return;

      setImage(response.assets[0].uri);
      setChangeImage(true);
    });
  };

  const handleSaveCard = () => {
    const newCard = { id: Date.now(), inputTitle, inputNote, image, category };
    saveNote(newCard, cardToEdit);

    setTimeout(() => {
      fetchNotes();
      setShowEditor(false);
    }, 300);
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <View style={styles.headerTitle}>
            <Text style={styles.headerTitleText}>
              {showEditor ? 'Editor' : 'My Notes and Ideas'}
            </Text>
          </View>
          {savedNotes.length === 0 && (
            <Text style={styles.emptyScreenText}>
              There is no notes right now
            </Text>
          )}

          {!showEditor && (
            <View>
              {savedNotes.map((note, idx) => (
                <View style={styles.cardContainer} key={idx}>
                  <Text style={styles.date}>{formattedDate}</Text>

                  <View>
                    <Image
                      source={{ uri: note.image }}
                      style={styles.addedImage}
                    />
                  </View>

                  <Text style={styles.title}>{note.inputTitle}</Text>

                  <Text style={styles.subtitle}>{note.inputNote}</Text>

                  <Text style={styles.categoryText}>{note.category}</Text>
                  <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={() => {
                      setShowEditor(true);
                      setCardToEdit(note);
                      setInputTitle(note.inputTitle);
                      setInputNote(note.inputNote);
                      setImage(note.image);
                      setChangeImage(true);
                      setCategory(note.category);
                    }}
                  >
                    <LinearGradient
                      colors={['#FF71CD', '#FF2FB6']}
                      style={styles.gradientButton}
                    >
                      <Text style={styles.btnText}>Edit</Text>
                      <Image source={require('../../assets/icons/edit.png')} />
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              ))}
              <TouchableOpacity
                activeOpacity={0.7}
                onPress={() => {
                  setShowEditor(true), setInputTitle('');
                  setInputNote('');
                  setImage('');
                  setChangeImage(false);
                  setCategory(null);
                }}
              >
                <LinearGradient
                  colors={['#FF71CD', '#FF2FB6']}
                  style={[
                    styles.gradientButton,
                    { borderWidth: 0.5, borderColor: '#FFFFFF' },
                  ]}
                >
                  <Text style={styles.btnText}>Create new</Text>
                  <Image source={require('../../assets/icons/edit.png')} />
                </LinearGradient>
              </TouchableOpacity>
            </View>
          )}

          {showEditor && (
            <View style={styles.cardContainer}>
              <Text style={styles.date}>{formattedDate}</Text>
              {changeImage ? (
                <TouchableOpacity activeOpacity={0.7} onPress={imagePicker}>
                  <Image source={{ uri: image }} style={styles.addedImage} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.imageContainer}
                  activeOpacity={0.7}
                  onPress={imagePicker}
                >
                  <Image source={require('../../assets/icons/add.png')} />
                </TouchableOpacity>
              )}
              <TextInput
                style={styles.input}
                value={inputTitle}
                onChangeText={setInputTitle}
              />
              <TextInput
                style={[styles.input, { marginBottom: 21 }]}
                value={inputNote}
                onChangeText={setInputNote}
              />

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
                labelStyle={styles.label}
                textStyle={styles.pickerTextStyle}
                showTickIcon={false}
                ArrowDownIconComponent={() => (
                  <Image source={require('../../assets/icons/down.png')} />
                )}
                ArrowUpIconComponent={() => (
                  <Image source={require('../../assets/icons/up.png')} />
                )}
              />

              <TouchableOpacity
                activeOpacity={0.7}
                onPress={handleSaveCard}
                disabled={isDisabled}
              >
                <LinearGradient
                  colors={['#FF71CD', '#FF2FB6']}
                  style={styles.gradientButton}
                >
                  <Text style={styles.btnText}>Save</Text>
                </LinearGradient>
              </TouchableOpacity>
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
    paddingBottom: height * 0.15,
  },
  title: {
    fontFamily: 'MadimiOne-Regular',
    fontSize: 24,
    color: '#000',
    marginVertical: 17,
  },
  subtitle: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#000',
    marginBottom: 17,
  },
  emptyScreenText: {
    fontFamily: 'Montserrat-Regular',
    fontSize: 17,
    color: '#fff',
    marginTop: 28,
    textAlign: 'center',
  },
  categoryText: {
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 17,
    color: '#000',
  },
  date: {
    fontFamily: 'Montserrat-Medium',
    fontSize: 15,
    color: '#000000',
    marginBottom: 18,
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
    marginTop: 21,
    flexDirection: 'row',
    gap: 7,
  },
  cardContainer: {
    width: '100%',
    padding: 23,
    paddingHorizontal: 30,
    backgroundColor: '#fff',
    borderRadius: 32,
    marginTop: 12,
  },
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
  buttonsWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardsWrap: { width: '100%', gap: 11, marginTop: 8 },
  imageContainer: {
    width: '100%',
    height: 152,
    backgroundColor: '#FFEEF9',
    borderRadius: 22,
    borderWidth: 1,
    borderColor: '#DBDBDB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '100%',
    height: 56,
    borderRadius: 22,
    borderWidth: 0.5,
    borderColor: '#D7D7D7',
    marginTop: 21,
    paddingHorizontal: 20,
  },
  addedImage: {
    width: '100%',
    height: 152,
    borderRadius: 22,
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
});

export default Notes;

import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import AppBackground from '../../components/AppBackground';

const { height } = Dimensions.get('window');

const Onboard = () => {
  const [step, setStep] = useState(1);
  const navigation = useNavigation();

  const handleNextStep = () => {
    step === 4 ? navigation.replace('TabNav') : setStep(step + 1);
  };

  return (
    <AppBackground>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.container}>
          <Image source={require('../../assets/images/onboardImage.png')} />
          <Text style={styles.title}>
            {step === 1 && 'Meet Jinko'}
            {step === 2 && 'Daily Bloom'}
            {step === 3 && 'Idea Generator'}
            {step === 4 && 'Save Your Favorites'}
          </Text>
          <Text style={styles.subtitle}>
            {step === 1 &&
              ` Say hello to your creative buddy! Jinko is here to spark your
            imagination — every single day.`}
            {step === 2 &&
              'Start your day with a fresh idea, quote, or creative prompt. Quick, light, and ready to inspire.'}
            {step === 3 &&
              'Need more? Just tap! Explore endless prompts across themes like nature, dreams, and emotion.'}
            {step === 4 &&
              'Found something that clicks? Save and organize your favorite ideas in one easy place.'}
          </Text>

          <TouchableOpacity
            style={styles.regularButton}
            activeOpacity={0.7}
            onPress={handleNextStep}
          >
            <Text style={styles.btnText}>Start</Text>
          </TouchableOpacity>

          <View style={styles.pagination}>
            {[1, 2, 3, 4].map(item => (
              <View
                style={[
                  styles.dot,
                  step === item && { backgroundColor: '#fff' },
                ]}
                key={item}
              />
            ))}
          </View>
        </View>
      </ScrollView>
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

export default Onboard;

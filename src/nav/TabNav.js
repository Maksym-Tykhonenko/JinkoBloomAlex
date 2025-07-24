import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Dimensions, Image, StyleSheet, View } from 'react-native';

import Ideas from '../screens/tab/Ideas';
import Blooms from '../screens/tab/Blooms';
import Saved from '../screens/tab/Saved';
import Notes from '../screens/tab/Notes';

const Tab = createBottomTabNavigator();

const { height } = Dimensions.get('window');

const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarStyle: styles.tabBar,
        tabBarIconStyle: styles.tabBarIcon,
        tabBarActiveTintColor: '#FF2FB6',
        tabBarInactiveTintColor: '#000',
      }}
    >
      <Tab.Screen
        name="Ideas"
        component={Ideas}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.bgIcon, focused && { backgroundColor: '#fff' }]}
            >
              <Image
                source={require('../assets/icons/ideas.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Blooms"
        component={Blooms}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.bgIcon, focused && { backgroundColor: '#fff' }]}
            >
              <Image
                source={require('../assets/icons/blooms.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.bgIcon, focused && { backgroundColor: '#fff' }]}
            >
              <Image
                source={require('../assets/icons/saved.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Notes"
        component={Notes}
        listeners={({ navigation }) => ({
          blur: () => navigation.setParams({ screen: undefined }),
        })}
        options={{
          tabBarIcon: ({ color, focused }) => (
            <View
              style={[styles.bgIcon, focused && { backgroundColor: '#fff' }]}
            >
              <Image
                source={require('../assets/icons/notes.png')}
                style={{ tintColor: color }}
              />
            </View>
          ),
          unmountOnBlur: true,
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#fff',
    borderWidth: 0.2,
    borderColor: '#fff',
    elevation: 1,
    borderTopWidth: 1,
    paddingTop: 30,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    height: height * 0.14,
    borderRadius: 32,
    borderColor: '#FF2FB6',
  },
  bgIcon: {
    borderRadius: 22,
    paddingTop: 14,
    paddingBottom: 14,
    paddingHorizontal: 13,
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#DBDBDB',
  },
});

export default TabNav;

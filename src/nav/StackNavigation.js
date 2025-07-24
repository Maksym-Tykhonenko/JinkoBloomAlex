import { createStackNavigator } from '@react-navigation/stack';
import TabNav from './TabNav';
import Onboard from '../screens/stack/Onboard';

const Stack = createStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Onboard" component={Onboard} />
      <Stack.Screen name="TabNav" component={TabNav} />
    </Stack.Navigator>
  );
};

export default StackNavigation;

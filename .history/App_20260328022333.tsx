import { useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { RootStack } from './Project/Screens/stacks/RootStacks';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DepositProvider } from './Project/Screens/context/DepositContext';
import { CashoutProvider } from './Project/Screens/context/CashoutContext'
import RegisterScreen from './Project/Screens/RegisterScreen';







function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
   <SafeAreaProvider>
    <DepositProvider>
      <CashoutProvider>
        <NavigationContainer>
        </>
        </NavigationContainer>
      </CashoutProvider> 
    </DepositProvider>
   </SafeAreaProvider>
  );
}


export default App;
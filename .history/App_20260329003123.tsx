import { useColorScheme, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { DepositProvider } from './Project/Screens/context/DepositContext';
import { CashoutProvider } from './Project/Screens/context/CashoutContext'
import { RootStack } from './Project/Screens/stacks/RootStacks';








function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
   <SafeAreaProvider>
    <DepositProvider>
      <CashoutProvider>
        <NavigationContainer>
        <RootStack/>
        </NavigationContainer>
      </CashoutProvider> 
    </DepositProvider>
   </SafeAreaProvider>
  );
}


export default App;
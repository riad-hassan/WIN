import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomNavigation } from "./BottomStacks";
import HotScreen from "../HotScreen";
import SportsScreen from "../SportsScreen";
import ProfileScreen from "../ProfileScreen";
import DepositScreen from "../DepositScreen";
import CashoutScreen from "../CashoutScreen";
import DepoListScreen from "../DepoListScreen";
import CashoutListScreen from "../CashoutListScreen";
import LendenScreen from "../LendenScreen";
import AviatorScreen from "../AviatorGame";
import CasinoHeader from "../CasinoHeader";
import LotteryScreen from "../LotteryScreen";
import ReferScreen from "../ReferScreen";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native";
import BkashScreen from "../payment/bkashScreen";
import NagadScreen from "../payment/nagadScreen";
import RocketScreen from "../payment/rocketScreen";
import UpayScreen from "../payment/upayScreen";
import BkashConfirmScreen from "../payment/BkashConfirmScreen";
import NagadConfirmScreen from "../payment/NagadConfirmScreen";
import RocketConfirmScreen from "../payment/RocketConfirmScreen";
import UpayConfirmScreen from "../payment/UpayConfirmScreen";
import BlogScreen from "../BlogScreen";
import WalletScreen from "../WalletScreen";
import SlotScreen from "../SlotsScreen";
import HelpScreen from "../HelpScreen";
import WbkashScreen from "../withdraw/bkashScreen";
import WnagadScreen from "../withdraw/nagadScreen";
import WrocketScreen from "../withdraw/rocketScreen";
import WupayScreen from "../withdraw/upayScreen";
import NotificationScreen from "../NotifiScreen";
import VerificationScreen from "../KycScreen";
import LoginScreen from "../LoginScreen";
import RegisterScreen from "../RegisterScreen";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";





const Stack = createNativeStackNavigator();
export function RootStack () {
const [isLoggedIn, setIsLoggedIn] = useState(false);

    
 const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };   

  useEffect(() => {
  const checkLogin = async () => {
    const uid = await AsyncStorage.getItem("uid");
    setIsLoggedIn(!!uid);
  };

  checkLogin();
}, [isLoggedIn]);

    
    return(
        <Stack.Navigator
        screenOptions={{
headerStyle:{backgroundColor:"red"},
headerTitleStyle:{fontWeight:"500"},
headerRight:()=> <CasinoHeader/>
}}>
          {isLoggedIn ? (
            <>
            <Stack.Screen 
            name="MainTabs"
            component={BottomNavigation}
            options={{
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '600', color: "#ffffffb7"},
                headerTitle: () => (
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{fontSize:25, marginTop: 7}} >☰ </Text>
        <Image
          source={require('../assets/grand_win_transparent.png')}
          style={{ width: 130, height: 50, resizeMode: 'contain', marginLeft:1 }}
        />
      </View>
            ), }}/>



            <Stack.Screen 
            name="HOT GAMES"
            component={HotScreen}
            options={{title: 'HOT GAMES',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="SPORTS"
            component={SportsScreen}
            options={{title: 'SPORTS',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen name="আমার একাউন্ট" options={{title: 'Profile',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}>
  {(props) => (
    <ProfileScreen {...props} onLogout={() => setIsLoggedIn(false)} />
  )}
</Stack.Screen>


            <Stack.Screen 
            name="Deposit"
            component={DepositScreen}
            options={{title: 'Deposit',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Cashout"
            component={CashoutScreen}
            options={{title: 'Withdraw ',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="DepoList"
            component={DepoListScreen}
            options={{title: 'Deposit History',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Cashout List"
            component={CashoutListScreen}
            options={{title: 'Cashout History',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Lenden"
            component={LendenScreen}
            options={{title: 'Privacy Policy',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="AVIATOR GAME"
            component={AviatorScreen}
            options={{
                headerStyle: {backgroundColor: '#000000e7'},
                headerShown: true,
                headerTintColor: "#fff",
             headerTitle: () => (
                <View style={{ flexDirection: 'row'}}>
        <Image
          source={require('../assets/avi.png')}
          style={{ width: 160, height: 47, resizeMode: 'contain', marginLeft:-25 }}
        />

      </View>
            ),   
            }}
            />



            <Stack.Screen 
            name="LOTTERY"
            component={LotteryScreen}
            options={{title: 'LOTTERY',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Slot"
            component={SlotScreen}
            options={{title: 'Slots',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="Help"
            component={HelpScreen}
            options={{title: 'Help Center',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Reffer Income"
            component={ReferScreen}
            options={{title: 'REFFER INCOME',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="Blog"
            component={BlogScreen}
            options={{title: 'Our Blog',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="bkash"
            component={BkashScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Nagad"
            component={NagadScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Rocket"
            component={RocketScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />



            <Stack.Screen 
            name="Upay"
            component={UpayScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="BkashConfirm"
            component={BkashConfirmScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="NagadConfirm"
            component={NagadConfirmScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="RocketConfirm"
            component={RocketConfirmScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="UpayConfirm"
            component={UpayConfirmScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="Wallet"
            component={WalletScreen}
            options={{title: 'Your Wallet',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

             <Stack.Screen 
            name="Wbkash"
            component={WbkashScreen}
            options={{title: 'Withdraw System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="Wnagad"
            component={WnagadScreen}
            options={{title: 'Withdraw System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Wrocket"
            component={WrocketScreen}
            options={{title: 'Withdraw System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="Wupay"
            component={WupayScreen}
            options={{title: 'Withdraw System',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="notifi"
            component={NotificationScreen}
            options={{title: 'Notification Box',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="KYC"
            component={VerificationScreen}
            options={{title: 'KYC Verify',
                headerStyle: {backgroundColor: '#6de0cdff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            </>
            ) : (
        <>
{/* লগিন বা রেজিস্টার স্ক্রিন */}
          <Stack.Screen name="Login" options={{ headerShown: false }}>
  {(props) => <LoginScreen {...props} onLogin={handleLoginSuccess} />}
</Stack.Screen>

<Stack.Screen name="Register" options={{ headerShown: false }}>
  {(props) => <RegisterScreen {...props} onLogin={handleLoginSuccess} />}
</Stack.Screen>
        </>
      )}




        </Stack.Navigator>
    )
}
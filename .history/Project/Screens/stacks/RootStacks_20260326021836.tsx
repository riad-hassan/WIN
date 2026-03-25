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





const Stack = createNativeStackNavigator();
export function RootStack () {
    return(
        <Stack.Navigator
        screenOptions={{
headerStyle:{backgroundColor:"red"},
headerTitleStyle:{fontWeight:"500"},
headerRight:()=> <CasinoHeader/>
}}>

            <Stack.Screen 
            name="MainTabs"
            component={BottomNavigation}
            options={{
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '600', color: "#ffffffb7"},
                headerTitle: () => (
                <View style={{ flexDirection: 'row'}}>
                    <Text style={{fontSize:30}} >☰ </Text>
        <Image
          source={require('../assets/profile.png')}
          style={{ width: 160, height: 47, resizeMode: 'contain', marginLeft:-60 }}
        />
        <Text style={{fontSize:20}} >GRAND WIN</Text>

      </View>
            ),
            }}
            
            />



            <Stack.Screen 
            name="HOT GAMES"
            component={HotScreen}
            options={{title: 'HOT GAMES',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="SPORTS"
            component={SportsScreen}
            options={{title: 'SPORTS',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="আমার একাউন্ট"
            component={ProfileScreen}
            options={{title: 'Profile',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Deposit"
            component={DepositScreen}
            options={{title: 'Deposit',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Cashout"
            component={CashoutScreen}
            options={{title: 'Withdraw ',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="DepoList"
            component={DepoListScreen}
            options={{title: 'Deposit History',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Cashout List"
            component={CashoutListScreen}
            options={{title: 'Cashout History',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Lenden"
            component={LendenScreen}
            options={{title: 'Privacy Policy',
                headerStyle: {backgroundColor: '#066b24ff'},
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
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Slot"
            component={SlotScreen}
            options={{title: 'Slots',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="Help"
            component={HelpScreen}
            options={{title: 'Help Center',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Reffer Income"
            component={ReferScreen}
            options={{title: 'REFFER INCOME',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="Blog"
            component={BlogScreen}
            options={{title: 'Our Blog',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="bkash"
            component={BkashScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Nagad"
            component={NagadScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


            <Stack.Screen 
            name="Rocket"
            component={RocketScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />



            <Stack.Screen 
            name="Upay"
            component={UpayScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="BkashConfirm"
            component={BkashConfirmScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="NagadConfirm"
            component={NagadConfirmScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="RocketConfirm"
            component={RocketConfirmScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="UpayConfirm"
            component={UpayConfirmScreen}
            options={{title: 'Payment System',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />

            <Stack.Screen 
            name="Wallet"
            component={WalletScreen}
            options={{title: 'Your Wallet',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '700'}
            }}
            />


        </Stack.Navigator>
    )
}
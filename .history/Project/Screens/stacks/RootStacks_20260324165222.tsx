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
            options={{title: ' ☰   GrandWIN BET',
                headerStyle: {backgroundColor: '#066b24ff'},
                headerShown: true,
                headerTitleStyle: { fontWeight: '600', color: "#ffffffb7"}
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
            name="Reffer Income"
            component={ReferScreen}
            options={{title: 'REFFER INCOME',
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


        </Stack.Navigator>
    )
}
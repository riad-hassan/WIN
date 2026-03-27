import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { supabase } from '../supabase';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const handleLogin = async () => {
    const { data } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password', pass);
    
    if (data.length > 0) {
      navigation.reset({ index:0, routes:[{name:'MainTabs'}] });
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={pass} onChangeText={setPass} secureTextEntry />
      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>
    </View>
  );
}
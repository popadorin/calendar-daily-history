import React, {useReducer, useEffect, createContext, useMemo} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import {createStackNavigator} from "@react-navigation/stack";

export const AuthContext = createContext(undefined);

const Stack = createStackNavigator();

export default function AppNavigator({navigation}) {
  const [state, dispatch] = useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN_SUCCESS':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
          };
         case 'SIGN_IN_ERROR':
          return {
            ...prevState,
            error: action.error,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      error: null
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        userToken = await AsyncStorage.getItem('userToken');
      } catch (e) {
        // Restoring token failed
      }

      dispatch({type: 'RESTORE_TOKEN', token: userToken});
    };

    bootstrapAsync();
  }, []);

  const authContext = useMemo(
    () => ({
      signIn: async data => {
        const {username, password} = data;
        let token;
        if (username === 'admin' && password === 'admin') {
          token = 'dummy-auth-token' // for our case it's enough
        }

        if (token) { // otherwise make error handling
          await AsyncStorage.setItem('userToken', token);
          dispatch({type: 'SIGN_IN_SUCCESS', token: token});
        } else {
          dispatch({type: 'SIGN_IN_ERROR', error: 'Incorrect username or password'});
        }
      },
      signOut: async () => {
        await AsyncStorage.removeItem('userToken');
        dispatch({type: 'SIGN_OUT'})
      },
      signUp: async data => {
        dispatch({type: 'SIGN_IN', token: 'dummy-auth-token'});
      },
      error: state.error
    }),
    [state.error]
  );

  return (
    <AuthContext.Provider value={authContext}>
      <Stack.Navigator>
        {state.userToken ? (
          <Stack.Screen name="Home" component={HomeScreen} options={{headerTitle: 'Calendar'}} />
        ) : (
          <Stack.Screen name="Login" component={LoginScreen} options={{headerShown: false}} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

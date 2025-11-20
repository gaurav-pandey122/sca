import { useFonts } from 'expo-font';
import * as Location from 'expo-location';
import { Slot, Stack, useRouter, useSegments } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { Alert, BackHandler } from 'react-native';
import { AuthProvider, useAuth } from '../context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });
  const [permissionsGranted, setPermissionsGranted] = useState(false);

  useEffect(() => {
    async function requestPermissions() {
      try {
        // Request Location Permission
        const { status: locationStatus } = await Location.requestForegroundPermissionsAsync();

        if (locationStatus !== 'granted') {
          Alert.alert(
            'Permission Required',
            'Location permission is required to use this app. The app will now close.',
            [
              {
                text: 'OK',
                onPress: () => {
                  BackHandler.exitApp();
                },
              },
            ],
            { cancelable: false }
          );
          return;
        }

        // All permissions granted
        setPermissionsGranted(true);
      } catch (error) {
        Alert.alert(
          'Error',
          'Failed to request permissions. The app will now close.',
          [
            {
              text: 'OK',
              onPress: () => {
                BackHandler.exitApp();
              },
            },
          ],
          { cancelable: false }
        );
      }
    }

    requestPermissions();
  }, []);

  // Splash screen is now hidden in RootNavigator after auth check

  if (!loaded || !permissionsGranted) {
    return null;
  }

  return (
    <AuthProvider>
      <RootNavigator />
    </AuthProvider>
  );
}

function RootNavigator() {
  const { user, isLoading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  const inAuthGroup = segments[0] === '(auth)';
  const shouldRedirect = (!user && !inAuthGroup) || (user && inAuthGroup);

  useEffect(() => {
    if (isLoading) return;

    if (shouldRedirect) {
      if (!user && !inAuthGroup) {
        // Redirect to login if not authenticated
        router.replace('/(auth)/login');
      } else if (user && inAuthGroup) {
        // Redirect to tabs if already authenticated
        router.replace('/(tabs)');
      }
    } else {
      // No redirect needed, hide splash screen
      SplashScreen.hideAsync();
    }
  }, [user, segments, isLoading, shouldRedirect]);

  if (isLoading || shouldRedirect) return <Slot />;

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(auth)" options={{ headerShown: false }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="+not-found" />
    </Stack>
  );
}

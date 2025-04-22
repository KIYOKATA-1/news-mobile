import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  import { Alert } from 'react-native';
  import ReactNativeBiometrics from 'react-native-biometrics';
  
  interface AuthContextProps {
    authenticated: boolean;
    biometryType: string | null;
    authenticate: () => void;
    logout: () => void;
  }
  
  export const AuthContext = createContext<AuthContextProps>({
    authenticated: false,
    biometryType: null,
    authenticate: () => {},
    logout: () => {},
  });
  
  const rnBiometrics = new ReactNativeBiometrics({
    allowDeviceCredentials: true,
  });
  
  export function AuthProvider({ children }: { children: ReactNode }) {
    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [biometryType, setBiometryType] = useState<string | null>(null);
  
    useEffect(() => {
      rnBiometrics
        .isSensorAvailable()
        .then(({ available, biometryType: sensorType }) => {
          const typeOrNull = sensorType ?? null;
          setBiometryType(available ? typeOrNull : null);
        })
        .catch(() => {
          setBiometryType(null);
        });
    }, []);
  
    const authenticate = async () => {
      try {
        const { success, error } = await rnBiometrics.simplePrompt({
          promptMessage: 'Подтвердите личность',
        });
        if (success) {
          setAuthenticated(true);
        } else {
          Alert.alert('Ошибка', error || 'Отменено пользователем');
        }
      } catch {
        Alert.alert('Ошибка', 'Не удалось выполнить биометрию');
      }
    };
  
    const logout = () => {
      setAuthenticated(false);
    };
  
    return (
      <AuthContext.Provider
        value={{ authenticated, biometryType, authenticate, logout }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
  
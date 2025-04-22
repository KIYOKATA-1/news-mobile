import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  import { Alert, Platform } from 'react-native';
  import ReactNativeBiometrics, {
    BiometryTypes,
  } from 'react-native-biometrics';
  
  export interface AuthContextProps {
    authenticated: boolean;
    biometryType: BiometryTypes | null;
    authenticate: () => void;
    logout: () => void;
  }
  
  export const AuthContext = createContext<AuthContextProps>({
    authenticated: false,
    biometryType: null,
    authenticate: () => {},
    logout: () => {},
  });
  
  const rnBiometrics = new ReactNativeBiometrics({ allowDeviceCredentials: true });
  
  // Возвращает текст для prompt-а в зависимости от типа биометрии
  function getPromptMessage(type: BiometryTypes | null): string {
    switch (type) {
      case BiometryTypes.FaceID:
        return 'Подтвердите лицо';
      case BiometryTypes.TouchID:
        return 'Подтвердите отпечаток';
      case BiometryTypes.Biometrics:
        return 'Подтвердите биометрию';
      default:
        return 'Подтвердите личность';
    }
  }
  
  export function AuthProvider({ children }: { children: ReactNode }) {
    const [authenticated, setAuthenticated] = useState(false);
    const [biometryType, setBiometryType] = useState<BiometryTypes | null>(null);
  
    useEffect(() => {
      rnBiometrics
        .isSensorAvailable()
        .then(({ available, biometryType }) => {
          setBiometryType(available ? biometryType ?? null : null);
        })
        .catch(() => setBiometryType(null));
    }, []);
  
    const authenticate = async () => {
      try {
        const { success, error } = await rnBiometrics.simplePrompt({
          promptMessage: getPromptMessage(biometryType),
          cancelButtonText: 'Отмена',
        });
        if (success) {
          setAuthenticated(true);
        } else {
          Alert.alert('Ошибка', error || 'Отменено пользователем');
        }
      } catch (e) {
        console.warn('simplePrompt error', e);
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
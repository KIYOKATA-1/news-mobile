declare module 'react-native-biometrics' {
    export enum BiometryTypes {
      TouchID = 'TouchID',
      FaceID = 'FaceID',
      Biometrics = 'Biometrics',
    }
    export interface BiometryAvailability {
      available: boolean;
      biometryType?: BiometryTypes | null;
      error?: string;
    }
    export interface PromptResult {
      success: boolean;
      signature?: string;
      error?: string;
    }
    export default class ReactNativeBiometrics {
      constructor(options?: { allowDeviceCredentials: boolean });
      isSensorAvailable(): Promise<BiometryAvailability>;
      simplePrompt(options: {
        promptMessage: string;
        fallbackPromptMessage?: string;
        cancelButtonText?: string;
      }): Promise<PromptResult>;
    }
    export { BiometryTypes };
  }
  
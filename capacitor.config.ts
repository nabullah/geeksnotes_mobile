import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.mobile.geeksnotes',
  appName: 'Geeks Notes',
  webDir: 'www',
  server: {
    androidScheme: 'https'
  }
};

export default config;

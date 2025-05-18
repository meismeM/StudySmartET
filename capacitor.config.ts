import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.studysmart.app',
  appName: 'StudySmart',
  webDir: 'build',
  server: {
    androidScheme: 'https',
    url: 'https://studysmart-nu.vercel.app',
    cleartext: true
  },
  plugins: {
    Storage: {},
    Filesystem: {},
    Network: {}
  }
};

export default config;

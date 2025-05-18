import { Storage } from '@capacitor/storage';
import { Network } from '@capacitor/network';
import { Filesystem, Directory } from '@capacitor/filesystem';

export class OfflineHandler {
  private static instance: OfflineHandler;
  private isOnline: boolean = true;

  private constructor() {
    this.initNetworkListener();
  }

  static getInstance() {
    if (!OfflineHandler.instance) {
      OfflineHandler.instance = new OfflineHandler();
    }
    return OfflineHandler.instance;
  }

  private async initNetworkListener() {
    // Initial network status
    const status = await Network.getStatus();
    this.isOnline = status.connected;

    // Listen for network changes
    Network.addListener('networkStatusChange', status => {
      this.isOnline = status.connected;
    });
  }

  async saveForOffline(key: string, data: any) {
    try {
      await Storage.set({
        key,
        value: JSON.stringify(data)
      });
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }

  async getOfflineData(key: string) {
    try {
      const { value } = await Storage.get({ key });
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Error getting data:', error);
      return null;
    }
  }

  async savePDF(url: string, filename: string) {
    try {
      // Download the file
      const response = await fetch(url);
      const blob = await response.blob();
      
      // Convert blob to base64
      const reader = new FileReader();
      const base64Data = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      // Save to filesystem
      await Filesystem.writeFile({
        path: `pdfs/${filename}`,
        data: base64Data,
        directory: Directory.Documents,
        recursive: true
      });

      // Save reference to storage
      await this.saveForOffline(`pdf_${filename}`, {
        path: `pdfs/${filename}`,
        savedAt: new Date().toISOString()
      });

      return true;
    } catch (error) {
      console.error('Error saving PDF:', error);
      return false;
    }
  }

  async getOfflinePDF(filename: string) {
    try {
      const fileInfo = await this.getOfflineData(`pdf_${filename}`);
      if (!fileInfo) return null;

      const file = await Filesystem.readFile({
        path: fileInfo.path,
        directory: Directory.Documents
      });

      return file.data;
    } catch (error) {
      console.error('Error reading PDF:', error);
      return null;
    }
  }

  isNetworkAvailable() {
    return this.isOnline;
  }
} 
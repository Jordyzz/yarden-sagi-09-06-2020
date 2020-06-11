class StorageService {
  set(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  remove(key: string) {
    localStorage.removeItem(key);
  }

  get(key: string): any {
    const item = localStorage.getItem(key);

    return item ? JSON.parse(item) : null;
  }
}

export const storageService = new StorageService();

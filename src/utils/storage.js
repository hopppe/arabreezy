import AsyncStorage from '@react-native-async-storage/async-storage';

export async function getJSON(key, fallback = null) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw == null ? fallback : JSON.parse(raw);
  } catch {
    return fallback;
  }
}

export async function setJSON(key, value) {
  await AsyncStorage.setItem(key, JSON.stringify(value));
}

export async function removeKey(key) {
  await AsyncStorage.removeItem(key);
}

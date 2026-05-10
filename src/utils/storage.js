import AsyncStorage from '@react-native-async-storage/async-storage';
export async function setItem(key, value) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn('[storage] setItem failed:', key, err);
  }
}
export async function getItem(key) {
  try {
    const raw = await AsyncStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : null;
  } catch (err) {
    console.warn('[storage] getItem failed:', key, err);
    return null;
  }
}
export async function removeItem(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.warn('[storage] removeItem failed:', key, err);
  }
}
export async function multiRemove(keys) {
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (err) {
    console.warn('[storage] multiRemove failed:', keys, err);
  }
}

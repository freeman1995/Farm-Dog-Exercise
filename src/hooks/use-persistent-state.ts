import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { AsyncStorage } from "react-native";

export const usePersistentState = function<T>(
  key: string,
  initialState: T
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(initialState);

  useEffect(() => {
    (async () => {
      try {
        const savedState = await AsyncStorage.getItem(key);

        if (savedState) {
          setState(JSON.parse(savedState));
        }
      } catch (e) {
        console.log(e);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem(key, JSON.stringify(state));
      } catch (e) {
        console.log(e);
      }
    })();
  }, [state]);

  return [state, setState];
};

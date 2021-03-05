import { Vibration } from 'react-native';

export function VibrateOn() {
    Vibration.vibrate(100);
}

export function VibrateClose() {
    Vibration.cancel();
}
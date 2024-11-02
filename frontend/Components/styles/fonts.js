import * as Font from 'expo-font';

const loadFonts = () => {
    return Font.loadAsync({
        'Retrograde': require('../../assets/fonts/Retrograde.ttf'),
        'LouisGeorgeCafe': require('../../assets/fonts/LouisGeorgeCafe.ttf'),
        'Quagi': require('../../assets/fonts/Quagi.otf'),

    });
};

export default loadFonts;
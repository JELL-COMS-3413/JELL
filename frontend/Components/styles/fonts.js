import * as Font from "expo-font";

const loadFonts = () => {
  return Font.loadAsync({
    Retrograde: require("../../assets/fonts/Retrograde.ttf"),
  });
};

export default loadFonts;

import React from "react";
import { View, Text } from "react-native";

import styles from "./styles";

const FlashMessage: React.FC = () => {
  return (
    <View style={styles.flashContainer}>
      <Text style={styles.flashMessage}>
        Clique em um marcador para mais informações
      </Text>
    </View>
  );
};

export default FlashMessage;

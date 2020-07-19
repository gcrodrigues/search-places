import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import {
  TextInput,
  View,
  Text,
  Alert,
  ActivityIndicator,
  Keyboard,
} from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Feather } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import MapView, { Marker } from "react-native-maps";
import api, { API_KEY } from "../../service/api";
import FlashMessage from "../../components/FlashMessage";

import styles from "./styles";

interface Place {
  id: string;
  place_id: string;
  geometry: {
    location: {
      lat: number;
      lng: number;
    };
  };
  name: string;
  opening_hours: {
    open_now: boolean;
  };
  types: string[];
  vicinity: string;
}

const Home: React.FC = () => {
  const [userLocation, setUserLocation] = useState<[number, number]>([0, 0]);
  const [queryValue, setQueryValue] = useState("");
  const [places, setPlaces] = useState<Place[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(true);
  const [flashMessage, setFlashMessage] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    loadPosition();
  }, []);

  async function loadPosition() {
    const { status } = await Location.requestPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Ooops...",
        "Precisamos de sua permissão para obter a sua localização!"
      );
      setStatus(false);
      return;
    }
    setStatus(true);
    const location = await Location.getCurrentPositionAsync();
    const { latitude, longitude } = location.coords;
    setUserLocation([latitude, longitude]);
  }

  function handlePlacesData() {
    setLoading(true);
    api
      .get(`nearbysearch/json`, {
        params: {
          key: API_KEY,
          location: `${userLocation[0]},${userLocation[1]}`,
          rankby: "distance",
          name: queryValue,
        },
      })
      .then((res) => {
        setPlaces(res.data.results);
        Keyboard.dismiss();
        setLoading(false);
        setFlashMessage(true);
      });
    setTimeout(() => {
      setFlashMessage(false);
    }, 10000);
  }

  function handleNavigateToDetail(id: string) {
    navigation.navigate("Detail", { place_id: id });
  }

  return !status ? (
    <View style={styles.noPermissionContainer}>
      <Feather name="alert-triangle" size={50} color="black" />
      <Text style={styles.noPermissionText}>
        Permita o acesso a sua localização para ter acesso ao app.
      </Text>
      <RectButton style={styles.noPermissionButton} onPress={loadPosition}>
        <Text style={styles.noPermissionButtonText}>
          Permitir acesso a localização
        </Text>
      </RectButton>
    </View>
  ) : (
    <View style={styles.container}>
      {flashMessage && <FlashMessage />}
      <View style={styles.contentWrapper}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            value={queryValue}
            onChangeText={(text) => setQueryValue(text)}
            placeholder="Pesquise por estabelecimentos"
            returnKeyType={"search"}
            onSubmitEditing={handlePlacesData}
          />
          <RectButton style={styles.button} onPress={handlePlacesData}>
            {loading ? (
              <ActivityIndicator />
            ) : (
              <Feather name="search" size={20} color="#000" />
            )}
          </RectButton>
        </View>

        {userLocation[0] !== 0 && (
          <MapView
            initialRegion={{
              latitude: userLocation[0],
              longitude: userLocation[1],
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }}
            style={styles.mapStyle}
            showsUserLocation={true}
            showsMyLocationButton={false}
            showsCompass={false}
            rotateEnabled={false}
          >
            {places.map(
              (place, index) =>
                index <= 9 && (
                  <Marker
                    key={place.id}
                    onPress={() => handleNavigateToDetail(place.place_id)}
                    coordinate={{
                      latitude: place.geometry.location.lat,
                      longitude: place.geometry.location.lng,
                    }}
                  >
                    <View style={styles.markerView}>
                      <Text style={styles.markerText}>{index + 1}</Text>
                    </View>
                  </Marker>
                )
            )}
          </MapView>
        )}
      </View>
    </View>
  );
};

export default Home;

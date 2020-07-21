import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Text,
  View,
  Linking,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute, useNavigation } from "@react-navigation/native";
import api, { API_KEY } from "../../service/api";
import { Rating } from "react-native-ratings";
import { RectButton } from "react-native-gesture-handler";

import styles from "./styles";

interface Params {
  place_id: string;
  total_ratings: number;
  open_now?: boolean;
}

interface PlaceDetail {
  formatted_address: string;
  formatted_phone_number?: string;
  name: string;
  rating: number;
  website?: string;
}

const Detail: React.FC = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const routeParams = route.params as Params;
  const [data, setData] = useState<PlaceDetail>({} as PlaceDetail);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    async function fetchPlaceDetails() {
      setLoading(true);
      try {
        const response = await api.get(`details/json`, {
          params: {
            key: API_KEY,
            place_id: routeParams.place_id,
            fields:
              "formatted_address,formatted_phone_number,name,opening_hours,rating,website",
          },
        });
        setData(response.data.result);
        setLoading(false);
      } catch (error) {
        console.log("Erro! Não foi possível obter os dados da requisição");
        setLoading(false);
      }
    }
    fetchPlaceDetails();
  }, []);

  function handleNavigateBack() {
    navigation.goBack();
  }

  function handlePhoneCall() {
    Linking.openURL(`tel:${data.formatted_phone_number}`);
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        <RectButton onPress={handleNavigateBack}>
          <Feather name="arrow-left" size={26} color="black" />
        </RectButton>
        {data.formatted_phone_number && (
          <RectButton onPress={handlePhoneCall}>
            <Feather name="phone-call" size={26} color="#3c6" />
          </RectButton>
        )}
      </View>
      <View>
        <View style={styles.header}>
          <Text style={styles.placeName}>{data.name}</Text>
          <View style={styles.rating}>
            <Text>{data.rating} </Text>
            <Rating
              readonly={true}
              imageSize={18}
              tintColor="#f0f0f5"
              startingValue={data.rating}
              ratingBackgroundColor="#ddd"
              type="custom"
            />
            <Text>({routeParams.total_ratings})</Text>
          </View>
        </View>
        <View style={styles.placeDetails}>
          <View style={styles.placeDetailsCell}>
            <Feather name="map" size={22} color="#27f" />
            {loading ? (
              <ActivityIndicator style={{ marginLeft: 20 }} />
            ) : (
              <Text style={styles.placeInfo}>{data.formatted_address}</Text>
            )}
          </View>
          <View style={styles.placeDetailsCell}>
            <Feather name="phone" size={22} color="#27f" />
            {loading ? (
              <ActivityIndicator style={{ marginLeft: 20 }} />
            ) : (
              <Text style={styles.placeInfo}>
                {data.formatted_phone_number
                  ? data.formatted_phone_number
                  : "-"}
              </Text>
            )}
          </View>
          <View style={styles.placeDetailsCell}>
            <Feather name="clock" size={22} color="#27f" />
            {loading ? (
              <ActivityIndicator style={{ marginLeft: 20 }} />
            ) : routeParams.open_now === undefined ? (
              <Text style={styles.noInfo}>Sem informações</Text>
            ) : routeParams.open_now ? (
              <Text style={styles.placeOpen}>Aberto</Text>
            ) : (
              <Text style={styles.placeOpen}>Fechado</Text>
            )}
          </View>
          <View style={styles.placeDetailsCell}>
            <Feather name="globe" size={22} color="#27f" />
            {loading ? (
              <ActivityIndicator style={{ marginLeft: 20 }} />
            ) : data.website ? (
              <Text
                style={styles.placeInfo}
                onPress={() => Linking.openURL(`${data.website}`)}
              >
                {data.website}
              </Text>
            ) : (
              <Text style={styles.noInfo}>Estabelecimento sem site</Text>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default Detail;

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  Keyboard,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { CustomSubmitButton } from "../../components/Button";
import ImagePicker from "../../components/ImagePicker";
import CategoryPicker from "../../components/CategoryPicker";
import RiskLevelPicker from "../../components/RiskLevelPicker";
import StatusPicker from "../../components/StatusPicker";
import TextInput from "../../components/TextInput";
import { createOccurrenceSchema } from "../../utils/createOccurrenceValidation";
import api from "../../services/api";
import {
  Container,
  ErrorText,
  FormArea,
  InputContainer,
  Label,
  ScrollViewContent,
  Button,
  ButtonText,
  ImageHeader,
  ViewHeader,
  TextHeader1,
  TextHeader2,
} from "./styles";
import RetanguloImg from "../../assets/Rectangle.png";

export default function Cadastro() {
  const navigation = useNavigation();

  const [loading, setLoading] = useState(false);

  const [localizacao, setLocalizacao] = useState({
    latitude: -29.698638657622553,
    longitude: -53.51801818953788,
  });

  const [mapRegion, setMapRegion] = useState({
    latitude: -29.698638657622553,
    longitude: -53.51801818953788,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });

  const handleGetLocation = async () => {
    try {
      setLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert(
          "A permissão de localização é necessária para usar esta funcionalidade."
        );
        return;
      }

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      const { latitude, longitude } = coords;

      setLocalizacao({
        latitude,
        longitude,
      });

      setMapRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    } catch (error) {
      console.error("Erro ao obter a localização:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetLocation();
  }, []);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      category: "",
      status: "",
      risk_level: 0,
      latitude: 0,
      longitude: 0,
      image: "",
    },
    resolver: yupResolver(createOccurrenceSchema),
  });

  const onSubmit = async (data) => {
    Keyboard.dismiss();

    try {
      const token = await AsyncStorage.getItem("@authToken");
      const dataApi = new FormData();
      dataApi.append("title", data.title);
      dataApi.append("description", data.description);
      dataApi.append("category", data.category);
      dataApi.append("status", data.status);
      dataApi.append("risk_level", Number(data.risk_level));
      dataApi.append("latitude", Number(localizacao.latitude));
      dataApi.append("longitude", Number(localizacao.longitude));

      if (data.image) {
        const photo = {
          uri: data.image,
          type: "image/jpeg",
          name: "photo.jpg",
        };
        dataApi.append("image", photo);
      }

      await api.post(`occurrences/`, dataApi, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      reset({
        title: "",
        description: "",
        category: "",
        status: "",
        risk_level: 0,
        latitude: 0,
        longitude: 0,
        image: "",
      });

      navigation.navigate("Home");
    } catch (error) {
      Alert.alert("Erro ao criar: ", error.message);
    }
  };

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator color="#121212" size={45} />
      </View>
    );
  }

  return (
    <Container>
      <ViewHeader>
        <ImageHeader source={RetanguloImg} />
        <TextHeader1>Criar Ocorrência</TextHeader1>
        <TextHeader2>Insira os seus dados</TextHeader2>
      </ViewHeader>

      <ScrollViewContent>
        <FormArea>
          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Título</Label>
                  <TextInput
                    name="title"
                    placeholder="Digite o Título"
                    onChange={onChange}
                    value={value}
                    error={errors.title}
                  />
                </>
              )}
              name="title"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Descrição</Label>
                  <TextInput
                    name="description"
                    placeholder="Escreva um breve resumo"
                    onChange={onChange}
                    value={value}
                    error={errors.description}
                  />
                </>
              )}
              name="description"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Categoria</Label>
                  <CategoryPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="category"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Nível de Risco</Label>
                  <RiskLevelPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="risk_level"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Status</Label>
                  <StatusPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="status"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Fotografia da Ocorrência</Label>
                  <ImagePicker onChange={onChange} value={value} />
                  {errors.image && (
                    <ErrorText>{errors.image.message}</ErrorText>
                  )}
                </>
              )}
              name="image"
            />
          </InputContainer>

          <InputContainer>
            <Label>Localização</Label>
            <MapView
              style={{ width: "90%", height: 300, marginTop: 12 }}
              initialRegion={{
                latitude: localizacao.latitude,
                longitude: localizacao.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              region={mapRegion}
            >
              <Marker
                coordinate={{
                  latitude: localizacao.latitude,
                  longitude: localizacao.longitude,
                }}
                title="Minha Localização"
                description="Estou aqui!"
              />
            </MapView>
          </InputContainer>
          <InputContainer>
            <Button onPress={handleSubmit(onSubmit)}>
              <ButtonText>Cadastrar</ButtonText>
            </Button>
            <Button onPress={() => navigation.navigate("Home")}>
              <ButtonText>Lista de Ocorrências</ButtonText>
            </Button>
          </InputContainer>
        </FormArea>
      </ScrollViewContent>
    </Container>
  );
}

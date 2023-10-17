import React, { useEffect, useState } from "react";
import { ActivityIndicator, View, Image } from "react-native";
import {
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  Container,
  ScrollViewContent,
  Card,
  PerfilImage,
  Label,
  Text as StyledText,
  Button,
  ButtonText,
  ViewHeader,
  TextHeader1,
  ImageHeader,
  Description,
  Category
} from "./styles";
import RetanguloImg from "../../assets/Rectangle.png";


function Details() {
  const navigation = useNavigation();
  const route = useRoute();
  const id = route.params.id;
  const [loading, setLoading] = useState(true);
  const [occurrence, setOccurrence] = useState({});

  useEffect(() => {
    async function loadOccurrence() {
      try {
        const token = await AsyncStorage.getItem("@authToken");

        const response = await api.get(`occurrences/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOccurrence(response.data.data);
        setLoading(false);
      } catch (error) {

        console.error("Erro ao carregar a ocorrencia:", error);
      }
    }

    loadOccurrence();
  }, []);

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator color="#121212" size={45} />
      </View>
    );
  }

  
  const onSubmitDelete = async () => {
    Keyboard.dismiss();

    try {
      const token = await AsyncStorage.getItem("@authToken");
      await api.delete(`occurrences/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigation.navigate("ListOcurrences");
    } catch (error) {
      Alert.alert("Erro ao deletar: ", error.message);
    }
  };

  
  const getRiskLevelText = {
    1: "Muito Baixo",
    2: "Baixo",
    3: "Médio",
    4: "Alto",
    5: "Muito Alto",
  };

  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  const imageOccurrence = `https://crud-user-mftn.onrender.com/occurrences/image/${id}`;

  return (
    <ScrollViewContent>
      <Container>
        <ViewHeader>
          <ImageHeader source={RetanguloImg} />
          <TextHeader1>{occurrence.title}</TextHeader1>
          
        </ViewHeader>

        <Card>
          <PerfilImage
            style={{ width: "100%", height: 250 }}
            source={{
              uri: imageOccurrence,
            }}
          />
          <Label>Descrição</Label>
          <Description>{occurrence.description}</Description>
          <Label>Categoria</Label>
          <Category>{capitalizeFirstLetter(occurrence.category)}</Category>
          <Label>Nível de Risco</Label>
          <Category>{getRiskLevelText[occurrence.risk_level]}</Category>
          <Label>Status</Label>
          <Category>{capitalizeFirstLetter(occurrence.status)}</Category>
        </Card>
        
        <Button activeOpacity={0.8}
            onPress={() => onSubmitDelete()}
            text="Excluir">
          <ButtonText>Excluir</ButtonText>
        </Button>
        <Button onPress={() => navigation.goBack()}>
          <ButtonText>Lista de Ocorrências</ButtonText>
        </Button>
      </Container>
    </ScrollViewContent>
  );
}

export default Details;


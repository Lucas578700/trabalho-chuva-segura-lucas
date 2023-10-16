import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";
import {
  useRoute,
  useNavigation,
} from "@react-navigation/native";
import api from "../../services/api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RetanguloImg from "../../assets/Rectangle.png";
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
  Text,
} from "./styles";


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
          <StyledText>{occurrence.description}</StyledText>
          <Label>Categoria</Label>
          <Text>{capitalizeFirstLetter(occurrence.category)}</Text>
          <Label>Nível de Risco</Label>
          <StyledText>{getRiskLevelText[occurrence.risk_level]}</StyledText>
          <Label>Status</Label>
          <StyledText>{capitalizeFirstLetter(occurrence.status)}</StyledText>
        </Card>

        <Button onPress={() => onSubmitDelete()}>
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

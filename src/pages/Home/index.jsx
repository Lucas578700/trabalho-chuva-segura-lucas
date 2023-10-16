import React, { useState, useEffect, useContext } from "react";
import { ActivityIndicator, View, FlatList } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import api from "../../services/api";
import { OcurrencesList } from "../../components/Card";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  Header,
  TitleHeader,
  Message,
  Title,
  List,
  Button,
  ButtonText,
  LogoImg,
  Warning,
} from "./styles";
import IconLocal from "../../assets/image5.png";

export default function Home() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [occurrences, setOccurrences] = useState([]);

  useEffect(() => {
    async function loadOccurrences() {
      try {
        const token = await AsyncStorage.getItem("@authToken");
        
        const response = await api.get(`occurrences`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        setOccurrences(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao carregar as ocorrencias:", error);
      }
    }

    loadOccurrences();
  }, []);

  if (loading) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 1 }}>
        <ActivityIndicator color="#121212" size={45} />
      </View>
    );
  }

  return (
    <Container>
      <>
        <Header>
          <Button onPress={() => navigation.navigate("Cadastro")}>
            <ButtonText>Nova Ocorrência</ButtonText>
          </Button>
          <LogoImg source={IconLocal} />
          <TitleHeader>Ocorrências perto de você</TitleHeader>
        </Header>

        <FlatList
          data={occurrences}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OcurrencesList data={item} />}
        />
      </>
    </Container>
  );
}

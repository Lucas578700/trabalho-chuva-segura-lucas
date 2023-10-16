import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import {
  Container,
  SubContainer,
  ContainerMenu,
  TextDescription,
  SubmitButton,
  SubmitText,
} from "./styles";

export const OcurrencesList = ({ data }) => {
  const navigation = useNavigation();
  
  const createdAtDate = new Date(data.created_at);

  const options = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  const formattedDate = createdAtDate.toLocaleDateString("pt-BR", options);

  const getRiskLevelText = {
    1: "Muito Baixo",
    2: "Baixo",
    3: "Médio",
    4: "Alto",
    5: "Muito Alto",
  };

  // Define a function to capitalize the first letter of a string
  const capitalizeFirstLetter = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <Container>
      <SubContainer>
        <TextDescription>{data.title}</TextDescription>
        <TextDescription>{formattedDate}</TextDescription>
      </SubContainer>

      <SubContainer>
        <TextDescription>{data.description}</TextDescription>
      </SubContainer>

      <ContainerMenu>
        <View>
          <TextDescription>Categoria</TextDescription>
          <SubmitButton>
            <SubmitText>{capitalizeFirstLetter(data.category)}</SubmitText>
          </SubmitButton>
        </View>

        <View>
          <TextDescription>Nível de Risco</TextDescription>
          <SubmitButton>
            <SubmitText>{getRiskLevelText[data.risk_level]}</SubmitText>
          </SubmitButton>
        </View>

        <View>
          <TextDescription>Status</TextDescription>
          <SubmitButton>
            <SubmitText>{capitalizeFirstLetter(data.status)}</SubmitText>
          </SubmitButton>
        </View>
      </ContainerMenu>

      <View
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <SubmitButton onPress={() => navigation.navigate("Details", { id: data.id })}>
          <SubmitText>Ver Detalhes</SubmitText>
        </SubmitButton>
      </View>
    </Container>
  );
};
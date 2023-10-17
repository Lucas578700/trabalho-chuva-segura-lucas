import styled from "styled-components/native";
import { Text, View, SafeAreaView, ScrollView } from "react-native";

export const Container = styled(SafeAreaView)`
  flex: 1;
  background-color: #F0F4FF;
  padding-bottom: 12%;
`;

export const ScrollViewContent = styled(ScrollView)`
  padding: 20px;
`;

export const FormArea = styled.View`
  padding: 18px;
  border-width: 1px;
  border-color: #ccc;
  border-radius: 5px;
  margin-bottom: 8px;
`;

export const Header = styled(Text)`
  font-size: 24px;
  font-weight: bold;
  padding: 12px 0;
  margin-bottom: 5px;
  color: #000; /* Cor de texto padrão */
`;

export const InputContainer = styled(View)`
  margin-bottom: 8px;
  margin-top: 8px;
`;

export const Label = styled(Text)`
  font-size: 16px;
  margin-bottom: 6px;
  font-weight: bold;
  color: #000; /* Cor de texto padrão */
`;

export const ErrorText = styled(Text)`
  color: #FF0000; /* Cor para mensagens de erro */
  font-size: 14px;
  margin-top: 5px;
`;

export const StyledSwitch = styled.Switch`
  width: 40px;
  height: 40px;
`;

export const Button = styled.TouchableOpacity`
  background-color: #7fbef9;
  width: 100%;
  height: 45px;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  margin-bottom: 14px;
`;

export const ButtonText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
`;

export const ImageHeader = styled.Image`
  width: 100%;
  height: 370px;
`;

export const ViewHeader = styled.View`
  align-items: center;
`;

export const TextHeader1 = styled.Text`
  position: absolute;
  top: 142px;
  left: 60px;
  font-size: 35px;
  font-weight: bold;
  color: white;
`;

export const TextHeader2 = styled.Text`
position: absolute;
  top: 180px;
  left: 60px;
  font-size: 22px;
  color: white;
`;



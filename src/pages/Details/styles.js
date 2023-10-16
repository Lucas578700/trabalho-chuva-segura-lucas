import styled from 'styled-components/native';
import { ScrollView } from "react-native";

export const Container = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const ScrollViewContent = styled(ScrollView)`
  margin-top: 12%;
`;

export const Card = styled.View`
  background-color: rgba(255, 255, 255, 0.09);
  border-radius: 8px;
  margin-top: 10%;
  margin-bottom: 24px;
  padding-bottom: 20%;
  padding-left: 16px;
  padding-right: 16px;
  z-index: 10;
  height: 540px;
  width: 90%;
  justify-content: center;
  align-content: center;
`;

export const PerfilImage = styled.Image`
  width: 130px;
  height: 130px;
  align-self: center;
  border-radius: 70px;
`;

export const Label = styled.Text`
  font-size: 14px;
  text-align: left;
  font-weight: 600;
  margin-bottom: 4px;
  color: #000;
`;

export const Text = styled.Text`
  font-size: 14px;
  text-align: left;
  font-weight: 600;
  margin-bottom: 18px;
  color: #000;
`;

export const Button = styled.TouchableOpacity`
  width: 240px;
  padding: 16px;
  border-radius: 12px;
  background-color: #7fbef9;
  margin-bottom: 12px;
  bottom:35px;
`;

export const ButtonText = styled.Text`
  color: #fff;
  text-align: center;
  font-weight: 500;
  font-size: 18px;
`;

export const ImageHeader = styled.Image`
  width: 100%;
  height: 370;
`;

export const ViewHeader = styled.View`
  align-items: center;
`;

export const TextHeader1 = styled.Text`
  position: absolute;
  margin-top: 22px;
  left: 60;
  font-size: 35;
  font-weight: bold;
  color: white;
`;

export const TextHeader2 = styled.Text`
position: absolute;
  top: 180;
  left: 60;
  font-size: 22;
  color: white;
`;
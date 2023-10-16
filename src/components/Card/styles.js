import styled from "styled-components/native";
import { Text, View, SafeAreaView, ScrollView } from "react-native";

export const Container = styled(View)`
    width: 88%;
    height: 279px;
    border-radius: 12px;
    border: 1px solid #68B2F8;
    background: #fff;
    margin: 22px;
    padding: 12px;
    
`;

export const SubContainer = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 16px;
`;

export const ContainerMenu = styled(View)`
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    margin-top: 16px;
    margin-bottom: 16px;
`;


export const TextDescription = styled(Text)`
    color: #000;
    font-size: 12px;
    font-style: normal;
    font-weight: 500;
`;

export const SubmitButton = styled.TouchableOpacity`
  height: 26px;
  max-width: 112px;
  border-radius: 2px;
  margin-top: 22px;
  background: #68B2F8;
`;

export const SubmitText = styled.Text`
  color: #FFF;
  text-align: center;
  font-weight: 400;
  font-size: 12px;
  font-style: normal;
  padding: 6px;
`;
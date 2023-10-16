import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  background-color: #F0F4FF;
  align-items: center;
  justify-content: center;
`;

export const Header = styled.View`
  height: 200px;
  width: 100%;
  align-items: center;
  justify-content: center;
  background-color: #68b2f8;
  padding-top: 2%;
`;

export const Message = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 4%;
`;

export const Warning = styled.Text`
  font-size: 36px;
  font-weight: bold;
  color: #000;
`;

export const Title = styled.Text`
  font-size: 28px;
  font-weight: bold;
  color: #000;
  margin-top: 8%;
  margin-bottom: 2%;
`;

export const TitleHeader = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: #fff;
  margin-top: 0%;
  margin-bottom: 5%;
  bottom: 50px;
  left: 25px;
`;

export const List = styled.FlatList`
  flex: 1; 
  width: 95%;
`;

export const Button = styled.TouchableOpacity`
background-color: transparent;
border: 1px solid #fff;
width: 40%;
height: 35px;
border-radius: 8px;
align-items: center;
justify-content: center;
position: absolute;
bottom: 0;
right: 22px;
margin: 16px;
`;

export const ButtonText = styled.Text`
  font-size: 15px;
  font-weight: bold;
  color: #fff;
`;

export const LogoImg = styled.Image`
margin-right: 330px; 
width: 15%;
height: 75px;
`;

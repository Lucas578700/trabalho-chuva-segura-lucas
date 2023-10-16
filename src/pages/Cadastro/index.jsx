import React, { useState } from "react";
import { Text, View, Keyboard, Image } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from '@react-navigation/native'

import { Alert } from 'react-native';
import ImagePicker from "../../components/ImagePicker";
import CityPicker from "../../components/CityPicker";
import NivelPicker from "../../components/NivelPicker";
import StatusPicker from "../../components/StatusPicker";
import TextInput from "../../components/TextInput";
import { createUserSchema } from '../../utils/createUserValidation';
import { format } from 'date-fns';
import api from '../../services/api';
import { Container, ErrorText, Header, FormArea, InputContainer, Label, ScrollViewContent, Button, ButtonText, ImageHeader, ViewHeader, TextHeader1, TextHeader2 } from './styles';
import  { Link,LinkText} from "../SignIn/styles";
import RetanguloImg from '../../assets/Rectangle.png';



export default function App() {
  const navigation = useNavigation();
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { control, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      cpf: "",
      birth_date: new Date(),
      city: "",
    },
    resolver: yupResolver(createUserSchema),
  });

  const onSubmit = async (data) => {
    Keyboard.dismiss();

    try {
      const birthDate = format(new Date(data.birth_date), 'yyyy-MM-dd');

      const dataApi = {
        name: data.name,
        email: data.email.toLowerCase(),
        password: data.password,
        cpf: data.cpf,
        birth_date: birthDate,
        city: data.city,
        image: data.image,
      };

      await api.post('/users', dataApi);

      reset({
        name: "",
        email: "",
        cpf: "",
        birth_date: new Date(),
        city: "",
      });
      navigation.navigate('Home')
    } catch (error) {
      Alert.alert("Erro ao enviar dados:", error.message);
    }
  }

  return (
    
    <Container>
      <ViewHeader>
      <ImageHeader source={RetanguloImg} />
      <TextHeader1>
        Criar Ocorrência
      </TextHeader1>
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
                    name="titulo"
                    placeholder="Digite o Título"
                    onChange={onChange}
                    value={value}
                    error={errors.name}
                  />
                </>
              )}
              name="name"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Descrição</Label>
                  <TextInput
                    name="email"
                    placeholder="Escreva um breve resumo"
                    onChange={onChange}
                    value={value}
                    error={errors.email}
                  />
                </>
              )}
              name="email"
            />
          </InputContainer>


          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Categoria</Label>
                  <CityPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="city"
            />
          </InputContainer>

          <InputContainer>
            <Controller
              control={control}
              render={({ field: { onChange, value } }) => (
                <>
                  <Label>Nível de Risco</Label>
                  <NivelPicker
                    control={control}
                    value={value}
                    onChange={onChange}
                    errors={errors}
                  />
                </>
              )}
              name="nivel"
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
                                    <Label>Imagem</Label>
                                    <ImagePicker
                                        onChange={onChange}
                                        value={value}
                                    />
                                    {errors.image && <ErrorText>{errors.image.message}</ErrorText>}
                                </>
                            )}
                            name="image"
                        />
                    </InputContainer>

        </FormArea>
        <InputContainer>
          <Button onPress={handleSubmit(onSubmit)}>
            <ButtonText>Cadastrar</ButtonText>
          </Button>
          <Button onPress={() => navigation.navigate('Home')}>
            <ButtonText>Lista de Ocorrências</ButtonText>
          </Button>

        </InputContainer>

      </ScrollViewContent>
    </Container>
  );
}
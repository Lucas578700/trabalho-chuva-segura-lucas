import React from "react";
import * as ImagePicker from "expo-image-picker";
import { InputContainer, Label, Button, Text, ImageName } from './styles';

const ImagePickerComponent = ({ onChange, value }) => {
    const handleImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: false,
            aspect: [4, 3], // Proporção da imagem (opcional)
            quality: 1, // Qualidade da imagem (0 a 1)
        });

        if (!result.cancelled) {
            onChange(result.assets[0].uri);
        }
    };

    return (
        <InputContainer>
            <Button
                onPress={handleImagePicker}
            >
                <Text>Nome da Imagem: {value ? value.split('/').pop() : ""}</Text>
            </Button>
        </InputContainer>
    );
};

export default ImagePickerComponent;

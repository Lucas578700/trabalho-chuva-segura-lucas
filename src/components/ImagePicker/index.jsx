import React from "react";
import * as ImagePicker from "expo-image-picker";
import { Button, Text } from './styles';

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
        <>
            <Button
                onPress={handleImagePicker}
            >
                <Text>Nome da imagem selecionada: {value ? value.split('/').pop() : ""}</Text>
            </Button>
        </>
    );
};

export default ImagePickerComponent;
import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { PickerContainer, ErrorText } from './styles';

const CityPicker = ({ control, value, onChange, errors }) => {
    return (
        <>
            <PickerContainer>
                <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                        <Picker
                            selectedValue={value}
                            onValueChange={onChange}
                        >
                            <Picker.Item label="Selecione uma cidade" value="" />
                            <Picker.Item label="Santa Maria" value="Santa Maria" />
                            <Picker.Item label="Agudo" value="Agudo" />
                            <Picker.Item label="Restinga Seca" value="Restinga Seca" />
                        </Picker>
                    )}
                    name="city"
                />
            </PickerContainer>
            {errors.city && <ErrorText>{errors.city.message}</ErrorText>}
        </>
    );
};

export default CityPicker;
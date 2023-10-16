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
                            <Picker.Item label="Enchente" value="Enchente" />
                            <Picker.Item label="Deslizamento" value="Deslizamento" />
                            <Picker.Item label="Bloqueio" value="Bloqueio" />
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

import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { PickerContainer, ErrorText } from "./styles";

const CategoryPicker = ({ control, value, onChange, errors }) => {
  return (
    <>
      <PickerContainer style={{ marginTop: "10%", marginBottom: "10%" }}>
        <Controller
          control={control}
          render={({ field: { onChange, value } }) => (
            <Picker
              style={{
                backgroundColor: "#68B2F8",
                padding: "2%",
                color: "#fff",
              }}
              selectedValue={value}
              onValueChange={onChange}
            >
              <Picker.Item label="Selecione uma categoria" value="" />
              <Picker.Item label="Enchente" value="enchente" />
              <Picker.Item label="Deslizamento" value="deslizamento" />
              <Picker.Item label="Bloqueio" value="bloqueio" />
            </Picker>
          )}
          name="category"
        />
      </PickerContainer>
      {errors.category && <ErrorText>{errors.category.message}</ErrorText>}
    </>
  );
};

export default CategoryPicker;
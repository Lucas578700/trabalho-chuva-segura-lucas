import React from "react";
import { Picker } from "@react-native-picker/picker";
import { Controller } from "react-hook-form";
import { PickerContainer, ErrorText } from "./styles";

const RiskLevelPicker = ({ control, value, onChange, errors }) => {
  const getRiskLevelText = {
    1: "Muito Baixo",
    2: "Baixo",
    3: "Médio",
    4: "Alto",
    5: "Muito Alto",
  };

  const riskLevelOptions = Object.entries(getRiskLevelText).map(
    ([value, label]) => <Picker.Item label={label} value={value} key={value} />
  );

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
              <Picker.Item label="Selecione um nível de risco" value={1} />
              {riskLevelOptions}
            </Picker>
          )}
          name="risk_level"
        />
      </PickerContainer>
      {errors.risk_level && <ErrorText>{errors.risk_level.message}</ErrorText>}
    </>
  );
};

export default RiskLevelPicker;
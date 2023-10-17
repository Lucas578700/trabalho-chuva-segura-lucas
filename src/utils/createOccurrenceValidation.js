import * as yup from "yup";

export const createOccurrenceSchema = yup.object().shape({
    title: yup
        .string()
        .required("O título é obrigatório")
        .min(3, "O título deve ter pelo menos 3 caracteres"),
    description: yup.string().required("A descrição é obrigatória"),
    category: yup.string().required("A categoria é obrigatória"),
    status: yup.string().required("O Status é obrigatório"),
    risk_level: yup
        .number()
        .required("O nível de risco é obrigatório")
        .oneOf([1, 2, 3, 4, 5], "O nível de risco deve ser 1, 2, 3, 4 ou 5"),
    latitude: yup.number().required("A latitude é obrigatória"),
    longitude: yup.number().required("A longitude é obrigatória"),
    image: yup.string(),
});
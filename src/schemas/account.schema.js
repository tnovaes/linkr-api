import joi from "joi";

export const accountSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});
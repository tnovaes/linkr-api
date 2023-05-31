import joi from "joi";

export const postSchema = joi.object({
    email: joi.string().email().required(),
    shared_link: joi.string().uri().required(),
    description: joi.string()
});
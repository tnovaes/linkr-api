import joi from "joi";

export const postSchema = joi.object({
    shared_link: joi.string().uri().required(),
    description: joi.string().optional()
});
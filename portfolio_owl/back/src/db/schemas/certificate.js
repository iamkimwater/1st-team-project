import { Schema, model } from "mongoose";

const CertificateSchema = new Schema(
    {
        id: {
            type: String,
            required: true,
        },
        user_id: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },

        description: {
            type: String,
            required: true,
        },

        when_date: {
            type: String,
            required: false,
            default: Date.now(),
        },


    },
    {
        timestamps: true,
    }
);

const CertificateModel = model("Certificate", CertificateSchema);

export { CertificateModel };
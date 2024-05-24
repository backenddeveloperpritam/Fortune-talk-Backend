import Joi from "joi";

import {
    sortBy
} from '../utils/values.js';
import { objectId, customJoi } from "./custom.validation.js";
import { query } from "express";

const searchAstrologer = {
    query: Joi.object().keys({
        astrologerName: Joi.string(),
        sortBy: Joi.string().valid(...sortBy),
    }),
};


const getAstrologerId = {
    params: Joi.object().keys({
        astrologerId: Joi.string().custom(objectId),
    }),
};

const addNewAstrologer = {
    body: Joi.object().keys({
        astrologerName: Joi.string().required(),
        phoneNumber: Joi.string().required(),
        alternateNumber: Joi.string().optional(),
        gender: Joi.string().required(),
        email: Joi.string().email().required(),
        profileImage: Joi.string().required(),
        chat_price: Joi.number().required(),
        call_price: Joi.number().required(),
        experience: Joi.string().required(),
        about: Joi.string().required(),
        city: Joi.string().required(),
        state: Joi.string().required(),
        country: Joi.string().required(),
        zipCode: Joi.string().required(),
        dateOfBirth: Joi.date().required(),
        password: Joi.string().required(),
        country_phone_code: Joi.string().required(),
        currency: Joi.string().valid("INR", "USD").required(),
        address: Joi.string().required(),
        free_min: Joi.number().required(),
        id_proof_image: Joi.string().required(),
        pan_proof_image: Joi.string().optional(),
        bank_proof_image: Joi.string().optional(),
        language: Joi.array().items(Joi.string()).required(),
        consultation_price: Joi.number().optional(),
        commission_call_price: Joi.number().optional(),
        commission_chat_price: Joi.number().optional(),
        commission_remark: Joi.string().optional(),
        skill: Joi.array().items(Joi.string()).required(),
        subSkill: Joi.array().items(Joi.string()).required(),
        expertise: Joi.array().items(Joi.string()).required(),
        mainExpertise: Joi.array().items(Joi.string()).required(),
        remedies: Joi.array().items(Joi.string()).optional(),
        workingOnOtherApps: Joi.string().optional(),
        bankAccount: Joi.array().items(Joi.string()).optional(),
        panCard: Joi.string().optional(),
        wallet_balance: Joi.number().optional(),
        account_holder_name: Joi.string().optional(),
        account_name: Joi.string().optional(),
        account_type: Joi.string().optional(),
        account_number: Joi.string().optional(),
        IFSC_code: Joi.string().optional(),
        youtubeLink: Joi.string().optional(),
        short_bio: Joi.string().required(),
        long_bio: Joi.string().optional(),
        aadharNumber: Joi.string().required(),
    }),
};

const updateAstrologer = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};


const loginAstrologer = {
    body: Joi.object().keys({
        email: Joi.string().email().allow(''),
        phoneNumber: Joi.string().allow(''),
        password: Joi.string().required(),
        fcmToken: Joi.string().required()
    }).xor('email', 'phoneNumber').with('password', 'fcmToken').required()
};



export {
    searchAstrologer,
    getAstrologerId,
    addNewAstrologer,
    updateAstrologer,
    loginAstrologer,
};
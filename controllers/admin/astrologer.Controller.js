import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as astrologerService from '../../services/astrologer.service.js';
import httpStatus from 'http-status';


const astrologerList = asyncHandler(async (req, res) => {
    try {

        const title = req.query.title || "";

        const result = await astrologerService.getAstrologer(title);

        if (!result || result.length === 0) {
            throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found");
        }

        return res.status(200).json(new ApiResponse(200, result, "Astrologers fetched successfully"));
    } catch (error) {
        console.error("Error:", error);
        throw new ApiError(500, "Something went wrong, Astrologers not fetched");
    }
});

const getAstrologerById = asyncHandler(async (req, res) => {
    try {
        const result = await astrologerService.getAstrologerById(req.params.astrologerId);
        if (!result) {
            throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found with matching id");
        }
        return res.status(200).json(new ApiResponse(200, result, "Astrologer fetched successfully"));
    } catch (error) {
        console.error("Error:", error);
        throw new ApiError(500, "Something went wrong, Astrologer not fetched by id");
    }
});


const addNewAstrologer = asyncHandler(async (req, res) => {

    const {
        astrologerName,
        phoneNumber,
        alternateNumber,
        gender,
        email,
        chat_price,
        call_price,
        experience,
        about,
        city,
        state,
        country,
        zipCode,
        dateOfBirth,
        password,
        preferredDays,
        language,
        rating,
        youtubeLink,
        free_min,
        account_type,
        short_bio,
        long_bio,
        workingOnOtherApps,
        startTime,
        endTime,
        skill,
        remedies,
        expertise,
        mainExpertise,
        panCard,
        aadharNumber,
        account_holder_name,
        account_number,
        IFSC_code,
        country_phone_code,
        currency,
        commission_remark,
        address,
        account_name,
        consultation_price,
        commission_call_price,
        commission_chat_price,
    } = req.body;


    // File upload handling for profile, id proof, and bank proof images
    const profileImage = req.files["profileImage"]
        ? req.files["profileImage"][0].path
        : "";
    const id_proof_image = req.files["id_proof_image"]
        ? req.files["id_proof_image"][0].path
        : "";
    const bank_proof_image = req.files["bank_proof_image"]
        ? req.files["bank_proof_image"][0].path
        : "";

    const skillArray = Array.isArray(skill) ? skill : [];
    // const subSkillArray = Array.isArray(subSkill) ? subSkill : [];
    const remediesArray = Array.isArray(remedies) ? remedies : [];
    const expertiseArray = Array.isArray(expertise) ? expertise : [];
    const mainExpertiseArray = Array.isArray(mainExpertise)
        ? mainExpertise
        : [];
    const languageArray = Array.isArray(language) ? language : [];
    const preferredDaysArray = Array.isArray(preferredDays)
        ? preferredDays
        : [];

    // Check if the astrologer already exists
    const existingAstrologer = await Astrologer.findOne({ phoneNumber });
    if (existingAstrologer) {
        return res.status(400).json({
            success: false,
            message: "Astrologer with this phone number already exists.",
        });
    }

    // Create a new astrologer entry
    const newAstrologer = new Astrologer({
        astrologerName,
        phoneNumber,
        alternateNumber,
        gender,
        email,
        profileImage,
        id_proof_image,
        bank_proof_image,
        chat_price,
        call_price,
        experience,
        about,
        account_name,
        city,
        state,
        country,
        zipCode,
        dateOfBirth,
        aadharNumber,
        password,
        remedies: remediesArray,
        preferredDays: preferredDaysArray,
        language: languageArray,
        rating,
        youtubeLink,
        free_min,
        account_type,
        short_bio,
        long_bio,
        workingOnOtherApps,
        startTime,
        endTime,
        skill: skillArray,
        // subSkill: subSkillArray,
        expertise: expertiseArray,
        mainExpertise: mainExpertiseArray,
        panCard,
        account_holder_name,
        account_number,
        IFSC_code,
        country_phone_code,
        currency,
        commission_remark,
        address,
        consultation_price,
        commission_call_price,
        commission_chat_price,
        enquiry: false,
        isVerified: true,
    });

    await newAstrologer.save();

    // console.log(newAstrologer);

    res.status(201).json({
        success: true,
        message: "Astrologer added successfully.",
        data: newAstrologer,
    });

});

export { astrologerList, getAstrologerById, addNewAstrologer };

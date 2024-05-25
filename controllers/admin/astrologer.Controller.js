import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as astrologerService from '../../services/astrologer.service.js';
import httpStatus from 'http-status';


const astrologerList = asyncHandler(async (req, res) => {

    const title = req.query.title || "";

    const result = await astrologerService.getAstrologer(title);

    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Astrologers fetched successfully"));

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
    try {
        const newAstrologer = await astrologerService.addNewAstrologer(req.body, req.files);

        return res.status(200).json(new ApiResponse(200, newAstrologer, "Astrologer added successfully."));

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


export { astrologerList, getAstrologerById, addNewAstrologer };

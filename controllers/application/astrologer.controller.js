import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as astrologerService from '../../services/application/astrologer.service.js';
import httpStatus from 'http-status';
import jwt from "jsonwebtoken"
import Astrologer from "../../models/adminModel/Astrologer.js";


const generateAccessAndRefereshTokens = async (astrologerId) => {
    try {
        const astrologer = await astrologerService.getAstrologerById(astrologerId)
        const accessToken = astrologer.generateAccessToken()
        const refreshToken = astrologer.generateRefreshToken()

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const astrologerLogin = asyncHandler(async (req, res) => {
    const { email, password, fcmToken } = req.body;

    const astrologer = await astrologerService.loginAstrologer(email);

    if (!astrologer || astrologer.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "Astrologer does not exist");
    }

    const isPasswordValid = await astrologer.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Astrologer credentials")
    }

    if (astrologer.isDeleted === 1) {
        throw new ApiError(400, "Your account has been deactivated, please contact admin support.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(astrologer._id)

    const loggedInAstrologer = await astrologerService.getAstrologerById(astrologer._id);

    loggedInAstrologer.fcmToken = fcmToken;


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    astrologer: loggedInAstrologer, accessToken, refreshToken
                },
                "Astrologer logged In Successfully"
            )
        )

});

const updateprofileImage = asyncHandler(async (req, res) => {
    const profileImage = req.file?.path

    if (!profileImage) {
        throw new ApiError(400, "Avatar file is missing")
    }

    //TODO: delete old image - assignment

    const avatar = await uploadOnCloudinary(profileImage)

    if (!avatar.url) {
        throw new ApiError(400, "Error while uploading on avatar")

    }

    const user = await Astrologer.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                avatar: avatar.url
            }
        },
        { new: true }
    ).select("-password")

    return res
        .status(200)
        .json(
            new ApiResponse(200, user, "Avatar image updated successfully")
        )
});

export { astrologerLogin };

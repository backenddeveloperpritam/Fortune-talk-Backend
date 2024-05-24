import ApiError from "../utils/ApiError.js";
import Astrologer from "../models/adminModel/Astrologer.js";

const getAstrologer = async (title) => {
    try {
        console.log("title", title)
        const titleMatch = { "astrologerName": { "$regex": title, "$options": "i" } };

        const astrologers = await Astrologer.find({
            ...titleMatch,
        });

        return astrologers;
    } catch (error) {
        throw new ApiError(500, "Internal Server Error - Astrologers Not Fetched");
    }
};

const getAstrologerById = async (id) => {
    try {
        const astrologer = await Astrologer.findOne({ _id: id });
        if (!astrologer) {
            throw new ApiError(404, "Astrologer not found");
        }
        return astrologer;
    } catch (error) {
        throw new ApiError(500, "Internal Server Error - Astrologer Not Fetched");
    }
}

const addNewAstrologer = async (title, status) => {
    const astrologer = await Astrologer.create({
        title,
        status
    });

    return astrologer;
}

const updateAstrologer = async (id, updatedFields) => {
    try {
        const astrologer = await Astrologer.findOneAndUpdate(
            { _id: id },
            updatedFields,
            { new: true }
        );

        if (!astrologer) {
            throw new ApiError(404, "Astrologer not found");
        }

        return astrologer;
    } catch (error) {
        throw new ApiError(500, "Internal Server Error - Astrologer Not Updated");
    }
}


export { getAstrologer, getAstrologerById, addNewAstrologer, updateAstrologer };

import ApiError from "../../utils/ApiError.js";
import Astrologer from "../../models/adminModel/Astrologer.js";


const getAstrologer = async (title) => {
    try {
        console.log("title", title)
        const titleMatch = { "displayName": { "$regex": title, "$options": "i" } };

        const astrologers = await Astrologer.find({
            ...titleMatch,
        });

        return astrologers;
    } catch (error) {
        throw new ApiError(500, "Internal Server Error - Astrologers Not Fetched");
    }
};

const loginAstrologer = async (email, password) => {

    const astrologer = await Astrologer.findOne({ email });

    return astrologer;

};

const getAstrologerById = async (id) => {
    const astrologer = await Astrologer.findOne({ _id: id }).select("-password -refreshToken");
    return astrologer;
}



export { getAstrologer, loginAstrologer, getAstrologerById };

import ApiError from "../../utils/ApiError.js";
import Astrologer from "../../models/adminModel/Astrologer.js";


const loginAstrologer = async (email, password) => {

    const astrologer = await Astrologer.findOne({ email });

    return astrologer;

};

const getAstrologerById = async (id) => {
    const astrologer = await Astrologer.findOne({ _id: id }).select("-password -refreshToken");
    return astrologer;
}



export { loginAstrologer, getAstrologerById };

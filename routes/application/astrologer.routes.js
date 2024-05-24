import express from 'express';
import validate from "../../middlewares/validate.js";
import * as astrologerValidation from '../../validations/astrologer.validation.js';
import * as astrologerController from '../../controllers/application/astrologer.controller.js';

const router = express.Router();

router.post(
    "/login-astrologer",
    validate(astrologerValidation.loginAstrologer),
    astrologerController.astrologerLogin
);


export default router;

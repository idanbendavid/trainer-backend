let ErrorType = {

    GENERAL_ERROR: {
        id: 1,
        httpCode: 600,
        message: "We screwed up not your fault, please report this failure",
        isShowStackTrace: true
    },
    UNAUTHORIZED: {
        id: 2,
        httpCode: 401,
        message: "Invalid or expired token",
        isShowStackTrace: false
    },
    FORBIDDEN: {
        id: 3,
        httpCode: 403,
        message: "You can't complete this action",
        isShowStackTrace: false
    },
    INVALID_EMAIL: {
        id: 4,
        httpCode: 452,
        message: "Check email adress",
        isShowStackTrace: false
    },
    INVALID_PASSWORD: {
        id: 5,
        httpCode: 453,
        message: "check entered password",
        isShowStackTrace: false
    },
    EMAIL_ALREADY_EXIST: {
        id: 6,
        httpCode: 454,
        message: "Email already exists",
        isShowStackTrace: false
    },
    INVALID_PRACTICE: {
        id: 7,
        httpCode: 455,
        message: "Check entered practies values",
        isShowStackTrace: false
    },
    INVALID_COACH: {
        id:8,
        httpCode: 456,
        message : "Check chosen coach",
        isShowStackTrace: false
    },
    UPDATE_USER: {
        id:9,
        httpCode: 457,
        message: "Couldn't update details, check entered value",
        isShowStackTrace: false
    },
    INVALID_IMAGE: {
        id:10,
        httpCode: 458,
        message : "invalid image",
        isShowStackTrace: false
    }

}

module.exports = ErrorType;
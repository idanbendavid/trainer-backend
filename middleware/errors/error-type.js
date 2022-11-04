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
        message: "Invalid, check entered values",
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
    INVALID_EXERCISE: {
        id: 7,
        httpCode: 455,
        message: "Check entered practies values",
        isShowStackTrace: false
    },
    UPDATE_USER: {
        id:8,
        httpCode: 456,
        message: "Couldn't update details, check entered value",
        isShowStackTrace: false
    },
    INVALID_IMAGE: {
        id:9,
        httpCode: 457,
        message : "invalid image",
        isShowStackTrace: false
    },
    INVALID_TASKS: {
        id:10,
        httpCode: 458,
        message : "invalid task",
        isShowStackTrace: false
    }

}

module.exports = ErrorType;
const CONSTANTS = {
    SERVER_ERROR: {
        USER_EXISTED: {
            errorCode: "01",
            message: "User existed",
        },
    
        USER_NOT_EXIST: {
            errorCode: "02",
            message: "User not found",
        },
    
        WRONG_PASSWORD: {
            errorCode: "03",
            message: "Email or password incorrect",
        },
    
        ACCOUNT_NOT_ACTIVATED: {
            errorCode: "04",
            message: "Account is not activated",
        },
    
        INTERNAL_EMAIL_ERROR: {
            errorCode: "05",
            message: "Internal email server error, email not sent",
        },
    
        CODE_EXPIRED: {
            errorCode: "06",
            message: "Code expired",
        },
    
        ADMIN_ONLY: {
            errorCode: "07",
            message: "Required admin permission",
        },
    
        CODE_INVALID: {
            errorCode: "08",
            message: "Code invalid",
        },
    
        ACCOUNT_NOT_INACTIVE: {
            errorCode: "09",
            message: "Account activated or locked/deleted",
        },
    
        UNKNOWN_DATA: {
            errorCode: "010",
            message: "Unknown parameters passed",
        },
    
        CANNOT_REQUEST_NEW_CODE_YET: {
            errorCode: "011",
            message: "Cannot request new code yet",
        },
    
        ACCOUNT_ACTIVATED: {
            errorCode: "012",
            message: "Account activated",
        },
    
        INVALID_AUTHORIZED_TOKEN: {
            errorCode: "013",
            message: "Invalid Authorization Token",
        },
    
        ACCOUNT_LOCKED_OR_DELETED: {
            errorCode: "014",
            message: "Account locked or deleted",
        },
    
        DEPARTMENT_EXISTED: {
            errorCode: "015",
            message: "Department existed",
        },
    
        THREAD_EXISTED: {
            errorCode: "016",
            message: "Thread existed",
        },
    
        CATEGORY_EXISTED: {
            errorCode: "017",
            message: "Category existed",
        },
    
        NOT_ADMIN_OR_QAM: {
            errorCode: "018",
            message: "Not an Admin or Quality Assurance Manager",
        },
    
        IDEA_EXISTED: {
            errorCode: "019",
            message: "Idea existed",
        },
    
        THREAD_NOT_EXISTED: {
            errorCode: "020",
            message: "Thread not existed",
        },
    
        THREAD_EXPIRED: {
            errorCode: "021",
            message: "Thread expired",
        },
    
        CATEGORY_NOT_EXISTED: {
            errorCode: "022",
            message: "Category not existed",
        },
    
        IDEA_NOT_EXISTED: {
            errorCode: "023",
            message: "Idea not existed",
        },
    
        COMMENT_NOT_EXISTED: {
            errorCode: "024",
            message: "Comment not existed",
        },
    
        CANNOT_DELETE_OTHER_COMMENT: {
            errorCode: "025",
            message: "Cannot delete others' comment",
        },
    
        CANNOT_EDIT_OTHER_COMMENT: {
            errorCode: "026",
            message: "Cannot edit others' comment",
        },
    
        DEPARTMENT_NOT_EXISTED: {
            errorCode: "027",
            message: "Department not existed",
        },
    
        USER_ALREADY_IN_DEPARTMENT: {
            errorCode: "028",
            message: "User already in this department",
        },
    
        AUTHORIZATION_FORBIDDEN: {
            errorCode: "403",
            message: "Authorization forbidden",
        },
    
        AUTHORIZATION_UNAUTHORIZED: {
            errorCode: "401",
            message: "Unauthorized",
        },
        },
    
        VALIDATION_MESSAGE: {
        EMAIL_FORMAT_NOT_VALID: "Email format invalid",
    
        USER_ROLE_NOT_EXIST: "User role not exist",
    
        DATE_FORMAT_NOT_VALID: "Date format invalid",
    
        OBJECT_ID_NOT_VALID: "ObjectId invalid",
    
        PASSWORD_NOT_VALID: "Password invalid",
    
        CONFIRM_PASSWORD_DIFFERENT: "Confirm password not the same",
    
        SORT_OPTION_INVALID: "Sort option invalid",
    
        FINAL_CLOSURE_DATE_NOTE_BEFORE_CLOSURE_DATE:
            "Final closure date cannot before closure date",
    
        DOCUMENT_INVALID: "Document is not valid",
    
        ACTION_INVALID: "Action invalid",
    },
};
  
module.exports = CONSTANTS;
  
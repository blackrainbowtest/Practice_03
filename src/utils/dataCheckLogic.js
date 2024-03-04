export const passwordCheck = (passwordValue, setDataErrors, dataErrors) => {
    const hasUppercase = /[A-Z]/.test(passwordValue);
    const hasLowercase = /[a-z]/.test(passwordValue);
    const hasDigit = /\d/.test(passwordValue);
    const hasSpecialChar = /[@$!%*?&]/.test(passwordValue);

    const hasMinLength = passwordValue.length >= 8;

    const errors = [];

    if (!hasUppercase) {
        errors.push("The password must contain at least 1 capital letter");
    }

    if (!hasLowercase) {
        if (errors.length) {
            errors.push(", 1 lowercase letter");
        } else {
            errors.push("The password must contain at least 1 lowercase letter");
        }
    }

    if (!hasDigit) {
        if (errors.length) {
            errors.push(", 1 digit");
        } else {
            errors.push("The password must contain at least 1 digit");
        }
    }

    if (!hasSpecialChar) {
        if (errors.length) {
            errors.push(", 1 special character");
        } else {
            errors.push("The password must contain at least 1 special character");
        }
    }

    if (!hasMinLength) {
        if (errors.length) {
            errors.push(" and the minimum password length is 8 characters");
        } else {
            errors.push("The minimum password length is 8 characters");
        }
    }

    if (errors.length === 0 || passwordValue.length === 0) {
        setDataErrors({ ...dataErrors, password: [] });
    } else {
        setDataErrors({ ...dataErrors, password: errors.join("") });
    }
}

export const loginCheck = (loginValue, setDataErrors, dataErrors) => {
    const allowedCharactersRegex = /^[a-zA-Z0-9._]*$/;
    if (allowedCharactersRegex.test(loginValue)) {
        setDataErrors({ ...dataErrors, login: [] });
    } else {
        setDataErrors({
            ...dataErrors,
            login: "Invalid characters are not allowed",
        });
    }
}

export const userNameCheck = (userName, setDataErrors, dataErrors) => {
    const allowedCharactersRegex = /^[a-zA-Z0-9._]*$/;
    if (allowedCharactersRegex.test(userName)) {
        setDataErrors({ ...dataErrors, userName: [] });
    } else {
        setDataErrors({
            ...dataErrors,
            userName: "Invalid characters are not allowed",
        });
    }
}

export const userSurnameCheck = (userSurnameValue, setDataErrors, dataErrors) => {
    const allowedCharactersRegex = /^[a-zA-Z0-9._]*$/;
    if (allowedCharactersRegex.test(userSurnameValue)) {
        setDataErrors({ ...dataErrors, userSurname: [] });
    } else {
        setDataErrors({
            ...dataErrors,
            userSurname: "Invalid characters are not allowed",
        });
    }
}

export const emailCheck = (emailValue, setDataErrors, dataErrors) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\.[a-zA-Z]{2,})?$/;
    if (emailRegex.test(emailValue)) {
        setDataErrors({ ...dataErrors, email: [] });
    } else {
        setDataErrors({
            ...dataErrors,
            email: "Invalid characters are not allowed",
        });
    }
}
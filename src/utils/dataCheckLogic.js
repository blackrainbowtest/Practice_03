export const passwordCheck = (passwordValue, setDataErrors, dataErrors) => {
    // Проверки для различных требований
    const hasUppercase = /[A-Z]/.test(passwordValue);
    const hasLowercase = /[a-z]/.test(passwordValue);
    const hasDigit = /\d/.test(passwordValue);
    const hasSpecialChar = /[@$!%*?&]/.test(passwordValue);

    // Общая проверка для минимальной длины
    const hasMinLength = passwordValue.length >= 8;

    // Формируем сообщения об ошибках
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

    if (errors.length === 0) {
        console.log("Пароль валиден");
        setDataErrors({ ...dataErrors, password: [] });
    } else {
        setDataErrors({ ...dataErrors, password: errors.join("") });
    }
}
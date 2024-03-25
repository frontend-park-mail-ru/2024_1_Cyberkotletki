export const AuthError = {
    // Лучше не выводить BAD_REQUEST пользователю, а честно валидировать данные
    // в форме и показывать конкретное сообщение об ошибке
    BAD_REQUEST: 'Убедитесь, что вы ввели корректные данные' as const,
    USER_ALREADY_EXISTS: 'Пользователь с таким email уже существует' as const,
    USER_NOT_FOUND: 'Пользователь с таким логином не существует' as const,
    PASSWORD_INCORRECT: 'Неверный пароль' as const,
    UNKNOWN_ERROR: 'Произошла неизвестная ошибка' as const,
};

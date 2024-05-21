import { PasswordComplexity } from '@/validators/validators';

export const getPasswordComplexityMessage = (complexity?: string) => {
    switch (complexity) {
        case PasswordComplexity.BAD:
            return 'Пароль ненадёжный';
        case PasswordComplexity.MEDIUM:
            return 'Средний пароль';
        case PasswordComplexity.GOOD:
            return 'Надежный пароль';
        case PasswordComplexity.TOO_LONG:
            return 'Пароль слишком длинный';
        case PasswordComplexity.TOO_SHORT:
            return 'Пароль слишком короткий';
        default:
            return '';
    }
};

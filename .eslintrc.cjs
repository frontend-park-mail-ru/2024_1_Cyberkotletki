module.exports = {
    env: {
        browser: true,
        es2022: true,
    },
    plugins: ['import', 'prettier', 'cypress'],
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:cypress/recommended',
        'prettier',
    ],
    overrides: [
        {
            env: {
                node: true,
            },
            files: ['.eslintrc.{js,cjs}'],
            parserOptions: {
                sourceType: 'script',
            },
        },
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
    },
    ignorePatterns: [
        './node_modules/*',
        './package.json',
        './package-lock.json',
    ],
    rules: {
        'no-restricted-syntax': 'off',
        'spaced-comment': ['error', 'always', { markers: ['/'] }],
        'comma-dangle': ['error', 'always-multiline'],
        'arrow-parens': ['error', 'always'],
        'space-before-function-paren': [
            'error',
            {
                anonymous: 'never',
                named: 'never',
                asyncArrow: 'always',
            },
        ],
        indent: 'off',
        'max-len': [
            'error',
            80,
            2,
            {
                ignoreUrls: true,
                ignoreComments: false,
                ignoreRegExpLiterals: true,
                ignoreStrings: true,
                ignoreTemplateLiterals: true,
            },
        ],
        'padding-line-between-statements': [
            'error',
            { blankLine: 'always', prev: '*', next: 'return' },
            { blankLine: 'always', prev: '*', next: 'if' },
        ],
        'implicit-arrow-linebreak': 'off',
        'no-plusplus': 'off',
        'max-classes-per-file': 'off',
        'operator-linebreak': 'off',
        'object-curly-newline': 'off',
        'class-methods-use-this': 'off',
        'no-confusing-arrow': 'off',
        'function-paren-newline': 'off',
        'no-param-reassign': 'off',
        'no-shadow': 'off',
        'consistent-return': 'off',
        'prettier/prettier': 'error',
        'import/prefer-default-export': 'off',
        'import/order': [
            'error',
            {
                groups: [
                    ['builtin', 'external'],
                    'internal',
                    'parent',
                    'sibling',
                    'index',
                ],
                'newlines-between': 'always',
            },
        ],
        'import/no-unresolved': 'off',
        'import/extensions': 'off',
        'import/no-extraneous-dependencies': ['off'],
        'arrow-body-style': ['error', 'as-needed'],
        'no-unused-expressions': 'off',
        'no-void': 'off',
    },
};

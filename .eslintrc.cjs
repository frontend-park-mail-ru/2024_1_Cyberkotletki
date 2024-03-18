const rules = {
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
    'jsdoc/require-param-type': 'off',
    'jsdoc/require-returns-type': 'off',
};

module.exports = {
    env: {
        browser: true,
        es2022: true,
    },
    plugins: ['import', 'prettier', 'cypress', 'jsdoc'],
    extends: [
        'airbnb-base',
        'eslint:recommended',
        'plugin:import/recommended',
        'plugin:react/jsx-runtime',
        'plugin:cypress/recommended',
        'prettier',
        'plugin:jsdoc/recommended',
    ],
    ignorePatterns: [
        './node_modules/*',
        './package.json',
        './package-lock.json',
    ],
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    rules: { ...rules },
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
        {
            files: ['*.json', '*.json5'], // Specify the extension or pattern you want to parse as JSON.
            parser: 'jsonc-eslint-parser', // Set this parser.
        },
        {
            files: ['*.ts', '*.tsx'],
            extends: [
                'airbnb-base',
                'eslint:recommended',
                'plugin:@typescript-eslint/eslint-recommended',
                'plugin:@typescript-eslint/recommended',
                'plugin:import/recommended',
                'plugin:cypress/recommended',
                'prettier',
                'plugin:react/jsx-runtime',
                'plugin:@typescript-eslint/stylistic',
                'plugin:@typescript-eslint/recommended-type-checked',
                'plugin:jsdoc/recommended',
            ],
            parser: '@typescript-eslint/parser',
            parserOptions: {
                ecmaVersion: 'latest',
                sourceType: 'module',
                project: ['tsconfig.json'],
                tsconfigRootDir: __dirname,
                ecmaFeatures: {
                    jsx: true,
                },
            },
            rules: {
                ...rules,
                '@typescript-eslint/no-empty-function': 'off',
                '@typescript-eslint/ban-ts-comment': 'warn',
                '@typescript-eslint/no-shadow': 'off',
                '@typescript-eslint/explicit-function-return-type': 'off',
                '@typescript-eslint/consistent-type-imports': [
                    'error',
                    {
                        prefer: 'type-imports',
                        fixStyle: 'separate-type-imports',
                    },
                ],
                '@typescript-eslint/consistent-type-exports': [
                    'error',
                    { fixMixedExportsWithInlineTypeSpecifier: true },
                ],
                '@typescript-eslint/consistent-type-definitions': [
                    'error',
                    'interface',
                ],
                '@typescript-eslint/restrict-template-expressions': [
                    'error',
                    {
                        allowAny: true,
                        allowBoolean: true,
                        allowNullish: false,
                        allowNumber: true,
                        allowRegExp: false,
                    },
                ],
                'no-restricted-imports': [
                    'error',
                    {
                        patterns: [
                            {
                                group: ['../'],
                                message:
                                    'Relative imports from parent directories are not allowed.',
                            },
                        ],
                    },
                ],
            },
        },
    ],
};

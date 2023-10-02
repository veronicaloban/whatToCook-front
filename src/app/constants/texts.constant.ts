export const REGISTER_FORM_TEXTS = {
    title: ' Create an account',
    placeholders: {
        email: 'Your email address',
        login: 'Create login',
        password: 'Create password'
    },
    errorMessages: {
        email: 'Email should follow email format.',
        login: 'Login should be at least 3 characters long.',
        password: 'Password should contain at least 1 small letter, 1 capital letter, 1 digit, 1 special character.',
        confirmPassword: 'Passwords should be equal.'
    },
    loginRedirect: {
        alreadyHaveAccount: 'Already have account?',
        logIn: 'Log in',
    },
    registerButon: 'Create account',  
}

export const LOGIN_FORM_TEXTS = {
    title: 'Welcome',
    logIn: 'Log In',
    dontHaveAcc: 'Don\'t have an account?',
    signUp: 'Sign up'
}

export const FORM_ERRORS_TEXTS = {
    emailFormat: 'Email should follow email format.',
    minLength: 'Login should be at least 3 characters long.',
    passwordChars: 'Password should contain at least 1 small letter, 1 capital letter, 1 digit, 1 special character.',
    shouldEqual: 'Passwords should be equal.',
    required: 'This field is required.',
    incorrect: 'Username or password is incorrect.'
}
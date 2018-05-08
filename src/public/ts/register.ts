const registerForm = (document.getElementById('registerForm') as HTMLFormElement);

if (registerForm) {
    registerForm.addEventListener('change', (event) => {
        event.preventDefault();
        const dispatcher: {
            [key: string]: Function;
        } = {
            firstName() {
                console.log();
            },
            lastName() {
                console.log();
            },
            phone() {
                console.log();
            },
            confirmation() {
                console.log();
            },
            email() {
                console.log();
            },
            emailConfirm() {
                console.log();
            },
            password() {
                console.log();
            },
            passwordConfirm() {
                console.log();
            },
            username() {
                console.log();
            },
        };

        dispatcher[(event.target as HTMLInputElement).name]();
    });
}

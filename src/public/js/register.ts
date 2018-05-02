import axios from 'axios';

const registerForm = (document.getElementById('registerForm') as HTMLFormElement);

if (registerForm) {
    registerForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const NAME = 'name';
        const LASTNAME = 'lastName';
        const CONTACT = 'contact';
        const CONFIRMATION = 'confirmation';
        const EMAIL = 'email';
        const EMAILCONFIRM = 'emailConfirm';
        const PASSWORD = 'password';
        const PASSWORDCONFIRM = 'passwordConfirm';
        const data = {
            confirmation: (registerForm.elements.namedItem(CONFIRMATION) as HTMLSelectElement).value,
            contact: (registerForm.elements.namedItem(CONTACT) as HTMLInputElement).value,
            email: (registerForm.elements.namedItem(EMAIL) as HTMLInputElement).value,
            name: (registerForm.elements.namedItem(NAME) as HTMLInputElement).value,
            password: (registerForm.elements.namedItem(PASSWORD) as HTMLInputElement).value,
        };
        axios.post('/register', data).then((response) => {
            console.log(response.statusText);
            if (response.statusText === 'OK') {
                window.location.assign('/login');
            }
        });
    });
}

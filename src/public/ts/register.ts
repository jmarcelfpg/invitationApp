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
        const USERNAME = 'userName';
        const values = {
            comments: '',
            confirmation: (registerForm.elements.namedItem(CONFIRMATION) as HTMLSelectElement).value,
            email: (registerForm.elements.namedItem(EMAIL) as HTMLInputElement).value,
            firstName: (registerForm.elements.namedItem(NAME) as HTMLInputElement).value,
            lastName: (registerForm.elements.namedItem(LASTNAME) as HTMLInputElement).value,
            password: (registerForm.elements.namedItem(PASSWORD) as HTMLInputElement).value,
            phone: (registerForm.elements.namedItem(CONTACT) as HTMLInputElement).value,
            role: 1,
            userName: (registerForm.elements.namedItem(USERNAME) as HTMLInputElement).value,
            visits: 0,
        };
        axios.post('/signup', values).then(({data}) => {
            console.log(data);
        });
    });
}

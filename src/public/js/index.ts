import axios from 'axios';

const loginForm = (document.getElementById('login') as HTMLFormElement);

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const EMAIL = 'email';
        const PASSWORD = 'password';
        const data = {
            email: (loginForm.elements.namedItem(PASSWORD) as HTMLInputElement).value,
            password: (loginForm.elements.namedItem(EMAIL) as HTMLInputElement).value,
        };
        axios.post('/login', data).then((response) => {
            if (response.statusText === 'OK') {
                window.location.assign('/board');
            }
        });
    });
}

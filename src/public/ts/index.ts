import axios from 'axios';

const loginForm = (document.getElementById('login') as HTMLFormElement);

if (loginForm) {
    loginForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const USERNAME = 'userName';
        const PASSWORD = 'password';
        const data = {
            password: (loginForm.elements.namedItem(PASSWORD) as HTMLInputElement).value,
            username: (loginForm.elements.namedItem(USERNAME) as HTMLInputElement).value,
        };
        axios.post('/api/signin', data).then((response) => {
            console.log(response.data);
        }).catch((response) => {
            console.log(response);
        });
    });
}

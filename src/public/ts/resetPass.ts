import axios from 'axios';

const resetForm = (document.getElementById('resetPass') as HTMLFormElement);

if (resetForm) {
    resetForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const data = {
            email: (resetForm.elements.namedItem('email') as HTMLInputElement).value,
        };
        axios.post('/resetPass', data).then((response) => {
            if (response.data === true) {
                console.log('email enviado');
            }
        });
    });
}

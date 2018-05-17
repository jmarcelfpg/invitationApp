import axios from 'axios';

const confirmationEnum = ['confirmado', 'dejado pendiente', 'rechazado', 'cancelado'];
const confirmation = document.getElementById('confirmation');
if (confirmation) {
    axios.get('/confirmation').then((response) => {
        confirmation.innerText = `Usted a ${confirmationEnum[response.data]} la invitacion`;
    });
}

const buttons = document.getElementById('buttons');
if (buttons) {
    buttons.addEventListener('click', (event) => {
        const confirmationOption = (event.target as HTMLButtonElement).value;
        axios.put('/confirmation', { confirmation: confirmationOption }).then((response) => {
            console.log(response.data);
            if (confirmation) {
                confirmation.innerText = `Usted a ${confirmationEnum[response.data]} la invitacion`;
            }
        });
    });
}

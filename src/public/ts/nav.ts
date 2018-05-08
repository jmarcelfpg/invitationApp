import axios from 'axios';

const nav = document.getElementById('nav');
const liAdmin = document.getElementsByName('admin')[0];

if (liAdmin) {
    axios.get('/role').then((response) => {
        if (response.data === 0) {
            liAdmin.setAttribute('class', '');
        }
    });
}

if (nav) {
    nav.addEventListener('click', (event) => {
        const route = (event.target as HTMLLIElement).getAttribute('name');
        window.location.assign(`/${route}`);
    });
}

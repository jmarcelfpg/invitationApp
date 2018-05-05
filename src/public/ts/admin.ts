import axios from 'axios';

const usersTable = document.getElementById('users');

if (usersTable) {
    axios.get('users').then((response) => {
        const users = response.data.length ? response.data : undefined;
        if (users) {
            const confirmation = ['Confirmado', 'Pendiente', 'Rechazada', 'Cancelado'];
            const fragment = new DocumentFragment();
            users.forEach((user: { name: string; lastname: string; confirmation: number; fee: number }) => {
                console.log('spliting users');
                const tr = document.createElement('tr');
                let td = document.createElement('td');
                td.textContent = user.name;
                tr.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.lastname;
                tr.appendChild(td);
                td = document.createElement('td');
                td.textContent = confirmation[user.confirmation];
                tr.appendChild(td);
                td = document.createElement('td');
                td.setAttribute('contentEditable', 'true');
                td.textContent = `$${user.fee.toString()}`;
                tr.appendChild(td);
                fragment.appendChild(tr);
            });
            usersTable.appendChild(fragment);
        }
    });
}

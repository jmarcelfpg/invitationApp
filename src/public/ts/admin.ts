import axios from 'axios';

const usersTable = document.getElementById('users');

if (usersTable) {
    axios.get('users').then((response) => {
        const users = response.data.length ? response.data : undefined;
        if (users) {
            const confirmation = ['Confirmado', 'Pendiente', 'Rechazada', 'Cancelado'];
            const fragment = new DocumentFragment();
            users.forEach((user: {
                firstName: string; lastName: string;
                confirmation: number; fee: number; visits: number
            }) => {
                console.log('spliting users');
                const tr = document.createElement('tr');
                let td = document.createElement('td');
                td.textContent = user.firstName;
                tr.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.lastName;
                tr.appendChild(td);
                td = document.createElement('td');
                td.textContent = confirmation[user.confirmation];
                tr.appendChild(td);
                td = document.createElement('td');
                td.textContent = user.visits.toString();
                tr.appendChild(td);
                td = document.createElement('td');
                td.textContent = `$${user.fee.toString()}`;
                tr.appendChild(td);
                fragment.appendChild(tr);
            });
            usersTable.appendChild(fragment);
        }
    });
}

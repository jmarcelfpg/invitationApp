import axios from 'axios';

const usersTable = document.getElementById('users');

if (usersTable) {
    axios.get('users').then((response) => {
        const users = response.data.length ? response.data : undefined;
        if (users) {
            const confirmation = ['Confirmado', 'Pendiente', 'Rechazada', 'Cancelado'];
            const fragment = new DocumentFragment();
            users.forEach((user: {
                id: string, firstName: string; lastName: string;
                confirmation: number; fee: number; visits: number
            }) => {
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

                // td = document.createElement('td');
                // td.textContent = user.visits.toString();
                // tr.appendChild(td);

                td = document.createElement('td');
                td.setAttribute('class', 'fee');
                td.setAttribute('name', `fee-${user.id}`);
                td.textContent = `$${user.fee.toString()}`;
                tr.appendChild(td);

                // adding fee adding input
                td = document.createElement('td');
                td.appendChild(document.createTextNode('$'));
                const input = document.createElement('input');
                input.setAttribute('type', 'number');
                input.setAttribute('name', `adder-${user.id}`);
                input.setAttribute('class', 'adder');
                input.setAttribute('placeholder', '0.0');
                input.setAttribute('step', '10');
                td.appendChild(input);
                const button = document.createElement('button');
                button.setAttribute('type', 'button');
                button.setAttribute('class', 'deposit');
                button.setAttribute('key', user.id);
                button.appendChild(document.createTextNode('e'));
                td.appendChild(button);
                tr.appendChild(td);
                fragment.appendChild(tr);
            });
            usersTable.appendChild(fragment);
        }
    });
    usersTable.addEventListener('click', (event) => {
        const target = event.target;
        if ((target as HTMLButtonElement) && (target as HTMLButtonElement).getAttribute('class') === 'deposit') {
            const id = (target as HTMLButtonElement).getAttribute('key');
            const tableCell = ((target as HTMLButtonElement)
                .parentElement as HTMLTableCellElement);
            const tableRow = (tableCell.parentElement as HTMLTableCellElement);
            const adder: HTMLInputElement = (tableCell
                .children as CustomChildrenCollection)[`adder-${id}`]
            const data = {
                deposit: adder.value,
                id,
            };
            if (data.deposit) {
                axios.put('/addfee', data)
                    .then(({ data }) => {
                        if (data.err) {
                            console.error(data.err);
                            return data.err;
                        }
                        const feeCell = (tableRow.children as CustomChildrenCollection)
                        [`fee-${(target as HTMLButtonElement).getAttribute('key')}`];
                        (feeCell as HTMLTableCellElement).innerText = `$${data.fee}`;
                    });
            } else {
                console.log('agrega un valor');
            }
            adder.setAttribute('value', '0');
        }
    });
}

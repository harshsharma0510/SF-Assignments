var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const loadDataButton = document.getElementById('loadData');
const userTable = document.getElementById('userTable');
const userTableBody = document.getElementById('userTableBody');
loadDataButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
    loadDataButton.textContent = 'Refresh Data';
    try {
        const users = yield fetchUsers();
        displayUsers(users);
    }
    catch (err) {
        console.error('Error fetching users:', err);
    }
}));
function fetchUsers() {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/api/users');
        const users = yield response.json();
        return users;
    });
}
function displayUsers(users) {
    userTableBody.innerHTML = '';
    for (const user of users) {
        const row = userTableBody.insertRow();
        for (const key in user) {
            if (user.hasOwnProperty(key)) {
                const cell = row.insertCell();
                cell.textContent = user[key];
            }
        }
        const actionsCell = row.insertCell();
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        editButton.textContent = 'Edit';
        deleteButton.textContent = 'Delete';
        editButton.addEventListener('click', () => {
            const saveButton = document.createElement('button');
            const cancelButton = document.createElement('button');
            saveButton.textContent = 'Save';
            cancelButton.textContent = 'Cancel';
            for (let i = 0; i < row.cells.length - 1; i++) {
                const cell = row.cells[i];
                const input = document.createElement('input');
                input.value = cell.textContent || '';
                cell.textContent = '';
                cell.appendChild(input);
            }
            actionsCell.innerHTML = '';
            actionsCell.appendChild(saveButton);
            actionsCell.appendChild(cancelButton);
            saveButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
                const updatedUser = {
                    firstName: row.cells[0].firstChild.value,
                    middleName: row.cells[1].firstChild.value,
                    lastName: row.cells[2].firstChild.value,
                    email: row.cells[3].firstChild.value,
                    phoneNumber: row.cells[4].firstChild.value,
                    role: row.cells[5].firstChild.value,
                    address: row.cells[6].firstChild.value,
                };
                try {
                    yield updateUser(updatedUser);
                    loadDataButton.click();
                }
                catch (err) {
                    console.error('Error updating user:', err);
                }
            }));
            cancelButton.addEventListener('click', () => {
                loadDataButton.click();
            });
        });
        deleteButton.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield deleteUser(user.email);
                loadDataButton.click();
            }
            catch (err) {
                console.error('Error deleting user:', err);
            }
        }));
        actionsCell.appendChild(editButton);
        actionsCell.appendChild(deleteButton);
    }
    userTable.style.display = 'table';
}
function updateUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch('http://localhost:3000/api/users', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        if (!response.ok) {
            throw new Error('Error updating user');
        }
    });
}
function deleteUser(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`http://localhost:3000/api/users/${email}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Error deleting user');
        }
    });
}
// Initialize the application
(function init() {
    userTable.style.display = 'none';
})();
//# sourceMappingURL=app.js.map
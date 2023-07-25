"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class UserData {
    constructor() {
        this.userData = [];
        this.customerData = [];
        this.roleData = [];
    }
    getCustomerData() {
        return this.customerData;
    }
    getRoleData() {
        return this.roleData;
    }
    getCustomers() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3000/api/customers');
            const data = yield response.json();
            this.customerData = data;
            return this.customerData;
        });
    }
    getRoles() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3000/api/roles');
            const data = yield response.json();
            this.roleData = data;
            return this.roleData;
        });
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3000/api/users');
            const data = yield response.json();
            console.log(data);
            this.userData = data;
            return this.userData;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3000/api/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = yield response.json();
            this.userData.push(data);
        });
    }
    update(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch(`http://localhost:3000/api/users/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
            const data = yield response.json();
            const index = this.userData.findIndex((u) => u.id === data.id);
            if (index !== -1) {
                this.userData[index] = data;
            }
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.userData = this.userData.filter((u) => u.id !== id);
        });
    }
}
class App {
    constructor() {
        this.userData = new UserData;
        this.userTable = null;
        this.loadDataButton = null;
        this.createUserButton = null;
        this.init();
    }
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            this.userData = new UserData();
            yield Promise.all([this.userData.getCustomers(), this.userData.getRoles()]);
            this.userTable = document.getElementById('userDataTable');
            this.loadDataButton = document.getElementById('loadDataButton');
            this.createUserButton = document.getElementById('createUserButton');
            this.loadDataButton.addEventListener('click', this.loadData.bind(this));
            this.createUserButton.addEventListener('click', this.createUser.bind(this));
        });
    }
    loadData() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userData.getAll();
            this.renderTable(data);
            this.loadDataButton.innerHTML = 'Refresh';
            this.loadDataButton.removeEventListener('click', this.loadData);
            this.loadDataButton.addEventListener('click', this.refreshData.bind(this));
        });
    }
    refreshData() {
        return __awaiter(this, void 0, void 0, function* () {
            const data = yield this.userData.getAll();
            this.renderTable(data);
        });
    }
    renderTable(data) {
        const tbody = this.userTable.querySelector('tbody');
        tbody.innerHTML = '';
        data.forEach((user) => {
            const row = this.createRow(user);
            tbody.appendChild(row);
        });
    }
    createRow(user) {
        var _a, _b;
        const row = document.createElement('tr');
        row.dataset.userId = user.id.toString();
        row.innerHTML = `
        <td>${user.first_name}</td>
        <td>${user.middle_name !== null ? user.middle_name : ''}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td>${user.phone_number}</td>
        <td>${user.address}</td>
        <td>${(_a = user.customer) === null || _a === void 0 ? void 0 : _a.name}</td>
        <td>${(_b = user.role) === null || _b === void 0 ? void 0 : _b.name}</td>
        <td>${user.created_at}</td>
        <td>${user.updated_at}</td>
        <td>
          <button class="editButton">Edit</button>
          <button class="deleteButton">Delete</button>
        </td>
      `;
        const editButton = row.querySelector('.editButton');
        const deleteButton = row.querySelector('.deleteButton');
        editButton.addEventListener('click', this.editRow.bind(this, row, user));
        deleteButton.addEventListener('click', this.deleteRow.bind(this, row, user.id));
        return row;
    }
    editRow(row, user) {
        row.classList.add('editing');
        this.createEditableRow(row, user);
    }
    createEditableRow(row, user) {
        row.innerHTML = `
          <td><input type="text" name="first_name" value="${user.first_name}"></td>
          <td><input type="text" name="middle_name" value="${user.middle_name}"></td>
          <td><input type="text" name="last_name" value="${user.last_name}"></td>
          <td><input type="text" name="email" value="${user.email}"></td>
          <td><input type="text" name="phone_number" value="${user.phone_number}"></td>
          <td><input type="text" name="address" value="${user.address}"></td>
          <td>
            <select name="customer_name">
              ${this.userData.getCustomerData().map(customer => `<option value="${customer.name}"${customer.name === user.customer_name ? ' selected' : ''}>${customer.name}</option>`).join('')}
            </select>
          </td>
          <td>
            <select name="role_name">
              ${this.userData.getRoleData().map(role => `<option value="${role.name}"${role.name === user.role_name ? ' selected' : ''}>${role.name}</option>`).join('')}
            </select>
          </td>
          <td>${user.created_at}</td>
          <td>${user.updated_at}</td>
          <td>
            <button class="saveButton">Save</button>
            <button class="cancelButton">Cancel</button>
          </td>
        `;
        const saveButton = row.querySelector('.saveButton');
        const cancelButton = row.querySelector('.cancelButton');
        saveButton.addEventListener('click', this.saveRow.bind(this, row, user));
        cancelButton.addEventListener('click', this.cancelEdit.bind(this, row, user));
    }
    saveRow(row, user) {
        return __awaiter(this, void 0, void 0, function* () {
            user.first_name = row.querySelector('input[name="first_name"]').value;
            user.middle_name = row.querySelector('input[name="middle_name"]').value;
            user.last_name = row.querySelector('input[name="last_name"]').value;
            user.email = row.querySelector('input[name="email"]').value;
            user.phone_number = row.querySelector('input[name="phone_number"]').value;
            user.address = row.querySelector('input[name="address"]').value;
            const customerSelect = row.querySelector('select[name="customer_name"]');
            const roleSelect = row.querySelector('select[name="role_name"]');
            user.customer_id = parseInt(customerSelect.value, 10);
            user.customer_name = customerSelect.options[customerSelect.selectedIndex].text;
            user.role_id = parseInt(roleSelect.value, 10);
            user.role_name = roleSelect.options[roleSelect.selectedIndex].text;
            row.classList.remove('editing');
            const newRow = this.createRow(user);
            const editButton = newRow.querySelector('.editButton');
            const deleteButton = newRow.querySelector('.deleteButton');
            editButton.addEventListener('click', this.editRow.bind(this, newRow, user));
            deleteButton.addEventListener('click', this.deleteRow.bind(this, newRow, user.id));
            row.parentNode.replaceChild(newRow, row);
        });
    }
    cancelEdit(row, user) {
        row.classList.remove('editing');
        const newRow = this.createRow(user);
        row.parentNode.replaceChild(newRow, row);
    }
    deleteRow(row, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            row.parentNode.removeChild(row);
        });
    }
    createUser() {
        return __awaiter(this, void 0, void 0, function* () {
            const customerData = yield this.userData.getCustomers();
            const roleData = yield this.userData.getRoles();
            const emptyUser = {
                id: 0,
                first_name: '',
                middle_name: '',
                last_name: '',
                email: '',
                phone_number: '',
                address: '',
                customer_id: 0,
                customer_name: '',
                role_id: 0,
                role_name: '',
                created_at: new Date(),
                updated_at: new Date(),
                customer: customerData.length > 0 ? customerData[0] : null,
                role: roleData.length > 0 ? roleData[0] : null,
            };
            const newRow = this.createRow(emptyUser);
            const tbody = this.userTable.querySelector('tbody');
            tbody.insertBefore(newRow, tbody.firstChild);
            const cancelButton = newRow.querySelector('.cancelButton');
            if (cancelButton) {
                cancelButton.addEventListener('click', () => this.cancelCreate(newRow, emptyUser));
            }
            this.editRow(newRow, emptyUser);
        });
    }
    cancelCreate(row, user) {
        if (user.id === 0) {
            row.parentNode.removeChild(row);
        }
        else {
            row.classList.remove('editing');
            const newRow = this.createRow(user);
            const editButton = newRow.querySelector('.editButton');
            const deleteButton = newRow.querySelector('.deleteButton');
            editButton.addEventListener('click', this.editRow.bind(this, newRow, user));
            deleteButton.addEventListener('click', this.deleteRow.bind(this, newRow, user.id));
            row.parentNode.replaceChild(newRow, row);
        }
    }
}
const app = new App();

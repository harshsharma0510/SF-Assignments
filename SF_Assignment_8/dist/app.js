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
    }
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield fetch('http://localhost:3000/api/users');
            const data = yield response.json();
            this.userData = data;
            return this.userData;
        });
    }
    create(user) {
        return __awaiter(this, void 0, void 0, function* () {
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
        this.userData = new UserData();
        this.userTable = document.getElementById('userDataTable');
        this.loadDataButton = document.getElementById('loadDataButton');
        this.loadDataButton.addEventListener('click', this.loadData.bind(this));
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
        const row = document.createElement('tr');
        row.dataset.userId = user.id.toString();
        row.innerHTML = `
        <td>${user.first_name}</td>
        <td>${user.middle_name}</td>
        <td>${user.last_name}</td>
        <td>${user.email}</td>
        <td>${user.phone_number}</td>
        <td>${user.role}</td>
        <td>${user.address}</td>
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
        <td> <select name="role"> <option value="SuperAdmin"${user.role === 'SuperAdmin' ? ' selected' : ''}>SuperAdmin</option> <option value="Admin"${user.role === 'Admin' ? ' selected' : ''}>Admin</option> <option value="Subscriber"${user.role === 'Subscriber' ? ' selected' : ''}>Subscriber</option> </select> </td> <td><input type="text" name="address" value="${user.address}"></td>
         <td> <button class="saveButton">Save</button> <button class="cancelButton">Cancel</button> </td> `;
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
            user.role = row.querySelector('select[name="role"]').value;
            user.address = row.querySelector('input[name="address"]').value;
            yield this.userData.update(user);
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
            yield this.userData.delete(userId);
            row.parentNode.removeChild(row);
        });
    }
}
const app = new App();

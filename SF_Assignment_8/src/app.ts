interface User {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    role: string;
    address: string;
    createdAt: Date;
    updatedAt: Date;
  }
  
  class UserData {
    private userData: User[];
  
    constructor() {
      this.userData = [];
    }
  
    async getAll(): Promise<User[]> {
      const response = await fetch('http://localhost:3000/api/users');
      const data = await response.json();
      this.userData = data;
      return this.userData;
    }
  
    async create(user: User): Promise<void> {
     
    }
  
    async update(user: User): Promise<void> {
      const response = await fetch(`http://localhost:3000/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });
      const data = await response.json();
      const index = this.userData.findIndex((u) => u.id === data.id);
      if (index !== -1) {
        this.userData[index] = data;
      }
    }
  
    async delete(id: number): Promise<void> {
      this.userData = this.userData.filter((u) => u.id !== id);
    }
  }
  
  class App {
    private userData: UserData;
    private userTable: HTMLTableElement;
    private loadDataButton: HTMLButtonElement;
  
    constructor() {
      this.userData = new UserData();
      this.userTable = document.getElementById('userDataTable') as HTMLTableElement;
      this.loadDataButton = document.getElementById('loadDataButton') as HTMLButtonElement;
      this.loadDataButton.addEventListener('click', this.loadData.bind(this));
    }
  
    async loadData(): Promise<void> {
      const data = await this.userData.getAll();
      this.renderTable(data);
      this.loadDataButton.innerHTML = 'Refresh';
      this.loadDataButton.removeEventListener('click', this.loadData);
      this.loadDataButton.addEventListener('click', this.refreshData.bind(this));
    }
    async refreshData(): Promise<void> {
        const data = await this.userData.getAll();
        this.renderTable(data);
    }
  
    renderTable(data: User[]): void {
      const tbody = this.userTable.querySelector('tbody');
      tbody!.innerHTML = '';
      data.forEach((user) => {
        const row = this.createRow(user);
        tbody!.appendChild(row);
      });
    }
  
    createRow(user: User): HTMLTableRowElement {
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
      const editButton = row.querySelector('.editButton') as HTMLButtonElement;
      const deleteButton = row.querySelector('.deleteButton') as HTMLButtonElement;
      editButton.addEventListener('click', this.editRow.bind(this, row, user));
      deleteButton.addEventListener('click', this.deleteRow.bind(this, row, user.id));
      return row;
    }
  
    editRow(row: HTMLTableRowElement, user: User): void {
      row.classList.add('editing');
      this.createEditableRow(row, user);
      }
      
      createEditableRow(row: HTMLTableRowElement, user: User): void {
      row.innerHTML =`
      <td><input type="text" name="first_name" value="${user.first_name}"></td> 
      <td><input type="text" name="middle_name" value="${user.middle_name}"></td>
      <td><input type="text" name="last_name" value="${user.last_name}"></td>
      <td><input type="text" name="email" value="${user.email}"></td>
       <td><input type="text" name="phone_number" value="${user.phone_number}"></td>
        <td> <select name="role"> <option value="SuperAdmin"${user.role === 'SuperAdmin' ? ' selected' : ''}>SuperAdmin</option> <option value="Admin"${user.role === 'Admin' ? ' selected' : ''}>Admin</option> <option value="Subscriber"${user.role === 'Subscriber' ? ' selected' : ''}>Subscriber</option> </select> </td> <td><input type="text" name="address" value="${user.address}"></td>
         <td> <button class="saveButton">Save</button> <button class="cancelButton">Cancel</button> </td> `;
      const saveButton = row.querySelector('.saveButton') as HTMLButtonElement;
      const cancelButton = row.querySelector('.cancelButton') as HTMLButtonElement;
      saveButton.addEventListener('click', this.saveRow.bind(this, row, user));
      cancelButton.addEventListener('click', this.cancelEdit.bind(this, row, user));
      }
      
      async saveRow(row: HTMLTableRowElement, user: User): Promise<void> {
      user.first_name = (row.querySelector('input[name="first_name"]') as HTMLInputElement).value;
      user.middle_name = (row.querySelector('input[name="middle_name"]') as HTMLInputElement).value;
      user.last_name = (row.querySelector('input[name="last_name"]') as HTMLInputElement).value;
      user.email = (row.querySelector('input[name="email"]') as HTMLInputElement).value;
      user.phone_number = (row.querySelector('input[name="phone_number"]') as HTMLInputElement).value;
      user.role = (row.querySelector('select[name="role"]') as HTMLSelectElement).value;
      user.address = (row.querySelector('input[name="address"]') as HTMLInputElement).value;
      await this.userData.update(user);
      row.classList.remove('editing');
      const newRow = this.createRow(user);
      const editButton = newRow.querySelector('.editButton') as HTMLButtonElement;
      const deleteButton = newRow.querySelector('.deleteButton') as HTMLButtonElement;
      editButton.addEventListener('click', this.editRow.bind(this, newRow, user));
      deleteButton.addEventListener('click', this.deleteRow.bind(this, newRow, user.id));
      row.parentNode!.replaceChild(newRow, row);
      }
      
      cancelEdit(row: HTMLTableRowElement, user: User): void {
      row.classList.remove('editing');
      const newRow = this.createRow(user);
      row.parentNode!.replaceChild(newRow, row);
      }
      
      async deleteRow(row: HTMLTableRowElement, userId: number): Promise<void> {
      await this.userData.delete(userId);
      row.parentNode!.removeChild(row);
      }
      }
      
      const app = new App();
  
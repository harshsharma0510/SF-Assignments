class User {
  constructor(
    public firstName: string,
    public middleName: string,
    public lastName: string,
    public email: string,
    public phoneNumber: string,
    public role: UserRole,
    public address: string
  ) {}
}

enum UserRole {
  ADMIN = "Admin",
  USER = "User",
  GUEST = "Guest",
}

interface Actions {
  getAllUsers(): User[];
  getUserById(id: number): User;
  createUser(user: User): void;
  updateUser(user: User): void;
  deleteUser(id: number): void;
}

class UserActions implements Actions {
  private users: User[];

  constructor() {
    this.users = [
      new User(
        "Harsh",
        "S",
        "Kaushik",
        "hsk@gmail.com",
        "9898989",
        UserRole.ADMIN,
        "India"
      ),
      new User(
        "Krystal",
        "",
        "Clear",
        "krystal@hsk.com",
        "0000000",
        UserRole.USER,
        "India"
      ),
    ];
  }

  getAllUsers(): User[] {
    return this.users;
  }

  getUserById(id: number): User {
    return this.users[id];
  }

  createUser(user: User): void {
    this.users.push(user);
  }
  updateUser(user: User): void {
    function findUser(u: User): boolean {
      return u.email === user.email;
    }
    const index = this.users.filter(findUser);
  }

  deleteUser(id: number): void {
    this.users.splice(id, 1);
  }
}

const Actions: Actions = new UserActions();

function renderUserRow(user: User, index: number): HTMLTableRowElement {
  const row = document.createElement("tr");
  const firstNameCell = document.createElement("td");
  const middleNameCell = document.createElement("td");
  const lastNameCell = document.createElement("td");
  const emailCell = document.createElement("td");
  const phoneCell = document.createElement("td");
  const roleCell = document.createElement("td");
  const addressCell = document.createElement("td");
  const actionsCell = document.createElement("td");
  const editButton = document.createElement("button");
  const deleteButton = document.createElement("button");

  firstNameCell.innerText = user.firstName;
  middleNameCell.innerText = user.middleName;
  lastNameCell.innerText = user.lastName;
  emailCell.innerText = user.email;
  phoneCell.innerText = user.phoneNumber;
  roleCell.innerText = user.role;
  addressCell.innerText = user.address;

  editButton.innerText = "Edit";
  editButton.addEventListener("click", () => {
    firstNameCell.contentEditable = "true";
    middleNameCell.contentEditable = "true";
    lastNameCell.contentEditable = "true";
    emailCell.contentEditable = "true";
    phoneCell.contentEditable = "true";
    roleCell.contentEditable = "true";
    addressCell.contentEditable = "true";

    editButton.style.display = "none";
    saveButton.style.display = "inline-block";
    cancelButton.style.display = "inline-block";
  });

  const saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.style.display = "none";
  saveButton.addEventListener("click", () => {
    const updatedUser = new User(
      firstNameCell.innerText,
      middleNameCell.innerText,
      lastNameCell.innerText,
      emailCell.innerText,
      phoneCell.innerText,
      roleCell.innerText as UserRole,
      addressCell.innerText
    );
    Actions.updateUser(updatedUser);

    const newRow = renderUserRow(updatedUser, index);
    row.parentNode!.replaceChild(newRow, row);
  });

  const cancelButton = document.createElement("button");
  cancelButton.innerText = "Cancel";
  cancelButton.style.display = "none";
  cancelButton.addEventListener("click", () => {
    const originalUser = Actions.getUserById(index);
    const originalRow = renderUserRow(originalUser, index);
    row.parentNode!.replaceChild(originalRow, row);
  });

  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => {
    row.parentNode!.removeChild(row);
    Actions.deleteUser(index);
  });

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(saveButton);
  actionsCell.appendChild(cancelButton);
  actionsCell.appendChild(deleteButton);

  row.appendChild(firstNameCell);
  row.appendChild(middleNameCell);
  row.appendChild(lastNameCell);
  row.appendChild(emailCell);
  row.appendChild(phoneCell);
  row.appendChild(roleCell);
  row.appendChild(addressCell);
  row.appendChild(actionsCell);

  return row;
}

function renderUserTable() {
  const tbody = document.querySelector("tbody");
  tbody!.innerHTML = "";

  const users = Actions.getAllUsers();
  users.forEach((user, index) => {
    const row = renderUserRow(user, index);
    tbody!.appendChild(row);
  });
}

const loadDataButton = document.querySelector("#load-data") as HTMLElement;
loadDataButton!.addEventListener("click", () => {
  const userTable = document.querySelector("#user-table") as HTMLElement;
  const createUserButton = document.querySelector("#create-user") as HTMLElement;
  if (userTable.style.display === "none") {
    userTable.style.display = "table";
    createUserButton.style.display = "inline-block";
    loadDataButton!.innerText = "Refresh data";
    renderUserTable();
  } else {
    userTable.style.display = "none";
    createUserButton.style.display = "none";
    loadDataButton!.innerText = "Load data";
  }
});


const createUserButton = document.querySelector("#create-user") as HTMLElement;
createUserButton.style.display = "none";

createUserButton.addEventListener("click", () => {
  showUserCreationForm();
});

function showUserCreationForm() {
  const userTable = document.querySelector("#user-table") as HTMLElement;
  const createUserForm = document.createElement("div");
  createUserForm.className = "create-user-form";
  createUserForm.innerHTML = `
    <h2>Create New User</h2>
    <label>First Name: <input type="text" id="first-name" required></label><br>
    <label>Middle Name: <input type="text" id="middle-name"></label><br>
    <label>Last Name: <input type="text" id="last-name" required></label><br>
    <label>Email: <input type="email" id="email" required></label><br>
    <label>Phone Number: <input type="text" id="phone-number" required></label><br>
    <label>Role: 
      <select id="role" required>
        <option value="Admin">Admin</option>
        <option value="User">User</option>
        <option value="Guest">Guest</option>
      </select>
    </label><br>
    <label>Address: <input type="text" id="address"></label><br>
    <button id="save-new-user">Save</button>
    <button id="cancel-new-user">Cancel</button>
  `;

  const saveNewUserButton = createUserForm.querySelector("#save-new-user") as HTMLElement;
  saveNewUserButton.addEventListener("click", () => {
    const firstName = (document.querySelector("#first-name") as HTMLInputElement).value;
    const middleName = (document.querySelector("#middle-name") as HTMLInputElement).value;
    const lastName = (document.querySelector("#last-name") as HTMLInputElement).value;
    const email = (document.querySelector("#email") as HTMLInputElement).value;
    const phoneNumber = (document.querySelector("#phone-number") as HTMLInputElement).value;
    const role = (document.querySelector("#role") as HTMLSelectElement).value as UserRole;
    const address = (document.querySelector("#address") as HTMLInputElement).value;

    const newUser = new User(firstName, middleName, lastName, email, phoneNumber, role, address);
    Actions.createUser(newUser);

    
    renderUserTable();

    createUserButton.style.display = "inline-block";
    document.body.removeChild(createUserForm);
  });

  const cancelNewUserButton = createUserForm.querySelector("#cancel-new-user") as HTMLElement;
  cancelNewUserButton.addEventListener("click", () => {
    
    createUserButton.style.display = "inline-block";
    document.body.removeChild(createUserForm);
  });
  userTable.parentNode!.insertBefore(createUserForm, userTable.nextSibling);
}


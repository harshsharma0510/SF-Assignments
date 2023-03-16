// Model class for User entry
class User {
  firstName: string;
  middleName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  address: string;
}

// Enum for roles
enum UserRole {
  ADMIN = "Admin",
  USER = "User",
}

// Interface for CRUD actions
interface UserCRUD {
  addUser(user: User): void;
  updateUser(user: User, index: number): void;
  deleteUser(index: number): void;
}

class UserCRUDImpl implements UserCRUD {
  private users: User[] = [];

  addUser(user: User): void {
    this.users.push(user);
  }

  updateUser(user: User, index: number): void {
    this.users[index] = user;
  }

  deleteUser(index: number): void {
    this.users.splice(index, 1);
  }

  getUsers(): User[] {
    return this.users;
  }
}

let userCRUD = new UserCRUDImpl();

function loadData() {
  let loadDataBtn = document.getElementById("loadDataBtn");
  let userTable = document.getElementById("userTable");
  let userTableBody = document.getElementById("userTableBody");

  if (loadDataBtn.innerHTML === "Load data") {
    loadDataBtn.innerHTML = "Refresh data";
    userTable.style.display = "table";

    // sample data
    let usersJson = `[
            {
                "firstName": "John",
                "middleName": "Doe",
                "lastName": "Smith",
                "email": "johndoe@example.com",
                "phoneNumber": "123-456-7890",
                "role": "Admin",
                "address": "123 Main St, Anytown USA"
            },
            {
                "firstName": "Jane",
                "middleName": "A",
                "lastName": "Doe",
                "email": "janedoe@example.com",
                "phoneNumber": "987-654-3210",
                "role": "User",
                "address": "456 Broadway Ave, Anytown USA"
            }
        ]`;

    let users = JSON.parse(usersJson);

    for (let i = 0; i < users.length; i++) {
      addUserToTable(users[i], i, userTableBody);
    }
  } else {
    userTableBody.innerHTML = "";

    let users = userCRUD.getUsers();

    for (let i = 0; i < users.length; i++) {
      addUserToTable(users[i], i, userTableBody);
    }
  }
}

function addUserToTable(
  user: User,
  index: number,
  userTableBody: HTMLTableSectionElement
) {
  let row = userTableBody.insertRow();

  let firstNameCell = row.insertCell(0);
  let middleNameCell = row.insertCell(1);
  let lastNameCell = row.insertCell(2);
  let emailCell = row.insertCell(3);
  let phoneNumberCell = row.insertCell(4);
  let roleCell = row.insertCell(5);
  let addressCell = row.insertCell(6);
  let actionsCell = row.insertCell(7);

  firstNameCell.innerHTML = user.firstName;
  middleNameCell.innerHTML = user.middleName;
  lastNameCell.innerHTML = user.lastName;
  emailCell.innerHTML = user.email;
  phoneNumberCell.innerHTML = user.phoneNumber;
  roleCell.innerHTML = user.role;
  addressCell.innerHTML = user.address;

  let editButton = document.createElement("button");
  editButton.innerHTML = "Edit";
  editButton.onclick = function () {
    makeRowEditable(row, user, index, actionsCell);
  };

  let deleteButton = document.createElement("button");
  deleteButton.innerHTML = "Delete";
  deleteButton.onclick = function () {
    deleteUser(index, row);
  };

  actionsCell.appendChild(editButton);
  actionsCell.appendChild(deleteButton);

  userCRUD.addUser(user);
}
function makeRowEditable(
  row: HTMLTableRowElement,
  user: User,
  index: number,
  actionsCell: HTMLTableCellElement
) {
  let firstNameCell = row.cells[0];
  let middleNameCell = row.cells[1];
  let lastNameCell = row.cells[2];
  let emailCell = row.cells[3];
  let phoneNumberCell = row.cells[4];
  let roleCell = row.cells[5];
  let addressCell = row.cells[6];
  let firstNameInput = document.createElement("input");
  firstNameInput.type = "text";
  firstNameInput.value = user.firstName;

  let middleNameInput = document.createElement("input");
  middleNameInput.type = "text";
  middleNameInput.value = user.middleName;

  let lastNameInput = document.createElement("input");
  lastNameInput.type = "text";
  lastNameInput.value = user.lastName;

  let emailInput = document.createElement("input");
  emailInput.type = "text";
  emailInput.value = user.email;

  let phoneNumberInput = document.createElement("input");
  phoneNumberInput.type = "text";
  phoneNumberInput.value = user.phoneNumber;

  let roleSelect = document.createElement("select");
  let adminOption = document.createElement("option");
  adminOption.value = UserRole.ADMIN;
  adminOption.text = "Admin";
  let userOption = document.createElement("option");
  userOption.value = UserRole.USER;
  userOption.text = "User";
  roleSelect.add(adminOption);
  roleSelect.add(userOption);

  let addressInput = document.createElement("input");
  addressInput.type = "text";
  addressInput.value = user.address;

  firstNameCell.innerHTML = "";
  firstNameCell.appendChild(firstNameInput);

  middleNameCell.innerHTML = "";
  middleNameCell.appendChild(middleNameInput);

  lastNameCell.innerHTML = "";
  lastNameCell.appendChild(lastNameInput);

  emailCell.innerHTML = "";
  emailCell.appendChild(emailInput);

  phoneNumberCell.innerHTML = "";
  phoneNumberCell.appendChild(phoneNumberInput);

  roleCell.innerHTML = "";
  roleCell.appendChild(roleSelect);

  addressCell.innerHTML = "";
  addressCell.appendChild(addressInput);

  let saveButton = document.createElement("button");
  saveButton.innerHTML = "Save";
  saveButton.onclick = function () {
    let updatedUser = new User();
    updatedUser.firstName = firstNameInput.value;
    updatedUser.middleName = middleNameInput.value;
    updatedUser.lastName = lastNameInput.value;
    updatedUser.email = emailInput.value;
    updatedUser.phoneNumber = phoneNumberInput.value;
    updatedUser.role = roleSelect.value;
    updatedUser.address = userCRUD.updateUser(index, updatedUser);

    firstNameCell.innerHTML = updatedUser.firstName;
    middleNameCell.innerHTML = updatedUser.middleName;
    lastNameCell.innerHTML = updatedUser.lastName;
    emailCell.innerHTML = updatedUser.email;
    phoneNumberCell.innerHTML = updatedUser.phoneNumber;
    roleCell.innerHTML = updatedUser.role;
    addressCell.innerHTML = updatedUser.address;

    actionsCell.innerHTML = "";
    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function () {
      makeRowEditable(row, updatedUser, index, actionsCell);
    };
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
      deleteUser(index, row);
    };
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  };

  let cancelButton = document.createElement("button");
  cancelButton.innerHTML = "Cancel";
  cancelButton.onclick = function () {
    firstNameCell.innerHTML = user.firstName;
    middleNameCell.innerHTML = user.middleName;
    lastNameCell.innerHTML = user.lastName;
    emailCell.innerHTML = user.email;
    phoneNumberCell.innerHTML = user.phoneNumber;
    roleCell.innerHTML = user.role;
    addressCell.innerHTML = user.address;

    actionsCell.innerHTML = "";
    let editButton = document.createElement("button");
    editButton.innerHTML = "Edit";
    editButton.onclick = function () {
      makeRowEditable(row, user, index, actionsCell);
    };
    let deleteButton = document.createElement("button");
    deleteButton.innerHTML = "Delete";
    deleteButton.onclick = function () {
      deleteUser(index, row);
    };
    actionsCell.appendChild(editButton);
    actionsCell.appendChild(deleteButton);
  };

  actionsCell.innerHTML = "";
  actionsCell.appendChild(saveButton);
  actionsCell.appendChild(cancelButton);
}
function deleteUser(index: number, row: HTMLTableRowElement) {
  userCRUD.deleteUser(index);
  document.getElementById("usersTable").deleteRow(row.rowIndex);
}
function refreshData() {
  let table = document.getElementById("usersTable") as HTMLTableElement;
  table.innerHTML = "";
  loadUsers();
}
let userCRUD = new UserCRUD();
loadUsers();

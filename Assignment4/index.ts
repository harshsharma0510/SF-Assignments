
enum Role {
  SuperAdmin = "SuperAdmin",
  Admin = "Admin",
  Subscriber = "Subscriber",
}

interface User {
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  role: Role;
  address: string;
  createdAt: Date;
  isEditMode?: boolean;
}


interface CrudActions<T> {
  create(item: T): void;
  read(): T[];
  update(item: T, index: number): void;
  delete(index: number): void;
}


class UserCrud implements CrudActions<User> {
  private userList: User[] = [];

  create(user: User): void {
    this.userList.push(user);
  }

  read(): User[] {
    return [...this.userList];
  }

  update(user: User, index: number): void {
    this.userList[index] = user;
  }

  delete(index: number): void {
    this.userList.splice(index, 1);
  }
}


let userCrud = new UserCrud();
let isDataLoaded = false;
const sampleData: User[] = [
  {
    firstName: "Harsh",
    middleName: "S",
    lastName: "Kaushik",
    email: "hsk@gmail.com",
    phoneNumber: "98989898",
    role: Role.SuperAdmin,
    address: "India",
    createdAt: new Date(),
  },
  {
    firstName: "Krystal",
    middleName: "N",
    lastName: "Clear",
    email: "knc@gmail.com",
    phoneNumber: "98989898",
    role: Role.Admin,
    address: "India",
    createdAt: new Date(),
  },
  {
    firstName: "New",
    lastName: "Delhi",
    email: "nd@hsk.com",
    phoneNumber: "98989898",
    role: Role.Admin,
    address: "India",
    createdAt: new Date(),
  },
];

sampleData.forEach((user) => userCrud.create(user));


function dateTimeFormatter(target: Object, propertyKey: string): void {
  const original = target[propertyKey];

  target[propertyKey] = function (...args: any[]): string {
    const result = original.apply(this, args);

    if (typeof result === "string") {
      const date = new Date(result);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    } else if (result instanceof Date) {
      return `${result.toLocaleDateString()} ${result.toLocaleTimeString()}`;
    }

    return result;
  };
}
const originalData: User[] = userCrud.read();
function reloadData(): void {
  userCrud = new UserCrud();
  originalData.forEach((user) => userCrud.create(user));
}
function showData(): void {
  const userTable = document.getElementById("user-table");
  const userList = userCrud.read();
  const createUserButton = document.getElementById("create-user-button");
  const loadButton = document.getElementById("load-button");

  if (isDataLoaded) {
    loadButton.innerText = "Refresh data";
  } else {
    loadButton.innerText = "Load data";
  }
  let tableContent = `
    <tr>
      <th>First Name</th>
      <th>Middle Name</th>
      <th>Last Name</th>
      <th>Email</th>
      <th>Phone Number</th>
      <th>Role</th>
      <th>Address</th>
      <th>Created At</th>
      <th></th>
    </tr>
  `;
  tableContent += userList 
  .map(
    (user, index)=>`   
  <tr>
            <td><input class="edit-input" value="${user.firstName}" ${user.isEditMode ? "" : "disabled"}/></td>
            <td><input class="edit-input" value="${user.middleName ?? ""}" ${user.isEditMode ? "" : "disabled"}/></td>
            <td><input class="edit-input" value="${user.lastName}" ${user.isEditMode ? "" : "disabled"}/></td>
            <td><input class="edit-input" value="${user.email}" ${user.isEditMode ? "" : "disabled"}/></td>
            <td><input class="edit-input" value="${user.phoneNumber}" ${user.isEditMode ? "" : "disabled"}/></td>
            <td>
              ${
                user.isEditMode
                  ? `<select class="edit-input">
                      <option value="${Role.SuperAdmin}" ${
                      user.role === Role.SuperAdmin ? "selected" : ""
                    }>SuperAdmin</option>
                      <option value="${Role.Admin}" ${
                      user.role === Role.Admin ? "selected" : ""
                    }>Admin</option>
                      <option value="${Role.Subscriber}" ${
                      user.role === Role.Subscriber ? "selected" : ""
                    }>Subscriber</option>
                    </select>`
                  : user.role
              }
            </td>
            <td><input class="edit-input" value="${user.address}" ${user.isEditMode ? "" : "disabled"}/></td>
            <td>${user.createdAt}</td>
            <td>
              ${
                user.isEditMode
                  ? `<button onclick="saveEditRow(${index})">Save</button>
                     <button onclick="cancelEditRow(${index})">Cancel</button>`
                  : `<button onclick="editRow(${index})">Edit</button>
                     <button onclick="deleteRow(${index})">Delete</button>`
              }
            </td>
          </tr>
        `
      )
      .join("");
      
  userTable!.innerHTML = tableContent;
  createUserButton!.style.display = "inline"; 
  isDataLoaded = true;
}
const createUserButton = document.getElementById("create-user-button");
createUserButton!.onclick = () => {
  showCreateUserForm();
};
function showCreateUserForm(): void {
  const userTable = document.getElementById("user-table");

  userTable!.innerHTML += `
    <tr id="create-user-form">
      <td><input class="edit-input" placeholder="First Name" /></td>
      <td><input class="edit-input" placeholder="Middle Name" /></td>
      <td><input class="edit-input" placeholder="Last Name" /></td>
      <td><input class="edit-input" placeholder="Email" /></td>
      <td><input class="edit-input" placeholder="Phone Number" /></td>
      <td>
      <select class="edit-input">
      <option value="${Role.SuperAdmin}">SuperAdmin</option>
      <option value="${Role.Admin}">Admin</option>
      <option value="${Role.Subscriber}">Subscriber</option>
    </select>
      </td>
      <td><input class="edit-input" placeholder="Address" /></td>
      <td><input class="edit-input" value="" disabled/></td>
      <td>
        <button onclick="saveNewUser()">Save</button>
        <button onclick="cancelNewUser()">Cancel</button>
      </td>
    </tr>
  `;

  createUserButton!.style.display = "none";
}
function saveNewUser(): void {
  const createUserForm = document.getElementById("create-user-form");
  const editCells = createUserForm!.querySelectorAll(".edit-input");

  
  const newValues = Array.prototype.slice.call(editCells).map((cell) => (cell as HTMLInputElement).value);
  const newUser: User = {
    firstName: newValues[0],
    middleName: newValues[1],
    lastName: newValues[2],
    email: newValues[3],
    phoneNumber: newValues[4],
    role: newValues[5] as Role,
    address: newValues[6],
    createdAt: new Date(),
  };

  userCrud.create(newUser);
  showData();
}

function cancelNewUser(): void {
  const createUserForm = document.getElementById("create-user-form");
  createUserForm!!.remove();
  createUserButton!.style.display = "inline";
}
function editRow(index: number): void {
  const userList = userCrud.read();
  userList[index].isEditMode = true;
  showData();
}
function saveEditRow(index: number): void {
  const row = document.getElementsByTagName("tr")[index + 1];
  const editCells = row.querySelectorAll(".edit-input");
  const newValues = Array.prototype.slice.call(editCells).map((cell) => (cell as HTMLInputElement).value);

  const updatedUser: User = {
    firstName: newValues[0],
    middleName: newValues[1],
    lastName: newValues[2],
    email: newValues[3],
    phoneNumber: newValues[4],
    role: newValues[5] as Role,
    address: newValues[6],
    createdAt: userCrud.read()[index].createdAt, 
  };

  userCrud.update(updatedUser, index);
  const userList = userCrud.read();
  userList[index].isEditMode = false;
  showData();
}



function cancelEditRow(index: number): void {
  const userList = userCrud.read();
  userList[index].isEditMode = false;
  showData();
}

function deleteRow(index: number): void {
  userCrud.delete(index);
  showData();
}


const loadButton = document.getElementById("load-button");
loadButton!.onclick = () => {
  isDataLoaded = false;
  reloadData();
  showData();
};

// Define User model class
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
}

// Define CRUD interface
interface CrudActions<T> {
  create(item: T): void;
  read(): T[];
  update(item: T, index: number): void;
  delete(index: number): void;
}

// Define User CRUD class using generics
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

// Initialize User CRUD instance and populate sample data
const userCrud = new UserCrud();

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

// Define date time formatter decorator
function dateTimeFormatter(target: Object, propertyKey: string): void {
  const original = target[propertyKey];

  target[propertyKey] = function (...args: any[]): string {
    const result = original.apply(this, args);

    if (typeof result === "string") {
      const date = new Date(result);
      return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    }

    return result;
  };
}

// Define UI functions
function showData(): void {
  const userTable = document.getElementById("user-table");
  const userList = userCrud.read();

  userTable!.innerHTML = `
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
      ${userList
        .map(
          (user, index) => `
        <tr>
          <td><input class="edit-input" value="${
            user.firstName
          }" disabled/></td>
          <td><input class="edit-input" value="${
            user.middleName ?? ""
          }" disabled/></td>
          <td><input class="edit-input" value="${user.lastName}" disabled/></td>
          <td><input class="edit-input" value="${user.email}" disabled/></td>
          <td><input class="edit-input" value="${
            user.phoneNumber
          }" disabled/></td>
          <td><input class="edit-input" value="${user.role}" disabled/></td>
          <td><input class="edit-input" value="${user.address}" disabled/></td>
          <td>${user.createdAt}</td>
          <td>
            <button onclick="editRow(${index})">Edit</button>
            <button onclick="deleteRow(${index})">Delete</button>
          </td>
        </tr>
      `
        )
        .join("")}
    `;

  const loadButton = document.getElementById("load-button");
  loadButton!.innerText = "Refresh data";
}

function editRow(index: number): void {
  const row = document.getElementsByTagName("tr")[index + 1];
  const editCells = row.querySelectorAll(".edit-input");
  const editButton = row.querySelector("button:first-of-type");
  const saveButton = document.createElement("button");
  const cancelButton = document.createElement("button");
  saveButton.innerText = "Save";
  editCells.forEach((cell) => {
    (cell as HTMLButtonElement).disabled = false;
  });

  (editButton! as HTMLButtonElement).disabled = true;

  saveButton.innerText = "Save";
  saveButton.className = "save-button";
  interface ArrayConstructor {
    from(arrayLike: any, mapFn?: any, thisArg?: any): Array<any>;
}
  saveButton.onclick = () => {
    const newValues = Array.from(editCells).map((cell) =>  (cell as HTMLButtonElement).value);

    const updatedUser: User = {
      firstName: newValues[0],
      middleName: newValues[1],
      lastName: newValues[2],
      email: newValues[3],
      phoneNumber: newValues[4],
      role: newValues[5] as Role,
      address: newValues[6],
      createdAt: new Date(),
    };

    userCrud.update(updatedUser, index);
    showData();
  };

  cancelButton.innerText = "Cancel";
  cancelButton.className = "cancel-button";
  cancelButton.onclick = () => {
    showData();
  };

  row.appendChild(saveButton);
  row.appendChild(cancelButton);
}

function deleteRow(index: number): void {
  userCrud.delete(index);
  showData();
}

// Attach event listener to load button
const loadButton = document.getElementById("load-button");
loadButton!.onclick = () => {
  showData();
};

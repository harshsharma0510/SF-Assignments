var User = /** @class */ (function () {
    function User(firstName, middleName, lastName, email, phoneNumber, role, address) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.address = address;
    }
    return User;
}());
var UserRole;
(function (UserRole) {
    UserRole["ADMIN"] = "Admin";
    UserRole["USER"] = "User";
    UserRole["GUEST"] = "Guest";
})(UserRole || (UserRole = {}));
var UserActions = /** @class */ (function () {
    function UserActions() {
        this.users = [
            new User("Harsh", "S", "Kaushik", "hsk@gmail.com", "9898989", UserRole.ADMIN, "India"),
            new User("Krystal", "", "Clear", "krystal@hsk.com", "0000000", UserRole.USER, "India"),
        ];
    }
    UserActions.prototype.getAllUsers = function () {
        return this.users;
    };
    UserActions.prototype.getUserById = function (id) {
        return this.users[id];
    };
    UserActions.prototype.createUser = function (user) {
        this.users.push(user);
    };
    UserActions.prototype.updateUser = function (user) {
        function findUser(u) {
            return u.email === user.email;
        }
        var index = this.users.filter(findUser);
    };
    /*updateUser(user: User): void {
      const index = this.users.findIndex((u) => u.email === user.email);
      if (index >= 0) {
        this.users[index] = user;
      }
    }*/
    UserActions.prototype.deleteUser = function (id) {
        this.users.splice(id, 1);
    };
    return UserActions;
}());
var Actions = new UserActions();
function renderUserRow(user, index) {
    var row = document.createElement("tr");
    var firstNameCell = document.createElement("td");
    var middleNameCell = document.createElement("td");
    var lastNameCell = document.createElement("td");
    var emailCell = document.createElement("td");
    var phoneCell = document.createElement("td");
    var roleCell = document.createElement("td");
    var addressCell = document.createElement("td");
    var actionsCell = document.createElement("td");
    var editButton = document.createElement("button");
    var deleteButton = document.createElement("button");
    firstNameCell.innerText = user.firstName;
    middleNameCell.innerText = user.middleName;
    lastNameCell.innerText = user.lastName;
    emailCell.innerText = user.email;
    phoneCell.innerText = user.phoneNumber;
    roleCell.innerText = user.role;
    addressCell.innerText = user.address;
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function () {
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
    var saveButton = document.createElement("button");
    saveButton.innerText = "Save";
    saveButton.style.display = "none";
    saveButton.addEventListener("click", function () {
        var updatedUser = new User(firstNameCell.innerText, middleNameCell.innerText, lastNameCell.innerText, emailCell.innerText, phoneCell.innerText, roleCell.innerText, addressCell.innerText);
        Actions.updateUser(updatedUser);
        var newRow = renderUserRow(updatedUser, index);
        row.parentNode.replaceChild(newRow, row);
    });
    var cancelButton = document.createElement("button");
    cancelButton.innerText = "Cancel";
    cancelButton.style.display = "none";
    cancelButton.addEventListener("click", function () {
        var originalUser = Actions.getUserById(index);
        var originalRow = renderUserRow(originalUser, index);
        row.parentNode.replaceChild(originalRow, row);
    });
    deleteButton.innerText = "Delete";
    deleteButton.addEventListener("click", function () {
        row.parentNode.removeChild(row);
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
    var tbody = document.querySelector("tbody");
    tbody.innerHTML = "";
    var users = Actions.getAllUsers();
    users.forEach(function (user, index) {
        var row = renderUserRow(user, index);
        tbody.appendChild(row);
    });
}
var loadDataButton = document.querySelector("#load-data");
loadDataButton.addEventListener("click", function () {
    var userTable = document.querySelector("#user-table");
    userTable.style.display = "table";
    loadDataButton.innerText = "Refresh data";
    function refreshData() {
        Actions.getAllUsers();
    }
    renderUserTable();
});

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
    var createUserButton = document.querySelector("#create-user");
    if (userTable.style.display === "none") {
        userTable.style.display = "table";
        createUserButton.style.display = "inline-block";
        loadDataButton.innerText = "Refresh data";
        renderUserTable();
    }
    else {
        userTable.style.display = "none";
        createUserButton.style.display = "none";
        loadDataButton.innerText = "Load data";
    }
});
var createUserButton = document.querySelector("#create-user");
createUserButton.style.display = "none";
createUserButton.addEventListener("click", function () {
    showUserCreationForm();
});
function showUserCreationForm() {
    var userTable = document.querySelector("#user-table");
    var createUserForm = document.createElement("div");
    createUserForm.className = "create-user-form";
    createUserForm.innerHTML = "\n    <h2>Create New User</h2>\n    <label>First Name: <input type=\"text\" id=\"first-name\" required></label><br>\n    <label>Middle Name: <input type=\"text\" id=\"middle-name\"></label><br>\n    <label>Last Name: <input type=\"text\" id=\"last-name\" required></label><br>\n    <label>Email: <input type=\"email\" id=\"email\" required></label><br>\n    <label>Phone Number: <input type=\"text\" id=\"phone-number\" required></label><br>\n    <label>Role: \n      <select id=\"role\" required>\n        <option value=\"Admin\">Admin</option>\n        <option value=\"User\">User</option>\n        <option value=\"Guest\">Guest</option>\n      </select>\n    </label><br>\n    <label>Address: <input type=\"text\" id=\"address\"></label><br>\n    <button id=\"save-new-user\">Save</button>\n    <button id=\"cancel-new-user\">Cancel</button>\n  ";
    var saveNewUserButton = createUserForm.querySelector("#save-new-user");
    saveNewUserButton.addEventListener("click", function () {
        var firstName = document.querySelector("#first-name").value;
        var middleName = document.querySelector("#middle-name").value;
        var lastName = document.querySelector("#last-name").value;
        var email = document.querySelector("#email").value;
        var phoneNumber = document.querySelector("#phone-number").value;
        var role = document.querySelector("#role").value;
        var address = document.querySelector("#address").value;
        var newUser = new User(firstName, middleName, lastName, email, phoneNumber, role, address);
        Actions.createUser(newUser);
        renderUserTable();
        createUserButton.style.display = "inline-block";
        document.body.removeChild(createUserForm);
    });
    var cancelNewUserButton = createUserForm.querySelector("#cancel-new-user");
    cancelNewUserButton.addEventListener("click", function () {
        createUserButton.style.display = "inline-block";
        document.body.removeChild(createUserForm);
    });
    userTable.parentNode.insertBefore(createUserForm, userTable.nextSibling);
}

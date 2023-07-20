var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var Role;
(function (Role) {
    Role["SuperAdmin"] = "SuperAdmin";
    Role["Admin"] = "Admin";
    Role["Subscriber"] = "Subscriber";
})(Role || (Role = {}));
var UserCrud = /** @class */ (function () {
    function UserCrud() {
        this.userList = [];
    }
    UserCrud.prototype.create = function (user) {
        this.userList.push(user);
    };
    UserCrud.prototype.read = function () {
        return __spreadArray([], this.userList, true);
    };
    UserCrud.prototype.update = function (user, index) {
        this.userList[index] = user;
    };
    UserCrud.prototype.delete = function (index) {
        this.userList.splice(index, 1);
    };
    return UserCrud;
}());
var userCrud = new UserCrud();
var isDataLoaded = false;
var sampleData = [
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
sampleData.forEach(function (user) { return userCrud.create(user); });
function dateTimeFormatter(target, propertyKey) {
    var original = target[propertyKey];
    target[propertyKey] = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        var result = original.apply(this, args);
        if (typeof result === "string") {
            var date = new Date(result);
            return "".concat(date.toLocaleDateString(), " ").concat(date.toLocaleTimeString());
        }
        else if (result instanceof Date) {
            return "".concat(result.toLocaleDateString(), " ").concat(result.toLocaleTimeString());
        }
        return result;
    };
}
var originalData = userCrud.read();
function reloadData() {
    userCrud = new UserCrud();
    originalData.forEach(function (user) { return userCrud.create(user); });
}
function showData() {
    var userTable = document.getElementById("user-table");
    var userList = userCrud.read();
    var createUserButton = document.getElementById("create-user-button");
    var loadButton = document.getElementById("load-button");
    if (isDataLoaded) {
        loadButton.innerText = "Refresh data";
    }
    else {
        loadButton.innerText = "Load data";
    }
    var tableContent = "\n    <tr>\n      <th>First Name</th>\n      <th>Middle Name</th>\n      <th>Last Name</th>\n      <th>Email</th>\n      <th>Phone Number</th>\n      <th>Role</th>\n      <th>Address</th>\n      <th>Created At</th>\n      <th></th>\n    </tr>\n  ";
    tableContent += userList
        .map(function (user, index) {
        var _a;
        return "   \n  <tr>\n            <td><input class=\"edit-input\" value=\"".concat(user.firstName, "\" ").concat(user.isEditMode ? "" : "disabled", "/></td>\n            <td><input class=\"edit-input\" value=\"").concat((_a = user.middleName) !== null && _a !== void 0 ? _a : "", "\" ").concat(user.isEditMode ? "" : "disabled", "/></td>\n            <td><input class=\"edit-input\" value=\"").concat(user.lastName, "\" ").concat(user.isEditMode ? "" : "disabled", "/></td>\n            <td><input class=\"edit-input\" value=\"").concat(user.email, "\" ").concat(user.isEditMode ? "" : "disabled", "/></td>\n            <td><input class=\"edit-input\" value=\"").concat(user.phoneNumber, "\" ").concat(user.isEditMode ? "" : "disabled", "/></td>\n            <td>\n              ").concat(user.isEditMode
            ? "<select class=\"edit-input\">\n                      <option value=\"".concat(Role.SuperAdmin, "\" ").concat(user.role === Role.SuperAdmin ? "selected" : "", ">SuperAdmin</option>\n                      <option value=\"").concat(Role.Admin, "\" ").concat(user.role === Role.Admin ? "selected" : "", ">Admin</option>\n                      <option value=\"").concat(Role.Subscriber, "\" ").concat(user.role === Role.Subscriber ? "selected" : "", ">Subscriber</option>\n                    </select>")
            : user.role, "\n            </td>\n            <td><input class=\"edit-input\" value=\"").concat(user.address, "\" ").concat(user.isEditMode ? "" : "disabled", "/></td>\n            <td>").concat(user.createdAt, "</td>\n            <td>\n              ").concat(user.isEditMode
            ? "<button onclick=\"saveEditRow(".concat(index, ")\">Save</button>\n                     <button onclick=\"cancelEditRow(").concat(index, ")\">Cancel</button>")
            : "<button onclick=\"editRow(".concat(index, ")\">Edit</button>\n                     <button onclick=\"deleteRow(").concat(index, ")\">Delete</button>"), "\n            </td>\n          </tr>\n        ");
    })
        .join("");
    userTable.innerHTML = tableContent;
    createUserButton.style.display = "inline";
    isDataLoaded = true;
}
var createUserButton = document.getElementById("create-user-button");
createUserButton.onclick = function () {
    showCreateUserForm();
};
function showCreateUserForm() {
    var userTable = document.getElementById("user-table");
    userTable.innerHTML += "\n    <tr id=\"create-user-form\">\n      <td><input class=\"edit-input\" placeholder=\"First Name\" /></td>\n      <td><input class=\"edit-input\" placeholder=\"Middle Name\" /></td>\n      <td><input class=\"edit-input\" placeholder=\"Last Name\" /></td>\n      <td><input class=\"edit-input\" placeholder=\"Email\" /></td>\n      <td><input class=\"edit-input\" placeholder=\"Phone Number\" /></td>\n      <td>\n      <select class=\"edit-input\">\n      <option value=\"".concat(Role.SuperAdmin, "\">SuperAdmin</option>\n      <option value=\"").concat(Role.Admin, "\">Admin</option>\n      <option value=\"").concat(Role.Subscriber, "\">Subscriber</option>\n    </select>\n      </td>\n      <td><input class=\"edit-input\" placeholder=\"Address\" /></td>\n      <td><input class=\"edit-input\" value=\"\" disabled/></td>\n      <td>\n        <button onclick=\"saveNewUser()\">Save</button>\n        <button onclick=\"cancelNewUser()\">Cancel</button>\n      </td>\n    </tr>\n  ");
    createUserButton.style.display = "none";
}
function saveNewUser() {
    var createUserForm = document.getElementById("create-user-form");
    var editCells = createUserForm.querySelectorAll(".edit-input");
    var newValues = Array.prototype.slice.call(editCells).map(function (cell) { return cell.value; });
    var newUser = {
        firstName: newValues[0],
        middleName: newValues[1],
        lastName: newValues[2],
        email: newValues[3],
        phoneNumber: newValues[4],
        role: newValues[5],
        address: newValues[6],
        createdAt: new Date(),
    };
    userCrud.create(newUser);
    showData();
}
function cancelNewUser() {
    var createUserForm = document.getElementById("create-user-form");
    createUserForm.remove();
    createUserButton.style.display = "inline";
}
function editRow(index) {
    var userList = userCrud.read();
    userList[index].isEditMode = true;
    showData();
}
function saveEditRow(index) {
    var row = document.getElementsByTagName("tr")[index + 1];
    var editCells = row.querySelectorAll(".edit-input");
    var newValues = Array.prototype.slice.call(editCells).map(function (cell) { return cell.value; });
    var updatedUser = {
        firstName: newValues[0],
        middleName: newValues[1],
        lastName: newValues[2],
        email: newValues[3],
        phoneNumber: newValues[4],
        role: newValues[5],
        address: newValues[6],
        createdAt: userCrud.read()[index].createdAt,
    };
    userCrud.update(updatedUser, index);
    var userList = userCrud.read();
    userList[index].isEditMode = false;
    showData();
}
function cancelEditRow(index) {
    var userList = userCrud.read();
    userList[index].isEditMode = false;
    showData();
}
function deleteRow(index) {
    userCrud.delete(index);
    showData();
}
var loadButton = document.getElementById("load-button");
loadButton.onclick = function () {
    isDataLoaded = false;
    reloadData();
    showData();
};

var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
// Define User model class
var Role;
(function (Role) {
    Role["SuperAdmin"] = "SuperAdmin";
    Role["Admin"] = "Admin";
    Role["Subscriber"] = "Subscriber";
})(Role || (Role = {}));
// Define User CRUD class using generics
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
    UserCrud.prototype["delete"] = function (index) {
        this.userList.splice(index, 1);
    };
    return UserCrud;
}());
// Initialize User CRUD instance and populate sample data
var userCrud = new UserCrud();
var sampleData = [
    {
        firstName: "Harsh",
        middleName: "S",
        lastName: "Kaushik",
        email: "hsk@gmail.com",
        phoneNumber: "98989898",
        role: Role.SuperAdmin,
        address: "India",
        createdAt: new Date()
    },
    {
        firstName: "Krystal",
        middleName: "N",
        lastName: "Clear",
        email: "knc@gmail.com",
        phoneNumber: "98989898",
        role: Role.Admin,
        address: "India",
        createdAt: new Date()
    },
    {
        firstName: "New",
        lastName: "Delhi",
        email: "nd@hsk.com",
        phoneNumber: "98989898",
        role: Role.Admin,
        address: "India",
        createdAt: new Date()
    },
];
sampleData.forEach(function (user) { return userCrud.create(user); });
// Define date time formatter decorator
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
        return result;
    };
}
// Define UI functions
function showData() {
    var userTable = document.getElementById("user-table");
    var userList = userCrud.read();
    userTable.innerHTML = "\n      <tr>\n        <th>First Name</th>\n        <th>Middle Name</th>\n        <th>Last Name</th>\n        <th>Email</th>\n        <th>Phone Number</th>\n        <th>Role</th>\n        <th>Address</th>\n        <th>Created At</th>\n        <th></th>\n      </tr>\n      ".concat(userList
        .map(function (user, index) {
        var _a;
        return "\n        <tr>\n          <td><input class=\"edit-input\" value=\"".concat(user.firstName, "\" disabled/></td>\n          <td><input class=\"edit-input\" value=\"").concat((_a = user.middleName) !== null && _a !== void 0 ? _a : "", "\" disabled/></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.lastName, "\" disabled/></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.email, "\" disabled/></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.phoneNumber, "\" disabled/></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.role, "\" disabled/></td>\n          <td><input class=\"edit-input\" value=\"").concat(user.address, "\" disabled/></td>\n          <td>").concat(user.createdAt, "</td>\n          <td>\n            <button onclick=\"editRow(").concat(index, ")\">Edit</button>\n            <button onclick=\"deleteRow(").concat(index, ")\">Delete</button>\n          </td>\n        </tr>\n      ");
    })
        .join(""), "\n    ");
    var loadButton = document.getElementById("load-button");
    loadButton.innerText = "Refresh data";
}
function editRow(index) {
    var row = document.getElementsByTagName("tr")[index + 1];
    var editCells = row.querySelectorAll(".edit-input");
    var editButton = row.querySelector("button:first-of-type");
    var saveButton = document.createElement("button");
    var cancelButton = document.createElement("button");
    saveButton.innerText = "Save";
    editCells.forEach(function (cell) {
        cell.disabled = false;
    });
    editButton.disabled = true;
    saveButton.innerText = "Save";
    saveButton.className = "save-button";
    saveButton.onclick = function () {
        var newValues = Array.from(editCells).map(function (cell) { return cell.value; });
        var updatedUser = {
            firstName: newValues[0],
            middleName: newValues[1],
            lastName: newValues[2],
            email: newValues[3],
            phoneNumber: newValues[4],
            role: newValues[5],
            address: newValues[6],
            createdAt: new Date()
        };
        userCrud.update(updatedUser, index);
        showData();
    };
    cancelButton.innerText = "Cancel";
    cancelButton.className = "cancel-button";
    cancelButton.onclick = function () {
        showData();
    };
    row.appendChild(saveButton);
    row.appendChild(cancelButton);
}
function deleteRow(index) {
    userCrud["delete"](index);
    showData();
}
// Attach event listener to load button
var loadButton = document.getElementById("load-button");
loadButton.onclick = function () {
    showData();
};

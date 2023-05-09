"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.UserRole = void 0;
var UserRole;
(function (UserRole) {
    UserRole["SuperAdmin"] = "SuperAdmin";
    UserRole["Admin"] = "Admin";
    UserRole["Subscriber"] = "Subscriber";
})(UserRole = exports.UserRole || (exports.UserRole = {}));
class User {
    constructor(firstName, middleName, lastName, email, phoneNumber, role, address) {
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.role = role;
        this.address = address;
    }
}
exports.User = User;
//# sourceMappingURL=user.model.js.map
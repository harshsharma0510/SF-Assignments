"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DateTimeFormatter = void 0;
function DateTimeFormatter(format) {
    return function (target, propertyKey) {
        const valueKey = Symbol();
        Object.defineProperty(target, propertyKey, {
            get: function () {
                return this[valueKey];
            },
            set: function (value) {
                const formattedValue = value.toLocaleString('en-US', {
                    timeZone: 'UTC',
                    hour12: false,
                });
                this[valueKey] = formattedValue;
            },
        });
    };
}
exports.DateTimeFormatter = DateTimeFormatter;
//# sourceMappingURL=datetime-formatter.decorator.js.map
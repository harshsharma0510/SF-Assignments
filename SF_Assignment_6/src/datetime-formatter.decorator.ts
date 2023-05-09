export function DateTimeFormatter(format: string) {
    return function (target: any, propertyKey: string) {
      const valueKey = Symbol();
  
      Object.defineProperty(target, propertyKey, {
        get: function () {
          return this[valueKey];
        },
        set: function (value: Date) {
          const formattedValue = value.toLocaleString('en-US', {
            timeZone: 'UTC',
            hour12: false,
          });
          this[valueKey] = formattedValue;
        },
      });
    };
  }
  
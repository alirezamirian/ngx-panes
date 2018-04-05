export function CoerceBoolean(clazz, propName, descriptor?) {
  if (arguments.length === 0) {
    // support usage of the form @CoerceBoolean()
    return CoerceBoolean;
  }
  if (descriptor) {
    const originalSetter = descriptor.set;
    return Object.assign({}, descriptor, {
      set: function (value) {
        originalSetter.call(this, value != null && `${value}` !== 'false');
      }
    });
  } else {
    return Object.assign({}, {
      set: function (value) {
        this[`__${propName}`] = value != null && `${value}` !== 'false';
      },
      get: function () {
        return this[`__${propName}`] || false;
      }
    });
  }
};

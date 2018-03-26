export function CoerceBoolean(clazz, propName, descriptor?) {
  if (descriptor) {
    const originalSetter = descriptor.set;
    return Object.assign({}, descriptor, {
      set: function (value) {
        originalSetter.call(this, value != null && `${value}` !== 'false');
      }
    });
  } else {
    let _value;
    return Object.assign({}, descriptor, {
      set: function (value) {
        _value = value != null && `${value}` !== 'false';
      },
      get: function () {
        return _value;
      }
    });

  }
}

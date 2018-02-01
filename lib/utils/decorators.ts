export function Boolean(clazz, propName, descriptor) {
  const originalSetter = descriptor.set;
  return Object.assign({}, descriptor, {
    set: function (value) {
      originalSetter.call(this, value != null && `${value}` !== 'false');
    }
  });
}

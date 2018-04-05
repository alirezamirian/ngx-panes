class LibLogger {
  warn() {
    this.log('warn', arguments);
  }

  error() {
    this.log('error', arguments);
  }

  private log(type, args) {
    console[type].apply(console, ['%c[ngx-panes]', 'font-weight: bold;', ...Array.from(args)]);

  }
}

/**
 * @private
 * @type {LibLogger}
 */
export const libLogger = new LibLogger();

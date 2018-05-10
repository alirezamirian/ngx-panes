export class LibLogger {
  warn(...args) {
    this.log('warn', args);
  }

  error(...args) {
    this.log('error', args);
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

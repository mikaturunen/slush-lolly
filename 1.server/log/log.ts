// TODO bunyan *.d.ts files
var bunyan = require("bunyan");
// TODO read name from slush
var log = bunyan.createLogger({
    name: "slush-lolly",
    stream: process.stdout,
    level: "debug"
});

/** 
 * Simplifies the callback routing for what function to call from Bunyan.
 */
var callBunyan = (bunyanCallback: any, message: string, meta: { [fieldName: string]: any; }) => {
  if (meta) {
    bunyanCallback(message);
  } else {
    bunyanCallback(message);
  }
};

/** 
 * @module Log
 * Module for handling logging in the node application. Internally uses Bunyan for managing logging behavior.
 */
module Log {
  /** 
   * Info log.
   * @params message {string} Message to log
   * @params argument {any} Optional. 
   */
  export function info(message: string, meta?: { [fieldName: string]: any; }) {
    if (meta) {
      log.info(meta, message); 
    } else {
      log.info(message);
    }
  }

  /** 
   * Warning log.
   * @params message {string} Message to log.
   * @params argument {any} Optional. 
   */
  export function warn(message: string, meta?: { [fieldName: string]: any; }) {  
    if (meta) {
      log.warn(meta, message); 
    } else {
      log.warn(message);
    }
  }

  /** 
   * Error log.
   * @params message {string} Message to log.
   * @params argument {any} Optional. 
   */
  export function error(message: string, meta?: { [fieldName: string]: any; }) {
    if (meta) {
      log.error(meta, message); 
    } else {
      log.error(message);
    }
  }

  /** 
   * Debug log.
   * @params message {string} Message to log.
   * @params argument {any} Optional. 
   */
  export function debug(message: string, meta?: { [fieldName: string]: any; }) {
    if (meta) {
      log.debug(meta, message); 
    } else {
      log.debug(message);
    }
  }
}

export = Log;

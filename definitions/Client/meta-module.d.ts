
/**
 * Interface for Angular module injection and maintaining easier typing
 */
interface MetaModule {
  /**
   * Name for the module. 
   */
  moduleName: string;

  /**
   * Optional controller name. If the module uses controller, should be used.
   */
  controllerName?: string;

  /**
   * Dependencies for the module. Used when creating the module.
   */
  dependencyList?: string[];

  /**
   * Optional angular.module.config callback function. 
   */
  configFunction?: (...args: any[]) => void;

  /**
   * Optional angular.module.controller callback function.
   */
  controllerFunction?: (...args: any[]) => void;
}

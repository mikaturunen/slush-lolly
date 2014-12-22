declare module GameShelf {
    var name: string;
    var depends: string[];
    function config($stateProvider: any, $urlRouterProvider: any, $locationProvider: any): void;
}

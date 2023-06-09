"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRol = exports.EmpleadoRol = void 0;
var EmpleadoRol;
(function (EmpleadoRol) {
    EmpleadoRol["admin"] = "admin";
    EmpleadoRol["seller"] = "seller";
})(EmpleadoRol || (exports.EmpleadoRol = EmpleadoRol = {}));
var ClienteRol;
(function (ClienteRol) {
    ClienteRol["visitante"] = "visitante";
    ClienteRol["autenticado"] = "autenticado";
})(ClienteRol || (exports.ClienteRol = ClienteRol = {}));

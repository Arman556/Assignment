export var ROLES;
(function (ROLES) {
    ROLES[ROLES["DEVELOPER"] = 0] = "DEVELOPER";
    ROLES[ROLES["QA"] = 1] = "QA";
    ROLES[ROLES["DevOps"] = 2] = "DevOps";
})(ROLES || (ROLES = {}));
export class Employee {
}
export class fetchData {
    async fetch1() {
        let response = await fetch("data.json");
        let data = await response.json();
        return (data);
    }
}

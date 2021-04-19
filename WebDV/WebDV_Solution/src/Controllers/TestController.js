import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
/**����� ��� �������� ���������� */
var TestController = /** @class */ (function () {
    function TestController() {
    }
    /**��������  ����� */
    TestController.prototype.Test = function () {
        var url = urlStore.urlResolver.resolveUrl("TestMethod", "Test");
        return requestManager.get(url);
    };
    TestController.prototype.GetEmployeeData = function (employeeId) {
        var url = urlStore.urlResolver.resolveUrl("GetEmployeeData", "Test");
        var data = {
            employeeId: employeeId
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    return TestController;
}());
export { TestController };
export var $TestController = new TestController();
//# sourceMappingURL=TestController.js.map
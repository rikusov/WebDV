import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
var DVController = /** @class */ (function () {
    function DVController() {
    }
    DVController.prototype.getDirector = function (employeeId) {
        var url = urlStore.urlResolver.resolveUrl("GetDirector", "DV");
        var data = {
            employeeId: employeeId
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    DVController.prototype.getSecretary = function () {
        var url = urlStore.urlResolver.resolveUrl("GetSecretary", "DV");
        return requestManager.get(url);
    };
    DVController.prototype.GetPriceTickets = function (cityId, dateBusinessTripWith, dateBusinessTripTo) {
        var url = urlStore.urlResolver.resolveUrl("GetPriceTickets", "DV");
        var data = {
            cityId: cityId,
            dateBusinessTripWith: dateBusinessTripWith,
            dateBusinessTripTo: dateBusinessTripTo
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    DVController.prototype.GetMoneyBussinesTrip = function (cityId) {
        var url = urlStore.urlResolver.resolveUrl("GetMoneyBussinesTrip", "DV");
        var data = {
            cityId: cityId,
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    DVController.prototype.GetIdOnApproval = function (statcardId) {
        var url = urlStore.urlResolver.resolveUrl("GetIdOnApproval", "DV");
        var data = {
            statcardId: statcardId
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    return DVController;
}());
export { DVController };
export var $DVController = new DVController();
//# sourceMappingURL=DVController.js.map
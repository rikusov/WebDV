import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
/**
 * класс реализующий серверное расширение WebDVExtension
 * */
var DVController = /** @class */ (function () {
    function DVController() {
    }
    /**
     * Получения руководителя сотрудника
     * @param employeeId Id сотрудника
     */
    DVController.prototype.getDirector = function (employeeId) {
        var url = urlStore.urlResolver.resolveUrl("GetDirector", "DV");
        var data = {
            employeeId: employeeId
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    /**
     * Получения масива сотрудников из группы секрктарь
     * */
    DVController.prototype.getSecretary = function () {
        var url = urlStore.urlResolver.resolveUrl("GetSecretary", "DV");
        return requestManager.get(url);
    };
    /**
     * Получение ценны билетов
     * @param cityId Id города
     * @param dateBusinessTripWith дата вылета
     * @param dateBusinessTripTo дата прилета
     */
    DVController.prototype.getPriceTickets = function (cityId, dateBusinessTripWith, dateBusinessTripTo) {
        var url = urlStore.urlResolver.resolveUrl("GetPriceTickets", "DV");
        var data = {
            cityId: cityId,
            dateBusinessTripWith: dateBusinessTripWith,
            dateBusinessTripTo: dateBusinessTripTo
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    /**
     * Возврвщает сумму командировачных
     * @param cityId Id города
     */
    DVController.prototype.getMoneyBussinesTrip = function (cityId) {
        var url = urlStore.urlResolver.resolveUrl("GetMoneyBussinesTrip", "DV");
        var data = {
            cityId: cityId,
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    /**
     * *Возвращат id операции для смены статуса карточки
     * @param kindCardId Id вида карточки
     * @param statCardName текущий статус карточки
     * @param endStatName целевой статус карточки
     */
    DVController.prototype.getOperationsIdState = function (kindCardId, statCardId, endStateName) {
        var url = urlStore.urlResolver.resolveUrl("GetOperationsIdState", "DV");
        var data = {
            kindCardId: kindCardId,
            statCardId: statCardId,
            endStateName: endStateName
        };
        return requestManager.post(url, JSON.stringify(data));
    };
    return DVController;
}());
export { DVController };
export var $DVController = new DVController();
//# sourceMappingURL=DVController.js.map
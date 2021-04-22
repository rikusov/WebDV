import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { DirectorDataModel } from "../Models/DirectorDataModel";
/**
 * класс реализующий серверное расширение WebDVExtension
 * */
export class DVController {
    /**
     * Получения руководителя сотрудника
     * @param employeeId Id сотрудника
     */
    public getDirector(employeeId: string): JQueryDeferred<DirectorDataModel> {
        let url = urlStore.urlResolver.resolveUrl("GetDirector", "DV");
        let data = {
            employeeId: employeeId
        }

        return requestManager.post(url, JSON.stringify(data));
    }
    /**
     * Получения масива сотрудников из группы секрктарь
     * */
    public getSecretary(): JQueryDeferred<GenModels.EmployeeDataModel[]> {
        let url = urlStore.urlResolver.resolveUrl("GetSecretary", "DV");

        return requestManager.get(url);
    }
    /**
     * Получение ценны билетов 
     * @param cityId Id города
     * @param dateBusinessTripWith дата вылета
     * @param dateBusinessTripTo дата прилета
     */
    public getPriceTickets(cityId: string, dateBusinessTripWith: Date, dateBusinessTripTo: Date): JQueryDeferred<number> {
        let url = urlStore.urlResolver.resolveUrl("GetPriceTickets", "DV");
        let data = {
            cityId: cityId,
            dateBusinessTripWith: dateBusinessTripWith,
            dateBusinessTripTo: dateBusinessTripTo
        }

        return requestManager.post(url, JSON.stringify(data));
    }
    /**
     * Возврвщает сумму командировачных
     * @param cityId Id города
     */
    public getMoneyBussinesTrip(cityId: string): JQueryDeferred<number> {
        let url = urlStore.urlResolver.resolveUrl("GetMoneyBussinesTrip", "DV");
        let data = {
            cityId: cityId,
        }

        return requestManager.post(url, JSON.stringify(data));
    }
    /**
     * *Возвращат id операции для смены статуса карточки
     * @param kindCardId Id вида карточки
     * @param statCardName текущий статус карточки
     * @param endStatName целевой статус карточки
     */
    public getOperationsIdState(kindCardId: string, statCardId: string, endStateName: string): JQueryDeferred<string> {
        let url = urlStore.urlResolver.resolveUrl("GetOperationsIdState", "DV");
        let data = {
            kindCardId: kindCardId,
            statCardId: statCardId,
            endStateName: endStateName
        }

        return requestManager.post(url, JSON.stringify(data));
    }

}

export type $DVController = { DVController: DVController };
export const $DVController = new DVController();
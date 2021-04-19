import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { DirectorDataModel } from "../Models/DirectorDataModel";

export class DVController {

    public getDirector(employeeId: string): JQueryDeferred<DirectorDataModel> {
        let url = urlStore.urlResolver.resolveUrl("GetDirector", "DV");
        let data = {
            employeeId: employeeId
        }

        return requestManager.post(url, JSON.stringify(data));
    }

    public getSecretary(): JQueryDeferred<GenModels.EmployeeDataModel[]> {
        let url = urlStore.urlResolver.resolveUrl("GetSecretary", "DV");

        return requestManager.get(url);
    }

    public GetPriceTickets(cityId: string, dateBusinessTripWith: Date, dateBusinessTripTo: Date): JQueryDeferred<number> {
        let url = urlStore.urlResolver.resolveUrl("GetPriceTickets", "DV");
        let data = {
            cityId: cityId,
            dateBusinessTripWith: dateBusinessTripWith,
            dateBusinessTripTo: dateBusinessTripTo
        }

        return requestManager.post(url, JSON.stringify(data));
    }

    public GetMoneyBussinesTrip(cityId: string): JQueryDeferred<number> {
        let url = urlStore.urlResolver.resolveUrl("GetMoneyBussinesTrip", "DV");
        let data = {
            cityId: cityId,
        }

        return requestManager.post(url, JSON.stringify(data));
    }

    public GetIdOnApproval(statcardId: string): JQueryDeferred<string> {
        let url = urlStore.urlResolver.resolveUrl("GetIdOnApproval", "DV");
        let data = {
            statcardId: statcardId
        }

        return requestManager.post(url, JSON.stringify(data));
    }

}

export type $DVController = { DVController: DVController };
export const $DVController = new DVController();
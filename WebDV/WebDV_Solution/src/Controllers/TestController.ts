import { requestManager } from "@docsvision/webclient/System/RequestManager";
import { urlStore } from "@docsvision/webclient/System/UrlStore";
import { CustomEmployeeData } from "../Models/CustomEmployeeData";

/**Класс под тестовый контроллер */
export class TestController {
    /**Тестовый  метод */
    public Test(): JQueryDeferred<string> {
        let url = urlStore.urlResolver.resolveUrl("TestMethod", "Test");

        return requestManager.get(url);
    }

    public GetEmployeeData(employeeId: string): JQueryDeferred<CustomEmployeeData> {
        let url = urlStore.urlResolver.resolveUrl("GetEmployeeData", "Test");
        let data = {
            employeeId: employeeId
        }

        return requestManager.post(url, JSON.stringify(data));
    }
}


export type $TestController = { TestController: TestController }
export const $TestController = new TestController();
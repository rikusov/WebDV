import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";
/** интерфейс для получения модели руководителя и телефона */
export interface DirectorDataModel {
    director: GenModels.EmployeeDataModel,
    phone: string
}
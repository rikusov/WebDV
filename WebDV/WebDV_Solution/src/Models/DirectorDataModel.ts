import { GenModels } from "@docsvision/webclient/Generated/DocsVision.WebClient.Models";

export interface DirectorDataModel {
    director: GenModels.EmployeeDataModel,
    phone: string
}
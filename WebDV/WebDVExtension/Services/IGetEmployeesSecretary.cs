using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.BackOffice.WebClient.Helpers;
using DocsVision.Platform.WebClient;

namespace WebDVExtension.Services {
    /// <summary>
    /// Сервис для получения секретарей
    /// </summary>
    public interface IGetEmployeesSecretary {
        /// <summary>
        /// Получение сотрудников имеющих роль секрктарь
        /// </summary>
        /// <returns>Возврашает масив сотрудников имеющих роль секретарь</returns>
        EmployeeModel[] GetSecretary(ServiceHelper serviceHelper, SessionContext context);
    }
}

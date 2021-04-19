using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.BackOffice.WebClient.Helpers;
using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WebDVExtension.Services {
    /// <summary>
    /// Сервис для получения секретарей
    /// </summary>
    public interface IGetEmployeesSecretary {
        /// <summary>
        /// Получение сотрудников имеющих роль секрктарь
        /// </summary>
        /// <returns></returns>
        EmployeeModel[] GetSecretary(ServiceHelper serviceHelper, SessionContext context);

    }
}

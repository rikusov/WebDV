using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.BackOffice.WebClient.Helpers;
using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDVExtension.Models;

namespace WebDVExtension.Services {
    /// <summary>
    /// Получения руководителя
    /// </summary>
    public interface IGetDirectorService {
        /// <summary>
        /// Получение руководителя
        /// </summary>
        /// <param name="serviceHelper"></param>
        /// <param name="context">Контекст</param>
        /// <param name="empoloyeeId"> ID сотрудника</param>
        /// <returns>Модель руководителя </returns>
        DirectorDataModel GetDirector(ServiceHelper serviceHelper, SessionContext context, Guid empoloyeeId); 
    }
}

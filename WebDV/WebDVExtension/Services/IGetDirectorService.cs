using DocsVision.BackOffice.WebClient.Helpers;
using DocsVision.Platform.WebClient;
using System;
using WebDVExtension.Models;

namespace WebDVExtension.Services {
    /// <summary>
    /// Сервис для получения руководителя выбранного сотрудника
    /// </summary>
    public interface IGetDirectorService {
        /// <summary>
        /// Получение руководителя выбранного сотрудника
        /// </summary>
        /// <param name="serviceHelper">хелпер</param>
        /// <param name="context">Контекст</param>
        /// <param name="empoloyeeId"> ID сотрудника</param>
        /// <returns>Модель руководителя <see cref="DirectorDataModel"></returns>
        DirectorDataModel GetDirector(ServiceHelper serviceHelper, SessionContext context, Guid empoloyeeId); 
    }
}

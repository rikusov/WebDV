using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using WebDVExtension.Models;

namespace WebDVExtension.Services {
    public interface ICustomEmployeeService {
        /// <summary>
        /// Получение расширенной информации по сотруднику
        /// </summary>
        /// <param name="context">Контекст</param>
        /// <param name="employeeId">ИД сотрудника</param>
        /// <returns></returns>
        CustomEmployeeData GetEmployeeData(SessionContext context, Guid employeeId);
    }
}

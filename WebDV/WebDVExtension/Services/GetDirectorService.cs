using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.BackOffice.WebClient.Helpers;
using DocsVision.Platform.WebClient;
using System;
using WebDVExtension.Models;

namespace WebDVExtension.Services {
    public class GetDirectorService : IGetDirectorService {
        public DirectorDataModel GetDirector(ServiceHelper serviceHelper,SessionContext context, Guid empoloyeeId){
            StaffEmployee employee = context.ObjectContext.GetObject<StaffEmployee>(empoloyeeId);

            StaffEmployee director = null;

            if (employee.Manager != null) director = RGetDirector(employee.Manager, empoloyeeId);
            else director = RGetDirector(employee.Unit.Manager, empoloyeeId);

            if (director == null) return null;

            EmployeeModelWithPoneAndEmail director_employee = serviceHelper.EmployeeService.GetEmployeeWithPoneAndEmail(context, director.GetObjectId());

            return new DirectorDataModel { Director = director_employee, Phone = director_employee.Phone };
        }
        /// <summary>
        /// Рекурсивный поиск руководителя
        /// </summary>
        /// <param name="director">руководитель</param>
        /// <param name="employeeId">ID сотрудника</param>
        /// <returns>Первую модель сотрудника который является руководителем 
        /// и не является текущим сотрудником.
        /// Если текущий сотрудник руководитель организации то возвращается он
        /// </returns>
        private StaffEmployee RGetDirector(StaffEmployee director, Guid employeeId) {
            if (director != null && director.GetObjectId() == employeeId && director.Unit.ParentUnit != null)
                return RGetDirector(director.Unit.ParentUnit.Manager, employeeId);

            return director;
        }
    }
}
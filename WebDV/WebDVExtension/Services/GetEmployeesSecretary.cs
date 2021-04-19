using DocsVision.BackOffice.ObjectModel;
using DocsVision.BackOffice.WebClient.Employee;
using DocsVision.BackOffice.WebClient.Helpers;
using DocsVision.Platform.ObjectModel.Search;
using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDVExtension.Services {
    public class GetEmployeesSecretary : IGetEmployeesSecretary {
        public EmployeeModel[] GetSecretary(ServiceHelper serviceHelper, SessionContext context){
            StaffGroup group = context.ObjectContext.FindObject<StaffGroup>(new QueryObject(BaseUniversalItem.NameProperty.Name, "Секретарь"));

            if (group != null){
                List<EmployeeModel> listSekretary = new List<EmployeeModel>();

                foreach (Guid employeeId in group.EmployeesIds)
                    listSekretary.Add(serviceHelper.EmployeeService.GetEmployee(context, employeeId));

                return listSekretary.ToArray<EmployeeModel>();
            }

            return null;
            
        }
    }
}
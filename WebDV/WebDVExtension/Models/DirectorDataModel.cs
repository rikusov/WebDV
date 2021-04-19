using DocsVision.BackOffice.WebClient.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDVExtension.Models {
    
    /// <summary>
    /// Модель данных для получения сотрудника и телефона
    /// </summary>
    public class DirectorDataModel {

        public EmployeeModel Director { get; set; }
        public string Phone { get; set; }

    }
}
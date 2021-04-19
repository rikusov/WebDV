using DocsVision.BackOffice.WebClient.Employee;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebDVExtension.Models {
    public class CustomEmployeeData {

        public string Positions { get; set; }
        public string UnitName { get; set; }
        public EmployeeModel Director { get; set; }

    }
}
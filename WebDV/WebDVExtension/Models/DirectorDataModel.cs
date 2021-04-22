using DocsVision.BackOffice.WebClient.Employee;

namespace WebDVExtension.Models {
    
    /// <summary>
    /// Модель данных для хранения сотрудника и телефона
    /// </summary>
    public class DirectorDataModel {
        /// <summary>
        /// Модель сотрудника
        /// </summary>
        public EmployeeModel Director { get; set; }
        /// <summary>
        /// Телефон сотрудника
        /// </summary>
        public string Phone { get; set; }
    }
}
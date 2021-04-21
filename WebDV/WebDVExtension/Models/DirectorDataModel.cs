using DocsVision.BackOffice.WebClient.Employee;

namespace WebDVExtension.Models {
    
    /// <summary>
    /// Модель данных для получения сотрудника и телефона
    /// </summary>
    public class DirectorDataModel {
        /// <summary>
        /// 
        /// </summary>
        public EmployeeModel Director { get; set; }
        /// <summary>
        /// 
        /// </summary>
        public string Phone { get; set; }
    }
}
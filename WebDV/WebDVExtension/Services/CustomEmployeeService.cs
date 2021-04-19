using DocsVision.BackOffice.ObjectModel;
using DocsVision.Platform.WebClient;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebDVExtension.Models;

namespace WebDVExtension.Services {
    public class CustomEmployeeService : ICustomEmployeeService {
        private readonly IServiceProvider _serviceProvider;
        private readonly Helpers.ServiceHelper _serviceHelper;
        public CustomEmployeeService(IServiceProvider serviceProvider) {
            _serviceProvider = serviceProvider;
            _serviceHelper = new Helpers.ServiceHelper(serviceProvider);
        }

        public CustomEmployeeData GetEmployeeData(SessionContext context, Guid employeeId){
            StaffEmployee employee = context.ObjectContext.GetObject<StaffEmployee>(employeeId);

            if (employee == null) return null;

            CustomEmployeeData model = new CustomEmployeeData();
            //подразделение
            model.UnitName = employee.Unit.Name;
            //должность
            model.Positions = employee.PositionName;
            //руководитель
            StaffEmployee Director = null;

            if (employee.Manager != null) Director = employee.Manager;
            else Director = employee.Unit.Manager;

            if (Director != null) model.Director = _serviceHelper.EmployeeService.GetEmployee(context, Director.GetObjectId());

            return model;
        }
    }
}
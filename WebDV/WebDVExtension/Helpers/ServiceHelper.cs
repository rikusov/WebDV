using DocsVision.Platform.WebClient.Helpers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using WebDVExtension.Services;

namespace WebDVExtension.Helpers {
    public class ServiceHelper : DocsVision.BackOffice.WebClient.Helpers.ServiceHelper {
        public ServiceHelper(IServiceProvider serviceProvider): base(serviceProvider) { }
        public ICustomEmployeeService CustomEmployeeService{
            get { return ServiceUtil.GetService<ICustomEmployeeService>(serviceProvider); }        
        }


    }
}
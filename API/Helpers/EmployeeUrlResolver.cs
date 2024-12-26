using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class EmployeeUrlResolver : IValueResolver<Employee, EmployeeToReturnDto, string>
    {
        private readonly IConfiguration _config;
        
        public EmployeeUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Employee source, EmployeeToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }
            return null;
        }
    }
}
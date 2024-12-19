using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers;

public class MappingProfiles : Profile
{
    public MappingProfiles()
    {
        CreateMap<EmployeeCreateDto, Employee>();
        CreateMap<EmployeeUpdateDto, Employee>();
        CreateMap<Employee, EmployeeToReturnDto>().ForMember(dest => dest.DepartmentName,
            opt => opt.MapFrom(src => src.Department.Name));

        CreateMap<DepartmentCreateDto, Department>();
        CreateMap<DepartmentUpdateDto, Department>();
        CreateMap<Department, DepartmentToReturnDto>();
    }
}
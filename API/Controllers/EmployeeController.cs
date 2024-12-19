using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;
public class EmployeeController : BaseApiController
{
    private readonly IEmployeeRepository _employeeRepo;
    private readonly IGenericRepository<Department> _departmentRepo;
    private readonly IMapper _mapper;

    public EmployeeController(
        IEmployeeRepository employeeRepo,
        IMapper mapper,
        IGenericRepository<Department> departmentRepo)
    {
        _employeeRepo = employeeRepo;
        _mapper = mapper;
        _departmentRepo = departmentRepo;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<EmployeeToReturnDto>>> GetEmployees(string? department)
    {
        var employees = await _employeeRepo.GetAllWithEmployeesAsync(department);

        var employeesToReturn = _mapper.Map<IReadOnlyList<Employee>, IReadOnlyList<EmployeeToReturnDto>>(employees);

        return Ok(employeesToReturn);
    }


    [HttpGet("{id}")]
    public async Task<ActionResult<EmployeeToReturnDto>> GetEmployee(int id)
    {
        var employee = await _employeeRepo.GetByIdWithEmployeeAsync(id);

        if (employee == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return Ok(_mapper.Map<Employee, EmployeeToReturnDto>(employee));
    }

    [HttpPost]
    public async Task<ActionResult<EmployeeToReturnDto>> CreateEmployee(EmployeeCreateDto employeeDto)
    {
        var department = await _departmentRepo.GetByIdAsync(employeeDto.DepartmentId);

        if (department == null)
        {
            return BadRequest(new ApiResponse(400, "Invalid DepartmentId."));
        }

        var employee = _mapper.Map<EmployeeCreateDto, Employee>(employeeDto);
        employee.Department = department;

        _employeeRepo.Add(employee);
        await _employeeRepo.SaveAllAsync();

        var employeeToReturn = _mapper.Map<Employee, EmployeeToReturnDto>(employee);

        return CreatedAtAction(nameof(GetEmployee), new { id = employee.Id }, employeeToReturn);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateEmployee(int id, EmployeeUpdateDto employeeDto)
    {
        var employee = await _employeeRepo.GetByIdWithEmployeeAsync(id);

        if (employee == null)
        {
            return NotFound(new ApiResponse(404));
        }

        _mapper.Map(employeeDto, employee);
        _employeeRepo.Update(employee);

        var result = await _employeeRepo.SaveAllAsync();

        if (result <= 0)
        {
            return BadRequest(new ApiResponse(400, "Problem updating the employee."));
        }

        return Ok(new { message = "Employee eshte perditesuar me sukses!" });
    }

    [HttpGet("departments")]
    public async Task<OkObjectResult> GetDepartmentsAsync()
    {
        return Ok(await _employeeRepo.GetDepartmentsAsync());
        
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteEmployee(int id)
    {
        var employee = await _employeeRepo.GetByIdWithEmployeeAsync(id);

        if (employee == null)
        {
            return NotFound(new ApiResponse(404));
        }

        _employeeRepo.Delete(employee);
        var result = await _employeeRepo.SaveAllAsync();

        if (result <= 0)
        {
            return BadRequest(new ApiResponse(400, "Problem deleting employee."));
        }

        return Ok(new { message = "Employee u fshi me sukses!" });
    }
}
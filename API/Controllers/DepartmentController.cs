using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class DepartmentController : BaseApiController
{
    private readonly IGenericRepository<Department> _departmentRepo;
    private readonly IMapper _mapper;

    public DepartmentController(IGenericRepository<Department> departmentRepo,
        IMapper mapper)
    {
        _departmentRepo = departmentRepo;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IReadOnlyList<DepartmentToReturnDto>>> GetDepartments()
    {
        var departments = await _departmentRepo.ListAllAsync();

        var data = _mapper.Map<IReadOnlyList<Department>, IReadOnlyList<DepartmentToReturnDto>>(departments);

        return Ok(data);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<DepartmentToReturnDto>> GetDepartment(int id)
    {
        var department = await _departmentRepo.GetByIdAsync(id);

        if (department == null)
        {
            return NotFound(new ApiResponse(404));
        }

        return _mapper.Map<Department, DepartmentToReturnDto>(department);
    }

    [HttpPost]
    public async Task<ActionResult<DepartmentToReturnDto>> CreateDepartment(DepartmentCreateDto departmentDto)
    {
        var department = _mapper.Map<DepartmentCreateDto, Department>(departmentDto);

        _departmentRepo.Add(department);
        var result = await _departmentRepo.SaveAllAsync();

        var departmentToReturn = _mapper.Map<Department, DepartmentToReturnDto>(department);

        return CreatedAtAction(nameof(GetDepartment), new { id = department.Id }, departmentToReturn);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult> UpdateDepartment(int id, DepartmentUpdateDto departmentDto)
    {
        var department = await _departmentRepo.GetByIdAsync(id);

        _mapper.Map(departmentDto, department);

        _departmentRepo.Update(department);

        var result = await _departmentRepo.SaveAllAsync();

        return Ok(new { message = "Department eshte perditesuar me sukses!" });
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteDepartment(int id)
    {
        var department = await _departmentRepo.GetByIdAsync(id);

        if (department == null)
        {
            return NotFound(new ApiResponse(404));
        }

        _departmentRepo.Delete(department);
        var result = await _departmentRepo.SaveAllAsync();
        if (result <= 0)
            return BadRequest(new ApiResponse(400, "Problem deleting department"));

        return Ok(new { message = "Department u fshi me sukses!" });
    }
}
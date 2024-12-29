using Core.Entities;

namespace Core.Interfaces;

public interface IEmployeeRepository
{
    Task<Employee?> GetByIdWithEmployeeAsync(int id);
    Task<IReadOnlyList<Employee>> GetAllWithEmployeesAsync(List<string>? department, string? sort, string? search);
    void Add(Employee employee);
    void Update(Employee employee);
    void Delete(Employee employee);
    Task<IReadOnlyList<string>> GetDepartmentsAsync();
    Task<int> SaveAllAsync();
}
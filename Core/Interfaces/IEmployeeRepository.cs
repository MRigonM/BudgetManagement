using Core.Entities;

namespace Core.Interfaces;

public interface IEmployeeRepository
{
    Task<Employee?> GetByIdWithEmployeeAsync(int id);
    Task<IReadOnlyList<Employee>> GetAllWithEmployeesAsync(string? department, string? sort);
    void Add(Employee employee);
    void Update(Employee employee);
    void Delete(Employee employee);
    Task<IReadOnlyList<string>> GetDepartmentsAsync();
    Task<int> SaveAllAsync();
}
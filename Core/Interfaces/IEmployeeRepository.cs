using Core.Entities;

namespace Core.Interfaces;

public interface IEmployeeRepository
{
    Task<Employee?> GetByIdWithEmployeeAsync(int id);
    Task<IReadOnlyList<Employee>> GetAllWithEmployeesAsync();
    void Add(Employee employee);
    void Update(Employee employee);
    void Delete(Employee employee);
    Task<int> SaveAllAsync();
}
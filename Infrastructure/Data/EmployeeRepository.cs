using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly StoreContext _context;

    public EmployeeRepository(StoreContext context)
    {
        _context = context;
    }

    public async Task<Employee?> GetByIdWithEmployeeAsync(int id)
    {
        return await _context.Employees
            .Include(l => l.Department)
            .FirstOrDefaultAsync(l => l.Id == id);
    }

    public async Task<IReadOnlyList<Employee>> GetAllWithEmployeesAsync()
    {
        return await _context.Employees
            .Include(l => l.Department)
            .ToListAsync();
    }

    public void Add(Employee employee)
    {
        _context.Employees.Add(employee);
    }

    public void Update(Employee employee)
    {
        _context.Employees.Attach(employee);
        _context.Entry(employee).State = EntityState.Modified;
    }

    public void Delete(Employee employee)
    {
        _context.Employees.Remove(employee);
    }

    public async Task<int> SaveAllAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
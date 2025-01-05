using Core.Entities;
using Core.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Infrastructure.Data;

public class EmployeeRepository : IEmployeeRepository
{
    private readonly StoreContext _context;
    public string? _search;

    public string Search
    {
        get => _search ?? "";
        set => _search = value.ToLower();
    }

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

    public async Task<IReadOnlyList<Employee>> GetAllWithEmployeesAsync(List<string>? departments, string? sort,
        string? search)
    {
        var query = _context.Employees.AsQueryable();

        if (departments != null && departments.Any())
        {
            query = query.Where(x => departments.Contains(x.Department.Name));
        }

        if (!string.IsNullOrWhiteSpace(search))
        {
            var normalizedSearch = search.ToLower();
            var searchParts = normalizedSearch.Split(' ', StringSplitOptions.RemoveEmptyEntries);

            if (searchParts.Length == 1)
            {
                query = query.Where(x =>
                    x.Name.ToLower().Contains(normalizedSearch) ||
                    x.Surname.ToLower().Contains(normalizedSearch));
            }
            else if (searchParts.Length > 1)
            {
                var firstName = searchParts[0];
                var lastName = searchParts[1];
                query = query.Where(x =>
                    (x.Name.ToLower().Contains(firstName) && x.Surname.ToLower().Contains(lastName)) ||
                    (x.Name.ToLower().Contains(lastName) && x.Surname.ToLower().Contains(firstName)));
            }
        }

        query = sort switch
        {
            "salaryAsc" => query.OrderBy(x => x.Salary),
            "salaryDesc" => query.OrderByDescending(x => x.Salary),
            _ => query.OrderBy(x => x.Name)
        };

        return await query.Include(x => x.Department).ToListAsync();
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

    public async Task<IReadOnlyList<string>> GetDepartmentsAsync()
    {
        return await _context.Departments.Select(x => x.Name)
            .Distinct()
            .ToListAsync();
    }

    public async Task<int> SaveAllAsync()
    {
        return await _context.SaveChangesAsync();
    }
}
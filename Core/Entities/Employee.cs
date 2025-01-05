namespace Core.Entities;

public class Employee : BaseEntity
{
    public required String Name { get; set; }
    public required String Surname { get; set; }
    public required String Role { get; set; }
    public required String Email { get; set; }
    public required decimal Salary { get; set; }
    public required String PictureUrl { get; set; }
    public int DepartmentId { get; set; }
    public Department Department { get; set; }
}
namespace API.Dtos;

public class EmployeeToReturnDto
{
    public int Id { get; set; }
    public String Name { get; set; }
    public String Surname { get; set; }
    public String Email { get; set; }
    public decimal Salary { get; set; }
    public String PictureUrl { get; set; }
    public String DepartmentName { get; set; }
}
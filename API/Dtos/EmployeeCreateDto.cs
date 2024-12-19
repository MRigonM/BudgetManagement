﻿namespace API.Dtos;

public class EmployeeCreateDto
{
    public String Name { get; set; }
    public String Surname { get; set; }
    public String Email { get; set; }
    public decimal Salary { get; set; }
    public String DepartmentName { get; set; }
    public int DepartmentId { get; set; }
}
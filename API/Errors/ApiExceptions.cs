namespace API.Errors;

public class ApiExceptions(int statusCode ,string message,String? detail)
{
    public int StatusCode { get; set; } = statusCode;

    public string Message { get; set; } = message;

    public string? Details { get; set; } = detail;
}

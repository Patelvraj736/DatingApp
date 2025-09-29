using System;

namespace API.DTOs;

public class UserDto
{
    public required string Email { get; set; }

    public required string Id { get; set; }

    public required string DisplayName { get; set; }

    public string? ImagrUrl { get; set; } 

    public required string Token { get; set;  }
}

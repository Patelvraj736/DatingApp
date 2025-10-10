using System;
using System.Runtime.InteropServices.JavaScript;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BuggyController : BaseApiController
{
    [HttpGet("auth")] //401
    public IActionResult GetAuth()
    {
        return Unauthorized();
    }

    [HttpGet("not-found")] //404
    public IActionResult GetNotFound()
    {
        return NotFound();
    }

    [HttpGet("server-error")] //500
    public IActionResult GetServerError()
    {
        throw new Exception("This is server error");
    }

    [HttpGet("bad-request")] //400
    public IActionResult GetBadRequest()
    {
        return BadRequest();
    }

}

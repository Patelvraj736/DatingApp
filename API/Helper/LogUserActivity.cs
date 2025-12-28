
using API.Data;
using API.Extensions;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.EntityFrameworkCore;


namespace API.Helper;

public class LogUserActivity : IAsyncActionFilter
{
    public async Task OnActionExecutionAsync(ActionExecutingContext context, ActionExecutionDelegate next)
    {
        var resultContext = await next();

        if(context.HttpContext.User.Identity?.IsAuthenticated == false) return;
        var memberId = context.HttpContext.User.GetMemberId();
        var dbContext = resultContext.HttpContext.RequestServices.GetRequiredService<AppDbContext>();

     await dbContext.Members
            .Where(m => m.Id == memberId)
            .ExecuteUpdateAsync(m => m.SetProperty(u => u.LastActive, DateTime.UtcNow));
    }
}

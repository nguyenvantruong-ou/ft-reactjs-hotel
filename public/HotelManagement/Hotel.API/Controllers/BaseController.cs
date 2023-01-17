using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Hotel.Domain;

namespace Hotel.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseController : Controller
    {
    }
}

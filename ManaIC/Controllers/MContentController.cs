using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace ManaIC.Controllers
{
    public class MContentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
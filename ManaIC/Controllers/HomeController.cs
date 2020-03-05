using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using ManaIC.Models;
using ManaIC.Repositories.Contracts;

namespace ManaIC.Controllers
{
    public class HomeController : Controller
    {
        private readonly IDataDac<BookList> booklistDac;

        public HomeController(IDataDac<BookList> booklistDac) {
            this.booklistDac = booklistDac;
        }
        public async Task<IActionResult> Index()
        {
            var response = await booklistDac.Gets(it => !it.DeleteDate.HasValue);
            return View(response);
        }

        public IActionResult About()
        {
            ViewData["Message"] = "Your application description page.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Privacy()
        {
            return View();
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}

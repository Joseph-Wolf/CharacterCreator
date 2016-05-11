using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using CharacterCreator.Models;

namespace CharacterCreator.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            var hello = new List<Character>();
            hello.Add(new Character());

            ViewBag.CharacterTableModel = hello;
            return View();
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

        public IActionResult Error()
        {
            return View();
        }
    }
}

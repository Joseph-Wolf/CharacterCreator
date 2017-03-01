using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using CharacterCreator.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;

// For more information on enabling MVC for empty projects, visit http://go.microsoft.com/fwlink/?LinkID=397860

namespace CharacterCreator.Controllers
{
    public class StyleController : Controller
    {
        private string CustomCSSPath { get; set; }
        public StyleController (IHostingEnvironment env)
        {
            CustomCSSPath = Path.Combine(env.WebRootPath, "css", "custom");
        }
        public IActionResult Index()
        {
            return RedirectToAction(controllerName: "Home", actionName: "Index");
        }

        [HttpPost]
        public IActionResult AddRule([FromBody]StyleRuleList list)
        {
            if(list != null)
            {
                var FileContents = GetCustomStyleContents();
                list.AddRules(FileContents);
            }
            SetCustomStyleContents(list);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult SetRule([FromBody]StyleRuleList list)
        {
            SetCustomStyleContents(list);
            return RedirectToAction("Index");
        }

        private string GetCustomStylePath()
        {
            string FileName;
            if (User == null || User.Identity == null || string.IsNullOrEmpty(User.Identity.Name)) //use default.css if no user name is available (anonymous)
            {
                FileName = "Default.css";
            }
            else //use the username to generate a file if a user name is available
            {
                FileName = string.Format("{0}.css", User.Identity.Name);
            }
            return Path.Combine(CustomCSSPath, FileName);
        }

        private string GetCustomStyleContents()
        {
            var file = new FileInfo(GetCustomStylePath());
            if (file.Exists) //Make sure file exists
            {
                return System.IO.File.ReadAllText(file.FullName); //return file contents
            }
            return string.Empty; //return empty string if the file does not exist
        }

        private void SetCustomStyleContents(StyleRuleList rules)
        {
            var contents = string.Empty;
            if(rules != null)
            {
                contents = rules.ToString();
            }
            var file = new FileInfo(GetCustomStylePath());
            file.Directory.Create(); //Create directory if it does not exist
            //Limit file size?
            System.IO.File.WriteAllText(file.FullName, contents); //this will create the file if it does not exist
        }
    }
}

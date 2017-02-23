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
            var FileContents = GetCustomStyleContents();
            list.AddRules(FileContents);
            SetCustomStyleContents(list);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult RemoveRule()
        {

            return RedirectToAction("Index");
        }

        private string GetCustomStylePath()
        {
            string FileName;
            if (string.IsNullOrEmpty(User.Identity.Name)) //use default.css if no user name is available (anonymous)
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
            var FilePath = GetCustomStylePath();
            //TODO: get file contents
            //Remove comments
            //Remove empty lines
            //Remove spaces
            return @".hello{world:duh;}";
        }

        private void SetCustomStyleContents(StyleRuleList rules)
        {
            //Create the file if it does not exist
            var FilePath = GetCustomStylePath();
            var contents = rules.ToString();
            //TODO: set file contents
            //Limit file size
        }
    }
}

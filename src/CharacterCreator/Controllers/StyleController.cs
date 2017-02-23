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
        public IActionResult AddRule([FromBody]StyleRuleList List)
        {
            var FilePath = GetFilePath();
            List.MergeRulesFromFile(FilePath);
            SaveRules(FilePath, List);
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult RemoveRule()
        {

            return RedirectToAction("Index");
        }
        private string GetFilePath()
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

        private void SaveRules(string path, StyleRuleList rules)
        {
            //Create the file if it does not exist
            if (!System.IO.File.Exists(path))
            {
                //Create directory if it does not exist
                if (!Directory.Exists(CustomCSSPath))
                {
                    Directory.CreateDirectory(CustomCSSPath);
                }
                System.IO.File.Create(path);
            }
            var contents = rules.ToString();
            //Limit file size
        }
    }
}

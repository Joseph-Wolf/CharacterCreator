using System;
using System.Linq;
using CharacterCreator.Models;
using CharacterCreator.Services;
using System.IO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;
using Microsoft.AspNetCore.Hosting;
using System.Collections;
using System.Collections.Generic;

namespace CharacterCreator.Controllers
{
    public class HomeController : Controller
    {
        private StorageContext DB { get; set; }
        private string CustomCSSPath { get; set; }

        public HomeController(StorageContext storageContext, IHostingEnvironment env)
        {
            DB = storageContext;
            CustomCSSPath = Path.Combine(env.WebRootPath, "css", "custom");
        }

        public IActionResult Index(int id = default(int))
        {
            var output = new IndexViewModel()
            {
                CharacterList = DB.Characters
            };
            if(output.CharacterList.Any(x => x.Id == id))
            {
                output.ActiveCharacter = DB.Characters.Where(x => x.Id == id).Include(x => x.Gallery).Include(x => x.Inventory).Single();
            }
            else if (output.CharacterList.Any())
            {
                output.ActiveCharacter = DB.Characters.Take(1).Include(x => x.Gallery).Include(x => x.Inventory).ToList().Single();
            }
            else
            {
                return RedirectToAction(actionName: "Create");
            }
            
            return View(output);
        }

        public IActionResult Create()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Character newCharacter)
        {
            DB.Characters.Add(newCharacter);
            DB.SaveChanges();
            return RedirectToAction(actionName: "Index");
        }

        [HttpGet]
        public IActionResult Delete(int id)
        {
            DB.Characters.Remove(DB.Characters.Where(x => x.Id == id).Single());
            DB.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult UploadGalleryImage(int id, IFormFile file, string imageName)
        {
            //TODO: add image name to object
            if(DB.Characters.Any(x => x.Id == id))
            {
                using (var stream = file.OpenReadStream())
                {
                    DB.Characters.Where(x => x.Id == id).Include(x => x.Gallery).Single().Gallery.Add(new GalleryImage(stream));
                }
                DB.SaveChanges();
            }
            return RedirectToAction("Index",new { id = id });
        }

        [HttpPost]
        public IActionResult AddCSSRule([FromBody]IDictionary<string,IDictionary<string,string>> cssRules)
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
            var FullPath = Path.Combine(CustomCSSPath, FileName);
            //Create the file if it does not exist
            if (!System.IO.File.Exists(FullPath))
            {
                //Create directory if it does not exist
                if (!Directory.Exists(CustomCSSPath))
                {
                    Directory.CreateDirectory(CustomCSSPath);
                }
                System.IO.File.Create(FullPath);
            }
            foreach(var element in cssRules)
            {
                var selector = element.Key;
                foreach(var style in element.Value)
                {
                    var property = style.Key;
                    var value = style.Value;
                }
            }
            //Limit file size
            //If file exists
            //Load file for user
            //If ID already exists parse it
            //If property already exists replace it
            return RedirectToAction("Index");
        }
    }
}

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

        public HomeController(StorageContext storageContext)
        {
            DB = storageContext;
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
    }
}

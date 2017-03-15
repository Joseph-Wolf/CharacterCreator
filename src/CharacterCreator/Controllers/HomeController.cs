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
using System.Text.RegularExpressions;

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
            if (output.CharacterList.Any(x => x.Id == id))
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
            return View(new Character());
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Create(Character newCharacter)
        {
            if (newCharacter != null)
            {
                DB.Characters.Add(newCharacter);
                DB.SaveChanges();
                return RedirectToAction(actionName: "Index", routeValues: new { id = newCharacter.Id });
            }
            return RedirectToAction(actionName: "Create");
        }

        [HttpPost]
        public IActionResult Delete(int id)
        {
            if (DB.Characters.Where(x => x.Id == id).Any())
            {
                DB.Characters.Remove(DB.Characters.Where(x => x.Id == id).Single());
                DB.SaveChanges();
            }
            return RedirectToAction("Index");
        }

        [HttpPost]
        public IActionResult UploadGalleryImage(int id, IFormFile file)
        {
            if (
                 DB.Characters.Any(x => x.Id == id) //Make sure the character exists
                && file != null //Make sure the file is not null
                && Regex.IsMatch(Path.GetExtension(file.FileName), @"\.jpg|\.gif|\.png|\.jpeg", RegexOptions.IgnoreCase) //Make sure file is an image
                )
            {
                var character = DB.Characters.Where(x => x.Id == id).Include(x => x.Gallery).Single();
                character.Gallery.Add(new GalleryImage(file.OpenReadStream()));
                DB.SaveChanges();
                var addedImage = character.Gallery.Last();
                return Json(new { Message = file.FileName, Src = addedImage.Src, IsProfile = addedImage.IsProfile });
            }
            return Json(new { Message = "Error in adding file" });
            }
    }
}

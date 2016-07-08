using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using CharacterCreator.Models;
using Microsoft.Data.Entity;
using CharacterCreator.Services;
using Microsoft.AspNet.Http;
using System.IO;

namespace CharacterCreator.Controllers
{
    public class HomeController : Controller
    {
        private StorageContext db;
        public Character ActiveCharacter;

        public HomeController(StorageContext storageContext)
        {
            db = storageContext;
        }

        public IActionResult Index(Guid id = default(Guid))
        {
            var output = new IndexViewModel();
            output.CharacterList = db.Characters;
            if(output.CharacterList.Any(x => x.Id == id))
            {
                output.ActiveCharacter = db.Characters.Where(x => x.Id == id).Include(x => x.Gallery).Include(x => x.Inventory).Single();
            }
            else if (output.CharacterList.Any())
            {
                output.ActiveCharacter = db.Characters.Take(1).Include(x => x.Gallery).Include(x => x.Inventory).ToList().Single();
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
            db.Characters.Add(newCharacter);
            db.SaveChanges();
            return RedirectToAction(actionName: "Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Guid id)
        {
            db.Characters.Remove(db.Characters.Where(x => x.Id == id).Single());
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult UploadGalleryImage(Guid id, IFormFile file)
        {
            if(db.Characters.Any(x => x.Id == id))
            {
                using (var stream = file.OpenReadStream())
                {
                    db.Characters.Where(x => x.Id == id).Include(x => x.Gallery).Single().Gallery.Add(new GalleryImage(stream));
                }
                db.SaveChanges();
            }
            return RedirectToAction("Index",new { id = id });
        }
    }
}

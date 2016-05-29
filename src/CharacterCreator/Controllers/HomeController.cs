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
        public HomeController(StorageContext storageContext)
        {
            db = storageContext;
        }

        public IActionResult Index(Guid id = default(Guid))
        {
            //Pass data for the character table
            ViewBag.CharacterTableModel = db.Characters;

            //Pass data for the currently active character
            Character ActiveCharacter;
            if(id == default(Guid))
            { //if no character is selected
                if(db.Characters.Count() > 0)
                { //If a character exists select first one
                    return RedirectToAction (actionName: "Index", routeValues: new { id = db.Characters.First().Id });
                }
                else
                { //If no character exists select a blank one
                    ActiveCharacter = new Character();
                }
            }
            else
            { //If character id is specified get it fom the database
                ActiveCharacter = db.Characters.Where(x => x.Id == id).Single(); //Include(x => x.Inventory).Single();
            }
            
            return View(ActiveCharacter);
        }

        public IActionResult Create()
        {
            return View();
        }
        public IActionResult Image(Guid id)
        {
            return File(db.Image.Where(x => x.Id == id).Single().Bytes, "image/gif");
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
        public IActionResult UploadGalleryImage(Guid id, IFormFile file)
        {
            using (var stream = file.OpenReadStream())
            {
                var tmpImage = new Image().FromStream(stream);
                var ImageId = db.Image.Add(tmpImage).Entity.Id;
                db.Characters.Where(x => x.Id == id).Single().Gallery.Add(ImageId);
            }
                
            db.SaveChanges();
            return new EmptyResult();
        }
        
        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Guid id)
        {
            db.Characters.Remove(db.Characters.Where(x => x.Id == id).Single());
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNet.Mvc;
using CharacterCreator.Models;
using Microsoft.Data.Entity;
using CharacterCreator.Services;

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
                    ActiveCharacter = db.Characters.First();
                }
                else
                { //If no character exists select a blank one
                    ActiveCharacter = new Character();
                }
            }
            else
            { //If character id is specified get it fom the database
                ActiveCharacter = db.Characters.Where(x => x.id == id).Single();
            }
            
            return View(ActiveCharacter);
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

        public IActionResult Error()
        {
            return View();
        }
    }
}

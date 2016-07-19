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
using System.Net;
using Microsoft.Extensions.WebEncoders;
using Microsoft.Extensions.OptionsModel;
using Microsoft.Extensions.PlatformAbstractions;

namespace CharacterCreator.Controllers
{
    public class HomeController : Controller
    {
        private StorageContext DB;
        private readonly string DefaultUserDefinedCSSFileName;

        public HomeController(StorageContext storageContext, IOptions<CCOptions> options)
        {
            DB = storageContext;
            DefaultUserDefinedCSSFileName = options.Value.DefaultUserDefinedCSSFileName;
        }

        public IActionResult Index(Guid id = default(Guid))
        {
            var output = new IndexViewModel();
            output.CharacterList = DB.Characters;
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

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult Delete(Guid id)
        {
            DB.Characters.Remove(DB.Characters.Where(x => x.Id == id).Single());
            DB.SaveChanges();
            return RedirectToAction("Index");
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public IActionResult UploadGalleryImage(Guid id, IFormFile file, string imageName)
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
        [ValidateAntiForgeryToken]
        public IActionResult SaveUI(Guid id, string css, bool applyToAll = true)
        {
            //Path to the css directory
            String FilePath = Path.Combine("css");

            //Pick a file
            if (applyToAll)
            {
                FilePath = Path.Combine(FilePath, DefaultUserDefinedCSSFileName);
            } else if (DB.Characters.Where(x => x.Id == id).Any())
            {
                FilePath = Path.Combine(FilePath, "user", id.ToString());
            }
            //Make sure it is a CSS
            FilePath = Path.ChangeExtension(FilePath, "css");

            using (FileStream fs = new FileStream(path: FilePath, mode: FileMode.OpenOrCreate | FileMode.Append))
            {
                using (StreamWriter writer = new StreamWriter(fs))
                {
                    writer.Write((new HtmlEncoder()).HtmlEncode(css));
                }
            }

            return Json("Success");
        }
    }
}

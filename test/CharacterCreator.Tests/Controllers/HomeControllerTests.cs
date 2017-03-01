using CharacterCreator.Controllers;
using CharacterCreator.Models;
using CharacterCreator.Services;
using CharacterCreator.Tests.Services;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Xunit;

namespace CharacterCreator.Tests.Controllers
{
    public class HomeControllerTests
    {
        private StorageContext DB { get; set; }
        private HomeController Controller { get; set; }
        public HomeControllerTests()
        {
            DB = new StorageContextMock().DB;
            Controller = new HomeController(DB);
        }
        [Fact]
        public void IndexTest()
        {
            IndexViewModel ViewModel;

            //Test without characters redirects to Create
            Assert.False(DB.Characters.Any());
            var RedirectActionName = (Controller.Index() as RedirectToActionResult).ActionName;
            Assert.Equal(@"Create", RedirectActionName);

            //Add some characters
            DB.Characters.Add(new Character()
            {
                Name = "hello"
            });
            DB.Characters.Add(new Character()
            {
                Name = "hi"
            });
            DB.SaveChanges();

            //Test without Id specified
            Assert.True(DB.Characters.Any());
            ViewModel = (Controller.Index() as ViewResult).Model as IndexViewModel;
            Assert.Equal(DB.Characters.First(), ViewModel.ActiveCharacter);
            Assert.Equal(DB.Characters.Count(), ViewModel.CharacterList.Count());

            //Test with Id specified
            ViewModel = (Controller.Index(DB.Characters.Skip(1).First().Id) as ViewResult).Model as IndexViewModel;
            Assert.Equal(DB.Characters.Skip(1).First(), ViewModel.ActiveCharacter);
            Assert.Equal(DB.Characters.Count(), ViewModel.CharacterList.Count());

            //Cleanup
            ClearCharacters();
        }
        [Fact]
        public void CreateTest()
        {
            RedirectToActionResult RedirectResult;
            //Test returning view to create a new character
            var View = Controller.Create() as ViewResult;
            Assert.IsType<Character>(View.Model);

            //Create a character
            var Character = new Character()
            {
                Name = "hi"
            };

            //Test submitting a character
            Assert.False(DB.Characters.Any());
            RedirectResult =  Controller.Create(Character) as RedirectToActionResult;
            Assert.True(DB.Characters.Where(x => x.Name == Character.Name).Any());
            //Make sure it redirects to that characters index
            Assert.Equal(@"Index", RedirectResult.ActionName);
            Assert.Equal(DB.Characters.Where(x => x.Name == Character.Name).Single().Id, RedirectResult.RouteValues["Id"]);

            //Test submitting null
            RedirectResult = Controller.Create(null) as RedirectToActionResult;
            Assert.Equal(@"Create", RedirectResult.ActionName);

            //Cleanup
            ClearCharacters();
        }
        [Fact]
        public void DeleteTest()
        {
            var Character = new Character();
            DB.Characters.Add(Character);
            DB.Characters.Add(new Character());
            DB.SaveChanges();

            var CharacterCount = DB.Characters.Count();

            //Test deleting nonexistant
            Controller.Delete(int.MaxValue);
            Assert.True(DB.Characters.Where(x => x.Id == Character.Id).Any());

            //Test deleting existant
            Controller.Delete(Character.Id);
            Assert.False(DB.Characters.Where(x => x.Id == Character.Id).Any());
            Assert.Equal(CharacterCount - 1, DB.Characters.Count()); //Make sure only one was removed

            //Cleanup
            ClearCharacters();
        }
        [Fact]
        public void UploadGalleryImageTest()
        {
            //TODO: Implement
            Assert.False(true);

            //Cleanup
            ClearCharacters();
        }
        private void ClearCharacters()
        {
            DB.Characters.RemoveRange(DB.Characters);
            DB.SaveChanges();
        }
    }
}

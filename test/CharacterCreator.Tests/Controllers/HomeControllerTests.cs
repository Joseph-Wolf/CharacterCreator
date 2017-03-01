using CharacterCreator.Controllers;
using CharacterCreator.Models;
using CharacterCreator.Services;
using CharacterCreator.Tests.Services;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Linq;
using Xunit;

namespace CharacterCreator.Tests.Controllers
{
    public class HomeControllerTests : IDisposable
    {
        private StorageContext DB { get; set; }
        private HomeController Controller { get; set; }
        public HomeControllerTests()
        {
            DB = new StorageContextMock().DB;
            Controller = new HomeController(DB);
        }
        public void Dispose()
        {
            //Cleanup
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
        }
        [Fact]
        public void CreateTest()
        {
            //TODO: Implement
            Assert.False(true);
        }
        [Fact]
        public void DeleteTest()
        {
            //TODO: Implement
            Assert.False(true);
        }
        [Fact]
        public void UploadGalleryImageTest()
        {
            //TODO: Implement
            Assert.False(true);
        }
    }
}

using CharacterCreator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace CharacterCreator.Tests.Models
{
    public class CharacterTests
    {
        private Character TestCharacter { get; set; }
        [Fact]
        public void CharacterTest()
        {
            //Test creating a basic character
            TestCharacter = new Character();
            Assert.NotNull(TestCharacter);

            //Test creating a basic character with values
            TestCharacter = new Character()
            {
                Name = "hello",
                Gender = "anything",
                Race = "race",
                Summary = "Summary"
            };
            Assert.Equal(@"hello", TestCharacter.Name);
            Assert.Equal(@"anything", TestCharacter.Gender);
            Assert.Equal(@"race", TestCharacter.Race);
            Assert.Equal(@"Summary", TestCharacter.Summary);
        }
        [Fact]
        public void ProfileImageTest()
        {
            var ImageOne = new GalleryImage()
            {
                Id = 1
            };
            var ImageTwo = new GalleryImage()
            {
                Id = 2
            };
            var ImageThree = new GalleryImage()
            {
                Id = 3
            };
            //Test null by default
            TestCharacter = new Character();
            Assert.Null(TestCharacter.ProfileImage);

            //Add images
            TestCharacter.Gallery.Add(ImageOne);
            TestCharacter.Gallery.Add(ImageTwo);
            TestCharacter.Gallery.Add(ImageThree);

            //Test getting first image
            Assert.Equal(ImageOne, TestCharacter.ProfileImage);

            //Test setting image
            TestCharacter.ProfileImage = ImageTwo;
            Assert.Equal(ImageTwo, TestCharacter.ProfileImage);
        }
        [Fact]
        public void GalleryTest()
        {
            //Test Not Null on Creation
            TestCharacter = new Character();
            Assert.NotNull(TestCharacter.Gallery);
        }
        [Fact]
        public void InventoryTest()
        {
            //Test Not Null on Creation
            TestCharacter = new Character();
            Assert.NotNull(TestCharacter.Inventory);
        }
    }
}

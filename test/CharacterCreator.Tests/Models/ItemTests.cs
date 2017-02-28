using CharacterCreator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace CharacterCreator.Tests.Models
{
    public class ItemTests
    {
        [Fact]
        public void InventoryItemTests()
        {
            //Test that you can create Images
            var TestInventoryItem = new InventoryItem()
            {
                Description = "hello",
                Name = "world"
            };
            Assert.Equal(@"hello", TestInventoryItem.Description);
            Assert.Equal(@"world", TestInventoryItem.Name);
            Assert.NotNull(TestInventoryItem.Images);
        }
    }
}

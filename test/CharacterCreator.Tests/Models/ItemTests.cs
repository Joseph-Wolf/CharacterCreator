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
        private Item TestItem { get; set; }
        [Fact]
        public void CreateTests()
        {
            //Test that you can create Images
            TestItem = new Item()
            {
                Description = "hello",
                Name = "world"
            };
            Assert.Equal(@"hello", TestItem.Description);
            Assert.Equal(@"world", TestItem.Name);

            //TODO: Test Inventory Image
            TestItem = new InventoryItem();
            Assert.NotNull((TestItem as InventoryItem).Images);
        }
    }
}

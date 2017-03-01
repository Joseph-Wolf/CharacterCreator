using CharacterCreator.Services;
using Microsoft.EntityFrameworkCore;

namespace CharacterCreator.Tests.Services
{
    public class StorageContextMock
    {
        public StorageContext DB { get; set; }
        public StorageContextMock()
        {
            DB = new StorageContext(new DbContextOptionsBuilder<StorageContext>()
                .UseInMemoryDatabase()
                .Options);
        }
    }
}

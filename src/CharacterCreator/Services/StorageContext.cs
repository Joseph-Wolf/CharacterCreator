using CharacterCreator.Models;
using Microsoft.Data.Entity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;



namespace CharacterCreator.Services
{
    public class StorageContext : DbContext
    {
        public DbSet<Character> Characters { get; set; }
    }
}

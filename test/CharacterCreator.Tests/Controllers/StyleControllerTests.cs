using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System;
using Xunit;
using CharacterCreator.Controllers;
using CharacterCreator.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using System.Reflection;

namespace CharacterCreator.Tests.Controllers
{
    public class StyleControllerTests : IDisposable
    {
        private DirectoryInfo WorkingDirectory { get; set; }
        private IHostingEnvironment MockEnvironment { get; set; }
        private StyleController Controller { get; set; }
        public StyleControllerTests()
        {
            WorkingDirectory = new DirectoryInfo(Path.Combine(Path.GetTempPath(), Guid.NewGuid().ToString()));
            MockEnvironment = new HostingEnvironment()
            {
                ContentRootPath = WorkingDirectory.FullName,
                WebRootPath = Path.Combine(WorkingDirectory.FullName, "wwwroot")
            };
            Controller = new StyleController(MockEnvironment);
            Directory.CreateDirectory(MockEnvironment.ContentRootPath);
            Directory.CreateDirectory(MockEnvironment.WebRootPath);
        }
        public void Dispose()
        {
            WorkingDirectory.Delete(recursive: true);
        }
        [Fact]
        public void AddRuleTest()
        {
            var DefaultFile = new FileInfo(Path.Combine(MockEnvironment.WebRootPath, "css", "custom", "default.css"));
            var RuleOne = new StyleRule()
            {
                Selector = ".hello",
                Styles = new List<Style>()
                {
                    new Style()
                    {
                        Property = "world",
                        Value = "blah"
                    }
                }
            };
            var RuleTwo = new StyleRule()
            {
                Selector = ".hello",
                Styles = new List<Style>()
                {
                    new Style()
                    {
                        Property = "apple",
                        Value = "sauce"
                    }
                }
            };

            StyleRuleList RuleList = new StyleRuleList();
            //Test file created with default
            Controller.AddRule(RuleList);
            Assert.True(DefaultFile.Exists);
            Assert.Equal(string.Empty, File.ReadAllText(DefaultFile.FullName));

            //Test file rules added
            RuleList.AddRule(RuleOne);
            Controller.AddRule(RuleList);
            Assert.Equal(@".hello{world:blah;}", File.ReadAllText(DefaultFile.FullName));

            //Test file rules appended
            RuleList.AddRule(RuleTwo);
            Controller.AddRule(RuleList);
            var content = File.ReadAllText(DefaultFile.FullName);
            Assert.Equal(@".hello{world:blah;apple:sauce;}", content);

            //TODO: Test file created with user name

            //TODO: Test different files for diferent users
        }
    }
}

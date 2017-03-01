using System;
using System.Collections.Generic;
using Xunit;
using CharacterCreator.Controllers;
using CharacterCreator.Models;
using System.IO;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Hosting.Internal;
using System.Security.Claims;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;

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
        public void IndexTest()
        {
            var Result = Controller.Index();

            //Test that it is of type Redirect
            var CastResult = Result as RedirectToActionResult;
            Assert.NotNull(CastResult);

            //Test redirected to Home
            Assert.Equal(@"Home", CastResult.ControllerName);
            Assert.Equal(@"Index", CastResult.ActionName);
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

            //Test file created with user name
            var UserOneSpecificFile = new FileInfo(Path.Combine(MockEnvironment.WebRootPath, "css", "custom", string.Format("{0}.css", MockAUser())));
            Controller.AddRule(RuleList);
            Assert.True(UserOneSpecificFile.Exists);

            //Test different files for diferent users
            var UserTwoSpecificFile = new FileInfo(Path.Combine(MockEnvironment.WebRootPath, "css", "custom", string.Format("{0}.css", MockAUser())));
            Controller.AddRule(RuleList);
            Assert.True(UserTwoSpecificFile.Exists);

            //Test that files for two different users are not the same
            Assert.NotEqual(UserOneSpecificFile.FullName, UserTwoSpecificFile.FullName);
        }
        [Fact]
        public void SetRuleTest()
        {
            var DefaultFile = new FileInfo(Path.Combine(MockEnvironment.WebRootPath, "css", "custom", "default.css"));
            var RuleList = new StyleRuleList(@".hello{world:blah;}");
            var RuleListTwo = new StyleRuleList(@".hi{apple:pie;}");

            //Test setting rule list
            Controller.SetRule(RuleList);
            Assert.Equal(@".hello{world:blah;}", File.ReadAllText(DefaultFile.FullName));

            //Test overwriting rule list
            Controller.SetRule(RuleListTwo);
            Assert.Equal(@".hi{apple:pie;}", File.ReadAllText(DefaultFile.FullName));

            //Mock a user
            var UserSpecificFile = new FileInfo(Path.Combine(MockEnvironment.WebRootPath, "css", "custom", string.Format("{0}.css", MockAUser())));

            //Test setting rules for a user
            Controller.SetRule(RuleList);
            Assert.Equal(@".hello{world:blah;}", File.ReadAllText(UserSpecificFile.FullName));

            //Test overwriting rules for a user
            Controller.SetRule(RuleListTwo);
            Assert.Equal(@".hi{apple:pie;}", File.ReadAllText(UserSpecificFile.FullName));
        }
        private string MockAUser()
        {
            var userIdentifier = Guid.NewGuid().ToString();
            var user = new ClaimsPrincipal(new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Name, userIdentifier)
            }));
            Controller.ControllerContext = new ControllerContext()
            {
                HttpContext = new DefaultHttpContext()
                {
                    User = user
                }
            };
            return userIdentifier;
        }
    }
}

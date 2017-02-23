using CharacterCreator.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Xunit;

namespace CharacterCreator.Tests.Models
{
    public class StyleRuleListTests
    {
        private StyleRuleList TestingList { get; set; }
        [Fact]
        public void ToStringTest()
        {
            TestingList = new StyleRuleList();
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
            var RuleTwoA = new StyleRule()
            {
                Selector = "#rule-two",
                Styles = new List<Style>()
                {
                    new Style()
                    {
                        Property = "apple",
                        Value = "sauce"
                    }
                }
            };
            var RuleTwoStyleB = new Style()
            {
                Property = "pecan",
                Value = "pie"
            };

            //Test one rule
            TestingList.AddRule(RuleOne);
            Assert.Equal(@".hello{world:blah;}", TestingList.ToString());

            //Test two rules
            TestingList.AddRule(RuleTwoA);
            Assert.Equal(@".hello{world:blah;}#rule-two{apple:sauce;}", TestingList.ToString());

            //Test merging rules
            TestingList.Rules.Where(x => x.Selector == "#rule-two").Single().AddStyle(RuleTwoStyleB);
            Assert.Equal(@".hello{world:blah;}#rule-two{apple:sauce;pecan:pie;}", TestingList.ToString());

            //Test nested rules
            TestingList.Rules.Where(x => x.Selector == "#rule-two").Single().NestedRules.AddRule(RuleOne);
            Assert.Equal(@".hello{world:blah;}#rule-two{apple:sauce;pecan:pie;.hello{world:blah;}}", TestingList.ToString());
        }
        [Fact]
        public void MergeRulesFromFileTest()
        {
            //The input string must look like this with comments and all white space removed
            TestingList = new StyleRuleList(@".hello{world:blah;}#rule-two{apple:sauce;pecan:pie;.hello{world:blah;}}");

            //Test that rules exists
            Assert.True(TestingList.Rules.Where(x => x.Selector == ".hello").Any());
            Assert.True(TestingList.Rules.Where(x => x.Selector == "#rule-two").Any());

            //var ruleOne = TestingList.Rules.Where(x => x.Selector == ".hello").Single();
            //var ruleTwo = TestingList.Rules.Where(x => x.Selector == "#rule-two").Single();

            ////Test that nested rules exist
            //Assert.True(ruleTwo.NestedRules.Any());

            //var nestedRule = ruleTwo.NestedRules.First();

            ////Test that properties are correct
            //Assert.Equal("blah", ruleOne.Styles.Where(x => x.Property == "world").Single().Value);
            //Assert.Equal("sauce", ruleTwo.Styles.Where(x => x.Property == "apple").Single().Value);
            //Assert.Equal("pie", ruleTwo.Styles.Where(x => x.Property == "pecan").Single().Value);
            //Assert.Equal("blah", nestedRule.Styles.Where(x => x.Property == "world").Single().Value);
        }
    }
}

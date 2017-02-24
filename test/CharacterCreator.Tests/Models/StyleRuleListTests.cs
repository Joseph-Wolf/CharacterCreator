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
            var ChainedRule = new StyleRule()
            {
                Selector = ".hello,#rule-two",
                Styles = new List<Style>()
                {
                    new Style()
                    {
                        Property = "dummy",
                        Value = "var"
                    }
                }
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

            //Test chained rules
            TestingList.AddRule(ChainedRule);
            Assert.Equal(@".hello{world:blah;}#rule-two{apple:sauce;pecan:pie;.hello{world:blah;}}.hello,#rule-two{dummy:var;}", TestingList.ToString());
        }
        [Fact]
        public void FromStringTest()
        {
            //The input string must look like this with comments and all white space removed
            TestingList = new StyleRuleList(@"
/*
what
do you
want?*/
.hello {
    world:blah;
}
#rule-two {
apple:sauce;
pecan:pie;
    .hello {
    world:blah;
    }
}");

            //Test that rules exists
            Assert.True(TestingList.Rules.Where(x => x.Selector == ".hello").Any());
            Assert.True(TestingList.Rules.Where(x => x.Selector == "#rule-two").Any());

            var ruleOne = TestingList.Rules.Where(x => x.Selector == ".hello").Single();
            var ruleTwo = TestingList.Rules.Where(x => x.Selector == "#rule-two").Single();

            //Test that nested rules exist
            Assert.True(ruleTwo.NestedRules.Rules.Any());

            var nestedRule = ruleTwo.NestedRules.Rules.First();

            //Test that properties are correct
            Assert.Equal("blah", ruleOne.Styles.Where(x => x.Property == "world").Single().Value);
            Assert.Equal("sauce", ruleTwo.Styles.Where(x => x.Property == "apple").Single().Value);
            Assert.Equal("pie", ruleTwo.Styles.Where(x => x.Property == "pecan").Single().Value);
            Assert.Equal("blah", nestedRule.Styles.Where(x => x.Property == "world").Single().Value);
        }
        [Fact]
        public void AddRuleTest()
        {
            var TestStyleRule = new StyleRule()
            {
                Selector = ".hello",
                Styles = new List<Style>()
                {
                    new Style()
                    {
                        Property = "differentWorld",
                        Value = "newblah"
                    },
                    new Style()
                    {
                        Property = "world",
                        Value = "newblah"
                    }
                }
            };
            var InitialStyleRuleList = new StyleRuleList()
            {
                Rules = new List<StyleRule>()
                {
                    new StyleRule()
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
                    }
                }
            };

            //Append the list to itself as a nested rule
            TestStyleRule.NestedRules.AddRule(TestStyleRule);
            InitialStyleRuleList.Rules.First().NestedRules.AddRules(InitialStyleRuleList);

            //Initialize a StyleRuleList
            TestingList = InitialStyleRuleList;

            //Add the test rules
            TestingList.AddRule(TestStyleRule);

            var GeneratedRuleStyle = TestingList.Rules.Single();
            var GeneratedNestedRuleStyle = GeneratedRuleStyle.NestedRules.Rules.Single();

            //Test adding same selector different property
            Assert.Equal(@"newblah", GeneratedRuleStyle.Styles.Where(x => x.Property == "differentWorld").Single().Value);

            //Test adding same selector same property
            Assert.Equal(@"newblah", GeneratedRuleStyle.Styles.Where(x => x.Property == "world").Single().Value);

            //Test adding same nested selector different property
            Assert.Equal(@"newblah", GeneratedNestedRuleStyle.Styles.Where(x => x.Property == "differentWorld").Single().Value);

            //Test adding same nested selector same property
            Assert.Equal(@"newblah", GeneratedNestedRuleStyle.Styles.Where(x => x.Property == "world").Single().Value);
        }
    }
}

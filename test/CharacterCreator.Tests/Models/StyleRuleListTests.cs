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
                selector = ".hello",
                property = "world",
                value = "blah"
            };
            var RuleTwoA = new StyleRule()
            {
                selector = "#rule-two",
                property = "apple",
                value = "sauce"
            };
            var RuleTwoB = new StyleRule()
            {
                selector = "#rule-two",
                property = "pecan",
                value = "pie"
            };
            
            //Test one rule
            TestingList.Rules = TestingList.Rules.Append(RuleOne);
            Assert.Equal(@".hello{world:blah;}", TestingList.ToString());
      
            //Test two rules
            TestingList.Rules = TestingList.Rules.Append(RuleTwoA);
            Assert.Equal(@".hello{world:blah;}#rule-two{apple:sauce;}", TestingList.ToString());

            //Test merging rules
            TestingList.Rules = TestingList.Rules.Append(RuleTwoB);
            Assert.Equal(@".hello{world:blah;}#rule-two{apple:sauce;pecan:pie;}", TestingList.ToString());
        }

    }
}

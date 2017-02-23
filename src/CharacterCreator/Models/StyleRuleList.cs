using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public class StyleRuleList
    {
        public IEnumerable<StyleRule> Rules { get; set; } = new List<StyleRule>();
        public override string ToString()
        {
            StringBuilder Output = new StringBuilder();
            foreach(var group in Rules.GroupBy(x => x.selector, x => new { x.property, x.value }))
            {
                Output.Append(string.Format("{0}{{", group.Key)); //Print the selector and start of the bracket
                foreach(var style in group)
                {
                    Output.Append(string.Format("{0}:{1};", style.property, style.value)); //Add in all of the values each ending with a semicolon
                }
                Output.Append("}"); //Close off the style bracket
            }
            return Output.ToString();
        }
        public void MergeRulesFromFile(string path)
        {
            IEnumerable<StyleRule> RulesFromFile = new List<StyleRule>();
            //Take existing styles over the ones obtained from the path.
        }
    }
    public class StyleRule
    {
        public string selector { get; set; }
        public string property { get; set; }
        public string value { get; set; }
    }
}

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace CharacterCreator.Models
{
    public class StyleRuleList
    {
        public IEnumerable<StyleRule> Rules { get; set; } = new List<StyleRule>();
        public StyleRuleList() { }
        public StyleRuleList(string ruleList)
        {
            var openChar = '{';
            var closeChar = '}';
            var text = ruleList;
            if (text.IndexOf(openChar) != -1) //sanity check to make sure at least one bracket exists in the string
            {
                var startIndex = 0; //Start with the first character
                var nestedLevel = 0; //Keeps track of the current nexted level
                for (var endIndex = text.IndexOf(openChar); endIndex < text.Length; endIndex++)
                {
                    var character = text[endIndex];
                    if (character == openChar) //Moved down one level
                    {
                        nestedLevel = nestedLevel + 1;
                    }
                    else if (character == closeChar) //Moved up one level
                    {
                        nestedLevel = nestedLevel - 1;
                        if (nestedLevel == 0) //Completed a nested element
                        {
                            var length = endIndex - startIndex; //Number of characters to include in the substring
                            length = length + 1; //include the closeChar
                            AddRule(new StyleRule(text.Substring(startIndex: startIndex, length: length)));
                            startIndex = endIndex + 1; //Set the start index to the end of the one just parsed and begin again
                            endIndex = text.IndexOf(openChar, startIndex); //Set the next end index to the next cursor
                            if (endIndex == -1) //if no new openChar was found then break
                            {
                                break;
                            }
                            endIndex = endIndex - 1; //Subtract one because it will be incremented at the end of the for loop
                        }
                    }
                }
            }
        }
        public override string ToString()
        {
            StringBuilder Output = new StringBuilder();
            foreach (var group in Rules)
            {
                Output.Append(group.ToString());
            }
            return Output.ToString();
        }
        public void AddRule(StyleRule rule)
        {
            Rules = Rules.Append(rule);
        }
        public void AddRules(IEnumerable<StyleRule> list)
        {
            AddRules(new StyleRuleList()
            {
                Rules = list
            });
        }
        public void AddRules(StyleRuleList list)
        {
            foreach (var rule in list.Rules)
            {
                AddRule(rule);
            }
        }
        public void AddRules(string rules)
        {
            AddRules(new StyleRuleList(rules));
        }
    }
    public class StyleRule
    {
        public string Selector { get; set; }
        public IEnumerable<Style> Styles { get; set; } = new List<Style>();
        public StyleRuleList NestedRules { get; set; } = new StyleRuleList();
        public StyleRule() { }
        public StyleRule(string rule)
        {
            Selector = rule.Substring(0, rule.IndexOf('{')); //parse selector

            var styleTerminator = ';';
            var openChar = '{';
            var closeChar = '}';
            var startIndex = 0; //Start with the first character
            var nestedLevel = 0; //Keeps track of the current nexted level
            var text = rule;
            text = text.Substring(Selector.Length); //remove the selector
            text = text.Substring(1); //remove the first openChar
            text = text.Substring(0, text.Length - 1); //remove the last closeChar
            for (var endIndex = 0; endIndex < text.Length; endIndex++)
            {
                var character = text[endIndex];
                if (character == openChar) //Moved down one level
                {
                    nestedLevel = nestedLevel + 1;
                }
                else if (character == closeChar) //Moved up one level
                {
                    nestedLevel = nestedLevel - 1;
                    if (nestedLevel == 0) //Completed a nested element
                    {
                        var length = endIndex - startIndex; //Number of characters to include in the substring
                        length = length + 1; //include the closeChar
                        NestedRules.AddRule(new StyleRule(text.Substring(startIndex: startIndex, length: length)));
                        startIndex = endIndex + 1; //Set the start index to the end of the one just parsed and begin again
                    }
                } else if (character == styleTerminator && nestedLevel == 0)
                {
                    var length = endIndex - startIndex; //Number of characters to include in the substring
                    length = length + 1; //include the closeChar
                    AddStyle(new Style(text.Substring(startIndex: startIndex, length: length)));
                    startIndex = endIndex + 1; //Set the start index to the end of the one just parsed and begin again
                }
            }
            //Find each "property:value;" pair and pass to Style constructor and append to styles
            //Find each "string{string}" and pass to StyleRule constructor and append to nested rules
        }

        public override string ToString()
        {
            StringBuilder Output = new StringBuilder();
            Output.Append(string.Format("{0}{{", Selector));
            foreach (var style in Styles)
            {
                Output.Append(style.ToString());
            }
            foreach (var nestedRule in NestedRules.Rules)
            { //Append any nested elements
                Output.Append(nestedRule.ToString());
            }
            Output.Append("}");
            return Output.ToString();
        }
        public void AddStyle(Style style)
        {
            Styles = Styles.Append(style);
        }
    }
    public class Style
    {
        public string Property { get; set; }
        public string Value { get; set; }
        public Style() { }
        public Style(string style)
        {
            //TODO: Parse string
            //parse property
            //parse value
        }
        public override string ToString()
        {
            return string.Format("{0}:{1};", Property, Value);
        }
    }
}

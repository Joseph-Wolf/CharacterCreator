﻿using System;
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
            var text = CleanString(ruleList);
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
        private string CleanString(string text)
        {
            var CommentExpression = @"[/][*].*?[*][/]"; //Remove comments
            var NewLineOrWhiteSpaceExpression = @"[\s]+"; //Remove Newlines and white space
            var ReplacementRegex = new Regex(string.Join("|", CommentExpression, NewLineOrWhiteSpaceExpression), RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.Multiline);
            return ReplacementRegex.Replace(text, string.Empty);
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
            var text = CleanString(rule);
            Selector = text.Substring(0, text.IndexOf('{')); //parse selector

            var styleTerminator = ';';
            var openChar = '{';
            var closeChar = '}';
            var startIndex = 0; //Start with the first character
            var nestedLevel = 0; //Keeps track of the current nexted level
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
                        try
                        {
                            NestedRules.AddRule(new StyleRule(text.Substring(startIndex: startIndex, length: length)));
                        }
                        catch
                        {
                            throw;
                        }
                        startIndex = endIndex + 1; //Set the start index to the end of the one just parsed and begin again
                    }
                } else if (character == styleTerminator && nestedLevel == 0)
                {
                    var length = endIndex - startIndex; //Number of characters to include in the substring
                    length = length + 1; //include the closeChar
                    try
                    {
                        AddStyle(new Style(text.Substring(startIndex: startIndex, length: length)));
                    }
                    catch
                    {
                        throw;
                    }
                    startIndex = endIndex + 1; //Set the start index to the end of the one just parsed and begin again
                }
            }
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
        private string CleanString(string text)
        {
            var CommentExpression = @"[/][*].*?[*][/]"; //Remove comments
            var NewLineOrWhiteSpaceExpression = @"[\s]+"; //Remove Newlines and white space
            var ReplacementRegex = new Regex(string.Join("|", CommentExpression, NewLineOrWhiteSpaceExpression), RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.Multiline);
            return ReplacementRegex.Replace(text, string.Empty);
        }
    }
    public class Style
    {
        public string Property { get; set; }
        public string Value { get; set; }
        public Style() { }
        public Style(string style)
        {
            var terminatorChar = ';';
            var dividerChar = ':';
            var text = CleanString(style);
            if(text.IndexOf(terminatorChar) == -1)
            {
                throw new Exception(message: string.Format("The parsed style '{0}' is missing a semicolon", text));
            }
            if(text.IndexOf(dividerChar) == -1)
            {
                throw new Exception(message: string.Format("The parsed style '{0}' is missing a colon", text));
            }
            text = text.TrimEnd(terminatorChar); //remove the semicolon
            var values = text.Split(dividerChar); //Split on the divider
            Property = values[0];
            Value = values[1];
        }
        public override string ToString()
        {
            return string.Format("{0}:{1};", Property, Value);
        }
        private string CleanString(string text)
        {
            var CommentExpression = @"[/][*].*?[*][/]"; //Remove comments
            var NewLineOrWhiteSpaceExpression = @"[\s]+"; //Remove Newlines and white space
            var ReplacementRegex = new Regex(string.Join("|", CommentExpression, NewLineOrWhiteSpaceExpression), RegexOptions.IgnoreCase | RegexOptions.Singleline | RegexOptions.Multiline);
            return ReplacementRegex.Replace(text, string.Empty);
        }
    }
}

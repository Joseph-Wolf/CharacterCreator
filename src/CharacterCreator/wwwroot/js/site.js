//#region Style
var Style = function (property, value) {
    /// <summary>Style object used to construct Style rules</summary>
    /// <param name="property" type="string">Style property name</param>
    /// <param name="value" type="string">Style property value</param>
    "use strict";
    this.Property = property;
    this.Value = value;
    return this;
};
//#endregion Style

//#region Rule
var Rule = function (element) {
    /// <summary>Rule object used to submit Style rules</summary>
    /// <param name="element" type="string">The element which the rule will be for</param>
    "use strict";
    this.Selector = "#" + $(element).prop("id");
    this.Styles = [];
    return this;
};
Rule.prototype.addStyle = function (style) {
    /// <summary>Add a style to an existing rule set</summary>
    /// <param name="style" type="string">The style object to add</param>
    "use strict";
    this.Styles.push(style);
};
//#endregion Rule

//#region RuleList
var RuleList = function () {
    /// <summary>RuleList object that contains an array of Rules</summary>
    "use strict";
    this.Rules = [];
    return this;
};
RuleList.prototype.addRule = function (rule) { //Adds a rule to the array
    /// <summary>Adds a rule to an existing RuleList</summary>
    /// <param name="rule" type="string">Rule object to add</param>
    "use strict";
    this.Rules.push(rule);
};
RuleList.prototype.submit = function () {
    /// <summary>Posts the Style Rules to the controller</summary>
    "use strict";
    $.ajax({
        url: "/Style/AddRule",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify(this.Rules)
    });
};
RuleList.prototype.clear = function () {
    /// <summary>Clears all previous Style Rules</summary>
    "use strict";
    this.Rules = [];
};
//#endregion RuleList

//#region Tabs
var Tabs = function (selector) {
    /// <summary>Tabs object used to manage the main page tabs</summary>
    /// <param name="selector" type="string">jQuery selector to get the tabs</param>
    "use strict";
    this.activeTabId = "active-tab";
    this.tabs = $(selector);
    return this;
};
Tabs.prototype.saveSelectedIndex = function (event, ui) {
    /// <summary>Save a selected tabs index to localStorage</summary>
    /// <param name="event" type="string">Tab selected event(not used)</param>
    /// <param name="ui" type="string">The selected Tab</param>
    "use strict";
    localStorage[this.activeTabId] = ui.newTab.index();
};
Tabs.prototype.getSavedIndex = function () {
    /// <summary>Returns the last selected tab index from localStorage</summary>
    /// <returns type="Number">Index of the last selected tab</returns>
    "use strict";
    return parseInt(localStorage[this.activeTabId]) || 0;
};
Tabs.prototype.create = function () {
    /// <summary>Registers the tabs as jQuery tabs</summary>
    "use strict";
    $(this.tabs).tabs({
        activate: this.saveSelectedIndex,
        active: this.getSavedIndex()
    });
};
//#endregion Tabs

//#region Resizables
var Resizables = function (selector) {
    /// <summary>Resizable object to controll panel resizing features</summary>
    /// <param name="selector" type="string">jQuery selector to get resizable panels</param>
    "use strict";
    this.elements = $(selector);
    return this;
};
Resizables.prototype.getDimensions = function () {
    /// <summary>Gets the dimensions for the Resizable panels</summary>
    /// <returns type="RuleList">Returns all of the Resizable panel dimensions</returns>
    "use strict";
    var ruleList = new RuleList();
    $(this.elements).each(function gatherCSSRules(index, element) { //submit all of the positions
        var width = $(element).css("width");
        var height = $(element).css("height");
        var rule = new Rule(element);
        rule.addStyle(new Style("width", width));
        rule.addStyle(new Style("maxWidth", width));
        rule.addStyle(new Style("height", height));
        rule.addStyle(new Style("maxHeight", height));
        ruleList.addRule(rule);
    });
    return ruleList;
};
Resizables.prototype.destroy = function () {
    /// <summary>Disables the resizable panels</summary>
    "use strict";
    this.elements.resizable("destroy");
};
Resizables.prototype.create = function () {
    /// <summary>Enables the resizable panels</summary>
    "use strict";
    this.elements.resizable();
};
//#endregion Resizables

//#region Hotkeys
var Hotkeys = function (resizables) {
    /// <summary>Hotkey object to control hotkey functionality</summary>
    /// <param name="resizables" type="string">A Resizable object to be used to for EditMode</param>
    "use strict";
    this.editMode = false;
    this.editModeKey = 69;
    this.leftArrowKey = 37;
    this.rightArrowKey = 39;
    this.upArrowKey = 38;
    this.downArrowKey = 40;
    this.resizables = resizables;
    this.ruleList = new RuleList();
    return this;
};
Hotkeys.prototype.isEditModeEnabled = function () {
    /// <summary>Checks to see if the EditMode is enabled</summary>
    /// <returns type="Boolean">Returns true if enabled and false if disabled</returns>
    "use strict";
    return this.editMode;
};
Hotkeys.prototype.toggleEditMode = function () {
    /// <summary>Toggles EditMode ON or OFF</summary>
    "use strict";
    this.editMode = !this.editMode;
};
Hotkeys.prototype.editKeyPressed = function () {
    /// <summary>Enables or Disables features related to EditMode</summary>
    "use strict";
    this.toggleEditMode();
    if (this.isEditModeEnabled()) {
        this.resizables.create(); //Apply resizable to panels
    } else {
        this.ruleList.clear();
        this.resizables.appendResizableDimensions(this.ruleList);
        this.ruleList.submit();
        this.resizables.destroy();
    }
};
Hotkeys.prototype.leftArrowKeyPressed = function () {
    /// <summary>Switches to the next tab</summary>
    "use strict";
    console.log("leftArrow");
};
Hotkeys.prototype.rightArrowKeyPressed = function () {
    /// <summary>Switches to a previous tab</summary>
    "use strict";
    console.log("rightArrow");
};
Hotkeys.prototype.upArrowKeyPressed = function () {
    /// <summary>Switches to the previous character</summary>
    "use strict";
    console.log("upArrow");
};
Hotkeys.prototype.downArrowKeyPressed = function () {
    /// <summary>Switches to the next character</summary>
    "use strict";
    console.log("downArrow");
};
Hotkeys.prototype.keyPressed = function (event) {
    /// <summary>Handles and sorts all hotkey pressed events</summary>
    /// <param name="event" type="KeyEvent">The key event to extract details from</param>
    "use strict";
    //TODO: reset css to default?
    if (event.ctrlKey || event.metaKey) { //make sure the ctrl or meta key is pressed
        switch (event.keyCode) {
            case this.editModeKey:
                this.editKeyPressed();
                break;
            case this.leftArrowKey:
                this.leftArrowKeyPressed();
                break;
            case this.rightArrowKey:
                this.rightArrowKeyPressed();
                break;
            case this.upArrowKey:
                this.upArrowKeyPressed();
                break;
            case this.downArrowKey:
                this.downArrowKeyPressed();
                break;
            default: //do nothing if it is not a registered command
        }
    }
};
//#endregion Hotkeys

//#region Gallery
var Gallery = function (iconSelector, centerSelector) {
    /// <summary>Gallery object</summary>
    /// <param name="iconSelector" type="string">jQuery selector to get gallery icons</param>
    /// <param name="centerSelector" type="string">jQuery selector to get gallery center display</param>
    "use strict";
    this.icons = $(iconSelector);
    this.center = $(centerSelector);
    return this;
};
Gallery.prototype.displayAsCenter = function (element) {
    /// <summary>Places the clicked icon in the center display</summary>
    /// <param name="element" type="object">Clicked img element</param>
    "use strict";
    $(this.center).attr("src", $(element).attr("src"));
};
//#endregion Gallery

$(function () {
    "use strict";
    var tabs = new Tabs(".jq-tabs");
    var resizables = new Resizables(".jQResizable");
    var hotkeys = new Hotkeys(resizables);
    var gallery = new Gallery(".gallery-icon", ".gallery-center-image");

    tabs.create();
    gallery.icons.click(gallery.center);
    $(document).keyup(hotkeys.keyPressed);
});
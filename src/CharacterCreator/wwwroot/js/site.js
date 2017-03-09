function CharacterCreator() {
    "use strict";
    var app = this;
    this.getUniqueSelectorFromElement = function (element) {
        /// <summary>A function to return a unique identifier for a given element</summary>
        /// <param name="element" type="object">Element to generate a jQuery selector for</param>
        if (!element) {
            return element;
        }
        var selector = "";
        if ($(element).prop("id")) { //If Id exists then use it
            selector = selector + "#" + $(element).prop("id");
        }
        if ($(element).attr("class")) { //If classes exists then append them
            //Append first . then replace all the spaces indicating another class with dots
            //Trim first to avoid spaces at the start or end
            selector = selector + "." + $(element).attr("class").trim().replace(/\s+/g, ".");
        }

        if (!selector) { //If no Id or classes then generate from nesting
            //get parent
            //if no parent then you are SOL?
            //call this method on parent so it will iterate
            //When method returns append a child selector
            var parent = $(element).parent();
            var tagname = $(element).prop("tagName").toLowerCase();
            var elementIndex = $(element).index();
            if (parent.length !== 0) { //dead end
                var parentSelector = app.getUniqueSelectorFromElement(parent);
                selector = parentSelector + " " + tagname + ":nth-child(" + elementIndex + ")";
            } else { //returns the root element
                selector = ":root";
            }
        }
        return selector;
    };
    //#region Style
    this.Style = function (property, value) {
        /// <summary>Style object used to construct Style rules</summary>
        /// <param name="property" type="string">Style property name</param>
        /// <param name="value" type="string">Style property value</param>
        this.Property = property;
        this.Value = value;
        return this;
    };
    //#endregion Style
    //#region Rule
    this.Rule = function (selector) {
        /// <summary>Rule object used to submit Style rules</summary>
        /// <param name="selector" type="string">jQuery selector to use</param>
        this.Selector = selector;
        if (!this.Selector) { //Default selector to empty string
            this.Selector = "";
        }
        this.Styles = [];
        return this;
    };
    this.Rule.prototype.addStyle = function (style) {
        /// <summary>Add a style to an existing rule set</summary>
        /// <param name="style" type="string">The style object to add</param>
        if (!style || !(style instanceof app.Style)) { //Make sure style is not invalid
            return;
        }
        this.Styles.push(style);
    };
    //#endregion Rule
    //#region RuleList
    this.RuleList = function (rules) {
        /// <summary>RuleList object that contains an array of Rules</summary>
        /// <param name="rules" type="object">Object looking like {Selector1{Property1:Value1,Property2:Value2},Selector2{Property3:Value3}}</param>
        this.Rules = [];
        if (!rules) {
            return this;
        }
        var ruleList = this;
        $.each(rules, function (selector, styles) {
            var rule = new app.Rule(selector);
            $.each(styles, function (property, value) {
                rule.addStyle(new app.Style(property, value));
            });
            ruleList.addRule(rule);
        });
        return this;
    };
    this.RuleList.prototype.addRule = function (rule) { //Adds a rule to the array
        /// <summary>Adds a rule to an existing RuleList</summary>
        /// <param name="rule" type="string">Rule object to add</param>
        if (!rule || !(rule instanceof app.Rule)) { //Make sure style is not invalid
            return;
        }
        this.Rules.push(rule);
    };
    this.RuleList.prototype.submit = function () {
        /// <summary>Posts the Style Rules to the controller</summary>
        $.ajax({
            url: "/Style/AddRule",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(this.Rules)
        });
    };
    this.RuleList.prototype.clear = function () {
        /// <summary>Clears all previous Style Rules</summary>
        this.Rules = [];
    };
    //#endregion RuleList
    //#region Tabs
    this.Tabs = function (selector, storage) {
        /// <summary>Tabs object used to manage the main page tabs</summary>
        /// <param name="selector" type="string">jQuery selector to get the tabs</param>
        /// <param name="storage" type="object">Stores the tabs session state</param>
        var activeTabId = "active-tab";
        this.container = $(selector);
        if (!storage) { //Don't register methods if storage is not specified
            $(this.container).tabs();
            return this;
        }
        $(this.container).tabs({ //Create the jQuery tab objects
            activate: function saveSelectedIndex(ignore, ui) { //Save tab index to localStorage
                storage[activeTabId] = ui.newTab.index();
            },
            active: parseInt(storage[activeTabId]) || 0 //Pull tab index from localStorage and default to 0
        });
        return this;
    };
    this.Tabs.prototype.selectNext = function () {
        /// <summary>Displays the next tab</summary>
        var nextIndex = this.getSelectedIndex() + 1;
        var containerLength = this.getTabsLength() - 1; //Make it 0 indexed
        if (nextIndex > containerLength) {
            nextIndex = 0;
        }
        $(this.container).tabs("option", "active", nextIndex);
    };
    this.Tabs.prototype.selectPrevious = function () {
        /// <summary>Displays the previous tab</summary>
        var previousIndex = this.getSelectedIndex() - 1;
        if (previousIndex < 0) {
            previousIndex = this.getTabsLength() - 1; //Make it 0 indexed
        }
        $(this.container).tabs("option", "active", previousIndex);
    };
    this.Tabs.prototype.getSelectedIndex = function () {
        /// <summary>Returns the currently selected index</summary>
        return $(this.container).tabs("option", "active");
    };
    this.Tabs.prototype.getTabsLength = function () {
        /// <summary>Returns the maximum index possible</summary>
        return $(this.container).find("ul > li").size();
    };
    //#endregion Tabs
    //#region Characters
    this.CharactersTable = function (selector) {
        /// <summary>Character object to manipulate character objects</summary>
        /// <param name="selector" type="string">jQuery selector for the character table</param>
        this.table = $(selector);
        this.characters = $(this.table).find("tr");
        return this;
    };
    this.CharactersTable.prototype.nextCharacter = function () {
        /// <summary>Displays the next character</summary>
    };
    this.CharactersTable.prototype.previousCharacter = function () {
        /// <summary>Displays the previous character</summary>
    };
    //#endregion Characters
    //#region Resizables
    this.Resizables = function (selector) {
        /// <summary>Resizable object to controll panel resizing features</summary>
        /// <param name="selector" type="string">jQuery selector to get resizable panels</param>
        this.elements = $(selector);
        return this;
    };
    this.Resizables.prototype.getDimensions = function () {
        /// <summary>Gets the dimensions for the Resizable panels</summary>
        /// <returns type="object">Returns all of the Resizable panel dimensions {Selector:{Property:Value}}</returns>
        var rules = {};
        $(this.elements).each(function gatherCSSRules(ignore, element) { //submit all of the positions
            var width = $(element).css("width");
            var height = $(element).css("height");
            rules[app.getUniqueSelectorFromElement(element)] = {
                width: width,
                maxWidth: width,
                height: height,
                maxHeight: height
            };
        });
        return rules;
    };
    this.Resizables.prototype.destroy = function () {
        /// <summary>Disables the resizable panels</summary>
        this.elements.resizable("destroy");
    };
    this.Resizables.prototype.create = function () {
        /// <summary>Enables the resizable panels</summary>
        this.elements.resizable();
    };
    //#endregion Resizables
    //#region Hotkeys
    this.Hotkeys = function (resizables, tabs, charactersTable) {
        /// <summary>Hotkey object to control hotkey functionality</summary>
        /// <param name="resizables" type="string">A Resizable object to be used to for EditMode</param>
        this.editMode = false;
        this.editModeKey = 69;
        this.leftArrowKey = 37;
        this.rightArrowKey = 39;
        this.upArrowKey = 38;
        this.downArrowKey = 40;
        this.resizables = resizables;
        this.tabs = tabs;
        this.charactersTable = charactersTable;
        return this;
    };
    this.Hotkeys.prototype.isEditModeEnabled = function () {
        /// <summary>Checks to see if the EditMode is enabled</summary>
        /// <returns type="Boolean">Returns true if enabled and false if disabled</returns>
        return this.editMode;
    };
    this.Hotkeys.prototype.toggleEditMode = function () {
        /// <summary>Toggles EditMode ON or OFF</summary>
        this.editMode = !this.editMode;
    };
    this.Hotkeys.prototype.editKeyPressed = function () {
        /// <summary>Enables or Disables features related to EditMode</summary>
        this.toggleEditMode();
        if (this.isEditModeEnabled()) {
            this.resizables.create(); //Apply resizable to panels
        } else {
            var dimensions = this.resizables.getDimensions();
            new app.RuleList(dimensions).submit();
            this.resizables.destroy();
        }
    };
    this.Hotkeys.prototype.leftArrowKeyPressed = function () {
        /// <summary>Switches to the next tab</summary>
        this.tabs.selectNext();
    };
    this.Hotkeys.prototype.rightArrowKeyPressed = function () {
        /// <summary>Switches to a previous tab</summary>
        this.tabs.selectPrevious();
    };
    this.Hotkeys.prototype.upArrowKeyPressed = function () {
        /// <summary>Switches to the previous character</summary>
        this.charactersTable.selectPrevious();
    };
    this.Hotkeys.prototype.downArrowKeyPressed = function () {
        /// <summary>Switches to the next character</summary>
        this.charactersTable.selectNext();
    };
    this.Hotkeys.prototype.keyPressed = function (event) {
        /// <summary>Handles and sorts all hotkey pressed events</summary>
        /// <param name="event" type="KeyEvent">The key event to extract details from</param>
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
    this.Gallery = function (iconSelector, centerSelector) {
        /// <summary>Gallery object</summary>
        /// <param name="iconSelector" type="string">jQuery selector to get gallery icons</param>
        /// <param name="centerSelector" type="string">jQuery selector to get gallery center display</param>
        this.icons = $(iconSelector).filter("img").filter("[src]"); //Filter out non img elements and img elements with no source
        this.center = $(centerSelector);
        return this;
    };
    this.Gallery.prototype.displayAsCenter = function (element) {
        /// <summary>Places the clicked icon in the center display</summary>
        /// <param name="element" type="object">Clicked img element</param>
        $(this.center).attr("src", $(element).attr("src"));
    };
    //#endregion Gallery
}

$(function () { //Run on document.ready
    "use strict";
    //Create instance of character creator
    var app = {};
    CharacterCreator.call(app);

    var tabs = new app.Tabs(".jq-tabs", localStorage);
    var resizables = new app.Resizables(".jQResizable");
    var charactersTable = new app.CharactersTable("todo");
    var hotkeys = new app.Hotkeys(resizables, tabs, charactersTable);
    var gallery = new app.Gallery(".gallery-icon", ".gallery-center-image");

    gallery.icons.click(gallery.center);
    $(document).keyup(hotkeys.keyPressed);
});
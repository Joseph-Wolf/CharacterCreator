function CharacterCreator($, localStorage, location) {
    /// <summary></summary>
    /// <param name="$" type="object">jQuery library</param>
    /// <param name="localStorage" type="object">Object that persists page refreshes (window.localStorage)</param>
    /// <param name="location" type="object">Object that can redirect the browser (window.location)</param>
    /// <param name="Dropzone" type="object">Dropzone library</param>
    "use strict";
    var app = this;
    this.getUniqueSelectorFromElement = function (element, exclude) {
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
            var classes = $(element).attr("class").trim();
            if (exclude) { //Remove any classess that start with the exclude string
                var replaceExpression = new RegExp("\\b" + exclude + "[\\S]*", "g");
                classes = classes.replace(replaceExpression, "").trim();
            }
            selector = selector + "." + classes.replace(/\s+/g, ".");
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
        var rules = {
            "Rules": this.Rules
        };
        $.ajax({
            url: "/Style/AddRule",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(rules)
        });
    };
    this.RuleList.prototype.clear = function () {
        /// <summary>Clears all previous Style Rules</summary>
        this.Rules = [];
    };
    //#endregion RuleList
    //#region Tabs
    this.Tabs = function (selector) {
        /// <summary>Tabs object used to manage the main page tabs</summary>
        /// <param name="selector" type="string">jQuery selector to get the tabs</param>
        var activeTabId = "active-tab";
        this.container = $(selector);
        if (!localStorage) { //Don't register methods if storage is not specified
            $(this.container).tabs();
            return this;
        }
        $(this.container).tabs({ //Create the jQuery tab objects
            activate: function saveSelectedIndex(ignore, ui) { //Save tab index to localStorage
                localStorage[activeTabId] = ui.newTab.index();
            },
            active: parseInt(localStorage[activeTabId]) || 0 //Pull tab index from localStorage and default to 0
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
        var index = $(this.container).tabs("option", "active");
        if ($.isNumeric(index)) { //make sure the returned value is numeric and return 0 if not
            return index;
        }
        return 0;
    };
    this.Tabs.prototype.getTabsLength = function () {
        /// <summary>Returns the maximum index possible</summary>
        return $(this.container).find("ul > li").size();
    };
    //#endregion Tabs
    //#region Characters
    this.CharactersTable = function (selector, activeCharacterSelector) {
        /// <summary>Character object to manipulate character objects</summary>
        /// <param name="selector" type="string">jQuery selector for the character table</param>
        /// <param name="activeCharacterSelector" type="string">jQuery selector for the active character row</param>
        this.characterRows = $(selector.trim() + " tbody > tr");
        this.activeRow = 0;

        if (activeCharacterSelector) { //If this selector is specified then add functionality
            var activeIndex = $(activeCharacterSelector.trim()).index();
            if (activeIndex > 0) {
                this.activeRow = activeIndex;
            }
        }

        if (location) { //If window.location is specified add functionality
            var characterstable = this;
            $(this.characterRows).dblclick(function characterRowDoubleClicked() {
                characterstable.activeRow = $(this).index();
                location.href = $(this).data("request-url"); //Change the character
            });
        }
        return this;
    };
    this.CharactersTable.prototype.selectNext = function () {
        /// <summary>Displays the next character</summary>
        if (this.characterRows.length > 0) {
            this.activeRow = this.activeRow + 1;
            if (this.activeRow > this.characterRows.length - 1) { //Wrap around
                this.activeRow = 0;
            }
        }
        $(this.characterRows[this.activeRow]).dblclick();
    };
    this.CharactersTable.prototype.selectPrevious = function () {
        /// <summary>Displays the previous character</summary>
        if (this.characterRows.length > 0) {
            this.activeRow = this.activeRow - 1;
            if (this.activeRow < 0) { //Wrap around
                this.activeRow = this.characterRows.length - 1;
            }
        }
        $(this.characterRows[this.activeRow]).dblclick();
    };
    //#endregion Characters
    //#region Resizables
    this.Resizables = function (selector) {
        /// <summary>Resizable object to controll panel resizing features</summary>
        /// <param name="selector" type="string">jQuery selector to get resizable panels</param>
        this.elements = $(selector);
        $(this.elements).resizable({
            disabled: true,
            autoHide: true
        });
        return this;
    };
    this.Resizables.prototype.getDimensions = function () {
        /// <summary>Gets the dimensions for the Resizable panels</summary>
        /// <returns type="object">Returns all of the Resizable panel dimensions {Selector:{Property:Value}}</returns>
        var rules = {};
        $(this.elements).each(function gatherCSSRules(ignore, element) { //submit all of the positions
            var width = $(element).css("width");
            var height = $(element).css("height");
            rules[app.getUniqueSelectorFromElement(element, "ui-resizable")] = {
                width: width,
                height: height
            };
        });
        return rules;
    };
    this.Resizables.prototype.destroy = function () {
        /// <summary>Disables the resizable panels</summary>
        $(this.elements).resizable("disable");
    };
    this.Resizables.prototype.create = function () {
        /// <summary>Enables the resizable panels</summary>
        $(this.elements).resizable("enable");
    };
    this.Resizables.prototype.isCreated = function () {
        /// <summary>Determines if the resizables are enabled</summary>
        /// <return type="boolean">True is enabled else False</return>
        return !$(this.elements).resizable("option", "disabled");
    };
    //#endregion Resizables
    //#region Hotkeys
    this.Hotkeys = function (resizables, tabs, charactersTable) {
        /// <summary>Hotkey object to control hotkey functionality</summary>
        /// <param name="resizables" type="object">A Resizable object to be used to for EditMode</param>
        /// <param name="tabs" type="object">A Tabs object to be used for left/right ArrowKeys</param>
        /// <param name="charactersTable" type="object">A CharactersTable object to be used for the up/down ArrowKeys</param>
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
            if (this.resizables !== undefined && this.resizables !== null) {
                this.resizables.create(); //Apply resizable to panels
            }
        } else {
            if (this.resizables !== undefined && this.resizables !== null) {
                this.resizables.destroy();
                var dimensions = this.resizables.getDimensions();
                new app.RuleList(dimensions).submit();
            }
        }
    };
    this.Hotkeys.prototype.leftArrowKeyPressed = function () {
        /// <summary>Switches to a previous tab</summary>
        if (this.tabs !== undefined && this.tabs !== null) {
            this.tabs.selectPrevious();
        }
    };
    this.Hotkeys.prototype.rightArrowKeyPressed = function () {
        /// <summary>Switches to the next tab</summary>
        if (this.tabs !== undefined && this.tabs !== null) {
            this.tabs.selectNext();
        }
    };
    this.Hotkeys.prototype.upArrowKeyPressed = function () {
        /// <summary>Switches to the previous character</summary>
        if (this.charactersTable !== undefined && this.charactersTable !== null) {
            this.charactersTable.selectPrevious();
        }
    };
    this.Hotkeys.prototype.downArrowKeyPressed = function () {
        /// <summary>Switches to the next character</summary>
        if (this.charactersTable !== undefined && this.charactersTable !== null) {
            this.charactersTable.selectNext();
        }
    };
    this.Hotkeys.prototype.keyPressed = function (event) {
        /// <summary>Handles and sorts all hotkey pressed events</summary>
        /// <param name="event" type="KeyEvent">The key event to extract details from</param>
        var hotkeys = this;
        if (event.ctrlKey || event.metaKey) { //make sure the ctrl or meta key is pressed
            switch (event.keyCode) {
                case hotkeys.editModeKey:
                    hotkeys.editKeyPressed();
                    break;
                case hotkeys.leftArrowKey:
                    hotkeys.leftArrowKeyPressed();
                    break;
                case hotkeys.rightArrowKey:
                    hotkeys.rightArrowKeyPressed();
                    break;
                case hotkeys.upArrowKey:
                    hotkeys.upArrowKeyPressed();
                    break;
                case hotkeys.downArrowKey:
                    hotkeys.downArrowKeyPressed();
                    break;
                default: //do nothing if it is not a registered command
            }
        }
    };
    //#endregion Hotkeys
    //#region Gallery
    this.Gallery = function (iconContainer, centerSelector, profileImageContainerSelector, uploadFormSelector) {
        /// <summary>Gallery object</summary>
        /// <param name="iconContainer" type="string">jQuery selector to get gallery icons container</param>
        /// <param name="centerSelector" type="string">jQuery selector to get gallery center display</param>
        /// <param name="profileImageContainerSelector" type="string">jQuery selector to get the character profile container</param>
        /// <param name="uploadFormSelector" type="string">jQuery selector for the gallery image uploads</param>
        var gallery = this;
        this.iconContainer = $(iconContainer);
        this.icons = $(iconContainer).children("img").filter("[src]"); //Filter out non img elements and img elements with no source
        this.center = $(centerSelector);
        this.profileImageContainer = $(profileImageContainerSelector);
        $(this.icons).click(function () {
            gallery.displayAsCenter($(this).attr("src"));
        });
        $(uploadFormSelector).dropzone({ //Register the dropzones
            complete: function (data) {
                var response = JSON.parse(data.xhr.response);
                if (this.getQueuedFiles().length === 0 && this.getUploadingFiles().length === 0) { //Remove files from the dropzone
                    this.removeAllFiles(); //Remove all files
                }
                gallery.addIcon(response.src); //Add the icon into the gallery view
            }
        });

        return this;
    };
    this.Gallery.prototype.displayAsProfile = function (source) {
        /// <summary>Displays an element as the characer profile</summary>
        /// <param name="element" type="string">Image source</param>
        if ($(this.profileImageContainer)) {
            $(this.profileImageContainer).html(""); //remove existing elements
            $(this.profileImageContainer).append($("<img/>", {
                src: source
            }));
        }
    };
    this.Gallery.prototype.displayAsCenter = function (source) {
        /// <summary>Places the clicked icon in the center display</summary>
        /// <param name="element" type="object">Clicked img element</param>
        $(this.center).attr("src", source);
    };
    this.Gallery.prototype.addIcon = function (source) {
        /// <summary>Adds an icon to the gallery view and other relevant locations</summary>
        /// <param name="source" type="string">The image source of the icon to add</param>
        var gallery = this;
        if ($(gallery.iconContainer).children("img").length === 0) { //If this is the first image then add it as the profile image
            gallery.displayAsCenter(source); //Display it in the gallery center image
            gallery.displayAsProfile(source); //Display it as the character profile
        }
        $(gallery.iconContainer).append($("<img/>", {
            src: source,
            click: function () { //Register the click event
                gallery.displayAsCenter(source);
            }
        })); //Add it as an icon
    };
    //#endregion Gallery
}

$(function () { //Run on document.ready
    "use strict";
    //Create instance of character creator
    var app = {};
    CharacterCreator.call(app, $, localStorage, location);

    Dropzone.autoDiscover = false; //Disable default dropzone detection
    new app.Gallery(".character-gallery-icon-container", ".character-gallery-center-image", ".character-profile-image-container", ".character-gallery-dropzone");

    var tabs = new app.Tabs(".character-tabs");
    var resizables = new app.Resizables(".character-resizable-panel");
    var charactersTable = new app.CharactersTable(".character-table", ".character-table-active-row");
    var hotkeys = new app.Hotkeys(resizables, tabs, charactersTable);

    $(document).keyup(function (event) {
        hotkeys.keyPressed(event);
    });
});
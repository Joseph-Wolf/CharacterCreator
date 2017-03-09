QUnit.test("Hotkey Creation", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    var tabs = new app.Tabs(".hotkeyCreation", localStorage);
    var resizables = new app.Resizables(".jQResizable");
    var charactersTable = new app.CharactersTable("todo");
    var hotkeys = new app.Hotkeys(resizables, tabs, charactersTable);

    //Test

    //Cleanup
});
QUnit.test("Hotkey KeyPressed", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    //Test

    //Cleanup
});
QUnit.test("Hotkey Edit Mode", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    //Test

    //Cleanup
});
QUnit.test("Hotkey LeftArrow", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    //Test

    //Cleanup
});
QUnit.test("Hotkey RightArrow", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    //Test

    //Cleanup
});
QUnit.test("Hotkey UpArrow", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    //Test

    //Cleanup
});
QUnit.test("Hotkey DownArrow", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    //Test

    //Cleanup
});
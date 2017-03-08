QUnit.test("Hotkey Creation", function () {
    var app = {};
    CharacterCreator.call(app);

    var tabs = new app.Tabs(".hotkeyCreation", localStorage);
    var resizables = new app.Resizables(".jQResizable");
    var charactersTable = new app.CharactersTable("todo");
    var hotkeys = new app.Hotkeys(resizables, tabs, charactersTable);
});
QUnit.test("Hotkey KeyPressed", function () {
    var app = {};
    CharacterCreator.call(app);


});
QUnit.test("Hotkey Edit Mode", function () {
    var app = {};
    CharacterCreator.call(app);


});
QUnit.test("Hotkey LeftArrow", function () {
    var app = {};
    CharacterCreator.call(app);


});
QUnit.test("Hotkey RightArrow", function () {
    var app = {};
    CharacterCreator.call(app);


});
QUnit.test("Hotkey UpArrow", function () {
    var app = {};
    CharacterCreator.call(app);


});
QUnit.test("Hotkey DownArrow", function () {
    var app = {};
    CharacterCreator.call(app);


});
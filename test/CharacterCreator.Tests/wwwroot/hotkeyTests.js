QUnit.module("Hotkey", {
    beforeEach: function () {
        this.app = {};
        CharacterCreator.call(this.app);
        this.storage = {};
        this.tabs = new this.app.Tabs(".test-tabs", this.storage);
        this.resizables = new this.app.Resizables(".test-resizables");
        this.charactersTable = new this.app.CharactersTable(".test-characters-table");
    },
    afterEach: function () {
        $("#qunit-fixture").empty();
    }
})
QUnit.test("Creation", function () {
    //Setup
    var hotkeys = new this.app.Hotkeys(this.resizables, this.tabs, this.charactersTable);

    //Test

    //Cleanup
});
QUnit.test("KeyPressed", function () {
    //Setup

    //Test

    //Cleanup
});
QUnit.test("Edit Mode", function () {
    //Setup

    //Test

    //Cleanup
});
QUnit.test("LeftArrow", function () {
    //Setup

    //Test

    //Cleanup
});
QUnit.test("RightArrow", function () {
    //Setup

    //Test

    //Cleanup
});
QUnit.test("UpArrow", function () {
    //Setup

    //Test

    //Cleanup
});
QUnit.test("DownArrow", function () {
    //Setup

    //Test

    //Cleanup
});
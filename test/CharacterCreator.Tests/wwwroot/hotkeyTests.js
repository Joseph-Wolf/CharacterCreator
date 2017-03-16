QUnit.module("Hotkey", {
    beforeEach: function () {
        this.app = {};
        this.localStorage = {};
        this.location = {};
        CharacterCreator.call(this.app, $, this.localStorage, this.location);

        //CharacterTable
        var tableFixture = $("<div/>");
        var table = $("<table/>", {
            class: "test-table"
        });
        var tableHeader = $("<thead/>");
        var tableHeaderRow = $("<tr/>");
        var tableHeaderColumn1 = $("<th/>");
        var tableHeaderColumn2 = $("<th/>");
        var tableHeaderColumn3 = $("<th/>");
        var tableBody = $("<tbody/>");
        var tableBodyRow1 = $("<tr/>");
        var tableBodyRow1Column1 = $("<td/>");
        var tableBodyRow1Column2 = $("<td/>");
        var tableBodyRow1Column3 = $("<td/>");
        var tableBodyRow2 = $("<tr/>");
        var tableBodyRow2Column1 = $("<td/>");
        var tableBodyRow2Column2 = $("<td/>");
        var tableBodyRow2Column3 = $("<td/>");
        var tableBodyRow3 = $("<tr/>");
        var tableBodyRow3Column1 = $("<td/>");
        var tableBodyRow3Column2 = $("<td/>");
        var tableBodyRow3Column3 = $("<td/>");

        tableBodyRow1.append(tableBodyRow1Column1);
        tableBodyRow1.append(tableBodyRow1Column2);
        tableBodyRow1.append(tableBodyRow1Column3);
        tableBodyRow2.append(tableBodyRow2Column1);
        tableBodyRow2.append(tableBodyRow2Column2);
        tableBodyRow2.append(tableBodyRow2Column3);
        tableBodyRow3.append(tableBodyRow3Column1);
        tableBodyRow3.append(tableBodyRow3Column2);
        tableBodyRow3.append(tableBodyRow3Column3);
        tableBody.append(tableBodyRow1);
        tableBody.append(tableBodyRow2);
        tableBody.append(tableBodyRow3);
        tableHeaderRow.append(tableHeaderColumn1);
        tableHeaderRow.append(tableHeaderColumn2);
        tableHeaderRow.append(tableHeaderColumn3);
        tableHeader.append(tableHeaderRow);
        table.append(tableHeader);
        table.append(tableBody);
        tableFixture.append(table);

        //Resizables
        var resizableFixture = $("<div/>");
        var resizableDiv1 = $("<div/>", {
            class: "test-resizables div1"
        });
        var resizableDiv2 = $("<div/>", {
            class: "test-resizables div2"
        });
        resizableFixture.append(resizableDiv1);
        resizableFixture.append(resizableDiv2);

        //Tabs
        var tabsFixture = $("<div/>", {
            class: "test-tabs"
        });
        var tabsUL = $("<ul/>");
        var tabLI1 = $("<li/>");
        var tabA1 = $("<a/>", {
            href: "#ID1"
        });
        var tabDiv1 = $("<div/>", {
            id: "ID1"
        });
        var tabLI2 = $("<li/>");
        var tabA2 = $("<a/>", {
            href: "#ID2"
        });
        var tabDiv2 = $("<div/>", {
            id: "ID2"
        });
        var tabLI3 = $("<li/>");
        var tabA3 = $("<a/>", {
            href: "#ID3"
        });
        var tabDiv3 = $("<div/>", {
            id: "ID3"
        });
        tabLI1.append(tabA1);
        tabLI2.append(tabA2);
        tabLI3.append(tabA3);
        tabsUL.append(tabLI1);
        tabsUL.append(tabLI2);
        tabsUL.append(tabLI3);
        tabsFixture.append(tabsUL);
        tabsFixture.append(tabDiv1);
        tabsFixture.append(tabDiv2);
        tabsFixture.append(tabDiv3);

        //Append all
        $("#qunit-fixture").append(tableFixture);
        $("#qunit-fixture").append(resizableFixture);
        $("#qunit-fixture").append(tabsFixture);

        this.tabs = new this.app.Tabs(".test-tabs");
        this.resizables = new this.app.Resizables(".test-resizables");
        this.charactersTable = new this.app.CharactersTable(".test-table");
    },
    afterEach: function () {
        $("#qunit-fixture").empty();
    }
})
QUnit.test("Creation", function () {
    //Setup
    var hotkeys1 = new this.app.Hotkeys(this.resizables, this.tabs, this.charactersTable);
    var hotkeys2 = new this.app.Hotkeys();

    //Test
    QUnit.assert.notOk(hotkeys1.editMode, "should default to edit mode off");
    QUnit.assert.equal(hotkeys1.editModeKey, 69, "should have correct edit mode key");
    QUnit.assert.equal(hotkeys1.leftArrowKey, 37, "should have correct left arrow key");
    QUnit.assert.equal(hotkeys1.rightArrowKey, 39, "should have correct right arrow key");
    QUnit.assert.equal(hotkeys1.upArrowKey, 38, "should have correct up arrow key");
    QUnit.assert.equal(hotkeys1.downArrowKey, 40, "should have correct down arrow key");
    QUnit.assert.notEqual(hotkeys1.resizables, null, "should have initialized resizables");
    QUnit.assert.notEqual(hotkeys1.tabs, null, "should have initialized tabs");
    QUnit.assert.notEqual(hotkeys1.charactersTable, null, "should have initialized the characters table");
    QUnit.assert.equal(hotkeys2.resizables, null, "should allow null resizables");
    QUnit.assert.equal(hotkeys2.tabs, null, "should allow null tabs");
    QUnit.assert.equal(hotkeys2.charactersTable, null, "should allow null characters table");
    //Cleanup
});
QUnit.test("Edit Mode", function () {
    //Setup
    var hotkeys = new this.app.Hotkeys(this.resizables, null, null);

    var editMode1 = hotkeys.editMode;
    var resizablesCreated1 = this.resizables.isCreated();
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.editModeKey
    });
    var editMode2 = hotkeys.editMode;
    var resizablesCreated2 = this.resizables.isCreated();
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.editModeKey
    });
    var editMode3 = hotkeys.editMode;
    var resizablesCreated3 = this.resizables.isCreated();

    //Test
    QUnit.assert.notOk(editMode1, "should default to non edit mode");
    QUnit.assert.notOk(resizablesCreated1, "should not have the resizable toggle on");
    QUnit.assert.ok(editMode2, "should toggle edit mode on");
    QUnit.assert.ok(resizablesCreated2, "should toggle resizables on");
    QUnit.assert.notOk(editMode3, "should toggle edit mode off");
    QUnit.assert.notOk(resizablesCreated3, "should toggle resizables off");

    //Cleanup
});
QUnit.test("LeftArrow", function () {
    //Setup
    var hotkeys = new this.app.Hotkeys(null, this.tabs, null);

    var activeTab1 = this.tabs.getSelectedIndex();
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.leftArrowKey
    });
    var activeTab2 = this.tabs.getSelectedIndex();
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.leftArrowKey
    });
    var activeTab3 = this.tabs.getSelectedIndex();
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.leftArrowKey
    });
    var activeTab4 = this.tabs.getSelectedIndex();

    //Test
    QUnit.assert.equal(activeTab1, 0, "should start on tab 0");
    QUnit.assert.equal(activeTab2, 2, "should wrap around");
    QUnit.assert.equal(activeTab3, 1, "should decrease by 1");
    QUnit.assert.equal(activeTab4, 0, "should decrease by 1");

    //Cleanup
});
QUnit.test("RightArrow", function () {
    //Setup
    var hotkeys = new this.app.Hotkeys(null, this.tabs, null);

    var activeTab1 = this.tabs.getSelectedIndex();
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.rightArrowKey
    });
    var activeTab2 = this.tabs.getSelectedIndex();
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.rightArrowKey
    });
    var activeTab3 = this.tabs.getSelectedIndex();
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.rightArrowKey
    });
    var activeTab4 = this.tabs.getSelectedIndex();

    //Test
    QUnit.assert.equal(activeTab1, 0, "should start on tab 0");
    QUnit.assert.equal(activeTab2, 1, "should increase by 1");
    QUnit.assert.equal(activeTab3, 2, "should increase by 1");
    QUnit.assert.equal(activeTab4, 0, "should wrap around");

    //Cleanup
});
QUnit.test("UpArrow", function () {
    //Setup
    var hotkeys = new this.app.Hotkeys(null, null, this.charactersTable);

    var activeCharacter1 = this.charactersTable.activeRow;
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.upArrowKey
    });
    var activeCharacter2 = this.charactersTable.activeRow;
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.upArrowKey
    });
    var activeCharacter3 = this.charactersTable.activeRow;
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.upArrowKey
    });
    var activeCharacter4 = this.charactersTable.activeRow;

    //Test
    QUnit.assert.equal(activeCharacter1, 0, "should start on first character");
    QUnit.assert.equal(activeCharacter2, 2, "should wrap around");
    QUnit.assert.equal(activeCharacter3, 1, "should select previous character");
    QUnit.assert.equal(activeCharacter4, 0, "should select previous character");

    //Cleanup
});
QUnit.test("DownArrow", function () {
    //Setup
    var hotkeys = new this.app.Hotkeys(null, null, this.charactersTable);

    var activeCharacter1 = this.charactersTable.activeRow;
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.downArrowKey
    });
    var activeCharacter2 = this.charactersTable.activeRow;
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.downArrowKey
    });
    var activeCharacter3 = this.charactersTable.activeRow;
    hotkeys.keyPressed({
        ctrlKey: true,
        keyCode: hotkeys.downArrowKey
    });
    var activeCharacter4 = this.charactersTable.activeRow;

    //Test
    QUnit.assert.equal(activeCharacter1, 0, "should start on first character");
    QUnit.assert.equal(activeCharacter2, 1, "should select next character");
    QUnit.assert.equal(activeCharacter3, 2, "should select next character");
    QUnit.assert.equal(activeCharacter4, 0, "should wrap around");

    //Cleanup
});
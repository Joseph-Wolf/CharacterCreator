QUnit.module("CharactersTable", {

    beforeEach: function () {
        this.app = {};
        CharacterCreator.call(this.app);

        this.tableSelector = ".test-table";
        this.activeCharacterSelector = ".test-active"
        this.doubleClickRowSelector1 = ".test-table tbody tr:nth-child(1)";
        this.doubleClickRowSelector2 = ".test-table tbody tr:nth-child(2)";
        this.doubleClickRowSelector3 = ".test-table tbody tr:nth-child(3)";
        this.location1 = "hello1";
        this.location2 = "hello2";
        this.location3 = "hello3";

        var table = $("<table/>", {
            class: "test-table"
        });
        var tableHeader = $("<thead/>");
        var tableHeaderRow = $("<tr/>");
        var tableHeaderColumn1 = $("<th/>");
        var tableHeaderColumn2 = $("<th/>");
        var tableHeaderColumn3 = $("<th/>");
        var tableBody = $("<tbody/>");
        var tableBodyRow1 = $("<tr/>", {
            "data-request-url": this.location1
        });
        var tableBodyRow1Column1 = $("<td/>");
        var tableBodyRow1Column2 = $("<td/>");
        var tableBodyRow1Column3 = $("<td/>");
        var tableBodyRow2 = $("<tr/>", {
            "data-request-url": this.location2,
            class: "test-active"
        });
        var tableBodyRow2Column1 = $("<td/>");
        var tableBodyRow2Column2 = $("<td/>");
        var tableBodyRow2Column3 = $("<td/>");
        var tableBodyRow3 = $("<tr/>", {
            "data-request-url": this.location3
        });
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
        $("#qunit-fixture").append(table);
    },
    afterEach: function () {
        $("#qunit-fixture").empty();
    }
});
QUnit.test("Creation", function () {
    //Setup
    var charactersTable = new this.app.CharactersTable(this.tableSelector);

    //Test
    QUnit.assert.equal(charactersTable.characterRows.length, 3, "should get the character rows");
    QUnit.assert.equal(charactersTable.activeRow, 0, "should default to first character row");

    //Cleanup
});
QUnit.test("Select Next", function () {
    //Setup
    var charactersTable = new this.app.CharactersTable(this.tableSelector);

    var activeRow1 = charactersTable.activeRow;
    charactersTable.selectNext();
    var activeRow2 = charactersTable.activeRow;
    charactersTable.selectNext();
    var activeRow3 = charactersTable.activeRow;
    charactersTable.selectNext();
    var activeRow4 = charactersTable.activeRow;

    //Test
    QUnit.assert.equal(activeRow1, 0, "should start at row 0");
    QUnit.assert.equal(activeRow2, 1, "should select next row");
    QUnit.assert.equal(activeRow3, 2, "should select next row");
    QUnit.assert.equal(activeRow4, 0, "should wrap around");

    //Cleanup
});
QUnit.test("Select Previous", function () {
    //Setup
    var charactersTable = new this.app.CharactersTable(this.tableSelector);

    var activeRow1 = charactersTable.activeRow;
    charactersTable.selectPrevious();
    var activeRow2 = charactersTable.activeRow;
    charactersTable.selectPrevious();
    var activeRow3 = charactersTable.activeRow;
    charactersTable.selectPrevious();
    var activeRow4 = charactersTable.activeRow;

    //Test
    QUnit.assert.equal(activeRow1, 0, "should start at row 0");
    QUnit.assert.equal(activeRow2, 2, "should wrap around");
    QUnit.assert.equal(activeRow3, 1, "should select previous row");
    QUnit.assert.equal(activeRow4, 0, "should select previous row");

    //Cleanup
});
QUnit.test("Double Click Row", function () {
    //Setup
    var location = {};
    var charactersTable = new this.app.CharactersTable(this.tableSelector, null, location);

    $(this.doubleClickRowSelector2).dblclick();
    var currentLocation1 = location.href;
    var activeCharacter1 = charactersTable.activeRow;
    $(this.doubleClickRowSelector3).dblclick();
    var currentLocation2 = location.href;
    var activeCharacter2 = charactersTable.activeRow;
    $(this.doubleClickRowSelector1).dblclick();
    var currentLocation3 = location.href;
    var activeCharacter3 = charactersTable.activeRow;

    //TODO: Test ajax

    //Test
    QUnit.assert.equal(activeCharacter1, 1, "should select character 2");
    QUnit.assert.equal(activeCharacter2, 2, "should select character 3");
    QUnit.assert.equal(activeCharacter3, 0, "should select character 1");
    QUnit.assert.equal(currentLocation1, this.location2, "should navigate to correct character");
    QUnit.assert.equal(currentLocation2, this.location3, "should navigate to correct character");
    QUnit.assert.equal(currentLocation3, this.location1, "should navigate to correct character");

    //Cleanup
});
QUnit.test("Active Character", function () {
    //Setup
    var charactersTable = new this.app.CharactersTable(this.tableSelector, this.activeCharacterSelector);

    var activeCharacter1 = charactersTable.activeRow;

    //Test
    QUnit.assert.equal(activeCharacter1, 1, "should start with the selected active character instead of 0")

    //Cleanup
});
QUnit.module("CharactersTable", {

    beforeEach: function () {
        this.app = {};
        CharacterCreator.call(this.app);

        var table = $("<table/>");
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

        tableBodyRow1.append(tableBodyRow1Column1);
        tableBodyRow1.append(tableBodyRow1Column2);
        tableBodyRow1.append(tableBodyRow1Column3);
        tableBodyRow2.append(tableBodyRow2Column1);
        tableBodyRow2.append(tableBodyRow2Column2);
        tableBodyRow2.append(tableBodyRow1Column3);
        tableBody.append(tableBodyRow1);
        tableBody.append(tableBodyRow2);
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
    var charactersTable = new this.app.CharactersTable(".hello");

    //Test

    //Cleanup
});
QUnit.test("Next Character", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    //Test

    //Cleanup
});
QUnit.test("Previous Character", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    //Test

    //Cleanup
});
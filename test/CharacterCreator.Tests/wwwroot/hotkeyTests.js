QUnit.module("Hotkey", {
    beforeEach: function () {
        this.app = {};
        CharacterCreator.call(this.app);
        this.storage = {};

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
            class: "resizable div1"
        });
        var resizableDiv2 = $("<div/>", {
            class: "resizable div2"
        });
        resizableDiv.append(resizable1);
        resizableDiv.append(resizable2);

        //Tabs
        var tabsFixture = $("<div/>", {
            class: "tabs-container"
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
        tabsDiv.append(tabsUL);
        tabsDiv.append(tabDiv1);
        tabsDiv.append(tabDiv2);
        tabsDiv.append(tabDiv3);

        //Append all
        $("#qunit-fixture").append(tableFixture);
        $("#qunit-fixture").append(resizableFixture);
        $("#qunit-fixture").append(tabsFixture);

        this.tabs = new this.app.Tabs(".test-tabs", this.storage);
        this.resizables = new this.app.Resizables(".test-resizables");
        this.charactersTable = new this.app.CharactersTable(".test-table");
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
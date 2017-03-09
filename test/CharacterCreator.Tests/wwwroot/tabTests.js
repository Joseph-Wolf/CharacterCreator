QUnit.module("Tabs", {
    beforeEach: function () {
        //Shared Variables
        this.app = {};
        CharacterCreator.call(this.app);
        this.tabsSelector = ".tabs-container";
        this.storage = { "active-tab": 0 };

        //Generate fixtures
        var tabsDiv = $("<div/>", {
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
        $("#qunit-fixture").append(tabsDiv);
    },
    afterEach: function () { //Cleanup fixtures
        $("#qunit-fixture").empty();
    }
});
QUnit.test("Creation", function () {
    //Setup
    var tabs = new this.app.Tabs(this.tabsSelector);

    //Test
    QUnit.assert.equal(tabs.container.length, 1, "should initialize tabs");

    //Cleanup
});

QUnit.test("Storage", function () {
    //Setup
    var tabs1 = new this.app.Tabs(this.tabsSelector, this.storage);
    tabs1.selectNext();
    var tabs2 = new this.app.Tabs(this.tabsSelector, this.storage);
    var selectedIndex2 = tabs2.getSelectedIndex();

    //Test
    QUnit.assert.equal(this.storage["active-tab"], 1, "should store navigated index");
    QUnit.assert.equal(selectedIndex2, 1, "should load stored index");

    //Cleanup
});

QUnit.test("Next", function () {
    //Setup
    var tabs = new this.app.Tabs(this.tabsSelector);
    var selectedIndex1 = tabs.getSelectedIndex();
    tabs.selectNext();
    var selectedIndex2 = tabs.getSelectedIndex();
    tabs.selectNext();
    var selectedIndex3 = tabs.getSelectedIndex();
    tabs.selectNext();
    var selectedIndex4 = tabs.getSelectedIndex();

    //Test
    QUnit.assert.equal(selectedIndex1, 0, "should start at index one");
    QUnit.assert.equal(selectedIndex2, 1, "should increment index once");
    QUnit.assert.equal(selectedIndex3, 2, "should increment index twice");
    QUnit.assert.equal(selectedIndex4, 0, "should wrap index");

    //Cleanup
});

QUnit.test("Previous", function () {
    //Setup
    var tabs = new this.app.Tabs(this.tabsSelector);
    var selectedIndex1 = tabs.getSelectedIndex();
    tabs.selectPrevious();
    var selectedIndex2 = tabs.getSelectedIndex();
    tabs.selectPrevious();
    var selectedIndex3 = tabs.getSelectedIndex();
    tabs.selectPrevious();
    var selectedIndex4 = tabs.getSelectedIndex();

    //Test
    QUnit.assert.equal(selectedIndex1, 0, "should start at index one");
    QUnit.assert.equal(selectedIndex2, 2, "should wrap index");
    QUnit.assert.equal(selectedIndex3, 1, "should decrement index once");
    QUnit.assert.equal(selectedIndex4, 0, "should decrement index twice");

    //Cleanup
});
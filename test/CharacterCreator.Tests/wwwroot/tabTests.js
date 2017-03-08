QUnit.test("Tabs Creation", function () {
    var app = {};
    CharacterCreator.call(app);

    var tabsDiv = $("<div/>", {
        class: "tabscreate"
    });
    $("body").append(tabsDiv);

    var tabs = new app.Tabs(".tabscreate");

    QUnit.assert.equal(tabs.container.length, 1, "should initialize tabs");
});

QUnit.test("Tabs Storage", function () {
    var app = {};
    CharacterCreator.call(app);

    var storage = {};
    var tabsDiv = $("<div/>", {
        class: "tabsstorage"
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

    tabLI1.append(tabA1);
    tabLI2.append(tabA2);
    tabsUL.append(tabLI1);
    tabsUL.append(tabLI2);
    tabsDiv.append(tabsUL);
    tabsDiv.append(tabDiv1);
    tabsDiv.append(tabDiv2);
    $("body").append(tabsDiv);

    var tabs1 = new app.Tabs(".tabsstorage", storage);
    tabs1.selectNext();
    var tabs2 = new app.Tabs(".tabsstorage", storage);
    var selectedIndex2 = tabs2.getSelectedIndex();

    QUnit.assert.equal(storage["active-tab"], 1, "should store navigated index");
    QUnit.assert.equal(selectedIndex2, 1, "should load stored index");
});

QUnit.test("Tabs Next", function () {
    var app = {};
    CharacterCreator.call(app);

    var tabsDiv = $("<div/>", {
        class: "tabsnext"
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
    $("body").append(tabsDiv);

    var tabs = new app.Tabs(".tabsnext");
    var selectedIndex1 = tabs.getSelectedIndex();
    tabs.selectNext();
    var selectedIndex2 = tabs.getSelectedIndex();
    tabs.selectNext();
    var selectedIndex3 = tabs.getSelectedIndex();
    tabs.selectNext();
    var selectedIndex4 = tabs.getSelectedIndex();

    QUnit.assert.equal(0, selectedIndex1, "should start at index one");
    QUnit.assert.equal(1, selectedIndex2, "should increment index once");
    QUnit.assert.equal(2, selectedIndex3, "should increment index twice");
    QUnit.assert.equal(0, selectedIndex4, "should wrap index");
});

QUnit.test("Tabs Previous", function () {
    var app = {};
    CharacterCreator.call(app);

    var tabsDiv = $("<div/>", {
        class: "tabsprevious"
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
    $("body").append(tabsDiv);

    var tabs = new app.Tabs(".tabsprevious");
    var selectedIndex1 = tabs.getSelectedIndex();
    tabs.selectPrevious();
    var selectedIndex2 = tabs.getSelectedIndex();
    tabs.selectPrevious();
    var selectedIndex3 = tabs.getSelectedIndex();
    tabs.selectPrevious();
    var selectedIndex4 = tabs.getSelectedIndex();

    QUnit.assert.equal(0, selectedIndex1, "should start at index one");
    QUnit.assert.equal(2, selectedIndex2, "should wrap index");
    QUnit.assert.equal(1, selectedIndex3, "should decrement index once");
    QUnit.assert.equal(0, selectedIndex4, "should decrement index twice");
});
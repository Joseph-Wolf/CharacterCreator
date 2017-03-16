QUnit.module("General", {
    beforeEach: function () {
        //Shared Variables
        this.app = {};
        this.localStorage = {};
        this.location = {};
        CharacterCreator.call(this.app, $, this.localStorage, this.location);
    }
});
QUnit.test("Get Unique Selector", function () {
    //Setup
    var element1 = $("<div/>", {
        id: "blah"
    });
    var element2 = $("<div/>", {
        class: "blah"
    });
    var element3 = $("<div/>", {
        class: "blah what  blah3 "
    });
    var element4 = $("<div/>", {
        id: "blah",
        class: "blah1  blah2  blah3"
    });
    var element5 = $("<div/>");
    var builder1 = $("<div/>");
    builder1.append($("<div/>"));
    builder1.append($("<p/>"));
    builder1.append(element5);
    builder1.append($("<div/>"));
    var builder2 = $("<div/>", {
        id: "what"
    });

    builder2.append($("<div/>"));
    builder2.append(builder1);

    var selector1 = this.app.getUniqueSelectorFromElement();
    var selector2 = this.app.getUniqueSelectorFromElement($("<div/>"));
    var selector3 = this.app.getUniqueSelectorFromElement(element1);
    var selector4 = this.app.getUniqueSelectorFromElement(element2);
    var selector5 = this.app.getUniqueSelectorFromElement(element3);
    var selector6 = this.app.getUniqueSelectorFromElement(element4);
    var selector7 = this.app.getUniqueSelectorFromElement(element5);
    var selector8 = this.app.getUniqueSelectorFromElement(element3, "what");

    //Test
    QUnit.assert.equal(selector1, undefined, "should return nothing when undefined");
    QUnit.assert.equal(selector2, ":root", "should return root element if there is no parent");
    QUnit.assert.equal(selector3, "#blah", "should use Id as selector if available");
    QUnit.assert.equal(selector4, ".blah", "should use class as selector if available");
    QUnit.assert.equal(selector5, ".blah.what.blah3", "should use multiple classes as selector if available");
    QUnit.assert.equal(selector6, "#blah.blah1.blah2.blah3", "should use both id and multiple classes as selector if available");
    QUnit.assert.equal(selector7, "#what div:nth-child(1) div:nth-child(2)", "should use both id and multiple classes as selector if available");
    QUnit.assert.equal(selector8, ".blah.blah3", "should remove excluded classes");

    //Cleanup
});
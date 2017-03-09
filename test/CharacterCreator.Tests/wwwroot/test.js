QUnit.test("Get Unique Selector", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    var element1 = $("<div/>", {
        id: "blah"
    });
    var element2 = $("<div/>", {
        class: "blah"
    });
    var element3 = $("<div/>", {
        class: "blah blah2  blah3 "
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

    //Test
    QUnit.assert.equal(undefined, app.getUniqueSelectorFromElement(), "should return nothing when undefined");
    QUnit.assert.equal(":root", app.getUniqueSelectorFromElement($("<div/>")), "should return root element if there is no parent");
    QUnit.assert.equal("#blah", app.getUniqueSelectorFromElement(element1), "should use Id as selector if available");
    QUnit.assert.equal(".blah", app.getUniqueSelectorFromElement(element2), "should use class as selector if available");
    QUnit.assert.equal(".blah.blah2.blah3", app.getUniqueSelectorFromElement(element3), "should use multiple classes as selector if available");
    QUnit.assert.equal("#blah.blah1.blah2.blah3", app.getUniqueSelectorFromElement(element4), "should use both id and multiple classes as selector if available");
    QUnit.assert.equal("#what div:nth-child(1) div:nth-child(2)", app.getUniqueSelectorFromElement(element5), "should use both id and multiple classes as selector if available");

    //Cleanup
});
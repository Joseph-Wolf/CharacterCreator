QUnit.test("Resizable Creation", function () {
    var app = {};
    CharacterCreator.call(app);

    var fixture = $("<div/>");
    var div1 = $("<div/>", {
        class: "resizablecreation"
    });
    var div2 = $("<div/>", {
        class: "resizablecreation"
    });
    
    fixture.append(div1);
    fixture.append(div2);
    $("body").append(fixture);

    var resizable = new app.Resizables(".resizablecreation");

    QUnit.assert.equal(resizable.elements.length, 2, "should find all of the resizable containers");
});
QUnit.test("Resizable Create", function () {
    var app = {};
    CharacterCreator.call(app);

    var fixture = $("<div/>");
    var div1 = $("<div/>", {
        class: "resizablecreate"
    });
    var div2 = $("<div/>", {
        class: "resizablecreate"
    });

    fixture.append(div1);
    fixture.append(div2);
    $("body").append(fixture);

    var resizable = new app.Resizables(".resizablecreate");
    resizable.create();

    QUnit.assert.ok($(".resizablecreate").hasClass("ui-resizable"), "should add jQuery-ui resizable");
});
QUnit.test("Resizable Destroy", function () {
    var app = {};
    CharacterCreator.call(app);

    var fixture = $("<div/>");
    var div1 = $("<div/>", {
        class: "resizabledestroy"
    });
    var div2 = $("<div/>", {
        class: "resizabledestroy"
    });

    fixture.append(div1);
    fixture.append(div2);
    $("body").append(fixture);

    var resizable = new app.Resizables(".resizabledestroy");
    resizable.create();
    resizable.destroy();

    QUnit.assert.notOk($(".resizabledestroy").hasClass("ui-resizable"), "should remove jQuery-ui resizable")
});
QUnit.test("Resizable Get Dimensions", function () {
    var app = {};
    CharacterCreator.call(app);

});
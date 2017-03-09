QUnit.module("Resizable", {
    beforeEach: function () {
        this.app = {};
        CharacterCreator.call(this.app);

        var div1 = $("<div/>", {
            class: "resizable div1"
        });
        var div2 = $("<div/>", {
            class: "resizable div2"
        });
        div1.css("width", "99px");
        div1.css("height", "84px");
        div2.css("width", "9px");
        div2.css("height", "8px");

        $("#qunit-fixture").append(div1);
        $("#qunit-fixture").append(div2);
    },
    afterEach: function () {
        $("#qunit-fixture").empty()
    }
});
QUnit.test("Creation", function () {
    //Setup
    var resizable = new this.app.Resizables(".resizable");

    //Test
    QUnit.assert.equal(resizable.elements.length, 2, "should find all of the resizable containers");

    //Cleanup
});
QUnit.test("Create", function () {
    //Setup
    var resizable = new this.app.Resizables(".resizable");
    resizable.create();

    //Test
    QUnit.assert.ok($(".resizable").hasClass("ui-resizable"), "should add jQuery-ui resizable");

    //Cleanup
});
QUnit.test("Destroy", function () {
    //Setup
    var resizable = new this.app.Resizables(".resizable");
    resizable.create();
    resizable.destroy();

    //Test
    QUnit.assert.notOk($(".resizable").hasClass("ui-resizable"), "should remove jQuery-ui resizable")

    //Cleanup
});
QUnit.test("Get Dimensions", function () {
    //Setup
    var resizable = new this.app.Resizables(".resizable");
    var dimensions = resizable.getDimensions();

    //Test
    QUnit.assert.equal(dimensions[".resizable.div1"].width, "99px", "should have correct width");
    QUnit.assert.equal(dimensions[".resizable.div1"].maxWidth, "99px", "should have correct maxWidth");
    QUnit.assert.equal(dimensions[".resizable.div1"].height, "84px", "should have correct height");
    QUnit.assert.equal(dimensions[".resizable.div1"].maxHeight, "84px", "should have correct maxHeight");
    QUnit.assert.equal(dimensions[".resizable.div2"].width, "9px", "should have correct width");
    QUnit.assert.equal(dimensions[".resizable.div2"].maxWidth, "9px", "should have correct maxWidth");
    QUnit.assert.equal(dimensions[".resizable.div2"].height, "8px", "should have correct height");
    QUnit.assert.equal(dimensions[".resizable.div2"].maxHeight, "8px", "should have correct maxHeight");

    //Cleanup
});
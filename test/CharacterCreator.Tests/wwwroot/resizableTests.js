QUnit.module("Resizable", {
    beforeEach: function () {
        this.app = {};
        this.localStorage = {};
        this.location = {};
        CharacterCreator.call(this.app, $, this.localStorage, this.location);

        this.resizableSelector = ".resizable";

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
    var resizable = new this.app.Resizables(this.resizableSelector);

    //Test
    QUnit.assert.equal(resizable.elements.length, 2, "should find all of the resizable containers");

    //Cleanup
});
QUnit.test("Create", function () {
    //Setup
    var resizable = new this.app.Resizables(this.resizableSelector);

    var isCreated1 = resizable.isCreated();
    resizable.create();
    var isCreated2 = resizable.isCreated();

    //Test
    QUnit.assert.notOk(isCreated1, "should be destroyed");
    QUnit.assert.ok(isCreated2, "should add jQuery-ui resizable");

    //Cleanup
});
QUnit.test("Destroy", function () {
    //Setup
    var resizable = new this.app.Resizables(this.resizableSelector);
    resizable.create();
    var isCreated1 = resizable.isCreated()
    resizable.destroy();
    var isCreated2 = resizable.isCreated();

    //Test
    QUnit.assert.ok(isCreated1, "should be created");
    QUnit.assert.notOk(isCreated2, "should remove jQuery-ui resizable");

    //Cleanup
});
QUnit.test("Get Dimensions", function () {
    //Setup
    var resizable = new this.app.Resizables(this.resizableSelector);
    var dimensions = resizable.getDimensions();

    //Test
    QUnit.assert.equal(dimensions[".resizable.div1"].width, "99px", "should have correct width");
    QUnit.assert.equal(dimensions[".resizable.div1"].height, "84px", "should have correct height");
    QUnit.assert.equal(dimensions[".resizable.div2"].width, "9px", "should have correct width");
    QUnit.assert.equal(dimensions[".resizable.div2"].height, "8px", "should have correct height");

    //Cleanup
});
QUnit.module("Style", {
    beforeEach: function () {
        this.app = {}
        CharacterCreator.call(this.app);
    }
});
QUnit.test("Creation", function () {
    //Setup
    var style = new this.app.Style(".hello", "world");

    //Test
    QUnit.assert.equal(style.Property, ".hello", "should match input property");
    QUnit.assert.equal(style.Value, "world", "should match input value");

    //Cleanup
});
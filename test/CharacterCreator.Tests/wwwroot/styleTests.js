QUnit.module("Style", {
    beforeEach: function () {
        this.app = {};
        this.localStorage = {};
        this.location = {};
        CharacterCreator.call(this.app, $, this.localStorage, this.location);
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
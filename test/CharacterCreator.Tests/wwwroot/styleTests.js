QUnit.test("Style Test", function () {
    var app = {};
    CharacterCreator.call(app);

    var style = new app.Style(".hello", "world");

    QUnit.assert.equal(style.Property, ".hello", "should match input property");
    QUnit.assert.equal(style.Value, "world", "should match input value");
});
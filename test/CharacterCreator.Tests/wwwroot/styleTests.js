QUnit.test("Style Creation", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    var style = new app.Style(".hello", "world");

    //Test
    QUnit.assert.equal(style.Property, ".hello", "should match input property");
    QUnit.assert.equal(style.Value, "world", "should match input value");

    //Cleanup
});
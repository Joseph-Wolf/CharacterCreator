QUnit.test("Style Test", function () {
    var style = new Style(".hello", "world");
    QUnit.assert.equal(style.Property, ".hello", "should match input property");
    QUnit.assert.equal(style.Value, "world", "should match input value");
});
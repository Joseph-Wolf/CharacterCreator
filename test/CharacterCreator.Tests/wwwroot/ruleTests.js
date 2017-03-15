QUnit.module("Rule", {
    beforeEach: function () {
        this.app = {};
        this.localStorage = {};
        this.location = {};
        CharacterCreator.call(this.app, $, this.localStorage, this.location);
    }
});
QUnit.test("Creation", function () {
    //Setup
    var rule1 = new this.app.Rule("#blah");
    var rule2 = new this.app.Rule();

    //Test
    QUnit.assert.equal(rule1.Selector, "#blah", "should pupulate the selector");
    QUnit.assert.equal(rule1.Styles.length, 0, "should pupulate the Styles");
    QUnit.assert.equal(rule2.Selector, "", "should allow the selector to be populated later");

    //Cleanup
});

QUnit.test("Add Styles", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    var rule1 = new this.app.Rule();
    var style1 = new this.app.Style("a", "b");
    var rule2 = new this.app.Rule();
    var rule3 = new this.app.Rule();
    var invalidStyle = {
        magenta: "mango",
        keylime: "pie"
    }

    rule1.addStyle(style1);
    rule2.addStyle();
    rule3.addStyle(invalidStyle);

    //Test
    QUnit.assert.equal(rule1.Styles[0], style1, "should add a style");
    QUnit.assert.equal(rule2.Styles.length, 0, "should not add a style when one is not input");
    QUnit.assert.equal(rule3.Styles.length, 0, "should not add invalid styles");

    //Cleanup
});
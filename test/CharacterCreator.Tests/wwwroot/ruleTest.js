QUnit.test("Rule Creation", function () {
    var rule = new Rule($("<div/>", {
        id: "blah"
    }));
    var ruleTwo = new Rule();
    var ruleThree = new Rule($("<div/>"));
    var ruleFour = new Rule($("<div/>", {
        class: "class"
    }))

    QUnit.assert.equal(rule.Selector, "#blah", "should use input Id as selector if available");
});

QUnit.test("Rule Add Styles", function () {
    var rule = new Rule($("<div/>", {
        id: "blah"
    }));
    var style = new Style("a", "b");

    rule.addStyle(style);

    QUnit.assert.equal(rule.Styles[0], style, "should add a style");
});
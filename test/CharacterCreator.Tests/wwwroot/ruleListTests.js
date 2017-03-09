QUnit.test("RuleList Creation", function () {
    var app = {};
    CharacterCreator.call(app);

    var ruleList1 = new app.RuleList();
    var ruleList2 = new app.RuleList({ Selector1: { Property1: "Value1", Property2: "Value2" }, Selector2: { Property3: "Value3" } })

    QUnit.assert.equal(ruleList1.Rules.length, 0, "should pupulate the selector");
    QUnit.assert.equal(ruleList2.Rules.length, 2, "should accept an object constructor");
});

QUnit.test("RuleList Add Rules", function () {
    var app = {};
    CharacterCreator.call(app);

    var ruleList1 = new app.RuleList();
    var ruleList2 = new app.RuleList();
    var ruleList3 = new app.RuleList();
    var rule1 = new app.Rule("hi");
    var rule2 = new app.Rule("hello");
    var invalidRule = {
        rabble: "rabble"
    };

    ruleList1.addRule();
    ruleList2.addRule(invalidRule);
    ruleList3.addRule(rule1);
    ruleList3.addRule(rule2);

    QUnit.assert.equal(ruleList1.Rules.length, 0, "should not add undefined rule");
    QUnit.assert.equal(ruleList2.Rules.length, 0, "should not add invalid rule");
    QUnit.assert.equal(ruleList3.Rules[0], rule1, "should add valid rule");
    QUnit.assert.equal(ruleList3.Rules[1], rule2, "should add valid rule");
});

QUnit.test("RuleList Clear Rules", function () {
    var app = {};
    CharacterCreator.call(app);

    var ruleList = new app.RuleList();
    var rule = new app.Rule("hi");

    ruleList.addRule(rule);
    ruleList.clear();

    QUnit.assert.equal(0, ruleList.Rules.length, "should clear the rule list");
});

QUnit.test("RuleList Submit Rules", function () {
    var app = {};
    CharacterCreator.call(app);

    var ruleList = new app.RuleList();
    //TODO: intercept and process the AJAX request

});
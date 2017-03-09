QUnit.module("Gallery", {
    beforeEach: function () {
        this.app = {};
        CharacterCreator.call(this.app);
        this.iconSelector = ".icon";
        this.centerSelector = ".center";

        this.icon1 = $("<img/>", {
            src: "What1?",
            class: "icon"
        });
        var icon2 = $("<img/>", {
            src: "What2?",
            class: "icon"
        });
        this.icon3 = $("<img/>", {
            src: "What3?",
            class: "icon"
        });
        var fake1 = $("<div/>", {
            class: "icon"
        });
        var fake2 = $("<img/>", {
            class: "icon"
        });
        var center = $("<img/>", {
            src: "Okay!",
            class: "center"
        });

        $("#qunit-fixture").append(this.icon1);
        $("#qunit-fixture").append(icon2);
        $("#qunit-fixture").append(this.icon3);
        $("#qunit-fixture").append(fake1);
        $("#qunit-fixture").append(fake2);
        $("#qunit-fixture").append(center);
    },
    afterEach: function () {
        $("#qunit-fixture").empty();
    }
})
QUnit.test("Creation", function () {
    //Setup
    var gallery = new this.app.Gallery(this.iconSelector, this.centerSelector);

    //Test
    QUnit.assert.equal(gallery.center.length, 1, "should find the center image");
    QUnit.assert.equal(gallery.icons.length, 3, "should find all of the icons");

    //Cleanup
});
QUnit.test("Center Display", function () {
    //Setup
    var gallery = new this.app.Gallery(this.iconSelector, this.centerSelector);

    gallery.displayAsCenter(this.icon1);
    var source2 = $(this.centerSelector).attr("src");
    gallery.displayAsCenter(this.icon3);
    var source3 = $(this.centerSelector).attr("src");

    //Test
    QUnit.assert.equal(source2, "What1?", "should update the center source");
    QUnit.assert.equal(source3, "What3?", "should update the center source");

    //Cleanup
});
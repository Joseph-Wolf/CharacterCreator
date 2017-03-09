QUnit.test("Gallery Creation", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    var fixture = $("<div/>", {
        class: "gallery-creation-fixture"
    });
    var icon1 = $("<img/>", {
        src: "What1?",
        class: "icon"
    });
    var icon2 = $("<img/>", {
        src: "What2?",
        class: "icon"
    });
    var icon3 = $("<img/>", {
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

    fixture.append(icon1);
    fixture.append(icon2);
    fixture.append(icon3);
    fixture.append(fake1);
    fixture.append(fake2);
    fixture.append(center);
    $("body").append(fixture);

    var gallery = new app.Gallery(".icon", ".center");

    //Test
    QUnit.assert.equal(gallery.center.length, 1, "should find the center image");
    QUnit.assert.equal(gallery.icons.length, 3, "should find all of the icons");

    //Cleanup
    $("body").remove("gallery-creation-fixture");
});
QUnit.test("Gallery Center Display", function () {
    //Setup
    var app = {};
    CharacterCreator.call(app);

    var fixture = $("<div/>", {
        class: "gallery-center-display-fixture"
    });
    var icon1 = $("<img/>", {
        src: "What1?",
        class: "icon"
    });
    var icon2 = $("<img/>", {
        src: "What2?",
        class: "icon"
    });
    var icon3 = $("<img/>", {
        src: "What3?",
        class: "icon"
    });
    var center = $("<img/>", {
        src: "Okay!",
        class: "center"
    });

    fixture.append(icon1);
    fixture.append(icon2);
    fixture.append(icon3);
    fixture.append(center);
    $("body").append(fixture);

    var gallery = new app.Gallery(".icon", ".center");

    var source1 = $(".center").attr("src");
    gallery.displayAsCenter(icon1);
    var source2 = $(".center").attr("src");
    gallery.displayAsCenter(icon3);
    var source3 = $(".center").attr("src");

    //Test
    QUnit.assert.equal(source1, "Okay!", "should use the default image until changed");
    QUnit.assert.equal(source2, "What1?", "should update the center source");
    QUnit.assert.equal(source3, "What3?", "should update the center source");

    //Cleanup
    $("body").remove("gallery-center-display-fixture");
});
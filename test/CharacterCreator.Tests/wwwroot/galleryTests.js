QUnit.module("Gallery", {
    beforeEach: function () {
        this.app = {};
        this.localStorage = {};
        this.location = {};
        CharacterCreator.call(this.app, $, this.localStorage, this.location);

        this.iconContainerSelector = ".test-icon-container";
        this.centerSelector = ".test-center";
        this.profileImageContainerSelector = ".test-profile-picure-container";
        this.dropzoneFormSelector = ".test-dropzone-form";

        var iconContainer = $("<div/>", {
            class: "test-icon-container"
        });
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
            class: "test-center"
        });
        var dropzoneForm = $("<form/>", {
            action: "hello",
            method: "POST",
            class: "test-dropzone-form"
        });
        var profileImageContainer = $("<div/>", {
            class: "test-profile-picure-container"
        });

        $(iconContainer).append(this.icon1);
        $(iconContainer).append(icon2);
        $(iconContainer).append(this.icon3);
        $(iconContainer).append(fake1);
        $(iconContainer).append(fake2);
        $("#qunit-fixture").append(iconContainer);
        $("#qunit-fixture").append(center);
        $("#qunit-fixture").append(dropzoneForm);
        $("#qunit-fixture").append(profileImageContainer);
    },
    afterEach: function () {
        $("#qunit-fixture").empty();
    }
})
QUnit.test("Creation", function () {
    //Setup
    var gallery = new this.app.Gallery(this.iconContainerSelector, this.centerSelector, this.profileImageContainerSelector, this.dropzoneFormSelector);

    //Test
    QUnit.assert.equal(gallery.center.length, 1, "should find the center image");
    QUnit.assert.equal(gallery.icons.length, 3, "should find all of the icons");

    //Cleanup
});
QUnit.test("Center Display", function () {
    //Setup
    var gallery = new this.app.Gallery(this.iconContainerSelector, this.centerSelector, this.profileImageContainerSelector, this.dropzoneFormSelector);

    gallery.displayAsCenter(this.icon1.attr("src"));
    var source2 = $(this.centerSelector).attr("src");
    gallery.displayAsCenter(this.icon3.attr("src"));
    var source3 = $(this.centerSelector).attr("src");

    //Test
    QUnit.assert.equal(source2, "What1?", "should update the center source");
    QUnit.assert.equal(source3, "What3?", "should update the center source");

    //Cleanup
});
QUnit.test("Add Icon", function () {
    //Setup
    var gallery = new this.app.Gallery(this.iconContainerSelector, this.centerSelector, this.profileImageContainerSelector, this.dropzoneFormSelector);

    var iconCount1 = $(this.iconContainerSelector).children("img").length;
    gallery.addIcon("testsource");
    var iconCount2 = $(this.iconContainerSelector).children("img").length;
    var centerSource1 = $(this.centerSelector).attr("src");
    $(this.iconContainerSelector).find("img[src='testsource']").click();
    var centerSource2 = $(this.centerSelector).attr("src");
    $(this.iconContainerSelector).empty();
    var iconCount3 = $(this.iconContainerSelector).children("img").length;
    gallery.addIcon("wysiwyg");
    var iconCount4 = $(this.iconContainerSelector).children("img").length;
    var centerSource3 = $(this.centerSelector).attr("src");

    //TODO: test the click functionality

    //Test
    QUnit.assert.equal(iconCount2, iconCount1 + 1, "should add icon");
    QUnit.assert.equal(iconCount3, 0, "should have emptied the element");
    QUnit.assert.equal(iconCount4, iconCount3 + 1, "should have added one icon");
    QUnit.assert.equal(centerSource1, "Okay!", "should have a default center image");
    QUnit.assert.equal(centerSource2, "testsource", "should register the click event on newly added icon");
    QUnit.assert.equal(centerSource3, "wysiwyg", "should set the center image if first");

    //Cleanup
});
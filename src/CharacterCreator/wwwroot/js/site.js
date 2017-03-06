$(document).ready(function () {
    "use strict";
    //-----------------START Process Tabs--------------------------------
    $(".jq-tabs").tabs({ //Add some settings for the tabs
        activate: function (event, ui) { //When a tab is clicked
            localStorage["active-tab"] = ui.newTab.index(); //Store the tab index
        },
        active: parseInt(localStorage["active-tab"]) || 0 //set the active tab to either a stored value or to 0
    });
    //-------------------END Process Tabs--------------------------------
    //-----------------START Gallery-------------------------------------
    $("gallery-icon").click(function displayLargerImage() {
        $(".gallery-center-image").attr("src", $(this).attr("src"));
    });
    //------------------END Gallery--------------------------------------
    //---------------------START Hotkeys---------------------------------
    //TODO: reset css to default?
    function getARuleObject(selector, property, value) {
        return {
            selector: selector,
            property: property,
            value: value
        };
    }
    function getUniqueSelector(element) {
        return "#" + $(element).prop("id");
    }
    function submitRules(rules) {
        $.ajax({
            url: "/Style/AddRule",
            method: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify(rules)
        });
    }
    function editKeyPressed(elements) {
        var cssRules = {Rules: []};
        $(elements).each(function gatherCSSRules(index, element) { //submit all of the positions
            var width = $(element).css("width");
            var height = $(element).css("height");
            cssRules.Rules.push({
                Selector: getUniqueSelector(element),
                Styles: [
                    {
                        Property: "width",
                        Value: width
                    },
                    {
                        Property: "maxWidth",
                        Value: width
                    },
                    {
                        Property: "height",
                        Value: height
                    },
                    {
                        Property: "maxHeight",
                        Value: height
                    }
                ]
            });
        });
        submitRules(cssRules);
    }
    function leftArrowPressed() {//TODO: select next tab
        console.log("leftArrow");
    }
    function rightArrowPressed() {//TODO: select previous tab
        console.log("rightArrow");
    }
    function upArrowPressed() {//TODO: select next character if available
        console.log("upArrow");
    }
    function downArrowPressed() {//TODO: select previous character if available
        console.log("downArrow");
    }
    var commandKeys = {
        editMode: {
            key: 69,
            on: false,
            pressed: editKeyPressed
        },
        leftArrow: {
            key: 37,
            pressed: leftArrowPressed
        },
        rightArrow: {
            key: 39,
            pressed: rightArrowPressed
        },
        upArrow: {
            key: 38,
            pressed: upArrowPressed
        },
        downArrow: {
            key: 40,
            pressed: downArrowPressed
        }
    };
    $(document).keyup(function keysPressed(e) {
        if (e.ctrlKey || e.metaKey) { //make sure the ctrl or meta key is pressed
            switch (e.keyCode) {
                case commandKeys.editMode.key:
                    commandKeys.editMode.on = !commandKeys.editMode.on;
                    if (commandKeys.editMode.on) {
                        $(".jQResizable").resizable(); //Apply resizable to panels
                    } else {
                        commandKeys.editMode.pressed($(".jQResizable"));
                        $(".jQResizable").resizable("destroy"); //Destroy resizable if it was saved
                    }
                    break;
                case commandKeys.leftArrow.key:
                    commandKeys.leftArrow.pressed();
                    break;
                case commandKeys.rightArrow.key:
                    commandKeys.rightArrow.pressed();
                    break;
                case commandKeys.upArrow.key:
                    commandKeys.upArrow.pressed();
                    break;
                case commandKeys.downArrow.key:
                    commandKeys.downArrow.pressed();
                    break;
                default: //do nothing if it is not a registered command
            }
        }
    });
    //----------------------END Hotkeys----------------------------------
});
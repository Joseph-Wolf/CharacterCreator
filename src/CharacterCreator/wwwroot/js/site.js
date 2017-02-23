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
    var commandKeys = { editMode: { key: 69, on: false }, leftArrow: { key: 37 }, rightArrow: { key: 39 }, upArrow: { key: 38 }, downArrow: { key: 40 } };
    $(document).keyup(function keysPressed(e) {
        if (e.ctrlKey || e.metaKey) { //make sure the ctrl or meta key is pressed
            switch (e.keyCode) {
                case commandKeys.editMode.key:
                    commandKeys.editMode.on = !commandKeys.editMode.on;
                    if (commandKeys.editMode.on) {
                        $(".jQResizable").resizable(); //Apply resizable to panels
                    } else {
                        var cssRules = [];
                        $(".jQResizable").each(function gatherCSSRules() { //submit all of the positions
                            var selector = "#" + $(this).prop("id");
                            var width = $(this).css("width");
                            var height = $(this).css("height");
                            cssRules.push({ selector: selector, property: "width", value: width });
                            cssRules.push({ selector: selector, property: "maxWidth", value: width });
                            cssRules.push({ selector: selector, property: "height", value: height });
                            cssRules.push({ selector: selector, property: "maxHeight", value: height });
                        });
                        $.ajax({
                            url: "/Style/AddRule",
                            method: "POST",
                            dataType: "json",
                            contentType: "application/json",
                            data: JSON.stringify(cssRules)
                        });
                        $(".jQResizable").resizable("destroy"); //Destroy resizable if it was saved
                    }
                    break;
                case commandKeys.leftArrow.key:
                    console.log("leftArrow");
                    //TODO: select next tab
                    break;
                case commandKeys.rightArrow.key:
                    console.log("rightArrow");
                    //TODO: select previous tab
                    break;
                case commandKeys.upArrow.key:
                    console.log("upArrow");
                    //TODO: select next character if available
                    break;
                case commandKeys.downArrow.key:
                    console.log("downArrow");
                    //TODO: select previous character if available
                    break;
                default: //do nothing if it is not a registered command
            }
        }
    });
    //----------------------END Hotkeys----------------------------------
});
$(document).ready(function () {
    'use strict';
    var editMode = false;
    var commandKey = 189;
    var editModeKey = 69;
    var keyMap = {commandKey: false, editModeKey: false};

    $('.jqTabs').tabs(); //Set up tabs

    $('img.galleryImage').click(function displayLargerImage() {
        $('#GalleryCenterImage').html($('<img/>', {
            src: $(this).prop('src'),
            class: 'autoResize'
        }));
    });

    //Event listners
    $(document).keydown(function keysPressed(e) {
        if (e.keyCode in keyMap) {
            keyMap[e.keyCode] = true;
            if (keyMap[commandKey] && keyMap[editModeKey]) {
                editMode = !editMode;
                if (editMode) {
                    //TODO: reset css to default?

                    $('.jQResizable').resizable({ //Set resizable panels
                        stop: function (event, ui) { //Send coordinates to controller on stop
                            var formId = '#SaveUIForm';
                            $(formId).find('#css').val('#' + $(ui.element).prop('id') + '{width:' + ui.size.width + 'px;height:' + ui.size.height + 'px;}')
                            $.ajax({
                                url: $(formId).attr('action'),
                                method: $(formId).attr('method'),
                                data: $(formId).serialize()
                            });
                        }
                    });
                } else {
                    //TODO: apply changes to all characters or just one?
                    $('.jQResizable').resizable('destroy'); //Destroy resizable if it is set up
                }
            }
        }
    }).keyup(function keysDepressed(e) {
        keyMap[e.keyCode] = false;
    });

    $('#UploadImageInput').change(function submitImageForm() { //submit image as soon as an image is selected
        $(this).closest('form').submit();
    });
});
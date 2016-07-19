$(document).ready(function () {
    'use strict';
    var editMode = false;
    var commandKey = 189;
    var editModeKey = 69;
    var keyMap = {commandKey: false, editModeKey: false};

    $('.jqTabs').tabs({ 
        activate: function (event, ui) {
            window.sessionStorage.setItem($(this).prop('id'), ui.newTab.parent().children().index(ui.newTab));
        }
    }).each(function setJQTabsActiveTab(){
        $(this).tabs({ active: parseInt(window.sessionStorage.getItem($(this).prop('id'))) || 0 });
    }); 

    $('img.galleryImage').click(function displayLargerImage() {
        $('#GalleryCenterImage').html($('<img/>', {
            src: $(this).prop('src'),
            class: 'autoResize'
        }));
    });

    //Event listners
    //TODO: if left/right arrow key pressed switch through active list
    //TODO: if up/down arrow key pressed switch character

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
                            $(formId).find('#css').val('#' + $(ui.element).prop('id') + '{max-width:' + ui.size.width + 'px;width:' + ui.size.width + 'px;max-height:' + ui.size.height + 'px;height:' + ui.size.height + 'px;}')
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

    $('.UploadImageInput').change(function submitImageForm() { //submit image as soon as an image is selected
        var tmpForm = $(this).closest('form').clone();
        $(tmpForm).find('.UploadImageHidden').removeClass('UploadImageHidden');
        $(tmpForm).find('.UploadImageInput').hide();
        //display image preview when loaded
        if (this.files && this.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('img.UploadImagePreview').attr('src', e.target.result);
            }
            reader.readAsDataURL(this.files[0]);
        }
        $(tmpForm).dialog();
    });
});
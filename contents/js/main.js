$(function () {
    $(".player").draggable({
        containment: "parent",
    });
});

$(function () {
    $(".btn").click(function () {
        html2canvas($("#field"), {
            onrendered: function (canvas) {
                theCanvas = canvas;
                document.body.appendChild(canvas);
                canvas.getContext("2d");

                $('canvas').attr("id", "canvas");
                $('canvas').attr("crossOrigin", "Anonymous");


                var test = canvas.toDataURL("image/png");

                alert(test);

                $('#imgh').attr("src", test);
                $('#imgh').attr("title", "Opstellinge");

              //  $(".share").append(canvas);
                $(".share").show();



                $('canvas').attr("id", "canvas");
                $('canvas').attr("crossOrigin", "Anonymous");

                    var a      = document.createElement('a');
                    a.href     = 'data:image/svg+xml;utf8,' + unescape($('#imgh')[0].outerHTML);
                    a.download = 'plot.svg';
                    a.target   = '_blank';
                    document.body.appendChild(a); a.click(); document.body.removeChild(a);

            }
        });
    });
});


$(document).ready(function () {

    $('.player').draggable({
        start: function () {
            $(this).addClass('noclick');
        },
        stop: function () {
            $(this).removeClass('noclick');
        }
    });

    // Open dialog for editing player
    $(".player").on('click', function () {

        if ($(this).is('.ui-draggable-dragging')) {

        } else {
            
            if ($(this).hasClass('noclick')) {

            } else {

                var id = $(this).data('player');
                var name = $('[data-player=' + id + ']').find('.name').text();
                var number = $('[data-player=' + id + ']').find('.number').text();

                // Clear fields
                $('#edit_player_name, #edit_player_number').val('');
                $(".edit_player").fadeIn();

                $('#edit_player_id').val(id);
                $('#edit_player_name').val(name);
                $('#edit_player_number').val(number);
            }
        }
    });

    // Close dialog and save player
    $('#edit_player').submit(function (e) {

        var id = $('#edit_player_id').val();
        var name = $('#edit_player_name').val();
        var number = $('#edit_player_number').val();

        $('[data-player=' + id + ']').find('.name').html(name);
        $('[data-player=' + id + ']').find('.number').html(number);

        $(".edit_player").fadeOut();

        e.preventDefault();
    });


    $(".team_settings").click(function () {
        var teamname = $('.teamname').text();

        // Clear fields
        $('#edit_player_name, #edit_player_number').val('');
        $(".edit_team").fadeIn();

        $('#edit_team_name').val(teamname);
    });

    // Close dialog and save team
    $('#edit_team').submit(function (e) {
        var team_name = $('#edit_team_name').val(),
            formation = $('#edit_lineup').val();

        $('.teamname').html(team_name);
        $("#formation").attr('class', '');

        $("#formation").addClass('formation formation-' + formation);

        $(".edit_team").fadeOut();

        e.preventDefault();
    });

    // Close dialogs
    $(".close_btn").click(function () {
        $(".dialog").fadeOut();
    });

});

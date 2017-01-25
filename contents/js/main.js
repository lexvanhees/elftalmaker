$(function () {
	$(".player").draggable({
		containment: "parent",

		start: function(event, ui) {
			$(this).addClass('noclick');
		}
	});
});

$(function() { 
    $(".btn").click(function() { 
        html2canvas($("#field"), {
            onrendered: function(canvas) {
                theCanvas = canvas;
                document.body.appendChild(canvas);

                // Convert and download as image 
                Canvas2Image.saveAsPNG(canvas);
                var image = Canvas2Image.convertToPNG(canvas);
               var image_data = $(image).attr('src');
              

               	$('canvas').attr('name', 'value');

               	alert(canvas.toDataURL());

                $("#img-out").append(canvas);
                // Clean up 
                //document.body.removeChild(canvas);
            }
        });
    });
}); 


$(document).ready(function () {


        $("#buttonTextArea").click(function() {
            var canvas  = document.getElementById("ex1");
            var dataUrl = canvas.toDataURL();

            document.getElementById("textArea").value = dataUrl;
        });

        $("#buttonWindow").click(function(){
            var canvas  = document.getElementById("ex1");
            var dataUrl = canvas.toDataURL();

            window.open(dataUrl, "toDataURL() image", "width=600, height=200");
        });






	// Open dialog for editing player
	$(".player").on('click touchstart', function() {

		if ($(this).hasClass('noclick')) {
			$(this).removeClass('noclick');
		}

		var id = $(this).data('player');
		var name = $('[data-player=' + id + ']').find('.name').text();
		var number = $('[data-player=' + id + ']').find('.number').text();

		// Clear fields
		$('#edit_player_name, #edit_player_number').val('');
		$(".edit_player").fadeIn();

		$('#edit_player_id').val(id);
		$('#edit_player_name').val(name);
		$('#edit_player_number').val(number);
	});

	// Close dialog and save player
	$('#edit_player').submit(function(e){

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
	$('#edit_team').submit(function(e){
		var team_name = $('#edit_team_name').val(),
			formation = $('#edit_lineup').val();

		$('.teamname').html(team_name);
		$("#formation").attr('class', '');

		$("#formation").addClass('formation formation-'+formation);

		$(".edit_team").fadeOut();

		e.preventDefault();
	});

	// Close dialogs
	$(".close_btn").click(function(){
		$(".dialog").fadeOut();
	});




	$("#colorpicker").spectrum({
		color: "#f00",
		preferredFormat: "hex",
	});

// Change jersey
	$("#colorpicker").change(function () {
		var color = $(this).val();
		$('.player').css('background-color', '' + color + '');
	});


});
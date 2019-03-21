var table = null;
$('.close-uploader').click(function(){
	window.location.reload();
});
$(document).ready(function() {
	
    table =  $('#directory_table').dataTable({
     "ajax": {
         "url": base_url+'admin/getGallery',
         "dataSrc": "image"
     },
     "columns": [
         { "data": "id" },
         { "data": "picture" },
         { "data": "description" },
		 {
						 "data": null,
						"defaultContent": '<button class="fa fa-pencil-square-o" id="editStudent" data-toggle="modal" data-target=".myModal" value="" </button> <button class="fa fa-trash" id="DeleteGallery"></button>' 
						
								/* "targets": -1,
								"data": null,
								"defaultContent": "<button>Click!</button>" */
							
					}
     ]
   });
   $('body').on( 'click', '.DeleteGallery', function () {
		var id = $(this).attr('data-id');
		var this_ele = $(this);
		$.ajax({
			  type: "POST",
			  url: base_url+'admin/deleteGallery',
			  data: {id:id},
			  dataType: "json",
			  success: function(data) {
				  window.location.reload();
			  },
			  error: function(e){
				  console.log(e)
				  $('#loader').hide();
			  },
			  complete: function(){
				  $('#loader').hide();
			  }
			}); 
   });
   $('body').on( 'click', '.editGallery', function () {
	   $('#gallery_id').val('');
	   $('#upload_status').text('');
		$('#desc_text').val('');
		var id = $(this).attr('data-id');
		$('#gallery_id').val(id);
		$('#desc_text').val($(this).find('.descr_text').html());
   });
   
   
} );


//var base_url = "http://192.168.1.20/virch/";
var editor;
var table106 = null;
	$('#subject123').DataTable().destroy();
		$("#student_list12345").show();
		 table106 =  $('#subject123').DataTable( {
			"ajax": base_url+"admin/getAllSubjects",  
				"columns": [
				    {"data": "id" },
				    {"data": "subject" },
					{"data": "description" },
					/*{"data": "creationDate"},*/
					{
						 "data": null,
						"defaultContent": '<button class="fa fa-pencil-square-o" id="editSubject" data-toggle="modal" data-target=".bs-example12345-modal-lg" value="" </button>  <button class="fa fa-trash" id="DeleteSubject"></button>' 
						
								
							
					}
					
				]
        
				
				
		} );

	 

$('#subject123 tbody').on( 'click', '#editSubject', function () {
		//alert(true)
		//var table  = $('#example').DataTable();
		var data = table106.row(  $(this).parents('tr') ).data();
		console.log(data)
		$("#subjectTitle").val(data.subject);
		$("#subjectdetails").val(data.description);
		$("#id").val(data.id);
	/* 	$('form').submit(function(e) {		
		$.ajax({
			  type: "POST",
			  url: base_url+'admin/updateStudent',
			  data: {std:data},
			  dataType: "json",
			  success: function(data) {
				  
				 
				
				
		
				  console.log(data)
				//  window.location.href = base_url+'admin/forgot_password'; 
			  },
			  error: function(e){
				  console.log(e)
				//  $('#loader').hide();
			  },
			  complete: function(){
				  $('#loader').hide();
			  }
			});
    } ); */
	
});


$('#subject123 tbody').on( 'click', '#DeleteSubject', function () {
	
	    var data = table106.row(  $(this).parents('tr') ).data();
		console.log(data);
		$("#id").val(data.id);
		var id = $("#id").val();	//alert(id);
			 
		$.ajax({
			  type: "POST",
			  url: base_url+'admin/deleteSubjects',
			  data: {id:id},
			  dataType: "json",
			  success: function(data) {
				  console.log(data);
				//  modal.close();
				 // $(this).parents ('tr').hide ();
				  console.log(table);
				 table106.ajax.reload();
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





 
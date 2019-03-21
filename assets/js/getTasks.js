var editor;
var table2 = null;

	$('#datatable-buttons12').DataTable().destroy();
		$("#devices_list123").show();
		
		 table2 =  $('#datatable-buttons12').DataTable( {
			 
			 
			"ajax": base_url+"Users/getAllUserDevices",
			
		
			  
				"columns": [
				    {
  render: function (data, type, full, meta ) {
        return meta.row + meta.settings._iDisplayStart + 1;
    },
		},
					{"data": "UserName" },
					{"data": "DeviceMacId"},
					{"data": "AppOs"},
					{"data": "RegisteredDateTime"},
					
					
						 {
						 sortable: false,
						 "render": function ( data, type, full, meta ) {
							 
							 return '<td><a href="#" data-toggle="modal" data-target=".bs-example130-modal-sm" class="btn btn-danger btn-xs" id="DeleteDevice" title="Delete Device"><i class="fa fa-trash-o"></i></a></td>';
							 
							 
						 }
						 
						 
					 }

				 
					
					
				],
				
				
				
				
        
				
				
		} );
		 
		 $('#datatable-buttons12 tbody').on( 'click', '#DeleteDevice', function () {
				
			    var data = $('#datatable-buttons12').DataTable().row(  $(this).parents('tr') ).data();
				console.log(data);
				
					 
				$('#RemoveDevice').click(function() {
		   
					 
				$.ajax({
					  type: "POST",
					  url: base_url+'Users/deleteDevices',
					  data: {id:data.UserDeviceMapId},
					  dataType: "json",
					  success: function(data) {
						  console.log(data);
						
						 $('#datatable-buttons12').DataTable().ajax.reload();
						 $('.modal').modal('hide');
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
			
			    });	
		

	 






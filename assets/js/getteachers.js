var editor;
var table1 = null;

	$('#datatable-buttons').DataTable().destroy();
		$("#student_list123").show();
		
		 table1 =  $('#datatable-buttons').DataTable( {
			 
			   // scrollY:        "300px",
		        //scrollX:        "300px",
		        //scrollCollapse: true,
		        paging:         true,
		        columnDefs: [
		            { width: '50px', targets: 0 }
		        ],
		        fixedColumns: true,
			//responsive: true,
			
			"ajax": base_url+"Users/getAllUsers",
			
		
			  
				"columns": [
				    {
  render: function (data, type, full, meta ) {
        return meta.row + meta.settings._iDisplayStart + 1;
    },
		},
				    {"data": "UserLogin" },
					{"data": "UserName" },
					{"data": "RoleName"},
					{"data": "UserEmail"},
					{"data": "StoreName"},
					{"data": "UserDeletedFlag"},
					
					
						 {
						 sortable: false,
						 "render": function ( data, type, full, meta ) {
							 
							  if(full.UserDeletedFlag === 'Inactive'){
									 
									 var classes = 'btn btn-danger btn-xs';
									 var id = 'activateUser';
									 var title = 'ActivateUser'
								 }
								 
								 else{
									 var classes = 'btn btn-success btn-xs';
									 var id = 'DeactivateUser';
									 var title = 'DeactivateUser'
									 
								 }
							 
							 return '<td><a href="#" class="btn btn-primary btn-xs" title="View Details" data-toggle="modal" data-target=".bs-example15-modal-lg" id="details"><i class="fa fa-folder"></i><a href="#" class="btn btn-info btn-xs" data-toggle="modal" data-target=".bs-example12-modal-lg" title="Edit User" id="EditUser"><i class="fa fa-pencil"></i></a><a href="#" data-toggle="modal" data-target=".bs-example13-modal-sm" class="'+classes+'" id="'+id+'" title="'+title+'"><i class="fa fa-ban"></i></a></td>';
							 
							 
						 }
						 
						 
					 }

				 
					
					
				],
				
				
				
				
        
				
				
		} );

	 

 $('#datatable-buttons tbody').on( 'click', '#EditUser', function () {
		// alert(table)
		// var table = $('#example').DataTable();
		var data = $('#datatable-buttons').DataTable().row($(this).parents('tr')).data();
		
		$("#EditName").val(data.UserName);
		$("#Editemail").val(data.UserEmail);
		$("#editEmpCode").val(data.UserLogin);
		$("#editTelephone").val(data.UserMobileNumber);
		$("#EditstoreID").val(data.UserStoreId);
		$("#EditRoleName").val(data.UserRoleId);
		$("#updateid").val(data.UserID);
		
	 
	
});


 $('#datatable-buttons tbody').on( 'click', '#DeactivateUser', function () {
	
	    var data = $('#datatable-buttons').DataTable().row(  $(this).parents('tr') ).data();
		console.log(data);
		
			 
	
   
			 
		$.ajax({
			  type: "POST",
			  url: base_url+'Users/deleteUsers',
			  data: {id:data.UserID},
			  dataType: "json",
			  success: function(data) {
				  console.log(data);
				
				 $('#datatable-buttons').DataTable().ajax.reload();
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
 
 
 $('#datatable-buttons tbody').on( 'click', '#activateUser', function () {
		
	    var data = $('#datatable-buttons').DataTable().row(  $(this).parents('tr') ).data();
		console.log(data);
		
			 
	

			 
		$.ajax({
			  type: "POST",
			  url: base_url+'Users/ActivateUsers',
			  data: {id:data.UserID},
			  dataType: "json",
			  success: function(data) {
				  console.log(data);
				
				 $('#datatable-buttons').DataTable().ajax.reload();
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


 $('#datatable-buttons tbody').on( 'click', '#details', function () {
		// alert(table)
	
		var data = $('#datatable-buttons').DataTable().row($(this).parents('tr')).data();
		
			console.log(data);
		$("#DetailsName").val(data.UserName);
		$("#DetailsTelephone").val(data.UserMobileNumber);
		$("#Detailsemail").val(data.UserEmail);
		$("#DetailsCode").val(data.UserLogin);
		$("#DetailstoreID").val(data.UserStoreId);
		$("#DetailsRoleName").val(data.UserRoleId);
		$("#Detailstatuus").val(data.UserDeletedFlag);
		
	 
	
});		



  
        $(".cancelBtn").click(function(){
            location.reload(true);
        });
		
		 $("#cancelBtn2").click(function(){
            location.reload(true);
        });
		 
		 $(".close").click(function(){
	            location.reload(true);
	        });
		 
		 
		 
	
		  $('#editEmpCode').on("cut copy paste",function(e) {
		      e.preventDefault();
		   });
		   
		   $('#EmpCode').on("cut copy paste",function(e) {
		      e.preventDefault();
		   });
		  
		  
		  
		 

		





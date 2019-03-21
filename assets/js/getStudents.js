var editor;
var table3 = null;

	$('#datatable-buttons15').DataTable().destroy();
		$("#student_list10").show();
		
		 table3 =  $('#datatable-buttons15').DataTable( {
			 
			 paging:         true,
		        columnDefs: [
		            { width: '50px', targets: 0 }
		        ],
		        fixedColumns: true,
			
			"ajax": base_url+"Stores/getAllStores",
			
		
			  
				"columns": [
				    {
  render: function (data, type, full, meta ) {
        return meta.row + meta.settings._iDisplayStart + 1;
    }
		},
				    {"data": "StoreCode" },
					{"data": "StoreName" },
					{"data": "StoreCity"},
					{"data": "StoreDeletedFlag"},
					
					
					
						 {
						 sortable: false,
						 "render": function ( data, type, full, meta ) {
						 
						  if(full.StoreDeletedFlag === 'Inactive'){
						 
						 var classes = 'btn btn-danger btn-xs';
						 var id = 'activateStore';
						 var title = 'ActivateStore'
					 }
					 
					 else{
						 var classes = 'btn btn-success btn-xs';
						 var id = 'DeactivateStore';
						 var title = 'DeactivateStore'
						 
					 }
							 
							 return '<td><a href="#" class="btn btn-primary btn-xs" title="View Details" data-toggle="modal" data-target=".bs-example105-modal-lg" id="StoreDetails"><i class="fa fa-folder"></i><a href="#" class="btn btn-info btn-xs" data-toggle="modal" data-target=".bs-example120-modal-lg" title="EditStore" id="EditStoreData"><i class="fa fa-pencil"></i></a><a href="#" data-toggle="modal" data-target=".bs-example17-modal-sm" class="'+classes+'" id="'+id+'" title="'+title+'"><i class="fa fa-ban"></i></a></td>';
							 
							 
						 }
						 
						 
					 }

				 
					
					
				],
				
				
				
				
        
				
				
		} );
		 
		 
		 
		 $('#datatable-buttons15 tbody').on( 'click', '#EditStoreData', function () {
				//alert(table)
			
				//var table  = $('#example').DataTable();
				var data = $('#datatable-buttons15').DataTable().row($(this).parents('tr')).data();
				console.log(data);
				
				$("#EditStoreCode").val(data.StoreCode);
				$("#EditStoreName").val(data.StoreName);
				$("#editstoreaddress").val(data.StoreAddress);
				$("#editstorecity").val(data.StoreCity);
				$("#editstorelat").val(data.StoreLat);
				$("#editstorelong").val(data.StoreLong);
				$("#updateidstore").val(data.StoreId);
				
			 
			
		});
		
		
		
		 $('#datatable-buttons15 tbody').on( 'click', '#StoreDetails', function () {
				//alert(table)
			
				//var table  = $('#example').DataTable();
				var data = $('#datatable-buttons15').DataTable().row($(this).parents('tr')).data();
				console.log(data);
				
				$("#DEditStoreCode").val(data.StoreCode);
				$("#DEditStoreName").val(data.StoreName);
				$("#Dstoreaddress").val(data.StoreAddress);
				$("#Deditstorecity").val(data.StoreCity);
				$("#Deditstorelat").val(data.StoreLat);
				$("#Deditstorelong").val(data.StoreLong);
				$("#DEditStoreStatus").val(data.StoreDeletedFlag);
				
				
			 
			
		});
		
		
		$('#datatable-buttons15 tbody').on( 'click', '#DeactivateStore', function () {
	
	    var data = table3.row(  $(this).parents('tr') ).data();
		console.log(data);
		
			$.ajax({
			  type: "POST",
			  url: base_url+'Stores/dectivateStores',
			  data: {id:data.StoreId},
			  dataType: "json",
			  success: function(data) {
				  console.log(data);
				  
				
				 $('#datatable-buttons15').DataTable().ajax.reload();
				
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


	$('#datatable-buttons15 tbody').on( 'click', '#activateStore', function () {
	
	    var data = table3.row(  $(this).parents('tr') ).data();
		console.log(data);
		
			$.ajax({
			  type: "POST",
			  url: base_url+'Stores/activateStores',
			  data: {id:data.StoreId},
			  dataType: "json",
			  success: function(data) {
				  console.log(data);
				  
				
				 $('#datatable-buttons15').DataTable().ajax.reload();
				
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

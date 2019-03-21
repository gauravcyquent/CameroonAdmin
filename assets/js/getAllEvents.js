//var base_url = "http://192.168.1.20/virch/";
var editor;
var table10 = null;
$('#datatable-buttons109').DataTable().destroy();
$("#student_list100").show();

 table10 =  $('#datatable-buttons109').DataTable( {
	 
	responsive: true,
	
	"ajax": base_url+"Department/getAllDepartments",
	

	  
		"columns": [{
  render: function (data, type, full, meta ) {
        return meta.row + meta.settings._iDisplayStart + 1;
    },
		},

		    {"data": "DepartmentCode" },
			{"data": "DepartmentName" },
			{"data": "DepartmentDeletedFlag"},
			
			
				 {
				 sortable: false,
				 "render": function ( data, type, full, meta ) {
					 
					// console.log(data);
					 
					 
					 if(full.DepartmentDeletedFlag === 'Inactive'){
						 
						 var classes = 'btn btn-danger btn-xs';
						 var id = 'activateDept';
						 var title = 'ActivateDepartment'
						
					 }
					 
					 else{
						 var classes = 'btn btn-success btn-xs';
						 var id = 'DeactivateDept';
						 var title = 'DeactivateDepartment'
						 
					 }
					 return '<td><a href="#" class="btn btn-primary btn-xs" title="View Details" data-toggle="modal" data-target=".bs-example1050-modal-lg" id="deptdetails"><i class="fa fa-folder"></i><a href="#" class="btn btn-info btn-xs" data-toggle="modal" data-target=".bs-example12090-modal-lg" title="Edit User" id="EditDept"><i class="fa fa-pencil"></i></a><a href="#" data-toggle="modal" data-target=".bs-example13-modal-sm" class="'+classes+'" id="'+id+'" title="'+title+'"><i class="fa fa-ban"></i></a></td>';
					 
					 
				 },
				 
				 
				 
			 }

		 
			
			
		],
		
		
		
		
		
		

		
		
} );


	 

$('#datatable-buttons109 tbody').on( 'click', '#EditDept', function () {
		// alert(true)
		// var table = $('#example').DataTable();
		var data = table10.row(  $(this).parents('tr') ).data();
		console.log(data)
		$("#Editdeptcode").val(data.DepartmentCode);
		$("#Editdeptname").val(data.DepartmentName);
		$("#updateidDept").val(data.DepartmentId);
	
	
});


$('#datatable-buttons109 tbody').on( 'click', '#DeactivateDept', function () {
	
	    var data = table10.row(  $(this).parents('tr') ).data();
		console.log(data);
		
			$.ajax({
			  type: "POST",
			  url: base_url+'Department/deactivateDepartment',
			  data: {id:data.DepartmentId},
			  dataType: "json",
			  success: function(data) {
				  console.log(data);
				  
				
				 $('#datatable-buttons109').DataTable().ajax.reload();
				
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

$('#datatable-buttons109 tbody').on( 'click', '#activateDept', function () {
	
    var data = table10.row(  $(this).parents('tr') ).data();
	console.log(data);
	
		$.ajax({
		  type: "POST",
		  url: base_url+'Department/activateDepartment',
		  data: {id:data.DepartmentId},
		  dataType: "json",
		  success: function(data) {
			  console.log(data);
			  
			
			 $('#datatable-buttons109').DataTable().ajax.reload();
			
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

$('#datatable-buttons109 tbody').on( 'click', '#deptdetails', function () {
	// alert(table)

	var data = $('#datatable-buttons109').DataTable().row($(this).parents('tr')).data();
	
		console.log(data);
	$("#Ddeptcode").val(data.DepartmentCode);
	$("#Deditdeptname").val(data.DepartmentName);
	$("#DCreatedBy").val(data.CreatedByUser);
	$("#Dtimedate").val(data.CreatedDateTime);
	$("#DModifiedBy").val(data.ModifiedByUser);
	$("#DMtimedate").val(data.ModifiedDateTime);
	$("#Dstatus").val(data.DepartmentDeletedFlag);
	
	
 

});	




$('#deptcode').on("cut copy paste",function(e) {
    e.preventDefault();
 });


$(':input').keyup(function() {
	 if ($(this).val().length == $(this).attr('maxlength')) {
	        $(this).closest('div').next().find(':input').first().focus();
	    }
}).keydown(function(e) {
    if ((e.which == 8 || e.which == 46) && $(this).val() =='') {
    	$(this).closest('div').prev().find(':input').first().focus();
    }
});




 
var table8 = null;
var table9 = null;
$(document).ready(function() {
	/*Privilege JS*/
	table8 =  $('#privilegesTable').DataTable({
     "ajax": {
         "url": base_url+'admin/getPrivileges',
         "dataSrc": "data",
		
		 
     },
     "columns": [
         { "data": "id" },
         { "data": "title" },
         { "data": "description" },
         { "data": "status" },
		 {
			"data": null,
			"defaultContent": '<button class="fa fa-pencil-square-o" id="editPrivileges" data-toggle="modal" data-target="#editPrivilegeModal" value="" </button>' 
		}
     ]
   });
   /*Privilege JS*/
	table9 =  $('#rolesTable').DataTable({
     "ajax": {
         "url": base_url+'admin/getRoles',
         "dataSrc": "data",
		
		 
     },
     "columns": [
         { "data": "id" },
         { "data": "title" },
         { "data": "description" },
         { "data": "status" },
         { "data": "roles" },
		 {
			"data": null,
			"defaultContent": '<button class="fa fa-pencil-square-o" id="editRoles" data-toggle="modal" data-target="#editRoleModal" value="" </button>  <button class="fa fa-trash" id="deleteRoles"></button>' 
		}
     ]
   });
   
   $('#privilegesTable tbody').on( 'click', '#editPrivileges', function () {
	    $('.search-error').html('');
		var data = table8.row(  $(this).parents('tr') ).data();
		$("form#editprivilege #status option:contains(" + data.status + ")").attr('selected', 'selected');
		$("form#editprivilege #title").val(data.title);
		$("form#editprivilege #description").val(data.description);
		$("form#editprivilege #privilege_id").val(data.id);
	});
	$('#privilegesTable tbody').on( 'click', '#deletePrivileges', function () {
	
	    var data = table8.row(  $(this).parents('tr') ).data();
		var id = data.id;	 
		$.ajax({
		  type: "POST",
		  url: base_url+'admin/deletePrivileges',
		  data: {id:id},
		  dataType: "json",
		  success: function(data) {
			 table8.ajax.reload();
		  },
		  error: function(e){
			  $('#loader').hide();
		  },
		  complete: function(){
			  $('#loader').hide();
		  }
		}); 
	
	});
	/*roles js*/
	$('#rolesTable tbody').on( 'click', '#editRoles', function () {
		$('.search-error').html('');
		var data = table9.row(  $(this).parents('tr') ).data();
		$("form#editrole #status option:contains(" + data.status + ")").attr('selected', 'selected');
		$("form#editrole #title").val(data.title);
		$("form#editrole #description").val(data.description);
		$("form#editrole #role_id").val(data.id);
		$("form#editrole select#privilege_select option").removeAttr('selected');
		privilege_ids = [];
		privilege_ids = data.roles.split(',');
		for(i=0;i<$("form#editrole select#privilege_select option").length;i++){
			if(privilege_ids.indexOf($("form#editrole select#privilege_select option").eq(i).val())!=-1){
				$("form#editrole select#privilege_select option").eq(i).prop('selected', true);
			} 
		}
	});
	$('#rolesTable tbody').on( 'click', '#deleteRoles', function () {
	
	    var data = table9.row(  $(this).parents('tr') ).data();
		var id = data.id;	
		$.ajax({
		  type: "POST",
		  url: base_url+'admin/deleteRoles',
		  data: {id:id},
		  dataType: "json",
		  success: function(data) {
			 table9.ajax.reload();
		  },
		  error: function(e){
			  $('#loader').hide();
		  },
		  complete: function(){
			  $('#loader').hide();
		  }
		}); 
	
	});
});
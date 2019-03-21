$(function () {
	var d = new Date();
    $('#attendance_date').datetimepicker({
		format: 'DD/MM/YYYY',
		maxDate: d
	});
});
$(document).ready(function(){
	var today = new Date();
var dd = today.getDate();
var mm = today.getMonth()+1; //January is 0!

var yyyy = today.getFullYear();
if(dd<10){
    dd='0'+dd;
} 
if(mm<10){
    mm='0'+mm;
} 
var today = dd+'/'+mm+'/'+yyyy;
	$('input.select_all').click(function(){
		if($(this).is(':checked')){
			$('input.userid_checkbox').prop('checked',true);
		}
		else{
			$('input.userid_checkbox').removeAttr('checked');
		}
	});
	$(document).on('click', "#showstudentlist", function(e){
		var classes = $("#class").val();
		var section = $("#section").val();
		if(classes!='' && section!=''){
		
		
		var Obj = {};
		var student = 0;
        var classes = $("#class").val();
		var section = $("#section").val();
		var attendance_date = $("#attendance_date").val();
		var student = $('#student').val();
		var date = $('input[name="date"]').val();
		if(today!=date){
			$('.notification-button').hide();
			console.log('hide');
		}
		else{
			$('.notification-button').show();
			console.log('show');
		}
		$('#attendanceTable').DataTable().destroy();
		table7 =  $('#attendanceTable').DataTable( {
			"dom": '<"toolbar_attendance">frtip', 
			"ajax": base_url+"admin/getStudentsForAttendance?classes="+classes+"&section="+section+"&student="+student+"&date="+date,
			
			 "columns": [
				{
					 sortable: false,
					 "render": function ( data, type, full, meta ) {
						 return '<input type="checkbox" name="userid[]" class="userid_checkbox" value="'+full.id+'" />';
					 }
				},
				{
					 sortable: false,
					 "render": function ( data, type, full, meta ) {
						 return full.firstname;
					 }
				},
				
				{
					 sortable: false,
					 "render": function ( data, type, fulls, meta ) {
						var att_class;
						att_status = fulls.att_status;
						$.ajax({
						  type: "POST",
						  'global': false,
						  'async': false,
						  url: base_url+"admin/getFieldByWhere",
						  data: {userid:fulls.id,date:date,table:'attendance'},
						  beforeSend : function(){
							  
						  },
						  success: function(data) {
							  //clearconsole();
							  att_status = data;
						  },
						  error: function(e){
						  },
						  complete: function(){
						  }
						}); 
						 if(att_status==undefined || parseInt(att_status)==17 || parseInt(att_status)==0){
							 att_class = 'fa-square-o';
						 }
						 else if(parseInt(att_status)==16){
							 att_class = 'fa-square present_status';
							 
						 }
						 else{
							 att_class = 'fa-square absent_status';
						 } 
						 return '<i class="fa '+att_class+'" aria-hidden="true"></i>';
					 }
				},
			],
			"initComplete": function(settings, json) {
				if(today!=date){
					$('.notification-button').hide();
					console.log('hide');
				}
				else{
					$('.notification-button').show();
					console.log('show');
				}
			  }
					
		} ); 
		$("div.toolbar_attendance").html('<input type="button" value="Present" class="btn btn-primary" onclick="javascript:updateStudentAttendance(16);" /><input type="button" value="Absent" class="btn btn-primary" onclick="javascript:updateStudentAttendance(15);" /><input type="button" value="Send Notification" class="btn btn-primary notification-button" onclick="javascript:sendNotification();" />');
		}
		else{
			alert('Please select classs and section.');
		}
	});
	$('#class').change(function(){
		getStudentList($(this).val(),$('section').val());
	});
	$('#section').change(function(){
		getStudentList($('#class').val(),$(this).val());
	});
});
function getStudentList(classes,section){
	var student = 0;
	$.ajax({
	  type: "GET",
	  url: base_url+"admin/getStudents",
	  data: {classes:classes,section:section},
	  beforeSend : function(){
		  
	  },
	  success: function(data) {
		  var options = '<option value="0">Select Student</option>';
		  Obj = JSON.parse(data);
		  for(i=0;i<Obj.data.length;i++){
			  options += '<option value="'+Obj.data[i].id+'">'+Obj.data[i].firstname+'</option>';
		  }
		  $('#student').html('');
		  $('#student').append(options);
	  },
	  error: function(e){
	  },
	  complete: function(){
	  }
	}); 
} 
function updateStudentAttendance(atten_status){
	var userid = [];
	var usernonid = [];
	$('input.userid_checkbox').each(function(){
		if($(this).is(':checked')){
			userid.push($(this).val());
		}
		else{
			usernonid.push($(this).val());
		}
	});
	var userid = userid.join(',');
	var usernonid = usernonid.join(',');
	
	var attendance_date = $('input[name="date"]').val();
	var a_url = base_url+'admin/updateAttendance';
	var Obj = {};
	Obj.class = $('#class').val();
	Obj.section = $('#section').val();
	Obj.userid = userid;
	Obj.usernonid = usernonid;
	Obj.date = attendance_date;
	Obj.status = atten_status;
	$.ajax({
	  type: "POST",
	  url: a_url,
	  beforeSend : function(){
		  
	  },
	  data: {data:Obj},
	  success: function(data) {
		  table7.ajax.reload();
	  },
	  error: function(e){
	  },
	  complete: function(){
	  }
	});  
}
function clearconsole() { 
  if(window.console || window.console.firebug) {
	console.clear();
  }
}
function sendNotification(){
	var userid = [];
	var Obj = {};
	var att_status = false;
	$('input.userid_checkbox').each(function(){
		if($(this).is(':checked')){
			userid.push($(this).val());
			if($(this).closest('tr').find('td:last-child i').hasClass('fa-square-o')){
				att_status = true;
				console.log('has');
			}
		}
		
	});
	if(!userid.length){
		alert('Please select student to send notification.');
	}
	else if(att_status==true){
		alert('Please unselect student with no attendance.');
	}
	else{
		Obj.userid = userid;
		Obj.class = $('#class').val();
		Obj.section = $('#section').val();
		var attendance_date = $('input[name="date"]').val();
		Obj.date = attendance_date;
		var a_url = base_url+'admin/sendAttendanceNotification';
		$.ajax({
		  type: "POST",
		  url: a_url,
		  beforeSend : function(){
			  
		  },
		  data: {data:Obj},
		  success: function(data) {
			 console.log(data);
		  },
		  error: function(e){
		  },
		  complete: function(){
		  }
		}); 
	}
	
} 
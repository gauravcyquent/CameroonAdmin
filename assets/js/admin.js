var table; 
var leaveObj = {};
var holidayObj = {};
var reportObj = {};
var leaveData = null;
var holidayData = null;
var reportData = null;
var hFlag=true;
var rFlag=true;
var holidayId=null;
var reportId=null;
var rclass=null;
var rsection=null;
var rsubject=null;

$(document).ready(function() {
        var handleDataTableButtons = function() {
          if ($("#datatable-buttons").length) {
            $("#datatable-buttons").DataTable({
              dom: "Bfrtip",
              buttons: [
                {
                  extend: "copy",
                  className: "btn-sm"
                },
                {
                  extend: "csv",
                  className: "btn-sm"
                },
                {
                  extend: "excel",
                  className: "btn-sm"
                },
                {
                  extend: "pdfHtml5",
                  className: "btn-sm"
                },
                {
                  extend: "print",
                  className: "btn-sm"
                },
              ],
              responsive: true
            });
          }
        };

        TableManageButtons = function() {
          "use strict";
          return {
            init: function() {
              handleDataTableButtons();
            }
          };
        }();

        $('#datatable').dataTable();

        $('#datatable-keytable').DataTable({
          keys: true
        });

        $('#datatable-responsive').DataTable();

        $('#datatable-scroller').DataTable({
          ajax: "js/datatables/json/scroller-demo.json",
          deferRender: true,
          scrollY: 380,
          scrollCollapse: true,
          scroller: true
        });

        $('#datatable-fixed-header').DataTable({
          fixedHeader: true
        });

        var $datatable = $('#datatable-checkbox');

        $datatable.dataTable({
          'order': [[ 1, 'asc' ]],
          'columnDefs': [
            { orderable: false, targets: [0] }
          ]
        });
        $datatable.on('draw.dt', function() {
          $('input').iCheck({
            checkboxClass: 'icheckbox_flat-green'
          });
        });

        TableManageButtons.init();
        var dateToday = new Date();
		$('#birthday1').daterangepicker({
	    		locale: {
	                format: 'DD/MM/YYYY'
					
	            },
	    		  singleDatePicker: false,
				  minDate: dateToday,
	    		  calender_style: "picker_4",
	    		  showDropdowns: true
    		    }, function(start, end, label) {
    		      console.log(start.toISOString(), end.toISOString(), label);
    		    });
    	$('#birthday').daterangepicker({
	    		locale: {
	                format: 'DD/MM/YYYY'
					
	            },
	    		  singleDatePicker: true,
	    		  calender_style: "picker_4",
	    		  showDropdowns: true
    		    }, function(start, end, label) {
    		      console.log(start.toISOString(), end.toISOString(), label);
    		    });
    	//Load leave data
    	
    	 if(window.location.href.indexOf("leaves") > -1) {
    		 loadLeaves();
    	 }
    	//Load holiday data
    	 if(window.location.href.indexOf("holidays") > -1) {
    		 loadHolidays();
    	 }
    	 
    	 //load report
    	 if(window.location.href.indexOf("report") > -1) {
    		 loadReport();
    	 }
    	 
    	 $(".leaveProcess").on("click", function(e) {
    		    leaveObj.comments = $(".comments").val();
    		    leaveObj.approverId = $("#sessionId").val();
    		    leaveObj.leaveStatus = $(this).attr('status');
    		    //console.log(leaveObj)
    			$.ajax({
    				  type: "POST",
    				  url: base_url+'admin/approveLeave',
    				  beforeSend : function(){
    					  $('#loader').show();
    				  },
    				  data: {leaves: leaveObj},
    				  dataType: "json",
    				  success: function(data) {
    					  console.log(data)
    					  if(data.status){
    						  if(confirm(data.msg)){
    							
    							 //$('#myModal').hide();
    							  $('#myModal').modal('toggle');
    							  $('#leaveTable').DataTable().destroy();
    							  loadLeaves();
    						  }
    					  }else{
    						  alert("There is some error in approval.");
    					  }
    				  },
    				  error: function(e){
    					  $('#loader').hide();
    				  },
    				  complete: function(){
    					  $('#loader').hide();
    				  }
    				});
    	 });
    	 
    	 
    	 $('#leaveTable tbody').on('click', '.approveLeave', function () {
    		 	$(".comments").val('');
    		 	var getData = leaveData.data;
				$("#myModal").modal();
				var rowId = this.id;
				for (var i in getData) {
					//console.log(getData[i])
					var leaveId = getData[i].leaveId;
					if(leaveId==rowId){
						//console.log("Got")
						leaveObj.leaveId = getData[i].leaveId;
						leaveObj.name = getData[i].name;
						leaveObj.cClass = getData[i].classes;
						leaveObj.cSection = getData[i].section;
						leaveObj.fromDate = getData[i].fromDate;
						leaveObj.toDate = getData[i].toDate;
						leaveObj.reason = getData[i].remark;
						
						$(".name").html(leaveObj.name);
						$(".c-class").html(getData[i].classes);
						$(".c-section").html(leaveObj.cSection);
						$(".fromDate").html(leaveObj.fromDate);
						$(".toDate").html(leaveObj.toDate);
						$(".reason").html(leaveObj.reason);
						
					}
				}
    	    });
    	 /* Open holiday Modal */
    	 $('#addHolidays').on('click', function () {
    		 	hFlag=true;
    		 	holidayId=null;
    		 	$("#addHoliday").html("Add");
	    		$(".modal-title").html("Add Holiday");
	    		$("#addHolidayModal").modal();
    	 });
    	 
    	 /* Open addReport Modal */
    	 $('#addReport').on('click', function () {/* 
				$("#rclass").val("-1");
				$("#rsection").val("-1");
				$("#rsubject").val("-1"); */
	    		rFlag=true;
	    		reportId=null;
				$('#rclass').attr('disabled',false);
							$('#rsection').attr('disabled',false);
							$('#rsubject').attr('disabled',false);
	    		$("#addReportBtn").html("Add");
	    		$(".modal-title").html("Add Report");
	    		$("#reportModal").modal();
				$('#rclass').val("");
				$('#rsection').val("");
				$('#rsubject').val("");
				$("input[name=statusId]").prop("checked",false);
    	 });
    	 
    	 /* Add holiday */

	    	 /* $('#addholiday').on('submit', function () {
=======
	    	 $('#addHoliday').on('click', function () {
	    		 /*console.log(validator.checkAll($(this)));
	    		if (validator.checkAll($(this))) {*/
	    		
/* 
	    		holidayObj.holidayId = holidayId;
	 		 	holidayObj.addedBy = $("#sessionId").val();
	 		 	holidayObj.holiday = $("#holiday").val();
	 		 	holidayObj.holidayDesc = $("#holidayDesc").val();
	 		 	var date = $("#birthday").val();
	 		 	holidayObj.holidayDate = date.split("/").reverse().join("-");
	 		 	var d = new Date(date); //2016-12-11
	 		 	holidayObj.holidayDay = d.getDay();
	 		 	console.log(holidayObj)
    			$.ajax({
  				  type: "POST",
  				  url: base_url+'admin/addHoliday',
  				  beforeSend : function(){
  					  $this.button('loading');
  				  },
  				  data: {holidays: holidayObj},
  				  dataType: "json",
  				  success: function(data) {
  					  console.log(data)
  					  if(data.status){
  						  if(confirm(data.msg)){
  							
  							 //$('#myModal').hide();
  							  $('#addHolidayModal').modal('toggle');
  							  $('#holidayTable').DataTable().destroy();
  							  loadHolidays();
  						  }
  					  }else{
  						  alert("There is some error in adding holiday.");
  					  }
  				  },
  				  error: function(e){
  					$this.button('reset');
  				  },
  				  complete: function(){
  					$this.button('reset');
  				  }
  				});

	 	    }); 

	 		 	/*}else{
	    			alert(false)
	    		}
	 	    });*/ 

	    	 
	    	 /* Edit holiday*/
	    	 $('#holidayTable tbody').on('click', '.editRecord', function (e) {
	    		hFlag=false;
	    		$("#addHoliday").html("Update");
	    		$(".modal-title").html("Update Holiday");
	    		
	    		var getData = holidayData.data;
				$("#addHolidayModal").modal();
				var rowId = this.id;
				for (var i in getData) {
					//console.log(getData[i])
					holidayId = getData[i].id;
					//console.log(holidayId)
					if(holidayId==rowId){
						holidayObj.holiday = getData[i].occasion;
						holidayObj.holidayDesc = getData[i].desc;
						holidayObj.holidayDate = getData[i].date;
						console.log(holidayObj);
						$("#holiday").val(holidayObj.holiday);
						$("#holidayDesc").val(holidayObj.holidayDesc);
						$("#birthday1").val(holidayObj.holidayDate);
					}
				}
	    	  });
	    	 
	    	 /* Delete holiday*/
	    	 $('#holidayTable tbody').on('click', '.delRecord', function (e) {
	    		 if(confirm("Are you sure?")){
	    			 	var getData = holidayData.data;
		 				var rowId = this.id;
		 				for (var i in getData) {
		 					holidayId = getData[i].id;
		 					if(holidayId==rowId){
		 		    			$.ajax({
		 		    				  type: "POST",
		 		    				  url: base_url+'admin/deleteHoliday',
		 		    				  beforeSend : function(){
		 		    					  $('#loader').show();
		 		    				  },
		 		    				  data: {holidayId: holidayId},
		 		    				  dataType: "json",
		 		    				  success: function(data) {
		 		    					  if(data.status){
		 		    						  if(confirm(data.msg)){
		 		    							  $('#holidayTable').DataTable().destroy();
		 		    							  loadHolidays();
		 		    						  }
		 		    					  }else{
		 		    						  alert("There is some error in adding holiday.");
		 		    					  }
		 		    				  },
		 		    				  error: function(e){
		 		    					  $('#loader').hide();
		 		    				  },
		 		    				  complete: function(){
		 		    					  $('#loader').hide();
		 		    				  }
		 		    				});
		 					}
		 				} 
	    		 }
	    	  });
    	 /*get subject/class/section value on change event*/
	    	    $("#rclass").change(function(){
	    	    	rclass = this.value;
	    	    });
	    	    $("#rsection").change(function(){
	    	    	rsection = this.value;
	    	    });
	    	    $("#rsubject").change(function(){
	    	    	rsubject = this.value;
	    	    });
	    	    
	    	    
	    	    /* Add holiday */
		    	 $('#addReportBtn').on('click', function () {
/*	    		 	rFlag=true;
		    		$("#addReportBtn").html("Add");
		    		$(".modal-title").html("Add Report");*/
		    		 reportObj.reportId = reportId;
		    		 reportObj.classId = rclass;
		    		 reportObj.sectionId = rsection;	
		    		 reportObj.subjectId = rsubject;	
		    		 reportObj.statusId = $("input[name=statusId]:checked").val();
		    		 reportObj.addedBy = $("#sessionId").val();
		    		 
		 		 	console.log(reportObj)
	    			$.ajax({
	  				  type: "POST",
	  				  url: base_url+'admin/addReport',
	  				  beforeSend : function(){
	  					  $('#loader').show();
	  				  },
	  				  data: {report: reportObj},
	  				  dataType: "json",
	  				  success: function(data) {
	  					  console.log(data)
	  					  if(data.status){
	  						  if(confirm(data.msg)){
	  							 //$('#myModal').hide();
	  							  $('#reportModal').modal('toggle');
	  							  $('#reportTable').DataTable().destroy();
	  							  loadReport();
	  						  }
	  					  }else{
	  						  alert("There is some error in adding report.");
	  					  }
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
		    	 /* Delete report*/
		    	 $('#reportTable tbody').on('click', '.delReport', function (e) {
		    		 if(confirm("Are you sure?")){		    			 	
			 						var reportId = this.id;

			 		    			$.ajax({
			 		    				  type: "POST",
			 		    				  url: base_url+'admin/deleteReport',
			 		    				  beforeSend : function(){
			 		    					  $('#loader').show();
			 		    				  },
			 		    				  data: {reportId: reportId},
			 		    				  dataType: "json",
			 		    				  success: function(data) {
			 		    					  if(data.status){
			 		    						 $('#reportTable').DataTable().destroy();
		 		    							 loadReport();
			 		    					  }else{
			 		    						  alert("There is some error in adding holiday.");
			 		    					  }
			 		    				  },
			 		    				  error: function(e){
			 		    					  $('#loader').hide();
			 		    				  },
			 		    				  complete: function(){
			 		    					  $('#loader').hide();
			 		    				  }
			 		    				});
			 					
			 				
		    		 }
		    	  });
		    	 /* Edit report*/
		    	 $('#reportTable tbody').on('click', '.editReport', function (e) {
		    		rFlag=false;
		    		$("#addReportBtn").html("Update");
		    		$(".modal-title").html("Edit Report");
		    		console.log(reportData)
		    		var getData = reportData.data;
					$("#reportModal").modal();
					var rowId = this.id;
					console.log(rowId)
					for (var i in getData) {
						reportId = getData[i].progressId;
						if(reportId==rowId){
							//console.log(getData[i].statusId)
							$('#rclass').val(getData[i].classId);
							$('#rsection').val(getData[i].sectionId);
							$('#rsubject').val(getData[i].subjectId);
							$("input[name=statusId][value='"+getData[i].statusId+"']").prop("checked",true);
							
							$("input[name=statusId]").parent('label').removeClass("active");
							$("input[name=statusId][value='"+getData[i].statusId+"']").parent('label').addClass("active");
							rclass = getData[i].classId;
							rsection = getData[i].sectionId;
							rsubject = getData[i].subjectId;
							$('#rclass').attr('disabled',true);
							$('#rsection').attr('disabled',true);
							$('#rsubject').attr('disabled',true);
						}
					}
		    	  });
		    	 
		    	 $('.cancelBtn').on('click', function (e) {
		    		 window.location.replace(base_url+"admin");
		    	 });
		    	 
		    	 
  });

function loadLeaves(){
	 table =  $('#leaveTable').DataTable( {
			"ajax": base_url+"admin/getLeaves",
				"columns": [
				    {"data": "rollNumber" },
				    {"data": "name" },
					{"data": "classes" },
					{"data": "section"},
					{"data": "fromDate"},
					{"data": "toDate"},
					{"data": "remark"},
					{"data": "creationDate"},
					{
						 "data": "action",
						 "defaultContent": ''	
					}								
				],
				"order": [[ 7, "desc" ]],
				"initComplete": function (settings, data) {
					leaveData = data;
		        }
		} );
}

function loadHolidays(){
	 table =  $('#holidayTable').DataTable( {
			"ajax": base_url+"admin/getHolidays",
				"columns": [
				    {"data": "occasion" },
				    {"data": "date" },
					{"data": "action" }
				],
				"initComplete": function (settings, data) {
					holidayData = data;
					
		        }
		} );
}

/*if(window.location.href.indexOf("gallery") > -1) {*/
function loadReport(){
	 table =  $('#reportTable').DataTable( {
			"ajax": base_url+"admin/getReport",
				"columns": [
				    {"data": "subject" },
				    {"data": "cls" },
					{"data": "section" },
					{"data": "status" },
					{"data": "teacher" },
					{"data": "action" }
				],
				"initComplete": function (settings, data) {
					reportData = data;
					
		        }
		} );
}

$(document).ready(function(){
    $("#test").change(function(){
       var value = $("#test").val();
	   if(value == 1){
         $("#subunit").show();
       }
	   
	   else{
		    $("#subunit").hide();
	   }
    });
});


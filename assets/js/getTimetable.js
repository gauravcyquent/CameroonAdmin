//var base_url = "http://192.168.1.20/virch/";
var editor;
var table = null;
 var Obj = {};
         Obj.class = $("#dropdown100").val();
		 Obj.section = $("#dropdown200").val();  //
		 Obj.day = $("#day").val();
$(document).ready(function() {
	table2 =  $('#query_table').DataTable({
     "ajax": {
         "url": base_url+'admin/getQuery',
         "dataSrc": "data"
     },
     "columns": [
         { "data": "id" },
         { "data": "sender_id" },
         { "data": "name" },
         { "data": "query" },
         { "data": "date" },
		 {
						 "data": null,
						"defaultContent": '<button class="getQuery" id="" data-toggle="modal" data-target=".myModal" value="">Reply</button>' 
							
					}
     ]
   });
	
	
	 $('#example1234').hide();
$(document).on('click', "#getTime", function(e){
	//alert(464);
	
		  var Obj = {};
         Obj.class = $("#dropdown100").val();
		 Obj.section = $("#dropdown200").val();
         Obj.day	= 0;	 //
		 if( Obj.class == '' || Obj.section=='')
		 {
			 alert('Please select class and section');
			 return;
		 }
		 else{
			 getTimeTable(Obj);
		 }
	 
});
$(document).on('click', "#getTestResult", function(e){
	//alert(464);
		$('#example1234').show();
		  var Obj = {};
         Obj.cla = $("#dropdown100").val();
		 Obj.section = $("#dropdown200").val();
		 Obj.subject = $("#dropdown201").val();
		 Obj.testtopic = $("#dropdown202").val();
		console.log(Obj);
		e.preventDefault();
		$('#example1234').DataTable().destroy();
		$("#student_list").show();
		classes = $("#dropdown1").val();
		section = $("#dropdown2").val();
		
		//alert(classes);
		 table =  $('#example1234').DataTable( {
			"ajax": {
				"url": base_url+"admin/getTestResult?class="+Obj.cla+"&section="+Obj.section+"&subject="+Obj.subject+"&testtopic="+Obj.testtopic,
				 "dataSrc": "data",
			},
			    
				"columns": [
				    {"data":"student"},
				    {"data": "score" },
				    {"data": "type" },
				    {"data": "class" },
				    {"data": "section" },
				    {"data": "subject" },
					
				]
				
        
				
				
		} );
		 
		 
		// getTestResult(Obj);
	 
});
});

$(document).ready(function(){
    $("#day").change(function(){
      // alert(76);
         var Obj = {};
         Obj.class = $("#dropdown100").val();
		 Obj.section = $("#dropdown200").val();  //
		 Obj.day = $("#day").val(); //alert(Obj.day);
	     getTimeTable2(Obj);
       
    });
});
function getTestResult(Obj){
	$.ajax({
			  type: "POST",
			  url: base_url+'admin/getTestResult',
			  data: {id: Obj},
			  dataType: "html",
			
			  success: function(data) {
				  //console.log(data);
				 
				$("#x_content123").html(data);
				$("#student_list").show();
			       
			  },
			  error: function(e){
				  console.log(e)
				  $('#loader').hide();
			  },
			  complete: function(){
				  $('#loader').hide();
			  }
			}); 
}

function getTimeTable(Obj)
{
	//e.preventDefault();
		//$("#student_list").show();
		
	    	$.ajax({
			  type: "POST",
			  url: base_url+'admin/getTimetable',
			  data: {id: Obj},
			  dataType: "html",
			
			  success: function(data) {
				  
				  console.log(data);
				 
				$("#x_content123").html(data);
				$("#student_list").show();
				 //console.log($("#day option[value='1']"));
				$("#day option[value='1']").prop("selected",true);
			       
			  },
			  error: function(e){
				  console.log(e)
				  $('#loader').hide();
			  },
			  complete: function(){
				  $('#loader').hide();
			  }
			});
}

function getTimeTable2(Obj)
{
	//e.preventDefault();
		//$("#student_list").show();
		//alert(345);
	    	$.ajax({
			  type: "POST",
			  url: base_url+'admin/getTimetableReload',
			  data: {id: Obj},
			  dataType: "html",
			
			  success: function(data) {
				  console.log(data);
				
				$("#x_content123").html(data);
				$("#student_list").show();
			       
			  },
			  error: function(e){
				  console.log(e)
				  $('#loader').hide();
			  },
			  complete: function(){
				  $('#loader').hide();
			  }
			});
}

$(document).ready(function() {
table = $(document).on('click', "#routinedel", function(e){
	//alert(464);
	    var del_id = $(this).attr('value'); //alert(del_id);
		$.ajax({
			  type: "POST",
			  url: base_url+'admin/deleteTimetable',
			  data: {id: del_id},
			  dataType: "json",
			
			  success: function(data) {
				  getTimeTable2(Obj);
			       
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
$('#query_table tbody').on( 'click', '.getQuery', function () {
	    var data = table2.row(  $(this).parents('tr') ).data();
		var id = data.sender_id;
		$('input[name="reciever_id"]').val(id);
		$('textarea[name="query_message"]').val('');
		$.ajax({
			  type: "POST",
			  url: base_url+'admin/getQueriesById',
			  data: {id:id},
			  dataType: "json",
			  success: function(data) {
				  var str = '';
				  for(i=0;i<data.length;i++){
					  if(parseInt(data[i]['sender_id'])==parseInt(id)){
						  str += '<li class="message left appeared"><div class="avatar"></div><div class="text_wrapper"><div class="text">'+data[i]['query']+'</div></div><div class="chat-date">'+data[i]['date']+'</div></li>';
					  }
					  else{
						str += '<li class="message right appeared"><div class="avatar"></div><div class="text_wrapper"><div class="text">'+data[i]['query']+'</div></div><div class="chat-date">'+data[i]['date']+'</div></li>';
					  }
				  }
				  $('ul.messages').html(str);
				 table2.ajax.reload();
			  },
			  error: function(e){
			  },
			  complete: function(){
			  }
			}); 
});
$('.send').click(function(){
	var $this = $(this);
	var sender_id = $('input[name="sender_id"]').val();
	var reciever_id = $('input[name="reciever_id"]').val();
	var query_message = $('textarea[name="query_message"]').val();
	$.ajax({
			  type: "POST",
			  url: base_url+'admin/querypost',
			  data: "sender_id="+sender_id+"&reciever_id="+reciever_id+"&description="+query_message,
			  beforeSend : function(){
				  $this.button('loading');
			  },
			  success: function(data) {
				    var dt = new Date();
				  $('ul.messages').append('<li class="message right appeared"><div class="avatar"></div><div class="text_wrapper"><div class="text">'+query_message+'</div></div><div class="chat-date">'+dt.getDate()+'-'+(parseInt(dt.getMonth())+1)+'-'+dt.getFullYear()+'</div></li>');
				//$("ul.messages").animate({ scrollTop: $('ul.messages').height()}, 1000);
				$("ul.messages").scrollTop($("ul.messages")[0].scrollHeight);
				$('textarea[name="query_message"]').val("");
				 table2.ajax.reload();
				 console.log(data);
			  },
			  error: function(e){
				  $this.button('reset');
			  },
			  complete: function(){
				  $this.button('reset');
			  }
			});
});
});  
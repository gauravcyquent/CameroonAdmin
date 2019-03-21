var table3 = null;
var table4 = null;
var table6 = null;
var quiz_type=null;
$(document).ready(function() {
	/*Quiz JS*/
	table3 =  $('#quiz_table').DataTable({
     "ajax": {
         "url": base_url+'admin/getQuiz',
         "dataSrc": "data",
		
		 
     },
     "columns": [
         { "data": "id" },
         { "data": "title" },
         { "data": "description" },
         { "data": "class" },
         { "data": "section" },
         { "data": "quiz_type" },
		 {
			"data": null,
			"defaultContent": '<button class="fa fa-pencil-square-o" id="editQuiz" data-toggle="modal" data-target=".bs-example-modal-lg" value="" </button>  <button class="fa fa-trash" id="deleteQuiz"></button>' 
		}
     ]
   });
   $(document).on('click', "#getQuizResult", function(e){
		  var Obj = {};
         Obj.class = $("#dropdown100").val();
		 Obj.section = $("#dropdown200").val();
		 console.log(Obj);
		e.preventDefault();
		$('#quiz_table').DataTable().destroy();
		 table3 =  $('#quiz_table').DataTable( {
			"ajax": {
				"url": base_url+"admin/getQuiz?class_id="+Obj.class+"&section_id="+Obj.section,
				 "dataSrc": "data",
			},
			 "columns": [
				{ "data": "id" },
				{ "data": "title" },
				{ "data": "description" },
				{ "data": "class" },
				{ "data": "section" },
				{ "data": "quiz_type" },
				{
					"data": null,
					"defaultContent": '<button class="fa fa-pencil-square-o" id="editQuiz" data-toggle="modal" data-target=".bs-example-modal-lg" value="" </button>  <button class="fa fa-trash" id="deleteQuiz"></button>' 
				}
			] 
		});
	});
   $('#quiz_table tbody').on( 'click', '#editQuiz', function () {
	    $('.search-error').html('');
		var data = table3.row(  $(this).parents('tr') ).data();
		console.log(data);
		$("#class option:contains(" + data.class + ")").attr('selected', 'selected');
		$("#section option:contains(" + data.section + ")").attr('selected', 'selected');
		$("#quiz_type option:contains(" + data.quiz_type + ")").attr('selected', 'selected');
		$("#title").val(data.title);
		$("#description").val(data.description);
		$("#id").val(data.id);
	});
	$('#quiz_table tbody').on( 'click', '#deleteQuiz', function () {
	
	    var data = table3.row(  $(this).parents('tr') ).data();
		var id = data.id;
			 
		$.ajax({
		  type: "POST",
		  url: base_url+'admin/deleteQuiz',
		  data: {id:id},
		  dataType: "json",
		  success: function(data) {
			 table3.ajax.reload();
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
	/*End of Quiz JS*/
	/*Question JS*/
	table4 =  $('#question_table').DataTable({
     "ajax": {
         "url": base_url+'admin/getQuestion',
         "dataSrc": "data",
	},
     "columns": [
         { "data": "id" },
         { "data": "question" },
         { "data": "description" },
         { "data": "quiz" },
		 {
			"data": null,
			"defaultContent": '<button class="fa fa-pencil-square-o" id="editQuestion" data-toggle="modal" data-target=".bs-example-modal-lg" value="" </button>  <button class="fa fa-trash" id="deleteQuestion"></button>' 
		}
     ]
   });
   $('#question_table tbody').on( 'click', '#editQuestion', function () {
		 $('.search-error').html('');
		var data = table4.row(  $(this).parents('tr') ).data();
		$("#quiz_category option:contains(" + data.quiz + ")").attr('selected', 'selected');
		$("#question").val(data.question);
		$("#description").val(data.description);
		$("#id").val(data.id);
		$.ajax({
			type:'POST',
			url:base_url+'admin/getFieldValue',
			data:{id:data.id},
			dataType:"json",
			success:function(data){			
				
					var option_str;
					$('.option-div .option-container').remove();
					for(i=0;i<data.length;i++){
						var checked = parseInt(data[i].answerFlag)==1 ? 'checked="checked"':'';
						var selected = parseInt(data[i].answerFlag)==1 ? 'selected-option':'';
						if(i==0){
							option_str = '<div class="option-container '+selected+'" ><input type="radio" '+checked+' name="question_answer" required id="question_answer" class="question_answer col-md-2" /><input type="text" name="question_option[]" required id="question_option" data-id="'+data[i].id+'" class="form-control question_option col-md-7" value="'+data[i].options+'" /><div class="add-option" onclick="javascript:addOption();"><i class="fa fa-plus" aria-hidden="true"></i></div></div>';
						}
						else if(i==1){
							option_str += '<div class="option-container '+selected+'" ><input type="radio" '+checked+' name="question_answer" required id="question_answer" class="question_answer col-md-2" /><input type="text" name="question_option[]" required id="question_option" data-id="'+data[i].id+'" class="form-control question_option col-md-7" value="'+data[i].options+'" /></div>';
						}
						else{
							option_str += '<div class="option-container '+selected+'"><input type="radio" '+checked+' name="question_answer" required id="question_answer" class="question_answer col-md-2"><input type="text" name="question_option[]" required id="question_option" data-id="'+data[i].id+'" class="form-control question_option col-md-7" value="'+data[i].options+'"><div class="minus-option" onclick="javascript:deleteOption(this);"><i class="fa fa-minus" aria-hidden="true"></i></div></div>';
						}
					}
					$('.option-div').append(option_str);
				
			}
		});
	});
	$('#question_table tbody').on( 'click', '#deleteQuestion', function () {
		var data = table4.row(  $(this).parents('tr') ).data();
		var id = data.id;
			 
		$.ajax({
		  type: "POST",
		  url: base_url+'admin/deleteQuestion',
		  data: {id:id},
		  dataType: "json",
		  success: function(data) {
			 table4.ajax.reload();
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
	$('.add-chapter').click(function(){
		var str = '<div class="option-container"><input type="text" name="chapter[]" id="chapter" class="form-control chapter_option col-md-4" required/><select name="chapter_status[]" class="form-control chapter_status col-md-2"><option value="">SELECT</option><option value="14">Ongoing</option><option value="13">incomplete</option><option value="12">Complete</option></select><div class="minus-chapter" onclick="javascript:deleteChapter(this);"><i class="fa fa-minus" aria-hidden="true"></i></div></div>';
		$('.option-div').append(str);
	});
	
	
	//onchange quiz
	$('#quiz_category').on('change' , function(e){
		
		quiz_type = $('option:selected', this).attr('type');
		
		if(quiz_type==2){
			$('#quizOpts input').removeAttr('required');
			$('#hintText').html("Survey");
			
		}else if(quiz_type==1){
			$('#quizOpts input').attr('required','required');
			$('#hintText').html("Quiz");
		}else{
			$('#quizOpts input').attr('required','required');
			$('#hintText').html("");
		}
	});
	date = new Date();
	$('.selecttime').daterangepicker({
	    		locale: {
	                format: 'MM/YYYY'
					
	            },
	    		  singleDatePicker: false,
	    		  calender_style: "picker_4",
	    		  showDropdowns: true
    		    }, function(start, end, label) {
    		      console.log(start.toISOString(), end.toISOString(), label);
    		    });
	$(document).on('click', "#getSyllabus", function(e){
		  var Obj = {};
         Obj.class = $("#select_class").val();
		 Obj.subject = $("#select_subject").val();
		 Obj.test_type = $("#select_syllabus").val();
		 console.log(Obj);
		e.preventDefault();
		$('#syllabusTable').DataTable().destroy();
		 table6 =  $('#syllabusTable').DataTable( {
			"ajax": {
				"url": base_url+"admin/getSyllabus?class_id="+Obj.class+"&subject_id="+Obj.subject+"&test_type="+Obj.test_type,
				"dataSrc" : 'data'
				 
			},
			 "columns": [
				{ "data": "session_time" },
				{ "data": "id" },
				{ "data": "class" },
				{ "data": "subject" },
				{ "data": "syllabus" },
				{
					 sortable: false,
					 "render": function ( data, type, fulls, meta ) {
						 var ch = '';
						 if($.trim(fulls.chapter)!=''){
							var chapters = fulls.chapter.split(':');
							var ch = '<ol class="chapter-list">';
							for(i=0;i<chapters.length;i++){
								ch += '<li>'+chapters[i]+'</li>';
							}
							ch += '</ol>';  
						 }
						 
						 return ch;
					 }
				},
				{
					 sortable: false,
					 "render": function ( data, type, full, meta ) {
						 return '<button class="fa fa-pencil-square-o" id="editSyllabus" data-toggle="modal" data-target="#editsyllabusModal" value="" </button><button class="fa fa-trash" id="DeleteSyllabus"></button>';
					 }
				},
			] 
		});
	});
	/*start of editSyllabus*/
	 $('#syllabusTable tbody').on( 'click', '#editSyllabus', function () {
		 $('.search-error').html('');
		var data = table6.row(  $(this).parents('tr') ).data();
		$("form#editsyllabus #class_id option:contains(" + data.class + ")").attr('selected', 'selected');
		$("form#editsyllabus #subject_id option:contains(" + data.subject + ")").attr('selected', 'selected');
		$("form#editsyllabus #test_type option:contains(" + data.syllabus + ")").attr('selected', 'selected');
		var session_time = data.session_time.split('-');
		$('form#editsyllabus #todate').val(session_time[0]);
		$('form#editsyllabus #fromdate').val(session_time[1]);
		$("#syllabus_id").val(data.id);
		var tablename = 'syllabus_chapter';
		$.ajax({
			type:'POST',
			url:base_url+'admin/getFieldValue',
			data:{id:data.id,table:tablename},
			dataType:"json",
			success:function(data){			
					var option_str;
					$('form#editsyllabus .option-div .option-container').remove();
					for(i=0;i<data.length;i++){
						var selected = parseInt(data[i].status)==14 ? 'selected="selected"':'';
						if(parseInt(data[i].status)==14){
							var options = '<option value="14" selected="selected">Ongoing</option><option value="13">incomplete</option><option value="12">Complete</option>';
						}
						else if(parseInt(data[i].status)==13){
							var options = '<option value="14">Ongoing</option><option value="13" selected="selected">incomplete</option><option value="12">Complete</option>';
						}
						else if(parseInt(data[i].status)==12){
							var options = '<option value="14">Ongoing</option><option value="13">incomplete</option><option value="12" selected="selected">Complete</option>';
						}
						if(i==0){
							
							option_str = '<div class="option-container"><input type="text" name="chapter[]" id="chapter" value="'+data[i].chapter+'" data-id="'+data[i].id+'" class="form-control chapter_option col-md-4" required /><select name="chapter_status[]" required class="form-control chapter_status col-md-2" data-id="'+data[i].id+'"><option value="">SELECT</option>'+options+'</select><div class="add-chapter" onclick="javascript:addChapter(this);"><i class="fa fa-plus" aria-hidden="true"></i></div></div>';
						}
						else{
							option_str += '<div class="option-container"><input type="text" name="chapter[]" id="chapter" value="'+data[i].chapter+'" data-id="'+data[i].id+'" class="form-control chapter_option col-md-4" required/><select name="chapter_status[]" class="form-control chapter_status col-md-2" data-id="'+data[i].id+'" required><option value="">SELECT</option>'+options+'</select><div class="minus-chapter" onclick="javascript:deleteChapter(this);"><i class="fa fa-minus" aria-hidden="true"></i></div></div>';
						}
					
					}
					$('.option-div').append(option_str);
				
			}
		});
		
		
		
	 });
	 /*end of editSyllabus*/
	 
	 /*
	    Delete syllabus
	 */
	   
$('#syllabusTable tbody').on( 'click', '#DeleteSyllabus', function () {
	
	    var data = table6.row(  $(this).parents('tr') ).data();
		console.log(data);
		$("#syllabus_id").val(data.id);
		var id = $("#syllabus_id").val();	//alert(id);
			 
		$.ajax({
			  type: "POST",
			  url: base_url+'admin/deleteSyllabus',
			  data: {id:id},
			  dataType: "json",
			  success: function(data) {
				  console.log(data);
				//  modal.close();
				 // $(this).parents ('tr').hide ();
				  console.log(table);
				 table6.ajax.reload();
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
$('#addSyllabus').click(function(){
	console.log($('form#addsyllabus .option-div .option-container').length);
	$('form#addsyllabus .option-div .option-container:gt(0)').remove();
});	 
	 
});
function addChapter(){ 
	var str = '<div class="option-container"><input type="text" name="chapter[]" id="chapter" class="form-control chapter_option col-md-4" data-id="0" required/><select name="chapter_status[]" class="form-control chapter_status col-md-2" data-id="0" required><option value="">SELECT</option><option value="14">Ongoing</option><option value="13">incomplete</option><option value="12">Complete</option></select><div class="minus-chapter" onclick="javascript:deleteChapter(this);"><i class="fa fa-minus" aria-hidden="true"></i></div></div>';
		$('.option-div').append(str);
}
function deleteChapter(obj){
	$(obj).closest('div.option-container').remove();
}
 $(function () {
                $('#datetimepicker6').datetimepicker({
					format:'MMMM YYYY' 
				});
	 $('#datetimepicker6').datetimepicker();
     $('#datetimepicker7').datetimepicker({
            useCurrent: false,
			format:'MMMM YYYY' 
        });
        $("#datetimepicker6").on("dp.change", function (e) {
            $('#datetimepicker7').data("DateTimePicker").minDate(e.date);
        });
        $("#datetimepicker7").on("dp.change", function (e) {
            $('#datetimepicker6').data("DateTimePicker").maxDate(e.date);
        });		
});
 

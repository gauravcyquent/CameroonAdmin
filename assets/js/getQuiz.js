var table3 = null;
var table4 = null;
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
	$('.add-option').click(function(){
		var str = '<div class="option-container"><input type="radio" name="question_answer" required id="question_answer" class="question_answer col-md-2"><input type="text" required name="question_option[]" id="question_option" class="form-control question_option col-md-7"><div class="minus-option" onclick="javascript:deleteOption(this);"><i class="fa fa-minus" aria-hidden="true"></i></div></div>';
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
	
});
function addOption(){ 
	var str = '<div class="option-container"><input type="radio" required name="question_answer" id="question_answer" class="question_answer col-md-2"><input type="text" name="question_option[]" required data-id="0" id="question_option" class="form-control question_option col-md-7"><div class="minus-option" onclick="javascript:deleteOption(this);"><i class="fa fa-minus" aria-hidden="true"></i></div></div>';
		$('.option-div').append(str);
}
function deleteOption(obj){
	$(obj).closest('div.option-container').remove();
}
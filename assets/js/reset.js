var email=null;

$(document).on('click', "#resetbtn", function(e){
	
	e.preventDefault();
	//validate
	$("#resetPass").validate({
		rules: {
			email: {
				required: true,
				email: true
			},
			
		},
		messages: {
			email: "Please enter a valid email address",
			
		}
	});
	
	emailid = $("#email").val();

	
	if($("#resetPass").valid()){
		
		//alert(email);
		
		
		$.ajax({
			  type: "POST",
			  url: base_url+'admin/reset_password',
			  beforeSend : function(){
				  $('#loader').show();
			  },
			  data: {email: emailid},
			  dataType: "json",
			  success: function(data) {
				  
				 // alert(data);
				  console.log(data)
				//  window.location.href = base_url+'admin/forgot_password'; 
			  },
			  error: function(e){
				  console.log(e)
				  $('#loader').hide();
			  },
			  complete: function(){
				  $('#loader').hide();
			  }
			});
	}else{
		
	}
});
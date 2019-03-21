// ajax login
var username=null;
var password=null;
var remember = 0;
/* $(document).on('click', "#login", function(e){ */
$('form#login').submit(function(e){	
	e.preventDefault();
	//validate
	$("#login").validate({
		rules: {
			username: {
				required: true,
				email: true
			},
			password: {
				required: true
			}
		},
		messages: {
			username: "Please enter a valid email address",
			password: {
				required: "Please provide a password"
			}
		}
	});
	
	username = $("#username").val();
	password = $("#password").val();
	remember = $("#remember:checked").val();
	//read = $('#remember[type="checkbox"]').prop("checked");
	//console.log(remember)
	
	if($("#login").valid()){
		$.ajax({
			  type: "POST",
			  url: base_url+'auth',
			  beforeSend : function(){
				  $('#loader').show();
			  },
			  data: {userId: username, password: password, remember:remember},
			  dataType: "json",
			  success: function(data) {
				  
				  console.log(data)
				  if(data.status == 1)
				  {
				  console.log(data)
				  window.location.href = base_url+'admin/dashboard'; 
				  }
				  
				  else
				  {
					  $('#search-error').html("<span style='color:red'>" +data.msg+"</span>");
				  }
			  },
			  error: function(e){
				  
				  
				  
				  
				  
				  $('#loader').hide();
			  },
			  complete: function(){
				  $('#loader').hide();
			  }
			});
	}else{
		
	}
	return false;
});

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
				  
				 		  if(data.status == 1){
			  $(".search-error").html("<span style='color:green'>" +data.msg+"</span>");
			  
		  }
		  else if(data.status == 0){
			  $(".search-error").html("<span style='color:red'>" +data.msg+"</span>");
			  
		  }
		  else{
			  
			  $(".search-error").html("<span style='color:red'>Server error.</span>");
			  //$this.button('reset');
		  }
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


var email=null;
var userObj = {};
//var base_url = "http://192.168.1.20/virch/";
$(document).on('click', "#update", function(e){
	
	//alert(email);
		 userObj.firstname = $.trim($("#first-name").val());
		 userObj.lastname = $.trim($("#last-name").val());
		 userObj.email = $.trim($("#email").val());
		 userObj.parentContact = $.trim($("#phone").val());
		 userObj.address = $.trim($("#address").val());
		 userObj.pincode = $.trim($("#pincode").val());
		 userObj.city = $.trim($("#city").val());
		 userObj.state = $.trim($("#state").val());
		 userObj.country = $.trim($("#country").val());
		
		$.ajax({
			  type: "POST",
			  url: base_url+'admin/update_profile',
			  beforeSend : function(){
				  $('#loader').show();
			  },
			  data: {user: userObj},
			  dataType: "json",
			  success: function(data) {
				  
				 		  if(data.status == 1){
			  $(".search-error").html("<span style='color:green'>" +data.msg+"</span>");
			//  location.reload(true);
			  
		  }
		  else if(data.status == 0){
			  $(".search-error").html("<span style='color:red'>" +data.msg+"</span>");
			  //location.reload(true);
			  
		  }
		  else{
			  
			  $(".search-error").html("<span style='color:red'>Server error.</span>");
			  //$this.button('reset');
		  }
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
	
});

var PassObj = {};
$(document).on('click', "#passwd", function(e){
	
	
	/* 	$.validator.addMethod("pwcheck", function(value) {
      return /[\@\#\$\%\^\&\*\(\)\_\+\!]/.test(value) && /[a-z]/.test(value) && /[0-9]/.test(value) && /[A-Z]/.test(value)
 // has a digit
}); */
		 PassObj.password = $.trim($("#password").val());
		 PassObj.repassword = $.trim($("#password2").val());
		 
		
		$.ajax({
			  type: "POST",
			  url: base_url+'admin/update_password',
			  beforeSend : function(){
				  $('#loader').show();
			  },
			  data: {user: PassObj},
			  dataType: "json",
			  success: function(data) {
				  
				 		  if(data.status == 1){
			  $(".search-error").html("<span style='color:green'>" +data.msg+"</span>");
			//  location.reload(true);
			  
		  }
		  else if(data.status == 0){
			  $(".search-error").html("<span style='color:red'>" +data.msg+"</span>");
			  //location.reload(true);
			  
		  }
		  
		    else if(data.status == 2){
			  $(".search-error").html("<span style='color:red'>" +data.msg+"</span>");
			  //location.reload(true);
			  
		  }
		  else{
			  
			  $(".search-error").html("<span style='color:red'>Server error.</span>");
			  //$this.button('reset');
		  }
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
		
			$("#demo-form3")[0].reset();
  });
	
	
	$('#remember[type="checkbox"]').click(function(){
				if($(this).prop("checked") == true){
					//alert("Checkbox is checked.");
					remember = 1;
				}
				else if($(this).prop("checked") == false){
					//alert("Checkbox is unchecked.");
					remember = 0;
				}
			});
	
	//alert(email);
		
	

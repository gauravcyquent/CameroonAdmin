$(document).ready(function(){
    $("#dropdown123").change(function(){
       
            $('#dropdown267').attr('disabled', false);
			
			  var section = $("#dropdown267").val();
	  if(section == 0)
	  {
		  $('#dropdown365').attr('disabled', true);
	  }
	else
	{		
			$('#dropdown365').attr('disabled', false);
			 
	}	
			 
			getUsers();
       
    });
});


$(document).ready(function(){
    $("#dropdown267").change(function(){
		
	  var section = $("#dropdown267").val();
	  if(section == 0)
	  {
		  $('#dropdown365').attr('disabled', true);
	  }
		else{
			$('#dropdown365').attr('disabled', false);
		}
       getUsers();
       
    });
});

function getUsers()
{ 

        var Obj = {};
        Obj.class = $("#dropdown123").val();
		Obj.section = $("#dropdown267").val();
		var All = 'All';
		var oldid = 0;
        
		$.ajax({
			  type: "POST",
			  url: base_url+'admin/getStudentList',
			  data: {user: Obj},
			  dataType: "json",
			  success: function(data) {
				  console.log(data);
				 
				  var len = data.data.length;

                $("#dropdown365").empty();
				 $("#dropdown365").append("<option value='"+oldid+"'>"+All+"</option>");
                for( var i = 0; i<len; i++){
                    var id = data.data[i]['id'];
                    var name = data.data[i]['name'];
                    
                    $("#dropdown365").append("<option value='"+id+"'>"+name+"</option>");

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
}
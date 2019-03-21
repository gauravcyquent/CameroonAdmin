// initialize the validator function
validator.message['date'] = 'not a real date';

// validate a field on "blur" event, a 'select' on 'change' event & a
// '.reuired' classed multifield on 'keyup':
$('form').on('blur', 'input[required], input.optional, select.required',
		validator.checkField).on('change', 'select.required',
		validator.checkField).on('keypress', 'input[required][pattern]',
		validator.keypress);

$('.multi.required').on('keyup blur', 'input', function() {
	validator.checkField.apply($(this).siblings().last()[0]);
});

// bind the validation to the form submit event
// $('#send').click('submit');//.prop('disabled', true);

$('form').submit(
		function(e) {
			e.preventDefault();
			var submit = true;
			// evaluate the form using generic validaing
			if (!validator.checkAll($(this))) {
				submit = false;
			}

			if (submit) {

				var FormData = {};

				var FormID = $(this).closest("form").attr('id');

				switch (FormID) {

				case 'login':

					var URL = base_url + 'Login/UserAuthentication';

					FormData.UserEmail = $("#email").val();
					FormData.UserPasswordHash = $("#password").val();

					$.ajax({

						type : "POST",
						url : URL,
						beforeSend : function() {
							$("#loader").show();
						},

						data : {
							user : FormData
						},
						dataType : "JSON",
						success : function(res) {

							console.log(res);
							if (res.status == true) {

								$('#search-error').hide();
								$('#search-success').show();
								$('#search-success').html(res.msg);
								setTimeout(function() {

									window.location.href = base_url
											+ 'Dashboard/index';
								}, 2000);

							}

							else if (res.status == false) {

								$('#search-error').show();
								$('#search-error').html(res.msg);
							}

						},

						error : function(e) {

							$('#loader').hide();
						},
						complete : function() {

							$('#loader').hide();
						}

					});

					break;

				case 'addUsers':

					var URL = base_url + 'Users/AddUser';

					FormData.UserName = $("#name").val();
					FormData.UserEmail = $("#email").val();
					FormData.UserLogin = $("#EmpCode").val();
					FormData.UserMobileNumber = $("#telephone").val();
					FormData.UserStoreId = $("#storeID").val();
					FormData.UserRoleId = $("#RoleName").val();

					$.ajax({

						type : "POST",
						url : URL,
						beforeSend : function() {
							$("#loader").show();
						},

						data : {
							user : FormData
						},
						dataType : "JSON",
						success : function(res) {

							if (res.status == true) {

								$('#search-error').hide();
								$('#search-success').show();
								$('#search-success').html(res.msg);
								$('#datatable-buttons').DataTable().ajax
										.reload();
								$('form')[0].reset();
								
								setTimeout(function() {

									location.reload(true);

								}, 1000);
							}

							else if (res.status == false) {

								$('#search-success').hide();
								$('#search-error').show();
								$('#search-error').html(res.msg);
							}

						},

						error : function(e) {

							$('#loader').hide();
						},
						complete : function() {

							$('#loader').hide();
						}

					});

					break;

				case 'editUsers':

					var URL = base_url + 'Users/editUsers';

					FormData.UserName = $("#EditName").val();
					FormData.UserEmail = $("#Editemail").val();
					FormData.UserLogin = $("#editEmpCode").val();
					FormData.UserMobileNumber = $("#editTelephone").val();
					FormData.UserStoreId = $("#EditstoreID").val();
					FormData.UserRoleId = $("#EditRoleName").val();
					FormData.UserID = $("#updateid").val();

					$.ajax({

						type : "POST",
						url : URL,
						beforeSend : function() {

							$("#loader1").show();

						},

						data : {
							user : FormData
						},
						dataType : "JSON",
						success : function(res) {

							console.log(res);

							if (res.status == true) {

								$('#search-error12').hide();
								$('#search-success12').show();
								$('#search-success12').html(res.msg);
								$('#datatable-buttons').DataTable().ajax
										.reload();
								setTimeout(function() {

									location.reload(true);

								}, 1000);
								

							}

							else if (res.status == false) {

								$('#search-success12').hide();
								$('#search-error12').show();
								$('#search-error12').html(res.msg);
							}

						},

						error : function(e) {
							console.log(e)
							$('#loader1').hide();
						},
						complete : function() {

							$('#loader1').hide();
						}

					});

					break;

				case 'addStore':

					var URL = base_url + 'Stores/AddStores';

					FormData.StoreCode = $("#storecode").val();
					FormData.StoreName = $("#storename").val();
					FormData.StoreAddress = $("#storeaddress").val();
					FormData.StoreCity = $("#storecity").val();
					FormData.StoreLat = $("#storelat").val();
					FormData.StoreLong = $("#storelong").val();

					$.ajax({

						type : "POST",
						url : URL,
						beforeSend : function() {

							console.log(FormData);

							$("#loader1").show();

						},

						data : {
							store : FormData
						},

						dataType : "JSON",

						success : function(res) {

							console.log(res);

							if (res.status == true) {

								$('#search-error').hide();
								$('#search-success').show();
								$('#search-success').html(res.msg);
								$('#datatable-buttons15').DataTable().ajax
										.reload();
								$('form')[0].reset();
								
								setTimeout(function() {

									location.reload(true);

								}, 1000);
								
								
							}

							else if (res.status == false) {

								$('#search-success').hide();
								$('#search-error').show();
								$('#search-error').html(res.msg);
							}

						},

						error : function(e) {

							console.log(e);
							$('#loader').hide();
						},

						complete : function() {

							$('#loader').hide();
						}

					});

					break;
					
				case 'editStores':

					var URL = base_url + 'Stores/EditStores';

					FormData.StoreCode = $("#EditStoreCode").val();
					FormData.StoreName = $("#EditStoreName").val();
					FormData.StoreAddress = $("#editstoreaddress").val();
					FormData.StoreCity = $("#editstorecity").val();
					FormData.StoreLat = $("#editstorelat").val();
					FormData.StoreLong = $("#editstorelong").val();
					FormData.StoreID = $("#updateidstore").val();

					$.ajax({

						type : "POST",
						url : URL,
						beforeSend : function() {

							console.log(FormData);

							$("#loader1").show();

						},

						data : {
							store : FormData
						},

						dataType : "JSON",

						success : function(res) {

							console.log(res);

							if (res.status == true) {

								$('#search-error12').hide();
								$('#search-success12').show();
								$('#search-success12').html(res.msg);
								$('#datatable-buttons15').DataTable().ajax.reload();
								setTimeout(function() {

									location.reload(true);

								}, 1000);
								
							}

							if (res.status == false) {

								$('#search-success12').hide();
								$('#search-error12').show();
								$('#search-error12').html(res.msg);
							}

						},

						error : function(e) {

							console.log(e);
							$('#loader1').hide();
						},

						complete : function() {

							$('#loader1').hide();
						}

					});

					break;

				case 'addDevices':

					var URL = base_url + 'Users/AddDevice';

					FormData.UserID = $("#userName").val();
					FormData.MacID = $("#macid1").val() + ':'
							+ $("#macid2").val() + ':' + $("#macid3").val()
							+ ':' + $("#macid4").val() + ':'
							+ $("#macid5").val() + ':' + $("#macid6").val();

					$.ajax({

						type : "POST",
						url : URL,

						beforeSend : function() {

							console.log(FormData);

							$("#loader1").show();

						},

						data : {
							device : FormData
						},

						dataType : "JSON",

						success : function(res) {

							console.log(res);

							if (res.status == true) {

								$('#search-error').hide();
								$('#search-success').show();
								$('#search-success').html(res.msg);
								$('#datatable-buttons12').DataTable().ajax
										.reload();
								$('form')[0].reset();
								setTimeout(function() {

									location.reload(true);

								}, 1000);
							}

							else if (res.status == false) {

								$('#search-success').hide();
								$('#search-error').show();
								$('#search-error').html(res.msg);
							}

						},

						error : function(e) {

							console.log(e);
							$('#loader').hide();
						},

						complete : function() {

							$('#loader').hide();
						}

					});

					break;
					
				case 'addDept':

					var URL = base_url + 'Department/AddDepartment';

					FormData.DepartmentCode = $("#deptcode").val();
					FormData.DepartmentName = $("#deptname").val();

					$.ajax({

						type : "POST",
						url : URL,
						beforeSend : function() {

							console.log(FormData);

							$("#loader9").show();

						},

						data : {
							dept : FormData
						},

						dataType : "JSON",

						success : function(res) {

							console.log(res);

							if (res.status == true) {

								$('#search-error9').hide();
								$('#search-success9').show();
								$('#search-success9').html(res.msg);
								$('#datatable-buttons109').DataTable().ajax
										.reload();
								$('form')[0].reset();
								setTimeout(function() {

									location.reload(true);

								}, 1000);
							}

							else if (res.status == false) {

								$('#search-success9').hide();
								$('#search-error9').show();
								$('#search-error9').html(res.msg);
							}

						},

						error : function(e) {

							console.log(e);
							$('#loader9').hide();
						},

						complete : function() {

							$('#loader9').hide();
						}

					});

					break;
					
					
				case 'editDept':

					var URL = base_url + 'Department/EditDepartment';

					FormData.DepartmentName = $("#Editdeptname").val();
					FormData.DepartmentCode = $("#Editdeptcode").val();
					FormData.ID = $("#updateidDept").val();

					$.ajax({

						type : "POST",
						url : URL,
						beforeSend : function() {

							console.log(FormData);

							$("#loader101").show();

						},

						data : {
							dept : FormData
						},

						dataType : "JSON",

						success : function(res) {

							console.log(res);

							if (res.status == true) {

								$('#search-error120').hide();
								$('#search-success121').show();
								$('#search-success121').html(res.msg);
								$('#datatable-buttons109').DataTable().ajax
										.reload();
								setTimeout(function() {

									location.reload(true);

								}, 1000);
							}
							else if (res.status == false) {

								$('#search-success121').hide();
								$('#search-error120').show();
								$('#search-error120').html(res.msg);
							}

						},

						error : function(e) {

							console.log(e);
							$('#loader101').hide();
						},

						complete : function() {

							$('#loader101').hide();
						}

					});

					break;
					
					

				default:

				}

			}

			// this.submit();
			// return false;
		});




function AvoidSpace(event) {
    var k = event ? event.which : window.event.keyCode;
    if (k == 32) return false;
}

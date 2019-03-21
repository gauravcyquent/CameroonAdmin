<?php //print_r($class);
?>
<style>
.inactive_student {
	color: red;
}
</style>
<body
	class="nav-md">
<div class="container body">
<div class="main_container">
<div class="col-md-3 left_col"><!-- sidebar --> <?php $this->load->view("side_menu"); ?>
</div>
<?php $this->load->view("top_nav"); ?> <!-- page content -->
<div class="right_col" role="main">
<div class="col-md-12 col-sm-12 col-xs-12"></div>

<div class="x_content1" id="student_list123">
<div class="x_content2" id="newUserButton">
<button type="button" class="btn btn-round btn-info" data-toggle="modal"
	data-target=".bs-example-modal-lg">Add new User</button>
</div>
<table id="datatable-buttons" class="table table-striped jambo_table bulk_action">
	<thead>
		<tr class="headings">

			<th>SL.NO</th>
			<th>User Login</th>
			<th>Name</th>
			<th>Role</th>
			<th>Email</th>
			<th>Store Name</th>
			<th>Status</th>
			<th>Action</th>


		</tr>
	</thead>

</table>
</div>
</div>

</div>
</div>

<!-- Datatables -->
<script>
     
    </script>
<!-- /Datatables -->
<!-- /page content -->

<div class="modal fade bs-example-modal-lg" tabindex="-1" role="dialog"
	aria-hidden="true" data-backdrop="static" data-keyboard="false">
<div class="modal-dialog modal-lg">
<div class="modal-content">

<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"><span
	aria-hidden="true">x</span></button>
<h4 class="modal-title" id="myModalLabel">Add New User</h4>
<div></div>
</div>
<div class="modal-body">
<div class="alert alert-danger" id="search-error"
	style="text-align: center; display: none; font-weight: bold;">
<button type="button" class="close" data-dismiss="alert"
	aria-label="Close"><span aria-hidden="true">×</span></button>
</div>
<div class="alert alert-info" id="search-success"
	style="text-align: center; display: none; font-weight: bold;">
<button type="button" class="close" data-dismiss="alert"
	aria-label="Close"><span aria-hidden="true">×</span></button>
</div>

<div id='loader' style='display: none;'><img
	src="<?php echo base_url();?>assets/loader/tenor.gif"></div>
<form id="addUsers" class="form-horizontal form-label-left" novalidate>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">User Login
 <span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="EmpCode"
	class="form-control col-md-7 col-xs-12" name="EmpCode" placeholder=""
	required="required" type="text"  onkeypress="return AvoidSpace(event)"></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Name <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="name"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
	required="required" type="text"></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">User Role
<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><select
	class="form-control col-md-7 col-xs-12" name="class" id="RoleName"
	required>
	<option value="">Select</option>
	<?php foreach($roles as $row):?>
	<option value="<?php echo $row->RoleID?>"><?php echo $row->RoleName;?></option>
	<?php  endforeach;?>
</select></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="email">Email <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="email" id="email"
	name="email" required="required"
	class="form-control col-md-7 col-xs-12" placeholder=""></div>
</div>



<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Contact
Number <span class="required"></span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="tel"
	id="telephone" name="phone"
	data-validate-length-range="8,20"
	class="form-control col-md-7 col-xs-12"></div>
</div>
<!--
                      <div class="item form-group">
                        <label for="password" class="control-label col-md-3">Password</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input id="password" type="password" name="password" data-validate-length="6,8" class="form-control col-md-7 col-xs-12" required="required">
                        </div>
                      </div>
                      <div class="item form-group">
                        <label for="password2" class="control-label col-md-3 col-sm-3 col-xs-12">Repeat Password</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input id="password2" type="password" name="password2" data-validate-linked="password" class="form-control col-md-7 col-xs-12" required="required">
                        </div>
                      </div>
                      
                     -->
<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">
Store Name <span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><select
	class="form-control col-md-7 col-xs-12" name="class" id="storeID"
	required>
	<option value="">Select</option>
	<?php foreach($stores as $row):?>
	<option value="<?php echo $row->StoreId?>"><?php echo $row->StoreName .'-'. $row->StoreCode;?></option>
	<?php  endforeach;?>
</select></div>
</div>




<div class="ln_solid"></div>
<div class="form-group">
<div class="col-md-6 col-md-offset-3" align="center">
<button id="userSubmit" type="submit" class="btn btn-round btn-info">Submit</button>
<button type="Button" class="btn btn-round btn-info cancelBtn" id="cancelBtn"
	data-dismiss="modal">Cancel</button>

</div>
</div>
</form>
</div>


</div>
</div>
</div>




<div class="modal fade bs-example12-modal-lg" tabindex="-1"
	role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
<div class="modal-dialog modal-lg">
<div class="modal-content">

<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"><span
	aria-hidden="true">x</span></button>
<h4 class="modal-title" id="myModalLabel">Edit User Details</h4>
<div></div>
</div>
<div class="modal-body">
<div class="alert alert-danger" id="search-error12"
	style="text-align: center; display: none; font-weight: bold;">
<button type="button" class="close" data-dismiss="alert"
	aria-label="Close"><span aria-hidden="true">×</span></button>
</div>
<div class="alert alert-info" id="search-success12"
	style="text-align: center; display: none; font-weight: bold;">
<button type="button" class="close" data-dismiss="alert"
	aria-label="Close"><span aria-hidden="true">×</span></button>
</div>


<form id="editUsers" class="form-horizontal form-label-left" novalidate>
<div id='loader1' style='display: none;'><img
	src="<?php echo base_url();?>assets/loader/tenor.gif"></div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">User Login
 <span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="editEmpCode"
	class="form-control col-md-7 col-xs-12" name="EmpCode" placeholder=""
	required="required" type="text" onkeypress="return AvoidSpace(event)"></div>
</div>


<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Name <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="EditName"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
	required="required" type="text"></div>
</div>
<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">User Role
<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><select
	class="form-control col-md-7 col-xs-12" name="class" id="EditRoleName"
	required>
	<option value="">Select</option>
	<?php foreach($roles as $row):?>
	<option value="<?php echo $row->RoleID?>"><?php echo $row->RoleName;?></option>
	<?php  endforeach;?>
</select> <input type="hidden" id="updateid"></div>
</div>
<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="email">Email <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="email"
	id="Editemail" name="email" required="required"
	class="form-control col-md-7 col-xs-12" placeholder=""></div>
</div>



<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Contact
Number <span class="required"></span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="tel"
	id="editTelephone" name="phone"
	data-validate-length-range="8,20"
	class="form-control col-md-7 col-xs-12"></div>
</div>
<!--
                      <div class="item form-group">
                        <label for="password" class="control-label col-md-3">Password</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input id="password" type="password" name="password" data-validate-length="6,8" class="form-control col-md-7 col-xs-12" required="required">
                        </div>
                      </div>
                      <div class="item form-group">
                        <label for="password2" class="control-label col-md-3 col-sm-3 col-xs-12">Repeat Password</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input id="password2" type="password" name="password2" data-validate-linked="password" class="form-control col-md-7 col-xs-12" required="required">
                        </div>
                      </div>
                      
                     -->
<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">
Store Name <span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><select
	class="form-control col-md-7 col-xs-12" name="class" id="EditstoreID"
	required>
	<option value="">Select</option>
	<?php foreach($stores as $row):?>
	<option value="<?php echo $row->StoreId?>"><?php echo $row->StoreName .'-'. $row->StoreCode;?></option>
	<?php  endforeach;?>
</select></div>
</div>




<div class="ln_solid"></div>
<div class="form-group">
<div class="col-md-6 col-md-offset-3" align="center">
<button id="userSubmit" type="submit" class="btn btn-round btn-info">Update</button>
<button type="Button" class="btn btn-round btn-info cancelBtn" id="cancelBtn2"
	data-dismiss="modal">Cancel</button>

</div>
</div>
</form>
</div>


</div>
</div>
</div>

<!--<div class="modal fade bs-example13-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
<div class="modal-dialog modal-sm">
<div class="modal-content">
  <div class="modal-body">
    Are you sure?
  </div>
  <div class="modal-footer">
   <button type="button" class="btn btn-round btn-danger" id="Delete">Delete</button>
    <button type="button" data-dismiss="modal" class="btn btn-round btn">Cancel</button>
  </div>
</div>
</div>
</div>


--><div class="modal fade bs-example15-modal-lg" tabindex="-1"
	role="dialog" aria-hidden="true">
<div class="modal-dialog modal-lg">
<div class="modal-content">

<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"><span
	aria-hidden="true">x</span></button>
<h4 class="modal-title" id="myModalLabel">Browse User Details</h4>
<div></div>
</div>
<div class="modal-body">
<div class="alert alert-danger" id="search-error12"
	style="text-align: center; display: none; font-weight: bold;">
<button type="button" class="close" data-dismiss="alert"
	aria-label="Close"><span aria-hidden="true">×</span></button>
</div>
<div class="alert alert-info" id="search-success12"
	style="text-align: center; display: none; font-weight: bold;">
<button type="button" class="close" data-dismiss="alert"
	aria-label="Close"><span aria-hidden="true">×</span></button>
</div>


<form id="DetailsUsers" class="form-horizontal form-label-left" novalidate>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">User Login <span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="DetailsCode"
	class="form-control col-md-7 col-xs-12" name="EmpCode" placeholder=""
	required="required" type="text" disabled ></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Name <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="DetailsName"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
	required="required" type="text" disabled></div>
</div>
<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">User Role
<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><select
	class="form-control col-md-7 col-xs-12" name="class" id="DetailsRoleName"
	disabled>
	<option value="">Select</option>
	<?php foreach($roles as $row):?>
	<option value="<?php echo $row->RoleID?>"><?php echo $row->RoleName;?></option>
	<?php  endforeach;?>
</select></div>
</div>
<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="email">Email <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="email"
	id="Detailsemail" name="email" required="required"
	class="form-control col-md-7 col-xs-12" placeholder="" disabled></div>
</div>
<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Contact
Number <span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="tel"
	id="DetailsTelephone" name="phone" required="required"
	data-validate-length-range="8,20"
	class="form-control col-md-7 col-xs-12" disabled></div>
</div>
<!--
                      <div class="item form-group">
                        <label for="password" class="control-label col-md-3">Password</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input id="password" type="password" name="password" data-validate-length="6,8" class="form-control col-md-7 col-xs-12" required="required">
                        </div>
                      </div>
                      <div class="item form-group">
                        <label for="password2" class="control-label col-md-3 col-sm-3 col-xs-12">Repeat Password</label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <input id="password2" type="password" name="password2" data-validate-linked="password" class="form-control col-md-7 col-xs-12" required="required">
                        </div>
                      </div>
                      
                     -->
<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">
Store Name<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><select
	class="form-control col-md-7 col-xs-12" name="class" id="DetailstoreID"
	disabled>
	<option value="">Select</option>
	<?php foreach($stores as $row):?>
	<option value="<?php echo $row->StoreId?>"><?php echo $row->StoreName .'-'. $row->StoreCode;?></option>
	<?php  endforeach;?>
</select>
</div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Status <span
	class="required"></span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="Detailstatuus"
	class="form-control col-md-7 col-xs-12" name="Detailstatuus" placeholder=""
	required="required" type="text" disabled></div>
</div>



<div class="ln_solid"></div>
<div class="form-group">
<div class="col-md-6 col-md-offset-3" align="center">
<button type="Button" class="btn btn-round btn-info cancelBtn" 
	data-dismiss="modal">Close</button>

</div>
</div>
</form>
</div>


</div>
</div>
</div>






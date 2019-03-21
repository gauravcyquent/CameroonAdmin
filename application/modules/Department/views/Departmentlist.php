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

<div class="x_content1" id="student_list100">
<div class="x_content2" id="newUserButton">
<button type="button" class="btn btn-round btn-info" data-toggle="modal"
	data-target=".bs-example809-modal-lg">Add new Department</button>
</div>
<table id="datatable-buttons109" class="table table-striped jambo_table bulk_action">
	<thead>
		<tr class="headings">

			<th>SL.NO</th>
			<th>Department Code</th>
			<th>Department Name</th>
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

<div class="modal fade bs-example809-modal-lg" tabindex="-1" role="dialog"
	aria-hidden="true" data-backdrop="static" data-keyboard="false">
<div class="modal-dialog modal-lg">
<div class="modal-content">

<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"><span
	aria-hidden="true">x</span></button>
<h4 class="modal-title" id="myModalLabel">Add New Department</h4>
<div></div>
</div>
<div class="modal-body">
<div class="alert alert-danger" id="search-error9"
	style="text-align: center; display: none; font-weight: bold;">
<button type="button" class="close" data-dismiss="alert"
	aria-label="Close"><span aria-hidden="true">×</span></button>
</div>
<div class="alert alert-info" id="search-success9"
	style="text-align: center; display: none; font-weight: bold;">
<button type="button" class="close" data-dismiss="alert"
	aria-label="Close"><span aria-hidden="true">×</span></button>
</div>

<div id='loader9' style='display: none;'><img
	src="<?php echo base_url();?>assets/loader/tenor.gif"></div>
<form id="addDept" class="form-horizontal form-label-left" novalidate>


<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Department Code <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="deptcode"
	class="form-control col-md-7 col-xs-12" name="deptcode" placeholder=""
	required="required" type="text" onkeypress="return AvoidSpace(event)"></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Department Name <span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="deptname"
	class="form-control col-md-7 col-xs-12" name="deptname" placeholder=""
	required="required" type="text"></div>
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




<div class="modal fade bs-example12090-modal-lg" tabindex="-1"
	role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
<div class="modal-dialog modal-lg">
<div class="modal-content">

<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"><span
	aria-hidden="true" >x</span></button>
<h4 class="modal-title" id="myModalLabel">Edit Department</h4>
<div></div>
</div>
<div class="modal-body">
<div class="alert alert-danger" id="search-error120"
	style="text-align: center; display: none; font-weight: bold;">
<button type="button" class="close" data-dismiss="alert"
	aria-label="Close"><span aria-hidden="true">×</span></button>
</div>
<div class="alert alert-info" id="search-success121"
	style="text-align: center; display: none; font-weight: bold;">
<button type="button" class="close" data-dismiss="alert"
	aria-label="Close"><span aria-hidden="true">×</span></button>
</div>


<form id="editDept" class="form-horizontal form-label-left" novalidate>
<div id='loader101' style='display: none;'><img
	src="<?php echo base_url();?>assets/loader/tenor.gif"></div>
	
	
	<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Department Code <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="Editdeptcode"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
	required="required" type="text"></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Department Name <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="Editdeptname"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
	required="required" type="text" onkeypress="return AvoidSpace(event)"><input type="hidden" id="updateidDept"></div>
</div>

<div class="ln_solid"></div>
<div class="form-group">
<div class="col-md-6 col-md-offset-3" align="center">
<button id="userSubmit" type="submit" class="btn btn-round btn-info">Update</button>
<button type="Button" class="btn btn-round btn-info cancelBtn"
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
   <button type="button" class="btn btn-round btn-danger" id="Delete">Deactivate</button>
    <button type="button" data-dismiss="modal" class="btn btn-round btn">Cancel</button>
  </div>
</div>
</div>
</div>


--><div class="modal fade bs-example1050-modal-lg" tabindex="-1"
	role="dialog" aria-hidden="true">
<div class="modal-dialog modal-lg">
<div class="modal-content">

<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"><span
	aria-hidden="true">x</span></button>
<h4 class="modal-title" id="myModalLabel">Department Details</h4>
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


<form id="DetailedStore" class="form-horizontal form-label-left" novalidate>


<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Department Code <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="Ddeptcode"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
	required="required" type="text" disabled></div>
</div>


<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Department Name<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="Deditdeptname" name="storecity" required="required"
	class="form-control col-md-7 col-xs-12" disabled></div>
</div>

<!--<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Created By<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="DCreatedBy" name="storelat" required="required"
	class="form-control col-md-7 col-xs-12" disabled></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Created Date & Time<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="Dtimedate" name="storelong" required="required"
	class="form-control col-md-7 col-xs-12" disabled></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Modified By<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="DModifiedBy" name="storecity" required="required"
	class="form-control col-md-7 col-xs-12" disabled></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Modified Date & Time<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="DMtimedate" name="storelong" required="required"
	class="form-control col-md-7 col-xs-12" disabled></div>
</div>

--><div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Status<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="Dstatus" name="storelong" required="required"
	class="form-control col-md-7 col-xs-12" disabled></div>
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
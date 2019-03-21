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

<div class="x_content1" id="devices_list123">
<div class="x_content2" id="newUserButton">
<button type="button" class="btn btn-round btn-info" data-toggle="modal"
	data-target=".bs-example-modal-lg">Register New Device</button>
</div>
<table id="datatable-buttons12"
	class="table table-striped jambo_table bulk_action">
	<thead>
		<tr class="headings">

			<th>ID</th>
			<th>Name</th>
			<th>Device</th>
			<th>AppOS</th>
			<th>Registered Date</th>
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
<h4 class="modal-title" id="myModalLabel">Register New Device</h4>
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
<form id="addDevices" class="form-horizontal form-label-left" novalidate>






<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Select
User <span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><select
	class="form-control col-md-7 col-xs-12" name="class" id="userName"
	required>
	<option value="">Select</option>
	<?php foreach($data as $row):?>
	<option value="<?php echo $row->UserID?>"><?php echo $row->UserName.'-'.$row->UserLogin;?></option>
	<?php  endforeach;?>
</select></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Device Mac Id<span
	class="required">*</span></label>
<div class="col-md-6 col-sm-6 col-xs-12">
<div class="macid">
<div class="macid2">
<div class="macid3">
<div class="macid4"><input id="macid1"
	class="form-control col-md-7 col-xs-12" name="macid1" type="text"
	maxlength="2" onkeypress="return AvoidSpace(event)"></div>
<div class="macid5"><input id="macid2"
	class="form-control col-md-7 col-xs-12" name="macid1" type="text"
	maxlength="2" onkeypress="return AvoidSpace(event)"></div>

<div class="macid6"><input id="macid3"
	class="form-control col-md-7 col-xs-12" name="macid1" type="text"
	maxlength="2" onkeypress="return AvoidSpace(event)"></div>

<div class="macid7"><input id="macid4"
	class="form-control col-md-7 col-xs-12" name="macid1" type="text"
	maxlength="2" onkeypress="return AvoidSpace(event)"></div>

<div class="macid8"><input id="macid5"
	class="form-control col-md-7 col-xs-12" name="macid1" type="text"
	maxlength="2" onkeypress="return AvoidSpace(event)"></div>

<div class="macid9"><input id="macid6"
	class="form-control col-md-7 col-xs-12" name="macid1" type="text"
	maxlength="2" onkeypress="return AvoidSpace(event)" required></div>
</div>
</div>
</div>
</div>
</div>


<div class="ln_solid"></div>




<div class="form-group">
<div class="col-md-6 col-md-offset-3" align="center">
<button id="userSubmit" type="submit" class="btn btn-round btn-info">Register</button>
<button type="Button" class="btn btn-round btn-info cancelBtn"
	data-dismiss="modal">Cancel</button>

</div>
</div>
</form>
</div>


</div>
</div>
</div>

<div class="modal fade bs-example130-modal-sm" tabindex="-1"
	role="dialog" aria-hidden="true">
<div class="modal-dialog modal-sm">
<div class="modal-content">
<div class="modal-body">Are you sure?</div>
<div class="modal-footer">
<button type="button" class="btn btn-round btn-danger" id="RemoveDevice">Delete</button>
<button type="button" data-dismiss="modal" class="btn btn-round btn">Cancel</button>
</div>
</div>
</div>
</div>


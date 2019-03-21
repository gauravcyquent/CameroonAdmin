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

<div class="x_content1" id="student_list10">
<div class="x_content2" id="newUserButton">
<button type="button" class="btn btn-round btn-info" data-toggle="modal"
	data-target=".bs-example89-modal-lg">Add new Store</button>
</div>
<table id="datatable-buttons15" class="table table-striped jambo_table bulk_action">
	<thead>
		<tr class="headings">

			<th>SL.NO</th>
			<th>Store Code</th>
			<th>Store Name</th>
			<th>Store City</th>
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

<div class="modal fade bs-example89-modal-lg" tabindex="-1" role="dialog"
	aria-hidden="true" data-backdrop="static" data-keyboard="false">
<div class="modal-dialog modal-lg">
<div class="modal-content">

<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"><span
	aria-hidden="true">x</span></button>
<h4 class="modal-title" id="myModalLabel">Add New Store</h4>
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
<form id="addStore" class="form-horizontal form-label-left" novalidate>


<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Store Code <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="storecode"
	class="form-control col-md-7 col-xs-12" name="storecode" placeholder=""
	required="required" type="text"></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Store Name <span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="storename"
	class="form-control col-md-7 col-xs-12" name="storename" placeholder=""
	required="required" type="text"></div>
</div>

<div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="textarea">Store Address <span class="required"></span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <textarea id="storeaddress"  name="storeaddress" class="form-control col-md-7 col-xs-12"></textarea>
                        </div>
                      </div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Store City<span class="required"></span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="storecity" name="storecity" 
	class="form-control col-md-7 col-xs-12"></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Store Latitude<span class="required"></span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="storelat" name="storelat" 
	class="form-control col-md-7 col-xs-12"></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Store Longitude<span class="required"></span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="storelong" name="storelong" 
	class="form-control col-md-7 col-xs-12"></div>
	<input type="hidden" id="updateidstore">
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




<div class="modal fade bs-example120-modal-lg" tabindex="-1"
	role="dialog" aria-hidden="true" data-backdrop="static" data-keyboard="false">
<div class="modal-dialog modal-lg">
<div class="modal-content">

<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"><span
	aria-hidden="true">x</span></button>
<h4 class="modal-title" id="myModalLabel">Edit Store</h4>
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


<form id="editStores" class="form-horizontal form-label-left" novalidate>
<div id='loader1' style='display: none;'><img
	src="<?php echo base_url();?>assets/loader/tenor.gif"></div>
	
<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Store Code <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="EditStoreCode"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
	required="required" type="text"></div>
</div>	

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Store Name <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="EditStoreName"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
	required="required" type="text"></div>
</div>
<div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="textarea">Store Address <span class="required"></span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <textarea id="editstoreaddress"  name="storeaddress" class="form-control col-md-7 col-xs-12"></textarea>
                        </div>
                      </div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Store City<span class="required"></span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="editstorecity" name="storecity" 
	class="form-control col-md-7 col-xs-12"></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Store Latitude<span class="required"></span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="editstorelat" name="storelat" 
	class="form-control col-md-7 col-xs-12"></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Store Longitude<span class="required"></span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="editstorelong" name="storelong" 
	class="form-control col-md-7 col-xs-12"></div>
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

<div class="modal fade bs-example13-modal-sm" tabindex="-1" role="dialog" aria-hidden="true">
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


<div class="modal fade bs-example105-modal-lg" tabindex="-1"
	role="dialog" aria-hidden="true">
<div class="modal-dialog modal-lg">
<div class="modal-content">

<div class="modal-header">
<button type="button" class="close" data-dismiss="modal"><span
	aria-hidden="true">x</span></button>
<h4 class="modal-title" id="myModalLabel">Store Details</h4>
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
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Store Code <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="DEditStoreCode"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
	required="required" type="text" disabled></div>
</div>


<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Store Name <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="DEditStoreName"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
	required="required" type="text" disabled></div>
</div>
<div class="item form-group">
                        <label class="control-label col-md-3 col-sm-3 col-xs-12" for="textarea">Store Address <span class="required">*</span>
                        </label>
                        <div class="col-md-6 col-sm-6 col-xs-12">
                          <textarea id="Dstoreaddress" required="required" name="storeaddress" class="form-control col-md-7 col-xs-12" disabled></textarea>
                        </div>
                      </div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Store City<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="Deditstorecity" name="storecity" required="required"
	class="form-control col-md-7 col-xs-12" disabled></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Store Latitude<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="Deditstorelat" name="storelat" required="required"
	class="form-control col-md-7 col-xs-12" disabled></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="telephone">Store Longitude<span class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input type="text" id="Deditstorelong" name="storelong" required="required"
	class="form-control col-md-7 col-xs-12" disabled></div>
</div>

<div class="item form-group"><label
	class="control-label col-md-3 col-sm-3 col-xs-12" for="name">Status <span
	class="required">*</span> </label>
<div class="col-md-6 col-sm-6 col-xs-12"><input id="DEditStoreStatus"
	class="form-control col-md-7 col-xs-12" name="name" placeholder=""
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
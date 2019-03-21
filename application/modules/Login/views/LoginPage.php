<!DOCTYPE html>
<html lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<!-- Meta, title, CSS, favicons, etc. -->
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=edge">
<meta name="viewport" content="width=device-width, initial-scale=1">

<title>SPAR-CAM</title>

<!-- Bootstrap -->
<!-- Bootstrap -->
<link href="<?php echo base_url(); ?>assets/css/bootstrap.min.css"
	rel="stylesheet">
<!-- Font Awesome -->
<link href="<?php echo base_url(); ?>assets/css/font-awesome.min.css"
	rel="stylesheet">
<!-- NProgress -->
<link href="<?php echo base_url(); ?>assets/css/nprogress.css"
	rel="stylesheet">
<!-- Animate.css -->
<link href="<?php echo base_url(); ?>assets/css/animate.min.css"
	rel="stylesheet">
<!-- iCheck -->
<link href="<?php echo base_url(); ?>assets/css/green.css"
	rel="stylesheet">
<!-- bootstrap-progressbar -->
<link
	href="<?php echo base_url(); ?>assets/css/bootstrap-progressbar-3.3.4.min.css"
	rel="stylesheet">
<!-- JQVMap -->
<link href="<?php echo base_url(); ?>assets/css/jqvmap.min.css"
	rel="stylesheet" />
<!-- bootstrap-daterangepicker -->
<link href="<?php echo base_url(); ?>assets/css/daterangepicker.css"
	rel="stylesheet">
<!-- Custom Theme Style -->
<link href="<?php echo base_url(); ?>assets/css/custom.min.css"
	rel="stylesheet">

<link href="<?php echo base_url(); ?>assets/css/style.css"
	rel="stylesheet">
</head>

<body class="login">

<div><a class="hiddenanchor" id="signup"></a> <a class="hiddenanchor"
	id="signin"></a>

<div class="login_wrapper">

<div class="animate form login_form">
<section class="login_content">
<div id='loader' style='display: none;'>
  <img src="<?php echo base_url();?>assets/loader/tenor.gif">
</div>
<div class="x_content">

<form id="login" class="form-horizontal form-label-left" id="login" novalidate>
<h1>Login SPAR-CAM</h1>

<div class="alert alert-danger" id="search-error" style="text-align:center; display:none; font-weight: bold; " >
</div>
<div class="alert alert-info" id="search-success" style="text-align:center; display:none; font-weight: bold; " ></div>  

<div style="width: 781px !important;" class="item form-group">
<input style="width: 44% !important;" type="text" id="email" name="email" required="required" class="form-control col-md-7 col-xs-12" placeholder="User Name">
</div>

<div style="width: 781px !important;" class="item form-group">
<input style="width: 44% !important;" id="password" type="password" name="password"  class="form-control col-md-7 col-xs-12" placeholder="Password" required="required" >
</div>

<div><button id="send" type="submit" class="btn btn-round btn-info">Sign-in</button> </div>

<div class="clearfix"></div>

<div class="separator">
<p class="change_link">ForgotPassword? <a href="#signup"
	class="to_register"> Reset Password </a></p>

<div class="clearfix"></div>
<br />

<div>
&copy; <?php ?> BIRetail-All Rights Reserved
</div>
</div>
</form>
</div>
</section>
</div>

<div id="register" class="animate form registration_form">
<section class="login_content">
<form class="form-horizontal form-label-left" novalidate>
<h1>Reset Password</h1>
<div class="item form-group"><input type="email" class="form-control" placeholder="Enter Your Email ID"
	required/>
	</div>
<div><button id="reset" type="submit" class="btn btn-round btn-info">Reset Password</button></div>

<div class="clearfix"></div>

<div class="separator">
<p class="change_link">Move to  <a href="#signin"
	class="to_register"> Log in </a></p>

<div class="clearfix"></div>
<br />

<div>

&copy; <?php ?> BIRetail-All Rights Reserved
</div>
</div>
</form>
</section>
</div>
</div>
</div>

<script> var base_url = "<?php echo base_url();?>";</script>
<script src="<?php echo base_url();?>assets/js/jquery.min.js"></script>
<script src="<?php echo base_url();?>assets/js/jquery.validate.js"></script>
<!-- jQuery -->
<script src="<?php echo base_url();?>assets/js/jquery.min.js"></script>
<!-- Bootstrap -->
<script src="<?php echo base_url();?>assets/js/bootstrap.min.js"></script>
<!-- FastClick -->
<script src="<?php echo base_url();?>assets/js/fastclick.js"></script>
<!-- NProgress -->
<script src="<?php echo base_url();?>assets/js/nprogress.js"></script>
<!-- validator -->
<script src="<?php echo base_url();?>assets/js/validator.js"></script>

<!-- Custom Theme Scripts -->
<script src="<?php echo base_url();?>assets/js/custom.min.js"></script>

<script src="<?php echo base_url();?>assets/js/validation.js"></script>

 
</body>
</html>

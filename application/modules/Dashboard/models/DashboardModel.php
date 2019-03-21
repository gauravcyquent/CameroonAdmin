<?php

class DashboardModel extends  CI_Model{


	var $table = "User_Master";
	
	function __construct() {

		parent::__construct();
		$this->load->library('session');
		
	}


	





}
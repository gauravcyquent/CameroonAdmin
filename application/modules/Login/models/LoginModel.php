<?php

class LoginModel extends  CI_Model{


	var $table = "User_Master";
	
	function __construct() {

		parent::__construct();
		$this->load->library('session');
		
	}


	public function UserAuthentication($UserName,$Password){
		
	  $this->db->where('UserLogin',$UserName);
	  $this->db->where('UserPasswordHash',md5($Password));
	  $this->db->where('UserRoleId','4');
	  $res = $this->db->get($this->table);
	  	
	  if($res->num_rows() === 1) {
	  	
	  	$data['status'] = True;
	  	$data['msg'] = 'Authentication Successfull';
	  	$data['data'] = $res->row();
            
      }
      else {
      	
           $data['status'] = False;
	  	   $data['msg'] = 'Invalid Credentials';
	  	   $data['data'] = NULL ;
      }
	
	 
       return $data;

	}







}
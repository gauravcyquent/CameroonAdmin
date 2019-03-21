<?php

defined('BASEPATH') OR exit('No direct script access allowed');

/*
 *  AUTHOR : GAURAV RANJAN
 *
 *  DATE : 22-10-2018
 *
 *  DESCRIPTION : CONTROLLER CLASS FOR PROCESS THE CALL FOR STORES MODULE
 *
 *
 */


class Department extends CI_Controller{


	public function __construct() {
		parent::__construct();

		$this->load->model('DepartmentModel');
		$this->load->helper('url');
		$this->load->library('form_validation');
	}


	public function index(){

		$status = $this->session->userdata('logged_in');
		if($status == 1){
			$this->template->load('Departmentlist');
		}

		else{
			$this->load->view('Login/LoginPage');
		}
	}

	public function getAllDepartments(){

		try{

			$Dept['data'] = $this->DepartmentModel->getAllDepartments();
		}

		catch (Exception $e){}

		echo json_encode ( $Dept );

	}

	public function AddDepartment(){

		try {

	 	$Data = (array)$this->input->post('dept');

	 	$AddDept = $this->DepartmentModel->InsertDepartment($Data);

	 	$response['status'] = $AddDept['status'];
	 	$response['msg']    = $AddDept['msg'];

	 }

	 catch (Exception $e){}

	 echo json_encode($response);


	}

	public function EditDepartment(){

		try {
			$Data = (array)$this->input->post('dept');

	 	$EditDept = $this->DepartmentModel->EditDepartmentData($Data);

	 	$response['status'] = $EditDept['status'];
	 	$response['msg']    = $EditDept['msg'];

		}

		catch (Exception $e){}

		echo json_encode($response);

	}


	public function deactivateDepartment(){

		try{

			$ID = $this->input->post('id');
			$DeactivateDept = $this->DepartmentModel->deactivateDepartment($ID);

			$response['status'] = $DeactivateDept['status'];
			//$response['msg']    = $DeactivateDept['msg'];
		}

		catch(Exception $e){}

		echo json_encode($response);


	}
	
	public function activateDepartment(){

		try{

			$ID = $this->input->post('id');
			$activateDept = $this->DepartmentModel->activateDepartment($ID);

			$response['status'] = $activateDept['status'];
			//$response['msg']    = $DeactivateDept['msg'];
		}

		catch(Exception $e){}

		echo json_encode($response);


	}


}
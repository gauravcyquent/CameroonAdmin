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


class Stores extends CI_Controller{


	public function __construct() {
		parent::__construct();

		$this->load->model('StoresModel');
		$this->load->helper('url');
		$this->load->library('form_validation');
	}


	public function index(){

		$status = $this->session->userdata('logged_in');
		if($status == 1){
			$this->template->load('Storelist');
		}

		else{
			$this->load->view('Login/LoginPage');
		}
	}

	public function getAllStores(){

		try{

			$Stores['data'] = $this->StoresModel->getAllStores();
		}

		catch (Exception $e){}

		echo json_encode ( $Stores );

	}

	public function AddStores(){


	 try {

	 	$Data = (array)$this->input->post('store');

	 	$AddStore = $this->StoresModel->InsertStoreData($Data);

	 	$response['status'] = $AddStore['status'];
	 	$response['msg']    = $AddStore['msg'];

	 }

	 catch (Exception $e){}

	 echo json_encode($response);


	}

	public function EditStores(){

		try {
			$Data = (array)$this->input->post('store');

	 	$EditStore = $this->StoresModel->EditStoreData($Data);

	 	$response['status'] = $EditStore['status'];
	 	$response['msg']    = $EditStore['msg'];

		}

		catch (Exception $e){}

		echo json_encode($response);

	}
	
	
	public function dectivateStores(){

		try{

			$ID = $this->input->post('id');
			$DeleteStore = $this->StoresModel->dectivateStores($ID);

			$response['status'] = $DeleteStore['status'];
			
		}

		catch(Exception $e){}

		echo json_encode($response);


	}
	
	
	public function activateStores(){

		try{

			$ID = $this->input->post('id');
			$DeleteStore = $this->StoresModel->activateStores($ID);

			$response['status'] = $DeleteStore['status'];
			
		}

		catch(Exception $e){}

		echo json_encode($response);


	}


}
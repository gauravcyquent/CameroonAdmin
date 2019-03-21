<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
 * Author : GAURAV RANJAN
 *
 * Date   : 10-10-2018
 *
 * Description : CONTROLLER CLASS FOR PROCESS THE CALL
 *
 */



class Login extends CI_Controller {


	public function __construct() {
		parent::__construct();

		$this->load->model('LoginModel');
		$this->load->helper('url');
		$this->load->library('form_validation');
	}


	public function index(){

		$this->load->view('LoginPage');
	}

	public function UserAuthentication(){

		$Data = $this->input->post('user');
		$UserID = $Data['UserEmail'];
		$Password = $Data['UserPasswordHash'];

		try{


			$result = $this->LoginModel->UserAuthentication($UserID,$Password);

			if($result['status'] == True){

				$data['userid'] = $result['data']->UserID;
				$data['logged_in'] = true;
				$this->session->set_userdata($data);

			}


			$response['status'] = $result['status'];
			$response['msg']    = $result['msg'];







		}

		catch(Exception $e){



		}


		echo json_encode($response);

	}

	public function Logout(){
			
		session_destroy();
		redirect('Login/');

	}



}
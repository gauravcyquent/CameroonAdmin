<?php
defined('BASEPATH') OR exit('No direct script access allowed');

/*
 * Author : GAURAV RANJAN
 *
 * Date   : 10-10-2018
 *
 * Description : CONTROLLER CLASS FOR PROCESS THE CALL FOR USERS MODULE
 *
 */



class Users extends CI_Controller {


	public function __construct() {
		parent::__construct();

		$this->load->model('UsersModel');
		$this->load->helper('url');
		$this->load->library('form_validation');
	}

	public function index(){

		$status = $this->session->userdata('logged_in');
		if($status == 1){

			$GetRoles['roles'] = $this->UsersModel->getAllRoles();
			$GetRoles['stores'] = $this->UsersModel->getAllStores();

			$this->template->load('UsersList',$GetRoles);
		}

		else{

			$this->load->view('Login/LoginPage');

		}
	}

	public function getAllUsers(){

		try
		{

			$Users['data'] = $this->UsersModel->getAllUsers();


		}

		catch (Exception $e){


		}

		echo json_encode ( $Users );

	}


	/*
	 * Author : Gaurav Ranjan
	 *
	 * Description : Controller Method to Add new User In Database
	 *
	 * Date: 15-10-2018
	 */


	public function AddUser(){

	 try {

	 	$Data = (array)$this->input->post('user');

	 	$AddUsers = $this->UsersModel->InsertUsers($Data);

	 	$response['status'] = $AddUsers['status'];
	 	$response['msg']    = $AddUsers['msg'];

	 }

	 catch (Exception $e){}

	 echo json_encode($response);


	}

	public function editUsers(){

	 try {
	 	$Data = (array)$this->input->post('user');

	 	$UpdateUsers = $this->UsersModel->UpdateUsers($Data);

	 	$response['status'] = $UpdateUsers['status'];
	 	$response['msg']    = $UpdateUsers['msg'];

	 }

	 catch (Exception $e){}

	 echo json_encode($response);


	}

	public function deleteUsers(){

		try{

			$ID = $this->input->post('id');
			$DeleteUsers = $this->UsersModel->DeleteUsers($ID);

			$response['status'] = $DeleteUsers['status'];
			$response['msg']    = $DeleteUsers['msg'];
		}

		catch(Exception $e){}

		echo json_encode($response);


	}
	
	
	public function ActivateUsers(){
		
			try{

			$ID = $this->input->post('id');
			$ActivateUsers = $this->UsersModel->ActivateUsers($ID);

			$response['status'] = $ActivateUsers['status'];
			
		}

		catch(Exception $e){}

		echo json_encode($response);
		
	}


	public function Devicelist(){

		$status = $this->session->userdata('logged_in');
		if($status == 1){

			//$GetRoles['roles'] = $this->UsersModel->getAllRoles();
			$Users['data'] = $this->UsersModel->getAllUsers();

			$this->template->load('UsersDevices',$Users);
		}

		else{

			$this->load->view('Login/LoginPage');

		}

	}

	public function getAllUserDevices(){

		try{ $Devices['data'] = $this->UsersModel->getAllUserDevices();}

		catch (Exception $e){}

		echo json_encode ( $Devices );

	}


	public function AddDevice(){

		try{
			$Data = (array)$this->input->post('device');

			$AddDevices = $this->UsersModel->InsertDevice($Data);

			$response['status'] = $AddDevices['status'];
			$response['msg']    = $AddDevices['msg'];


		}
		catch (Exception $e){}

		echo json_encode ( $response );

	}

	public function deleteDevices(){

		try{

			$ID = $this->input->post('id');
			$DeleteDevices = $this->UsersModel->deleteDevices($ID);

			$response['status'] = $DeleteDevices['status'];
			$response['msg']    = $DeleteDevices['msg'];
		}

		catch(Exception $e){}

		echo json_encode($response);


	}
	
	
	
		
		public function testmail(){
		
		 error_reporting(E_ALL);
		 ini_set('display_errors', 1);
		 
		require_once ('/var/www/html/SamaCamAdmin/application/third_party/PHPMailer/PHPMailerAutoload.php');
		// require_once ('/var/www/html/apiqa_max/PHPMailer/class.smtp.php');
       
        
		$mail = new PHPMailer(); // create a new object
	    $mail->IsSMTP (); // enable SMTP
		//$mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
		$mail->SMTPAuth = true; // authentication enabled
		$mail->SMTPSecure = 'ssl'; // secure transfer enabled REQUIRED for GMail
		$mail->Host = "smtp.gmail.com"; 
		$mail->Port = 587;
		
		$mail->Username = "notifications@samaretail.com";
		$mail->Password = "Welcome@123";
		$mail->SetFrom ( "sama.reports@biretail.com", "sama.reports@biretail.com");
		$mail->AddReplyTo("sama.reports@biretail.com", "Biretail SAMA");
		$mail->Subject = "SAMA Daily Login Report"; 
		$mail->Body = nl2br("test");
		//$mail->addAttachment("/var/www/html/apiqa_max/uploads/csv/".$filename);
		$mail->IsHTML(true);
	    //$mail->AddAddress ( "racy.gaurav@gmail.com" );
		//->AddAddress ("baskaran.t@cyquent.com");
		$mail->AddAddress ("gaurav.r@cyquent.com");
		$mail->AddCC("baskaran@biretail.com");
		$mail->Priority = 1;
        $mail->AddCustomHeader("X-MSMail-Priority: High");
		if (! $mail->Send ()) {
			$error = 'Mail error: ' . $mail->ErrorInfo;
			
			print_r($error);

		} else {
			echo 'Mail sent';

		}
		//echo $error;exit;
		$mail->ClearAddresses (); // each AddAddress add to list
		$mail->ClearCCs ();
		$mail->ClearBCCs ();
		//print_r($error); 
		
		 
		
		
		
		
		
	}
		
		
		
		
		
	
		
		
		






}
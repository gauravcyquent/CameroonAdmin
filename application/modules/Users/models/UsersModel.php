<?php

class UsersModel extends  CI_Model{


	var $table = "User_Master";
	var $roles = "Role_Master";
	var $Store = "Store_Master";
	var $RegisteredDevices = "Registered_Devices";

	function __construct() {

		parent::__construct();


	}

	public function getAllUsers(){

		//$this->db->where('UserDeletedFlag','False');
		$this->db->order_by("UserName", "asc");
		$this->db->join ( 'Store_Master', 'User_Master.UserStoreId = Store_Master.StoreId', 'left' );
		$this->db->join ('Role_Master','Role_Master.RoleID = User_Master.UserRoleId','left');
		$this->db->select('User_Master.*,Store_Master.StoreName,Role_Master.RoleName');
		$res = $this->db->get ( $this->table );


		$array = array();
		foreach($res->result() as $result){

			if($result->UserDeletedFlag === 'False'){

				$result->UserDeletedFlag = "Active";

			}

			else{

				$result->UserDeletedFlag = "Inactive";
			}

			array_push($array,$result);

		}

		return $array;


	}


	public function getAllRoles(){

		$this->db->where('RoleLevel!=','4');
		$this->db->where('RoleDeletedFlag','False');
		$res = $this->db->get($this->roles);
		return $res->result();

	}

	public function getAllStores(){

		$this->db->where('StoreDeletedFlag','False');
		$res = $this->db->get($this->Store);
		return $res->result();


	}

	public function InsertUsers($Data){

			
		$UserLogin = $Data['UserLogin'];
		$this->db->where('UserLogin',$UserLogin);
		$res = $this->db->get($this->table);
		if ($res->num_rows() > 0) {




			$data['status'] = False;
			$data['msg'] = 'Entered User Login Name already exists';
			$data['data'] = NULL ;

		}

		else{


			$Data['UserEmail'] = $Data['UserEmail'];
			$UserPassword= $this->random_password();
			$Data['UserPasswordHash'] = md5($UserPassword);
			$Data['UserCreatedBy'] = $this->session->userdata('userid');
			$PIN = rand ( 1000 , 9999 );
			$Data['UserPinHash'] = md5($PIN);
			$this->db->set('UserModifiedDateTime','NOW()',false);
			$this->db->set('UserCreatedDateTime', 'NOW()', false);
			$this->db->insert($this->table, $Data);

			if($this->db->insert_id()){


				$htmlContent = '<p>Congratulations! You have been added as a User to the SAMA Mobile App. Please download the App “SAMA SparCam” from the Android PlayStore, and log in with the following details:</p>';
				$htmlContent.= '<p> User Name: "'.$UserLogin.'" <br> Password: "'.$UserPassword.'" <br>';
				$htmlContent.= '<p>Once you have logged in, you can change your password from the Menu on the Mobile App.<br>Thank you,<br>SAMA Administrator</p>';

				$this->Sendmail($htmlContent,$Data['UserEmail']);
				/*$config['mailtype'] = 'html';
				$this->email->initialize($config);
				$this->email->to('gaurav.r@cyquent.com');
				$this->email->from('Admin@samaretail.com','Sama-Cameroon');
				$this->email->subject('Welcome to the SAMA Mobile App');
				$this->email->message($htmlContent);
				$this->email->send();*/
					
				$data['status'] = True;
				$data['msg'] = 'User details added successfully';
				$data['data'] = $this->db->insert_id();
			}

			else{
					
				$data['status'] = False;
				$data['msg'] = 'Unknown Error';
				$data['data'] = NULL ;
			}


		}

		return $data;



	}

	function random_password( $length = 8 ) {
		$chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
		$password = substr( str_shuffle( $chars ), 0, $length );
		return $password;
	}


	public function UpdateUsers($Data){



		$UserLogin = $Data['UserLogin'];
		$this->db->where('UserLogin',$UserLogin);
		$res = $this->db->get($this->table);
		if (($res->num_rows() > 0)&&($Data['UserID']!== $res->row()->UserID)){

			$data['status'] = False;
			$data['msg'] = 'Entered User Login Name already exists';
			$data['data'] = NULL ;

		}

		else{

			$UserID = $Data['UserID'];
			unset($Data['UserID']);
			$Data['UserModifiedBy'] = $this->session->userdata('userid');
			$this->db->set('UserModifiedDateTime','NOW()',false);

			$this->db->where ( 'UserID', $UserID );
			$update = $this->db->update ( $this->table,$Data );

			if($update){

				$data['status'] = True;
				$data['msg'] = 'User details updated successfully';
				$data['data'] = NULL ;
			}

			else{

				$data['status'] = False;
				$data['msg'] = 'Unknown Error';
				$data['data'] = NULL ;
			}


		}

		return $data;

	}

	public function DeleteUsers($ID){

		$Data['UserDeletedFlag'] = 'True';

		$this->db->where ( 'UserID', $ID );
		$delete = $this->db->update ($this->table,$Data);
		if($delete){

			$data['status'] = True;
			$data['data'] = NULL ;

		}

		else{

			$data['status'] = False;
			$data['data'] = NULL ;

		}

	}


	public function ActivateUsers($ID){


		$Data['UserDeletedFlag'] = 'False';

		$this->db->where ( 'UserID', $ID );
		$delete = $this->db->update ($this->table,$Data);
		if($delete){

			$data['status'] = True;
			$data['data'] = NULL ;

		}

		else{

			$data['status'] = False;
			$data['data'] = NULL ;

		}

	}



	public function getAllUserDevices(){


		$this->db->order_by('User_Master.UserName','ASC');
		$this->db->join ('User_Master','Registered_Devices.UserID = User_Master.UserID','left');
		$this->db->where('User_Master.UserDeletedFlag','False');
		$this->db->select('Registered_Devices.*,User_Master.UserName');
		$res = $this->db->get ( $this->RegisteredDevices );
		return $res->result();


	}

	public function InsertDevice($Device){

		$CheckDevice = $Device['MacID'];
		
		

		$array = explode(':', $CheckDevice);
		
		$val = '';
		foreach($array as $arr){
			
			if(strlen($arr) < 2){
				
				$val = TRUE;
			}
		}
		
		if($val){
			$data['status'] = False;
			$data['msg'] = 'Invalid Device Mac Id. Please re-enter.';
			$data['data'] = NULL ;
			
		}
		

		elseif (in_array(null, $array, true) || in_array('', $array, true)) {

			$data['status'] = False;
			$data['msg'] = 'Invalid Device Mac Id. Please re-enter.';
			$data['data'] = NULL ;
		}

		else{

			$this->db->where('DeviceMacId',$CheckDevice);
			$res = $this->db->get($this->RegisteredDevices);
			if ($res->num_rows() === 1) {

				$data['status'] = False;
				$data['msg'] = 'Device is already registered to another user. To register this device again, please delete the existing registration for this device.';
				$data['data'] = NULL ;

			}

			else{

				$UserID = $Device['UserID'];
				$this->db->where('UserID',$UserID);
				$res = $this->db->get($this->RegisteredDevices);

				if ($res->num_rows() === 1) {

					$data['status'] = False;
					$data['msg'] = 'User already has a registered device. To register a new device to this user, please delete the current device of this user.';
					$data['data'] = NULL ;

				}

				else{

					$Data['UserID'] = $Device['UserID'];
					$Data['DeviceMacId'] = strtoupper($Device['MacID']);
					$Data['AppOs'] = 'android';
					$Data['RegisteredBy'] = $this->session->userdata('userid');
					$this->db->set('RegisteredDateTime','NOW()',false);
					$this->db->insert($this->RegisteredDevices, $Data);

					if($this->db->insert_id()){

						$data['status'] = True;
						$data['msg'] = 'Device assigned successfully to user';
						$data['data'] = $this->db->insert_id();
					}

					else{

						$data['status'] = False;
						$data['msg'] = 'Unknown Error';
						$data['data'] = NULL ;
					}

				}
			}




		}

		return $data;


	}


	public function deleteDevices($ID){


		$this->db->where ( 'UserDeviceMapId', $ID );
		$delete = $this->db->delete ($this->RegisteredDevices);
		if($delete){

			$this->db->where ( 'UserDeviceMapId', $ID );
			$delete = $this->db->delete ('User_DeviceToken');

			if($delete){

				$data['status'] = True;
				$data['msg'] = '';
				$data['data'] = NULL ;
			}

			else{

					
				$data['status'] = False;
				$data['msg'] = 'Unknown Error';
				$data['data'] = NULL ;

			}

		}

		else{

			$data['status'] = False;
			$data['msg'] = 'Unknown Error';
			$data['data'] = NULL ;
		}


		return $data;



	}
	
	function Sendmail($Body,$To){
		
		require_once ('/var/www/html/SamaSparCamAdmin/application/third_party/PHPMailer/PHPMailerAutoload.php');
		// require_once ('/var/www/html/apiqa_max/PHPMailer/class.smtp.php');
       
        
		$mail = new PHPMailer(); // create a new object
	    $mail->IsSMTP (); // enable SMTP
		//$mail->SMTPDebug = 0; // debugging: 1 = errors and messages, 2 = messages only
		$mail->SMTPAuth = true; // authentication enabled
		$mail->SMTPSecure = 'tls'; // secure transfer enabled REQUIRED for GMail
		$mail->Host = "smtp.gmail.com"; 
		$mail->Port = 587;
		
		$mail->Username = "sama.reports@biretail.com";
		$mail->Password = "Welcome@123";
		$mail->SetFrom ( "notifications@samaretail.com", "notifications@samaretail.com");
		$mail->AddReplyTo("notifications@samaretail.com", "notifications@samaretail.com");
		$mail->Subject = "Welcome to the SAMA Mobile App"; 
		$mail->Body = nl2br($Body);
		//$mail->addAttachment("/var/www/html/apiqa_max/uploads/csv/".$filename);
		$mail->IsHTML(true);
	    //$mail->AddAddress ( "racy.gaurav@gmail.com" );
		//->AddAddress ("baskaran.t@cyquent.com");
		$mail->AddAddress ($To);
		//$mail->AddCC("baskaran@biretail.com");
		$mail->Priority = 1;
        $mail->AddCustomHeader("X-MSMail-Priority: High");
		if (! $mail->Send ()) {
			$error = 'Mail error: ' . $mail->ErrorInfo;
			
			//print_r($error);

		} else {
			//echo 'Mail sent';

		}
		//echo $error;exit;
		$mail->ClearAddresses (); // each AddAddress add to list
		$mail->ClearCCs ();
		$mail->ClearBCCs ();
		//print_r($error); 
		
				
	}
		
		
	





}
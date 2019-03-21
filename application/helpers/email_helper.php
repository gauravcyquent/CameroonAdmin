<?php
if (!function_exists('SendEmail')) {

	function SendEmail($data) {
		$CI = &get_instance ();
		
		$data['view'] = $data;

		$msg = $CI->load->view('Email',$data,true);  
        //$config['mailtype'] = 'html';
		$CI->load->library('email');
		$CI->email->set_mailtype("html");
		$CI->email->from('gaurav.r@cyquent.com', 'Cyquent Infotech');
		$CI->email->to('baskaran.t@cyquent.com');
		//$CI->email->cc('niraj.jaipuria@cyquent.com');
		$CI->email->bcc('gaurav.r@cyquent.com');

		$CI->email->subject('Email Test');
		$CI->email->message($msg);

		$CI->email->send();
	}

}

?>
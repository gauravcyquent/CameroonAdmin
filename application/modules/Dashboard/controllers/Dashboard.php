<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Dashboard extends CI_Controller {

	
	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	
	
	
     public function __construct() {
		parent::__construct();

		$this->load->model('DashboardModel');
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	public function index()
	{
		$status = $this->session->userdata('logged_in');
		if($status == 1){
		$this->template->load ( 'Dash');
		}
		else{
			
			$this->load->view('Login/LoginPage');
		}
	}
}
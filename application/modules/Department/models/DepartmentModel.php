<?php
class DepartmentModel extends  CI_Model{


	var $Dept = "Department_Master";

	function __construct() {

		parent::__construct();


	}


	public function InsertDepartment($Data){

		$DeptCode = $Data['DepartmentCode'];
		$this->db->where('DepartmentCode',$DeptCode);
		$res = $this->db->get($this->Dept);



		if ($res->num_rows() === 1) {

			$data['status'] = False;
			$data['msg'] = 'Entered Department Code is already exists. Please try different Department code';
			$data['data'] = NULL ;

		}

		else{

			$DeptName = $Data['DepartmentName'];
			$this->db->where('DepartmentName', $DeptName);
			$res = $this->db->get($this->Dept);

			if($res->num_rows() === 1){

				$data['status'] = False;
				$data['msg'] = 'Entered Department Name is already mapped with other Department Code. Please try different Department Name';
				$data['data'] = NULL ;
			}

			else{

				$Data['CreatedBy'] = $this->session->userdata('userid');
				$Data['ModifiedBy'] = $this->session->userdata('userid');
				$this->db->set('CreatedDateTime','NOW()',false);
				$this->db->set('ModifiedDateTime', 'NOW()', false);
				$this->db->insert($this->Dept, $Data);

				if($this->db->insert_id()){

					$data['status'] = True;
					$data['msg'] = 'Department details added successfully';
					$data['data'] = $this->db->insert_id();
				}

				else{

					$data['status'] = False;
					$data['msg'] = 'Unknown Error';
					$data['data'] = NULL ;
				}


			}





		}

		return $data;



	}

	public function getAllDepartments(){

		$this->db->order_by('DepartmentName','ASC');
		$this->db->select('Department_Master.*,cby.UserName as CreatedByUser,mby.UserName as ModifiedByUser');
		$this->db->from('Department_Master');
		$this->db->join('User_Master as cby','Department_Master.CreatedBy = cby.UserID','left');
		$this->db->join('User_Master as mby','Department_Master.ModifiedBy = mby.UserID','left');
		$res = $this->db->get();

		$array = array();
		foreach($res->result() as $result){

			if($result->DepartmentDeletedFlag === 'False'){

				$result->DepartmentDeletedFlag = "Active";

			}
			else {
				$result->DepartmentDeletedFlag = "Inactive";
			}

			array_push($array,$result);

		}

		return $array;


	}

	public function EditDepartmentData($Data){

		$DeptID = $Data['ID'];
		$DeptName = $Data['DepartmentName'];
		$this->db->where('DepartmentName', $DeptName);
		$res = $this->db->get($this->Dept);

		if(($res->num_rows() > 0)  && ($DeptID!= $res->row()->DepartmentId)){
				
			$data['status'] = False;
			$data['msg'] = 'Entered Department Name is already mapped with other Department Code. Please try different Department Name';
			$data['data'] = NULL ;
		}
			
			
		else{

			$DeptCode = $Data['DepartmentCode'];
		    $this->db->where('DepartmentCode', $DeptCode);
		    $res = $this->db->get($this->Dept);
		    
		    if(($res->num_rows() > 0)  && ($DeptID!= $res->row()->DepartmentId)){
		    	
		    	$data['status'] = False;
			    $data['msg'] = 'Entered Department Code already exists';
			    $data['data'] = NULL ;
		    }
			
		    else{

			unset($Data['ID']);
			$Data['ModifiedBy'] = $this->session->userdata('userid');
			$this->db->set('ModifiedDateTime','NOW()',false);

			$this->db->where ( 'DepartmentId', $DeptID );
			$update = $this->db->update ( $this->Dept,$Data );

			if($update){

				$data['status'] = True;
				$data['msg'] = 'Department details updated successfully';
				$data['data'] = NULL ;
			}

			else{

				$data['status'] = False;
				$data['msg'] = 'Unknown Error';
				$data['data'] = NULL ;
			}

				
		    }
		}

		return $data;

	}
	
	
	public function deactivateDepartment($ID){
		
	    $Data['DepartmentDeletedFlag'] = 'True';

		$this->db->where ( 'DepartmentId', $ID );
		$delete = $this->db->update ($this->Dept,$Data);
		if($delete){

			$data['status'] = True;
			$data['data'] = NULL ;

		}

		else{

			$data['status'] = False;
			$data['data'] = NULL ;

		}
		
		return $data;
		
		
	}
	
	
	public function activateDepartment($ID){
		
	    $Data['DepartmentDeletedFlag'] = 'False';

		$this->db->where ( 'DepartmentId', $ID );
		$delete = $this->db->update ($this->Dept,$Data);
		if($delete){

			$data['status'] = True;
			$data['data'] = NULL ;

		}

		else{

			$data['status'] = False;
			$data['data'] = NULL ;

		}
		
		return $data;
		
		
	}







}
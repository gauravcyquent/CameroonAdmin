<?php
class StoresModel extends  CI_Model{


	var $Store = "Store_Master";

	function __construct() {

		parent::__construct();


	}


	public function InsertStoreData($Data){

			
		$StoreCode = $Data['StoreCode'];
		$this->db->where('StoreCode',$StoreCode);
		$res = $this->db->get($this->Store);



		if ($res->num_rows() === 1) {

			$data['status'] = False;
			$data['msg'] = 'Entered Store Code is already exists. Please try different store code';
			$data['data'] = NULL ;

		}

		else{

			$StoreName = $Data['StoreName'];
			$this->db->where('StoreName', $StoreName);
			$res = $this->db->get($this->Store);

			if($res->num_rows() > 0){

				$data['status'] = False;
				$data['msg'] = 'Entered Store Name is already mapped with other Store Code. Please try different  Store Name';
				$data['data'] = NULL ;
			}

			else{

				$Data['CreatedBy'] = $this->session->userdata('userid');
				$Data['ModifiedBy'] = $this->session->userdata('userid');
				$this->db->set('CreatedDateTime','NOW()',false);
				$this->db->set('ModifiedDateTime', 'NOW()', false);
				$this->db->insert($this->Store, $Data);

				if($this->db->insert_id()){

					$data['status'] = True;
					$data['msg'] = 'Store details added successfully';
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

	public function getAllStores(){

		$this->db->order_by('StoreName','ASC');
		$this->db->select('Store_Master.*,User_Master.UserName');
		$this->db->from('Store_Master');
		$this->db->join('User_Master','Store_Master.CreatedBy = User_Master.UserID','left');
		$res = $this->db->get();
		$array = array();
		foreach($res->result() as $result){

			if($result->StoreDeletedFlag === 'False'){

				$result->StoreDeletedFlag = "Active";

			}
			else {
				$result->StoreDeletedFlag = "Inactive";
			}

			array_push($array,$result);

		}

		return $array;


	}

	public function EditStoreData($Data){

		$ID  = $Data['StoreCode'];
		$this->db->where('StoreCode',$ID);
		$res = $this->db->get($this->Store);
		//$res->num_rows();
		//$Data['UserLogin'];
		//$res->row()->StoreCode;
		if (($res->num_rows() > 0)&&($Data['StoreID']!== $res->row()->StoreId)) {

			$data['status'] = False;
			$data['msg'] = 'Entered Store Code already exists';
			$data['data'] = NULL ;

		}

		else{
				
			$StoreName = $Data['StoreName'];
			$this->db->where('StoreName', $StoreName);
			$res = $this->db->get($this->Store);

			if(($res->num_rows() > 0) && ($Data['StoreID']!== $res->row()->StoreId)){

				$data['status'] = False;
				$data['msg'] = 'Entered Store Name is already mapped with other Store Code. Please try different  Store Name';
				$data['data'] = NULL ;
			}
				
			else{

				$StoreID = $Data['StoreID'];
				unset($Data['StoreID']);
				$Data['ModifiedBy'] = $this->session->userdata('userid');
				$this->db->set('ModifiedDateTime','NOW()',false);

				$this->db->where ( 'StoreId', $StoreID );
				$update = $this->db->update ( $this->Store,$Data );

				if($update){

					$data['status'] = True;
					$data['msg'] = 'Store details updated successfully';
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


	public function dectivateStores($ID){

		$Data['StoreDeletedFlag'] = 'True';

		$this->db->where ( 'StoreId', $ID );
		$delete = $this->db->update ($this->Store,$Data);
		if($delete){

			$data['status'] = True;
			//$data['data'] = NULL ;

		}

		else{

			$data['status'] = False;
			//$data['data'] = NULL ;

		}

	}




	public function activateStores($ID){

		$Data['StoreDeletedFlag'] = 'False';

		$this->db->where ( 'StoreId', $ID );
		$delete = $this->db->update ($this->Store,$Data);
		if($delete){

			$data['status'] = True;
			//$data['data'] = NULL ;

		}

		else{

			$data['status'] = False;
			//$data['data'] = NULL ;

		}

	}







}
<?php
if($_SERVER['REQUEST_METHOD'] == 'POST'){
	if($_POST["action"] == 'get_sessionID' ){ 
			$session_data = '';
			if(!session_id()){
				session_start();
				$session_data = json_encode(array('session_id'=>session_id(),'new'=>1));
			} else{
				$session_data = json_encode(array('session_id'=>session_id(),'new'=>0));
			}
			print_r($session_data);
			exit;
	} // get session_id
	
	if($_POST["action"] == 'processData'){
		
		$session_id = $_POST["session_id"];
		
		if(!array_key_exists('clickData',$_POST)){
			$result = array('action'=>'error2','session_id'=>$session_id);
		}elseif(!array_key_exists('questionData',$_POST)){
			$result = array('action'=>'error1','session_id'=>$session_id);
		}else {
			$clickData = $_POST["clickData"];
			$questionData = $_POST["questionData"]; 
			$result = array('action'=>'success',
							'session_id'=>$session_id,
							'clickData'=>$clickData,
							'QuestionsData'=>$questionData); 
		}
		print_r(json_encode($result));
		exit;
	}
}
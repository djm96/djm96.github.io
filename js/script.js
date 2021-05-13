$(document).ready(function(){
	$.ajax({
            method: "POST",
            url: "./process.php",
            data:{
		action: 'get_sessionID',
		session_id : $("#session_id").val(),
		}
          }).done(function(response) {
            var data = JSON.parse(response);
			$("#session_id").val(data.session_id);
          });
 
	/*------------------------*/

});


function get_question(){
	var questions = [
		 'custom question one' , 
	];
	var index = Math.floor(Math.random() * questions.length);
	var question_str = questions[index];	
	return {Qid:index,question:question_str};
 	
}
function getData(data,descs){ 
	var clicks = [];
	var questions = [];
	  if(data){
		for(i=0;i<data.length;i++){
			if(typeof data[i] != 'undefined'){
				 clicks.push({
					 timestamp : data[i].timestamp,
					 x : data[i].cx,
					 y : data[i].cy,
					 imgSrc : data[i].image.src});
			}
		}
	} 
	if(descs){
		for(i=0;i<descs.length;i++){  		
			questions.push({
						timestamp : descs[i].timestamp,
						answer : descs[i].diff.join(",")
					}); 
		}
	}
	  
		 
	  $.post("./process.php",{
		action: 'processData',
		clickData : clicks,
		questionData: questions, 
		session_id : $("#session_id").val()
		},function(response){
			console.log
			var data = JSON.parse(response);
			if(data.action == 'success'){
				$("#desc").val("Session ID: "+data.session_id);
				$("#desc").css('font-size','25px');
				$("#desc").css('font-weight','bold');
				$("#nextbtn").attr('disabled','disabled');
				$("#desc").attr('disabled','disabled');
				$("#nextbtn").hide();
			}else if(data.action == 'error1'){
				alert("Please Answer the Question(s)");
			}else if(data.action == 'error2'){
				alert("You did not click any image");
			}
	}); 	  
 	
 }
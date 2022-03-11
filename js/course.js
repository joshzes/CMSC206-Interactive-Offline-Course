$(document).ready(function() {
	profile = JSON.parse(localStorage.getItem('profile'));
	changeModule(profile['current_module']);

	var url = window.location.href;
	try{
		var mqparam = url.split('?')[1].split('=');
		mqparam.shift();
		mqparam = mqparam + "";

		if(mqparam){
			changeModule(mqparam.charAt(0));
			changeQuiz(mqparam.charAt(0),mqparam.charAt(1));
		}
	}catch(e){

	}
	
});

$(".list-unstyled li a").click(function(){
	if($(this).data("value") <= 8){
		profile['current_module'] = $(this).data("value");
		localStorage.setItem('profile', JSON.stringify(profile));
	}
	changeModule($(this).data("value"));
});

$(".list-inline").on("click", "li a", function(){
	changeQuiz($(this).data("module"),$(this).data("quiz"));
});

function changeModule(module){
	qcount = [0,3,4,4,7,2,2,2,0];
	qfour = [0,1,2,3,4,6,7,8];
	qcontent = "";
	iframe_desc_sub = "Study the course module below. Alternatively, you can download it here: ";
	switch(module){
		case -1:
		 	$('#currentframe').attr('src', 'message.html');	
			$("#module_quiz .list-inline").html(qcontent);
			iframe_desc_header = "";
			iframe_desc_sub = ""
			$("#module_quiz").addClass("invisible");
			break;
		case 0:
			//$('#currentframe').attr('src', 'modules/courseguide.pdf');	
			$('#currentframe').attr('src', 'introduction.html');	
			$("#module_quiz .list-inline").html(qcontent);
			iframe_desc_header = "";
			iframe_desc_sub = ""
			//iframe_desc_sub += "<a href='modules/courseguide.pdf' download target='_blank'> Course Guide.pdf</a>";
			$("#module_quiz").addClass("invisible");
			break;
		case 9:
			if(checkTotal()){
				$('#currentframe').attr('src', 'quiz/final-exam.html');
				$("#module_quiz .list-inline").html(qcontent);
				iframe_desc_header = "Final Exam";
				iframe_desc_sub = "This is your final requirement for this course.<br>You need to get 80% of your answers correctly to be able to complete the course.<br>You can also retry this exam as many times as you want."
				$("#module_quiz").addClass("invisible");
			}else{
				window.alert("You need to get 100% in all of the quizzes to be able to take the final exam.")
			}
			break;
		default:
			$('#currentframe').attr('src', 'modules/Module'+ module +'.pdf');
			iframe_desc_header = "Module " + module;
			iframe_desc_sub += "<a href='modules/Module" + module + ".pdf' download target='_blank'> Module " + module + ".pdf</a><br>Best to take the Quizzes linked below every after each lesson";
			if(module == 4){
				for (var i = 1; i <= qcount[module]; i++) {
					qcontent += " <li class='list-inline-item'><a href='#' data-module='"+ module +"' data-quiz='"+ i +"'>Lesson "+ qfour[i] +"</a></li>";
				}
			}
			else {
				for (var i = 1; i <= qcount[module]; i++) {
					qcontent += " <li class='list-inline-item'><a href='#' data-module='"+ module +"' data-quiz='"+ i +"'>Lesson "+ i +"</a></li>";
				}
			}
			if(!qcontent)
				$("#module_quiz").addClass("invisible");
			else{
				$("#module_quiz .list-inline").html(qcontent);
				$("#module_quiz").removeClass("invisible");
			}
	}
	$("#iframe_desc strong").text(iframe_desc_header);
	$("#iframe_desc #sub").html(iframe_desc_sub);
	$("#iframe_desc").removeClass("invisible");
}

function changeQuiz(module, quiz){
	quizzes = JSON.parse(localStorage.getItem('quizzes'));

	if((module == 1 && quiz == 1) || (module > 1 && quiz == 1 && quizzes[module-1][quizzes[module-1].length-1] >= 100) || (quiz > 1 && quizzes[module][quiz-1] >= 100)){
		$('#currentframe').attr('src', 'quiz/quiz'+ module +'-'+ quiz +'.html');
		$("#iframe_desc").addClass("invisible");
	}else{
		window.alert("You need to get a perfect score on the previous quiz to proceed.");
	}
}
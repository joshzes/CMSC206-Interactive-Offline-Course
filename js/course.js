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
	if($(this).data("value") <= 13){
		profile['current_module'] = $(this).data("value");
		localStorage.setItem('profile', JSON.stringify(profile));
	}
	changeModule($(this).data("value"));
});

$("#resources").click(function(){
	changeModule(-1);
});

$("#module_quiz").on("click", "strong a", function(){
	changeQuiz($(this).data("module"));
});

function changeModule(module){
	iframe_desc_sub = "Study the course module below. Alternatively, you can download it here: ";
	switch(module){
		case -1:
		 	$('#currentframe').attr('src', 'resources.html');	
			iframe_desc_header = "";
			iframe_desc_sub = ""
			$("#module_quiz").addClass("invisible");
			$("#module_questions").addClass("invisible");
			break;
		case 0:
			//$('#currentframe').attr('src', 'modules/courseguide.pdf');	
			$('#currentframe').attr('src', 'introduction.html');	
			iframe_desc_header = "";
			iframe_desc_sub = ""
			//iframe_desc_sub += "<a href='modules/courseguide.pdf' download target='_blank'> Course Guide.pdf</a>";
			$("#module_quiz").addClass("invisible");
			$("#module_questions").addClass("invisible");
			break;
		case 13:
			if(checkTotal()){
				$('#currentframe').attr('src', 'quiz/final-exam.html');
				$("#module_quiz .list-inline").html(qcontent);
				iframe_desc_header = "Final Exam";
				iframe_desc_sub = "This is your final requirement for this course.<br>You need to get 80% of your answers correctly to be able to complete the course.<br>You can also retry this exam as many times as you want."
				$("#module_quiz").addClass("invisible");
			}else{
				window.alert("You need to get 100% in all of the quizzes to be able to take the final exam.")
			}
			$("#module_questions").addClass("invisible");
			break;
		default:
			$('#currentframe').attr('src', 'modules/Module'+ module +'.pdf');
			iframe_desc_header = "Topic " + module;
			iframe_desc_sub += "<a href='modules/Module" + module + ".pdf' download target='_blank'> Topic " + module + ".pdf</a><br>Best to take the quiz linked below every after each lesson.";
			$("#module_quiz").html("<strong><a href='#' data-module='"+ module +"'>Topic "+ module +" - Quiz</a></strong>");
			$("#module_quiz").removeClass("invisible");
			$("#module_questions").removeClass("invisible");
	}
	$("#iframe_desc strong").text(iframe_desc_header);
	$("#iframe_desc #sub").html(iframe_desc_sub);
	$("#iframe_desc").removeClass("invisible");
}

function changeQuiz(module){
	quizzes = JSON.parse(localStorage.getItem('quizzes'));

	if(module == 1 || (module > 1 && quizzes[module-1] >= 100)){
		$('#currentframe').attr('src', 'quiz/quiz'+ module +'.html');
		$("#iframe_desc").addClass("invisible");
		$("#module_quiz").addClass("invisible");
		$("#module_questions").addClass("invisible");
	}else{
		window.alert("You need to get a perfect score on the previous quiz to proceed.");
	}
}
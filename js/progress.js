$(document).ready(function() {
	qfour = [0,1,2,3,4,6,7,8];
	profile = JSON.parse(localStorage.getItem('profile'));
	$("#fullname").text(profile['lastname'].toUpperCase() + ", " + profile['firstname']);

	quizzes = JSON.parse(localStorage.getItem('quizzes'));

	table_content = "";
	$.each(quizzes, function(modnum, quiz) {
		if(modnum!='final'){
	    	$.each(quiz, function(qnum, score) {
		    	if(qnum){
		    		table_content += "<tr>"
			    	if(qnum == 1)
			    		table_content += "<th rowspan='" + (quiz.length-1) + "'>" + modnum + "</th>"
			    	if(score > -1){
				    	if(modnum==4)
				    		table_content += "<td>" + qfour[qnum] + "</td>" + 	"<td>" + score + "%</td>"
				    	else
				    		table_content += "<td>" + qnum + "</td>" + 	"<td>" + score + "%</td>"
				    	if(score < 100)
				    		table_content += "<td><a class='btn btn-success btn-sm' data-module='" + modnum + "' data-quiz='" + qnum + "'>Retry</a></td>";
			    	}
			    	else{
			    		if(modnum==4)
			    			table_content += "<td>" + qfour[qnum] + "</td>" + 	"<td>Not yet attempted</td>";
			    		else
				    		table_content += "<td>" + qnum + "</td>" + 	"<td>Not yet attempted</td>";
			    		
			    		table_content += "<td><a class='btn btn-success btn-sm' data-module='" + modnum + "' data-quiz='" + qnum + "'>Attempt</a></td>";
			    	}
			    	table_content += "</tr>"
		    	}
		    });
		}
	});

	$("tbody").append(table_content);

	fscore = (quizzes['final'] != -1) ? quizzes['final'] : "Not yet attempted";
	$("#final_exam_score").html(fscore);

	if(checkTotal())
		$("#go_final").removeClass("disabled");


});

$("#dlpdf").click(function(event){
	window.print();
});

$("#go_final").click(function(event){
	profile['current_module'] = 9;
	localStorage.setItem('profile', JSON.stringify(profile));
	window.location.replace("course.html");
});

$(".table").on("click", "td a", function(){
	if(($(this).data("module") == 1 && $(this).data("quiz") == 1) || ($(this).data("module") > 1 && $(this).data("quiz") == 1 && quizzes[$(this).data("module")-1][quizzes[$(this).data("module")-1].length-1] >= 100) || ($(this).data("quiz") > 1 && quizzes[$(this).data("module")][$(this).data("quiz")-1] >= 100)){
		profile['current_module'] = $(this).data("module");
		localStorage.setItem('profile', JSON.stringify(profile));
	    window.location = 'course.html?mq=' + $(this).data("module") + '' + $(this).data("quiz");
	}else{
		window.alert("You need to get a perfect score on the previous quiz to proceed.");
	}
});
$("#dlcred").click(function(event){
	event.preventDefault();

	profile = JSON.parse(localStorage.getItem('profile'));

	text = "username: " + profile['username'] + "\r\n" + 
	"password: " + profile['password'] + "\r\n" + 
	"last name: " + profile['lastname'] + "\r\n" + 
	"first name: " + profile['firstname'] + "\r\n" + 
	"middle name: " + profile['middlename'] + "\r\n";

  var a = document.createElement('a');
  a.setAttribute('href', 'data:text/plain;charset=utf-8,'+encodeURIComponent(text));
  a.setAttribute('download', 'user-credentials.txt');
  a.click();

});

function checkTotal(){
	quizzes = JSON.parse(localStorage.getItem('quizzes'));
	toReturn = true;
	$.each(quizzes, function(modnum, quiz) {
		if(modnum!='final'){
	    	$.each(quiz, function(qnum, score) {
		    	if(qnum){
		    		if(score < 100){
		    			toReturn = false;
		    			return false;
		    		}
		    	}
		    });
		}
	});

	return toReturn;
}
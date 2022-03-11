$(".btn-block").click(function(event){
	event.preventDefault();
	var d = new Date();
	var currentDate = d.toLocaleString('default', {dateStyle: 'long'});

	fields = { };
	missing = [];
	$.each($('form').serializeArray(), function() {
    	if($.inArray(this.name, ['middlename', 'profession', 'prc_id', 'prc_expiration', 'npm_training_year', 'years_as_nao'])==-1)
    		if(this.value=="")
    			missing.push(this.name);

   		fields[this.name] = this.value;
	});

   fields["current_module"] = -1;
   fields["date_started"] = currentDate;

	if(fields['previous_npm_training'] == "Yes" && fields['npm_training_year'] == "")
		missing.push('npm_training_year');

	if(fields['designated_nutrition_officer'] == "Yes" && fields['years_as_nao'] == "")
		missing.push('npm_training_year');

	if(missing.length){
		$(".alert-danger").removeClass("d-none");
		$.each(missing, function() {
		  $("input[name="+ this +"]").css("border", "1px solid #d17775");
		  $("textarea[name="+ this +"]").css("border", "1px solid #d17775");
		});

		return;
	}

	qcount = [0,3,4,4,7,2,2,2];
	module_quiz = {};
	for (var i = 1; i < 8; i++) {
		quizzes = [];
		for(var j = 1; j <= qcount[i]; j++){
			quizzes[j] = -1;
		}
		module_quiz[i] = quizzes;
	}
	module_quiz['final'] = -1;

	localStorage.setItem('profile', JSON.stringify(fields));
	localStorage.setItem('quizzes', JSON.stringify(module_quiz));

	$(".form-input").css("display", "none");
	$(".full-name").html(fields['firstname'] + " " + fields['lastname']);
	$(".success-message").css("display", "block");

});

$("input[name='previous_npm_training']").change(function(){
	if(this.value == "Yes")
		$(".year-trained").css("display", "flex");
	else
		$(".year-trained").css("display", "none");
});

$("input[name='designated_nutrition_officer']").change(function(){
	if(this.value == "Yes")
		$(".years-as-nao").css("display", "flex");
	else
		$(".years-as-nao").css("display", "none");
});
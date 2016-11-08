
// Parse the JSON dataset first.
var books = JSON.parse(yazarKitap);
var count = Object.keys(books).length;
var correctAnswers = 0;
var wrongAnswers = 0;
var question;

// Global answer index.
var answerIndex = GetRandomIndex(3);
var choices = [3];

// Create the initial question.
CreateQuestion();

// Create a question and pass it to the HTML.
function CreateQuestion(){
	var randomIndex = GetRandomIndex(count);
	var choice;

	question = books[randomIndex];
	
	// Do not get long books.
	while(question.eser.length > 28) {
		question = books[GetRandomIndex(count)];		
	}

	// Print the book name to the box.
	$("#book_name").html(question.eser);

	// Get random author names.
	for(var i = 0; i < 3; i++) {
		choice = books[GetRandomIndex(count)];

		if(choices.indexOf(choice.yazar) == -1 || choice.yazar.length > 22){
			if(question.yazar !== choice.yazar){
				if(!((question.hasOwnProperty("digerYazar") && choice.yazar == question.digerYazar) ||
					(choice.hasOwnProperty("digerYazar") && choice.digerYazar == question.yazar))) {
					
					// If all the conditions are satisfied, save it as an option.
					choices[i] = choice.yazar;

				} else { i--; }
			} else { i--; }
		} else { i--; }
	}

	// Put the real answer into the array.
	answerIndex = GetRandomIndex(3);
	choices[answerIndex] = question.yazar;

	// Print the choices to the buttons.
	for(var i = 0; i < 3; i++) {
		$('#button_' + i).html(choices[i]);
	}
}

// Check the answer and continue to create a new question.
function CheckAndCreateNewQuestion(answer){
	if(answerIndex == answer){
		correctAnswers++;

		// Create the sweet alert.
		swal({
		  title: "Doğru cevap!",
		  text: "Tebrikler, doğru cevapladın.",
		  type: "success",
		  confirmButtonColor: "#f85f73",
		  confirmButtonText: "Sıradaki Soru",
		  customClass: "sweetAlertModal"
		},

		// If the user clicks on the link "Next Question", prepare the question.
		function(isConfirm){
		  if (isConfirm) {
		  	$('#correctAnswers').html(correctAnswers);
		    CreateQuestion();
		  }
		});
	} else {
		wrongAnswers++;

		// Create the sweet alert.
		swal({
		  title: "Yanlış cevap :(",
		  text: "<strong>" + question.eser + "</strong> adlı eser <strong>" + question.yazar + "</strong> tarafından yazılmıştır.",
		  type: "error",
		  confirmButtonColor: "#636467",
		  confirmButtonText: "Sıradaki Soru",
		  customClass: "sweetAlertModal",
		  html: true
		},

		// If the user clicks on the link "Next Question", prepare the question.
		function(isConfirm){
		  if (isConfirm) {
			$('#wrongAnswers').html(wrongAnswers);
		    CreateQuestion();
		  }
		});
	}
}

// Generate random number from 0 to end.
function GetRandomIndex(end){
	return Math.floor(Math.random() * end);  
}
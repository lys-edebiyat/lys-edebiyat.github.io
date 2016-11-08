
// Parse the JSON dataset first.
var books = JSON.parse(yazarKitap);
var count = Object.keys(books).length;

// Global answer index.
var answerIndex = GetRandomIndex(3);

// Create the initial question.
CreateQuestion();

// Create a question and pass it to the HTML.
function CreateQuestion(){
	var randomIndex = GetRandomIndex(count);
	var question = books[randomIndex];
	var choices = [3];
	var choice;

	// Do not get long books.
	while(question.eser.length > 28) {
		question = books[GetRandomIndex(count)];		
	}

	// Print the book name to the box.
	$("#kitap_adi").html(question.eser);

	// Put the real answer into the array.
	answerIndex = GetRandomIndex(3);
	choices[answerIndex] = question.yazar;

	// Get random author names.
	for(var i = 0; i < 3; i++) {
		choice = books[GetRandomIndex(count)];

		if(i !== answerIndex ){
			if(choices.indexOf(choice.yazar) == -1 || choice.yazar.length > 22){
				if(question.yazar !== choice.yazar){
					if((question.hasOwnProperty("digerYazar") && choice.yazar == question.digerYazar) ||
						(choice.hasOwnProperty("digerYazar") && choice.digerYazar == question.yazar)) {
						i--;
					} else {
						choices[i] = choice.yazar;
					}
				} else { i--; }
			} else { i--; }
		}
	}

	// Print the choices to the buttons.
	for(var i = 0; i < 3; i++) {
		$('#cevap_' + i).html(choices[i]);
	}

	console.log("answer: " + answerIndex);
}

function CheckAndCreateNewQuestion(answer){
	if(answerIndex == answer){
		console.log("doğru cevap.");
	} else {
		console.log("yanlış cevap.");
	}

	CreateQuestion();
}



function GetRandomIndex(between){
	return Math.floor(Math.random() * between);  
}
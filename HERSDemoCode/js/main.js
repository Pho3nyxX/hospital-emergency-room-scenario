//checking if the browser has the built in SpeechRecognition and if it is under a different name, changing it to SpeechRecognition
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;

//Testing mode of the program. When in testing mode the program will perform an automatic run through based on the string 
var testingMode = false;

//this object listen to hear if you are speaking
let listener = {
	
	//first object not initialized
	recognition: null,

	//function to set up speech recognition listener
	listen: function(){

		this.recognition = new SpeechRecognition(); //listening & translate to text
		this.recognition.onstart = this.onStart;
		this.recognition.onspeechend = this.onSpeechEnd;
		this.recognition.onresult = this.onResult;
		this.recognition.onnomatch = this.onNoMatch;
		this.recognition.onerror = this.onNoMatch;
		this.recognition.start();
		console.log(this);
	},

	//speech recognition event handlers
	onStart: function(e) {
		console.log("Lizzie is listening");
	},

	onSpeechEnd: function(e){
		// listener.recognition.stop();
		console.log("Speaking stopped");
		console.log(e);
		listener.recognition.stop();
		listener.listen();
	},

	onNoMatch: function(e){
		console.log("listening after no match");
		listener.recognition.stop();
		listener.listen();
	},

	onResult: function(e) {
		let speechText = e.results[0][0].transcript;
		console.log(e.results[0][0].transcript);
		// console.log(e.results[0][0].confidence);*/
		if(speechText.toLowerCase().indexOf("lizzy") >= 0 || speechText.toLowerCase().indexOf("lizzie") >= 0){
			console.log(speechText);
			commandProcessor.find(speechText);

		}else{
			speechEngine.speak("Sorry, I did not hear a proper command. You must use 'Lizzie' before all commands");
			// speechEngine.speak("You must use 'Lizzie' before all commands");
			console.log("You must use 'Lizzie' before all commands");
		}
		listener.listen();
	}
};


// let commandProcessor = {
	
// 	"Load Patient Information"

// 	acceptedCommands: = [],
// };


//this object processes the commands
let commandProcessor = {
	// check if command exists and change machine state
	find: function(phrase){
			// console.log(this.commands[i].);
		for (var i = this.commands.length - 1; i >= 0; i--) {
			//checking if the command is equal
			if(this.commands[i].key.toLowerCase() == phrase.toLowerCase()){
				console.log(this.commands[i]);
				speechEngine.speak(this.commands[i].response.positive) 
				return this.commands[i].letter;
				//checking if the command is inside the phrase that was said
			}else if(phrase.toLowerCase().indexOf( this.commands[i].key.toLowerCase() )>=0){
				console.log(this.commands[i]);
				speechEngine.speak(this.commands[i].response.positive); 
				getNextState(this.commands[i].letter);
				return this.commands[i].letter;
			}
		}
		return null;
	},

	//list of commands the machine recognizes
	commands: [
		{
			"name":"Prepare for patient", 
			"key": "Prepare for patient",
			"response": {
				"positive": "Preparing for patient arrival.",
				"negative": "Unable to take patient. Please reschedule."
			},
			"letter":"b"
		},
		{
			"name": "Prepare the room for procedure",
			"key": "Prepare the room for procedure",
			"response": {
				"positive" : "Preparing operating room for procedure",
				"negative": "Unable to prep for procedure. Please reschedule."
			},
			"letter":"c"
		},

		{
			"name": "Load existing info on patient",
			"key": "Load patient file.",
			"response": {
				"positive" : "Loading existing info on patient",
				"negative": "I cannot find existing info on patient."
			},
			"letter":"d"
		},
		{
			" name": "Request additional information on patient",
			"key": "Request additional information on patient",
			"response": {
				"positive" : "Requesting info on patient",
				"negative": "Unsuccessful in requesting info on patient."
			},
			"letter":"e"
		},
		{
			"name": "Request info on patient",
			"key": "Request info on patient",
			"response": {
				"positive" : "Requesting info on patient",
				"negative": "Unsuccessful in requesting info on patient."
			},
			"letter":"f"
		},
		{
			" name": "Reschedule procedure",
			"key": "Reschedule procedure",
			"response": {
				"positive" : "Rescheduling procedure for patient",
				"negative": "I cannot reschedule this procedure for this patient."
			},
			"letter":"k"
		},
		{
			"name": "Reschedule procedure",
			"key": "Reschedule procedure",
			"response": {
				"positive" : "Rescheduling procedure for patient",
				"negative": "I cannot reschedule this procedure for this patient."
			},
			"letter":"n"
		},
		{
			"name": "Schedule New Procedure",
			"key": "Schedule New Procedure",
			"response": {
				"positive" : "Scheduling New Procedure for patient",
				"negative": "You know i cannot reschedule a new procedure for this patient."
			},
			"letter":"m"
		},
		{
			"name": "Schedule New Procedure",
			"key": "Schedule New Procedure",
			"response": {
				"positive" : "Scheduling New Procedure for patient",
				"negative": "You know i cannot reschedule a new procedure for this patient."
			},
			"letter":"p"
		},
		{
			"name": "Schedule Test",
			"key": "Schedule Test",
			"response": {
				"positive" : "Scheduling Test for patient",
				"negative": "Oh Dear, i am unable to schedule a test for this patient."
			},
			"letter":"o"
		},
		{
			"name": "Schedule Test",
			"key": "Schedule Test",
			"response": {
				"positive" : "Scheduling Test for patient",
				"negative": "Oh Dear, i am unable to schedule a test for this patient."
			},
			"letter":"l"
		},		
		{
			"name": "Reject Procedure",
			"key": "Reject Procedure",
			"response": {
				"positive" : "Rejecting Procedure for this patient",
				"negative": "Unfortunately, i am unable to reject this patient's procedure."
			},
			"letter":"i"
		},
		{
			"name": "Reject Procedure",
			"key": "Reject Procedure",
			"response": {
				"positive" : "Rejecting Procedure for this patient",
				"negative": "Unfortunately, i am unable to reject this patient's procedure."
			},
			"letter":"j"
		},		
		{
			"name": "Schedule Date",
			"key": "Schedule Date",
			"response": {
				"positive" : "Scheduling a date for this patient",
				"negative": "Nope, i cannot schedule a date for this patient."
			},
			"letter":"a4"
		},
		{
			"name": "Prepare Referral",
			"key": "Prepare Referral",
			"response": {
				"positive" : "Preparing a referral for this patient",
				"negative": "I cannot prepare a referral for this patient."
			},
			"letter":"a3"
		},
		{
			"name": "Assist with Procedure",
			"key": "Assist with Procedure",
			"response": {
				"positive" : "Okay! let me assist with the procedure",
				"negative": "I cannot assist with this procedure."
			},
			"letter":"a2"
		},
		{
			"name": "Assist with Procedure",
			"key": "Assist with Procedure",
			"response": {
				"positive" : "Okay! let me assist with the procedure",
				"negative": "I cannot assist with this procedure."
			},
			"letter":"a5"
		},		
		{
			"name": "Play Music",
			"key": "Play Music",
			"response": {
				"positive" : "Alright! let me play some music",
				"negative": "I cannot play that music."
			},
			"letter":"t"
		},
		{
			"name": "Assist with Procedure",
			"key": "Assist with Procedure",
			"response": {
				"positive" : "Okay! let me assist with the procedure",
				"negative": "I cannot assist with this procedure."
			},
			"letter":"a16"
		},
		{
			"name": "Play Video",
			"key": "Play Video",
			"response": {
				"positive" : "Give me a second to play that video please",
				"negative": "Unable to play that video."
			},
			"letter":"u"
		},
		{
			"name": "Request Drugs",
			"key": "Request Drugs",
			"response": {
				"positive" : "Requesting drugs for the patient",
				"negative": "Unable to request drugs for the patient."
			},
			"letter":"v"
		},
		{
			"name": "Get patient info",
			"key": "Get patient info",
			"response": {
				"positive" : "Retrieving patient information",
				"negative": "That is a negative on retrieving patient information."
			},
			"letter":"w"
		},
		{
			"name": "Pass instrument",
			"key": "Pass instrument",
			"response": {
				"positive" : "Here is the instrument you asked for",
				"negative": "That instrument is not on the table, sorry."
			},
			"letter":"s"
		},
		{
			"name": "Request Blood",
			"key": "Request Blood",
			"response": {
				"positive" : "Okay, Give me a second while i request blood for the patient",
				"negative": "It would appear that i cannot request blood for this patient."
			},
			"letter":"q"
		},
		{
			"name": "Call Specialist Doctor",
			"key": "Call Specialist Doctor",
			"response": {
				"positive" : "Oh i know this person, let me see if they will take the call",
				"negative": "It would seem this person is occupied with something else because they are not taking the call."
			},
			"letter":"r"
		},
		{
			"name": "Update Patient Records",
			"key": "Update Patient Records",
			"response": {
				"positive" : "Okay, let me update the patient records",
				"negative": "Oops, i cannot update the patient records."
			},
			"letter":"x"
		},
		{
			"name": "Recommendation",
			"key": "Recommendation",
			"response": {
				"positive" : "Providing recommendation",
				"negative": "I cannot do that."
			},
			"letter":"y"
		},
		{
			"name": "Feedback",
			"key": "Feedback",
			"response": {
				"positive" : "Providing feedback",
				"negative": "I cannot provide feedback right now."
			},
			"letter":"a12"
		},
		{
			"name": "Feedback",
			"key": "Feedback",
			"response": {
				"positive" : "Providing feedback",
				"negative": "I cannot provide feedback right now."
			},
			"letter":"a13"
		},
		{
			" name": "Feedback",
			"key": "Feedback",
			"response": {
				"positive" : "Providing feedback",
				"negative": "I cannot provide feedback right now."
			},
			"letter":"a14"
		},
		{
			"name": "Feedback",
			"key": "Feedback",
			"response": {
				"positive" : "Providing feedback",
				"negative": "I cannot provide feedback right now."
			},
			"letter":"a10"
		},
		{
			" name": "Feedback",
			"key": "Feedback",
			"response": {
				"positive" : "Providing feedback",
				"negative": "I cannot provide feedback right now."
			},
			"letter":"a11"
		},
		{
			"name": "Back to start",
			"key": "Back to start",
			"response": {
				"positive" : "Going back to waiting on patient",
				"negative": "Cannot go back to waiting on patient."
			},
			"letter":"z"
		},
		{
			"name": "Assist with Procedure",
			"key": "Assist with Procedure",
			"response": {
				"positive" : "Assisting with procedure",
				"negative": "I cannot assist with Procedure."
			},
			"letter":"a6"
		},
	]
}

//configuring the speech engine
let speechEngine = { 
	//passing the message to be said by Lizzie
	speak: function(message){
		//initialising for what will be said and how
		let speech = new SpeechSynthesisUtterance();
		speech.lang = "en-US";
		speech.text = message;
		speech.volume = 1;
		speech.rate = 1;
		speech.pitch = 1;

		//waiting for 1500 milliseconds then talks
		setTimeout(window.speechSynthesis.speak(speech), 1500);
	}
}


// list of states the machine can be in and the states it can transition from each   
let lizStates = {
	WaitingOnPatient:{
		"a":"WaitingOnPatient",
		"b": "PatientComing",
		speechToText: "Waiting on patient to arrive for operation. ",
		isAccept:true,	   
		//for testing
		timeLimit:10,
		defaultLink: "b" 
	},
	PatientComing:{
		"c":"HowToPrepRoom",
		speechToText: "Patient scheduled to arrive for operation. ",
		timeLimit:10,
		defaultLink: "c" 
	},
	HowToPrepRoom:{
		"e":"RequestInfo",
		"d": "LoadInfo",
		speechToText: "Preparing operating room for patient. ",
		timeLimit: 15,
		defaultLink: "e"
	},
	LoadInfo:{
		"j": "RejectProcedure",
		"l": "ScheduleTest",
		"m": "ScheduleNewProcedure",
		"k": "RescheduleProcedure",
		"h": "AssistWithProcedure",
		speechToText: "Loading patient file. ",
		timeLimit: 3,
		defaultLink: "m"
	},
	RequestInfo:{
		"f":"RequestInfo",
		"g": "AssistWithProcedure",
		"i": "RejectProcedure",
		"o": "ScheduleTest",
		"p": "ScheduleNewProcedure",
		"n": "RescheduleProcedure",
		speechToText: "Requesting additional information on patient. ",
		timeLimit: 10,
		defaultLink: "o"
	},
	AssistWithProcedure:{
		"t":"PlayMusic",
		"u": "PlayVideo",
		"v":"RequestDrugs",
		"w": "PatientInfo",
		"s": "PassInstruments",
		"q": "RequestBlood",
		"r": "CallSpecialistDoctor",
		"x": "UpdatePatientRecord",
		speechToText: "Assisting with procedure. ",
		timeLimit: 1,
		defaultLink: "u"
	},
	RejectProcedure:{
		"a7":"WaitingOnPatient",
		speechToText: "Rejecting this procedure. ",
	},
	ScheduleTest:{
		"a3":"PrepareReferral",
		"a4": "ScheduleDate",
		speechToText: "Scheduling test for patient. ",
		timeLimit: 3,
		defaultLink: "a4"
	},
	ScheduleNewProcedure:{
		"a1":"AssistWithProcedure",
		speechToText: "Scheduling new procedure. ",
		timeLimit: 3,
		defaultLink: "a1"
	},
	RescheduleProcedure:{
		"a15":"WaitingOnPatient",
		speechToText: "Moving this proceduring. ",
	},
	PrepareReferral:{
		"a2": "AssistWithProcedure",
		speechToText: "Preparing referral. ",
		timeLimit: 5,
		defaultLink: "a2"
	},
	ScheduleDate:{
		"a5": "AssistWithProcedure",
		speechToText: "Setting date. ",
		timeLimit: 1,
		defaultLink: "a5"
	},
	PlayMusic:{
		"a16": "AssistWithProcedure",
		speechToText: "Starting song. ",
	},
	PlayVideo:{
		"a9":"AssistWithProcedure",
		"a12": "Feedback",
		speechToText: "Starting video. ",
		timeLimit: 10,
		defaultLink: "a9"
	},
	RequestDrugs:{
		"a13":"Feedback",
		speechToText: "Requesting drugs for patient. ",
		timeLimit: 3,
		defaultLink: "a3"
	},
	PatientInfo:{
		"a14":"Feedback",
		speechToText: "Getting patient information. ",
		timeLimit: 3,
		defaultLink: "a14"
	},
	PassInstruments:{
		"a8":"AssistWithProcedure",
		speechToText: "Here is the instrument. ",
		timeLimit: 3,
		defaultLink: "a8"
	},
	RequestBlood:{
		"a10": "Feedback",
		speechToText: "Requesting blood for this patient. ",
		timeLimit: 10,
		defaultLink: "a10"
	},
	CallSpecialistDoctor:{
		"a11": "Feedback",
		speechToText: "Making call to doctor. ",
		timeLimit: 10,
		defaultLink: "a11"
	},
	UpdatePatientRecord:{
		"y": "Recommendation",
		speechToText: "Editing patient records. ",
		timeLimit: 3,
		defaultLink: "y"
	},
	Feedback:{
		"a6": "AssistWithProcedure",
		speechToText: "Receiving feedback. ",
		timeLimit: 10,
		defaultLink: "a6"
	},
	Recommendation:{
		"z":"WaitingOnPatient",
		speechToText: "Recording recommendation. ",
		timeLimit: 5,
		defaultLink: "z"
	},


	startState: "WaitingOnPatient",


	vocabulary: "abcdefghijklmnopqrstuvwxyza1a2a3a4a5a6a7a8a9a10a11a12a13a14a15a16"
}

let currentState = "WaitingOnPatient";

// function to switch to next state based on vocabulary
function getNextState(input){
  if(lizStates.vocabulary.includes(input)) {
  	console.log(currentState);
  	if(lizStates[currentState] != undefined && lizStates[currentState] != null){
	  	if(lizStates[currentState][input] != undefined && lizStates[currentState][input] != null && lizStates[currentState][input] != "" ){
	  		console.log(lizStates[currentState][input]);
	  		//the result of what was found becomes the current state
	  		currentState = lizStates[currentState][input];
	  		console.log("State changed to: " + currentState);
	  		//says whatever is attached to the next state
	  		speechEngine.speak(lizStates[currentState].speechToText);
	  		// currentState = lizStates[currentState][input];
	  		console.log(lizStates[currentState]);

			if(currentState == "PlayMusic"){
				console.log("test")
				document.getElementById("song_player").play();
			}
	  		// this code facilitates automatic testing of the Extended Transition Function string
	  		//if it in testing mode simply wait then go to the next state
	  		if(lizStates[currentState].timeLimit !== undefined && lizStates[currentState].timeLimit !== null && testingMode == true){
		  		if(lizStates[currentState].defaultLink !== undefined && lizStates[currentState].defaultLink !== null && lizStates[currentState].defaultLink !== ""){

		  			//checking if it is a loop state and remove it as the default
		  			switch(currentState){
		  				case "PlayVideo":
			  				console.log("PlayVideo");
			  				lizStates.AssistWithProcedure.defaultLink = "r";
		  				break;
		  				case "CallSpecialistDoctor":
			  				console.log("CallSpecialistDoctor");
			  				lizStates.AssistWithProcedure.defaultLink = "x";
		  				break;

		  				case "CallSpecialistDoctor":
			  				console.log("CallSpecialistDoctor");
			  				lizStates.AssistWithProcedure.defaultLink = "x";
		  				break;

		  			}
		  			//waiting for set time then run code
		  			setTimeout(()=>{getNextState(lizStates[currentState].defaultLink)}, (lizStates[currentState].timeLimit*1000));
		  		}
	  		}
	  	}
	   return lizStates[currentState];
  	}
  } else {

    return err + input;
  }
}

// starts an automatic run through based on the Extended Transition Function string
function startTest(){
	testingMode = true
	setTimeout(()=>{getNextState(lizStates[currentState].defaultLink)}, (lizStates[currentState].timeLimit*1000));
}

console.log(lizStates[currentState]["b"]);

// set up test listener
function setUpStartTestListener(){
	let startBtn = document.getElementById("start_test");
	startBtn.addEventListener("click", startTest);
}


// console.log(commandProcessor);
// commandProcessor.find()

setUpStartTestListener();
listener.listen();



# Hospital Emergency Room Scenario (HERS)

![image](/hospital-emergency-room-scenario/HERSDemoCode/Lizzi.PNG)

This project uses finite state automation to simulate a test of a real-world process - _Hospital Emergency Room Scenario_ - in the browser.

The state diagram showing each transition can be found in the "**State Diagram**" folder.

***

## Key Table

|Key|Name|Key|Name|
|---|----|---|----|
|WOP|WaitingOnPatient|SD|ScheduleDate|
|PC|PatientComing|PM|PlayMusic|
|HTPR|HowToPrepRoom|PV|PlayVideo|
|LI|LoadInfo|RD|RequestDrugs|
|RI|RequestInfo|PI|PatientInfo|
|AWP|AssistWithProcedure|PaI|PassInstruments|
|RP|RejectProcedure|RB|RequestBlood|
|ST|ScheduleTest|CSD|CallSpecialistDoctor|
|SNP|ScheduleNewProcedure|UPR|UpdatePatientRecord|
|ResP|RescheduleProcedure|F|Feedback|
|PR|PrepareReferral|R|Recommendation|
|a|no patient present|p|additional procedure needed| 
|b|patient on the way|q|patient need blood|
|c|illness dictates room prep|r|need consultation from another doctor|
|d|loading existing info on patient|s|need instrument|
|e|ask for info on patient|t|request music|
|f|continue asking for info on patient|u|request video|
|g|information|v|patient need drugs|
|h|information found|w|need additional info on patient|
|i|insufficient info to proceed|x|add to the patient record|
|j|insufficient info to proceed|y|make recommendation|
|k|procedure cannot be done today|z|procedure end|
|l|require more tests|a7|rejected|
|m|additional procedure needed|a8|receive instrument|
|n|procedure cannot be done today|a9|video found|
|o|require tests to be done|a10|response|
|a1|procedure scheduled|a11|response|
|a2|referral created|a12|video not found|
|a3|test not avail in-house|a13|response|
|a4|test avail in-house|a14|response|
|a5|procedure schedule|a15|procedure cannot happen today|
|a6|feedback end|a16|music found|

***

## Formal Definition 

HERS = (Q, Ʃ, δ, q0, F)

Q = {WaitingOnPatient, PatientComing, HowToPrepRoom, RequestInfo, LoadInfo, AssistWithProcedure, RejectProcedure, RescheduleProcedure, ScheduleTest, ScheduleNewProcedure, PrepareReferral, ScheduleDate, RequestBlood, CallSpecialistDoctor, PassInstruments, PlayMusic, PlayVideo, RequestDrugs, PatientInfo, UpdatePatientRecord, Recommendation, Feedback} 

Ʃ = {a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10, a11, a12, a13, a14, a15, a16}

δ = Q x Ʃ → Q (Please see the table below for all the transitional functions)

q0 = WaitingOnPatient

F = {WaitingOnPatient}

***

## Extended Transition Function

The Extended Transition Function for the string “**bceoa4a5ua9ra11a6xyz**” that visits most states is:

δ*(WOP, ε) = WOP

δ*(WOP, b) = δ (δ*(WOP, ε), b) = δ (WOP, b) = PC

δ*(WOP, bc) = δ (δ*(WOP, b), c) = δ (PC, c) = HTPR

δ*(WOP, bce) = δ (δ*(WOP, bc), e) = δ (HTPR, e) = RI

δ*(WOP, bceo) = δ (δ*(WOP, bce), o) = δ (RI, o) = ST

δ*(WOP, bceoa4) = δ (δ*(UWR, bceo), a4) = δ (ST, a4) = SD

δ*(WOP, bceoa4a5) = δ (δ*(WOP, bceoa4), a5) = δ (SD, a5) = AWP

δ*(WOP, bceoa4a5u) = δ (δ*(WOP, bceoa4a5), u) = δ (AWP, u) = PV

δ*(WOP, bceoa4a5ua9) = δ (δ*(WOP, bceoa4a5u), a9) = δ (PV, a9) = AWP

δ*(WOP, bceoa4a5ua9r) = δ (δ*(WOP, bceoa4a5ua9), r) = δ (P, r) = CSD

δ*(WOP, bceoa4a5ua9ra11) = δ (δ*(WOP, bceoa4a5ua9r), a11) = δ (CSD, a11) = F

δ*(WOP, bceoa4a5ua9ra11a6) = δ (δ*(WOP, bceoa4a5ua9ra11), a6) = δ (F, a6) = AWP

δ*(WOP, bceoa4a5ua9ra11a6x) = δ (δ*(WOP, bceoa4a5ua9ra11a6), x) = δ (AWP, x) = UPR

δ*(WOP, bceoa4a5ua9ra11a6xy) = δ (δ*(WOP, bceoa4a5ua9ra11a6x), y) = δ (UPR, y) = R

δ*(WOP, bceoa4a5ua9ra11a6xyz) = δ (δ*(WOP, bceoa4a5ua9ra11a6xy), z) = δ (R, z) = WOP 

***

## Instructions 

To interact with Lizzie, you must first clearly speak her name, then the commands from the list below.

```JSON
commands: [
		{
			"name": "Prepare for patient", 
			"key": "Prepare for patient",
			"response": {
				"positive": "Preparing for patient arrival",
				"negative": "Unable to take patient. Please reschedule."
			}
		},

		{
			"name": "Load existing info on patient",
			"key": "Load existing info on patient",
			"response": {
				"positive": "Loading existing info on patient",
				"negative": "I cannot find existing info on patient."
				}
		},
		{
			"name": "Request info on patient",
			"key": "Request info on patient",
			"response": {
				"positive": "Requesting info on patient",
				"negative": "Unsuccessful in requesting info on patient."
				}
		},
		{
			"name": "Reschedule procedure",
			"key": "Reschedule procedure",
			"response": {
				"positive": "Rescheduling procedure for patient",
				"negative": "I cannot reschedule this procedure for this patient."
				}
		},
		{
			"name": "Schedule New Procedure",
			"key": "Schedule New Procedure",
			"response": {
				"positive": "Scheduling New Procedure for patient",
				"negative": "You know i cannot reschedule a new procedure for this patient."
				}
		},
		{
			"name": "Schedule Test",
			"key": "Schedule Test",
			"response": {
				"positive": "Scheduling Test for patient",
				"negative": "Oh Dear, i am unable to schedule a test for this patient."
				}
		},
		{
			"name": "Reject Procedure",
			"key": "Reject Procedure",
			"response": {
				"positive": "Rejecting Procedure for this patient",
				"negative": "Unfortunately, i am unable to reject this patient's procedure."
				}
		},
		{
			"name": "Schedule Date",
			"key": "Schedule Date",
			"response": {
				"positive": "Scheduling a date for this patient",
				"negative": "Nope, i cannot schedule a date for this patient."
				}
		},
		{
			"name": "Prepare Referral",
			"key": "Prepare Referral",
			"response": {
				"positive": "Preparing a referral for this patient",
				"negative": "I cannot prepare a referral for this patient."
				}
		},
		{
			"name": "Assist with Procedure",
			"key": "Assist with Procedure",
			"response": {
				"positive": "Okay! let me assist with the procedure",
				"negative": "I cannot assist with this procedure."
				}
		},
		{
			"name": "Play Music",
			"key": "Play Music",
			"response": {
				"positive": "Alright! let me play some music",
				"negative": "I cannot play that music."
				}
		},
		{
			"name": "Play Video",
			"key": "Play Video",
			"response": {
				"positive": "Give me a second to play that video please",
				"negative": "Unable to play that video."
				}
		},
		{
			"name": "Request Drugs",
			"key": "Request Drugs",
			"response": {
				"positive": "Requesting drugs for the patient",
				"negative": "Unable to request drugs for the patient."
				}
		},
		{
			"name": "Get patient info",
			"key": "Get patient info",
			"response": {
				"positive": "Retrieving patient information",
				"negative": "That is a negative on retrieving patient information."
				}
		},
		{
			"name": "Pass instrument",
			"key": "Pass instrument",
			"response": {
				"positive": "Here is the instrument you asked for",
				"negative": "That instrument is not on the table, sorry."
				}
		},
		{
			"name": "Request Blood",
			"key": "Request Blood",
			"response": {
				"positive": "Okay, Give me a second while i request blood for the patient",
				"negative": "It would appear that i cannot request blood for this patient."
				}
		},
		{
			"name": "Call Specialist Doctor",
			"key": "Call Specialist Doctor",
			"response": {
				"positive": "Oh i know this person, let me see if they will take the call",
				"negative": "It would seem this person is occupied with something else because they are not taking the call."
				}
		},
		{
			"name": "Update Patient Records",
			"key": "Update Patient Records",
			"response": {
				"positive": "Okay, let me update the patient records",
				"negative": "Oops, i cannot update the patient records."
				}
		},
		{
			"name": "Recommendation",
			"key": "Recommendation",
			"response": {
				"positive": "Providing recommendation",
				"negative": "I cannot do that."
				}
		},
		{
			"name": "Feedback",
			"key": "Feedback",
			"response": {
				"positive": "Providing feedback",
				"negative": "I cannot provide feedback right now."
				}
		}
    ]
```
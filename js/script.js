function Lottery () {
	var l = this;
	var participants = [];

	// flags  
	l.emailChecked = false;
	l.phoneChecked = false;

	// main elements 
	l.form = document.getElementsByClassName('b-form')[0];
	l.name = document.getElementsByClassName('b-form__input_name')[0];
	l.surname = document.getElementsByClassName('b-form__input_surname')[0];
	l.email = document.getElementsByClassName('b-form__input_email')[0];
	l.phone = document.getElementsByClassName('b-form__input_phone')[0];
	l.date = document.getElementsByClassName('b-form__label_dateOfBirth')[0];

	// info table
	l.table = document.getElementsByClassName('b-participants')[0];
	l.tableCell = document.getElementsByTagName('tr');

	// buttons 
	l.saveBtn = document.getElementsByClassName('saveBtn')[0];
	l.winner = document.getElementsByClassName('g-lottery__winner_button')[0];

	// winner field 
	l.winnerField = document.getElementsByClassName('g-lottery__winner_name')[0];


	var patterns = {
		'phone' : /\([0-9]{3}\)[0-9]{3}-[0-9]{2}-[0-9]{2}$/,
		'email' : /^([a-z0-9_\.-]+)@([a-z0-9_\.-]+)\.([a-z\.]{2,6})$/, 
		get: function(sPatternsName) {
			return patterns[sPatternsName]; 
		}
	}


	// function to change color to green if info is correct or to red if not 
	l.changeColor = function(test) {
		if (test) {
			event.target.classList.remove('error');
			event.target.classList.add('correct');
		} else {
			event.target.classList.remove('correct');
			event.target.classList.add('error');
		}
	}

	// save a new participant into an array 
	l.saveFunc = function() {
		var person = {};
		person.name = l.name.value;
		person.surname = l.surname.value;
		person.email = l.email.value;
		person.phone = l.phone.value;
		person.date = l.date.value;
		participants.push(person);
	}

	// function to display the inputs values: 
	l.showInfo = function() {
		var row = l.table.insertRow(l.table.rows.length);
		var cell0 = row.insertCell(0);
		var cell1 = row.insertCell(1);
		var cell2 = row.insertCell(2);
		var cell3 = row.insertCell(3);
		cell0.innerHTML = l.name.value;
		cell1.innerHTML = l.surname.value;
		cell2.innerHTML = l.email.value;
		cell3.innerHTML = l.phone.value;
	}

	// choose new winner out of an array 
	l.newWinner = function(){
		var number = Math.floor(Math.random() * participants.length);
		var nextWinner = participants[number].name + ' ' + participants[number].surname;
		l.winnerField.innerHTML += nextWinner + ' ';
	}

	// events 
	l.email.onblur = function(){
		l.emailChecked = patterns.get(event.target.name).test(event.target.value);
		l.changeColor(l.emailChecked);
	}

	l.phone.onblur = function(){
		l.phoneChecked = patterns.get(event.target.name).test(event.target.value);
		l.changeColor(l.phoneChecked);
	}

	l.saveBtn.onclick = function(){
		if (l.name.value && l.surname.value && l.emailChecked && l.phoneChecked) {
			l.saveFunc();
			l.showInfo();
		} else {
			alert('Please insert the correct information');
		}
	}

	l.winner.onclick = function(){
		l.newWinner();
	}

	// function to edit the info in the table and in array 
	l.table.onclick = function(e) {
		console.log('row = ' + e.target.parentNode.rowIndex);
		console.log('cell = ' + e.target.cellIndex);

		if(!e.target.parentNode.rowIndex == 0) {
			var newInfo = prompt('Do you want to change the info?');
		}
		if (newInfo) {
			// in case the 1 cell was changed 
			if (e.target.cellIndex == '0') {
				// we'll change person's name in array and in the table
				participants[e.target.parentNode.rowIndex].name = newInfo;
				e.target.innerHTML = newInfo;
			// in case the 2 cell was changed 
			} else if (e.target.cellIndex == '1') {
				// we'll change person's surname in array and in the table
				participants[e.target.parentNode.rowIndex].surname = newInfo;
				e.target.innerHTML = newInfo;
			// in case the 3 cell was changed
			} else if (e.target.cellIndex == '2') {
				// we'll check and change person's email in array and in the table
				if (patterns.get('email').test(newInfo)) {
					participants[e.target.parentNode.rowIndex].email = newInfo;
					e.target.innerHTML = newInfo;
				} else {
					alert('please insert correct info');
				}
			// in case the 4 cell was changed
			} else if (e.target.cellIndex == '3') {
				// we'll check and change person's phone in array and in the table
				if (patterns.get('phone').test(newInfo)) {
					participants[e.target.parentNode.rowIndex].phone = newInfo;
					e.target.innerHTML = newInfo;
				} else {
					alert('please insert correct info');
				}
			}

		}
					

		

	}


}
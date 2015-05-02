function Game(){
	var randnum = [Math.floor(Math.random()*(25-1) + 1),Math.floor(Math.random()*(50-25) + 25),Math.floor(Math.random()*(75-50) + 50),Math.floor(Math.random()*(100-75) + 75)];
	var size = Math.floor(Math.random()*(5-2)+2);
	var div = document.getElementById("game");
	var temparray;
	var array =new Array(size);
	current = randnum.length;
	while(current != 0){
		var num = Math.floor(Math.random()*current);
		current -= 1;
		temparray =  randnum[current];
		randnum[current] = randnum[num];
		randnum[num] = temparray;
	};	

	for(i = 0; i < size; i++){
		var num = document.createElement("Button");
		num.name = "Numbers";
		num.id= "guess";
		num.value = randnum[i];
		array[i] = randnum[i];

		num.onclick = function(){
			check(this, array);


		};
		var text = document.createTextNode(randnum[i]);
		num.appendChild(text);
		div.appendChild(num);	
	}
}

function check(element, array){
				timer();
	exnum = Math.min.apply(Math, array);
	var index = array.indexOf(exnum);
	var value = element.value;
	if(exnum == value){
		correct(element);
		if(index > -1){
			array.splice(index, 1);
		}
		if(array.length == 0){
			document.getElementById("game").innerHTML="";
			Game();
		}
	}
	else{
		setWrong(element);
		setTimeout(function(){
			setNormal(element)}, 200);
	}
}

function setWrong(element){
	var current = parseInt($('#score').text());
	current -= 5
	$('#score').text(current);
	element.style.backgroundColor = "#710070";
}

function setNormal(element){
	element.style.backgroundColor = "#FE6475";
}

function correct(element){
	console.log(score);
	var current = parseInt($('#score').text());
	current += 2
	$('#score').text(current);
	element.className = "correct";
}

function timer(){
	var time = $('#time').text();
	var timer = setInterval(function(){
		$('#time').text(--time);
		if(time == 0){
			$('#label').fadeIn('fast');
			$('#go').fadeIn('fast');
			$('#game').hide();
			$('#time').hide();
			var highscore = $('#score').text();
			$('#score').hide();
			$('#label').text("Score: " + highscore);

			document.getElementById("game").innerHTML=""
			time = parseInt(time);
			time +=31;
			$('#time').text(time);
		}
		
	},1000);
}

function Go(){
	$('#intro').hide();
	Game();
	$('#game').fadeIn('fast');
	$('#time').fadeIn('fast');
	$('#score').fadeIn('fast');
	$('#go').hide();
	$('#label').hide();
}

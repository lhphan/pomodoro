$(document).ready(function(){
	$(".display").hide();
	var sound = $("#alarm")[0];
	var workMinsInput = parseInt( $(".wMins").html() );
	var workSecsInput = parseInt( $(".wSecs").html() );
	var breakMinsInput = parseInt( $(".bMins").html() );
	var breakSecsInput = parseInt( $(".bSecs").html() );

	function inputLessThan10(htmlElem, quantity){
		if(quantity < 10){
			$(htmlElem).html("0" + quantity);
		}else{
			$(htmlElem).html(quantity);
		}
	}

	$("#demo").click(function(){
		workMinsInput = 0;
		workSecsInput = 30;
		breakMinsInput = 0;
		breakSecsInput = 15;
		$(".wMins").html("00");
		$(".wSecs").html("30");
		$(".bMins").html("00");
		$(".bSecs").html("15");
	});
	$("#workMinDec").click(function(){
		if(workMinsInput > 0){
			workMinsInput -= 1;
			inputLessThan10(".wMins", workMinsInput);	
		}
	});
	$("#workMinInc").click(function(){
		if(workMinsInput < 98){
			workMinsInput += 1;
			inputLessThan10(".wMins", workMinsInput);
		}
	});
	$("#workSecDec").click(function(){
		if(workSecsInput > 0){
			workSecsInput -= 1;
			inputLessThan10(".wSecs", workSecsInput);
		}
	});
	$("#workSecInc").click(function(){
		if(workSecsInput < 59){
			workSecsInput += 1;
			inputLessThan10(".wSecs", workSecsInput);
		}
	});
	$("#breakMinDec").click(function(){
		if(breakMinsInput > 0){
			breakMinsInput -= 1;
			inputLessThan10(".bMins", breakMinsInput);
		}
	});
	$("#breakMinInc").click(function(){
		if(breakMinsInput < 98){
			breakMinsInput += 1;
			inputLessThan10(".bMins", breakMinsInput);
		}
	});
	$("#breakSecDec").click(function(){
		if(breakSecsInput > 0){
			breakSecsInput -= 1;
			inputLessThan10(".bSecs", breakSecsInput);
		}
	});
	$("#breakSecInc").click(function(){
		if(breakSecsInput < 59){
			breakSecsInput += 1;
			inputLessThan10(".bSecs", breakSecsInput);
		}
	});

	var breakInterval;
	var workInterval;

	$("#start").click(function(){
		$(".settings").hide();
		var workSecs = (workMinsInput * 60) + workSecsInput + 1;
		var breakSecs = (breakMinsInput * 60) + breakSecsInput + 1;
		function displayLessThan10(sessionType){ 
			if(Math.floor(sessionType/60) < 10){
				$(".minDisplay").html("0" + Math.floor(sessionType/60));
			}else{
				$(".minDisplay").html(Math.floor(sessionType/60));
			}
			if(Math.floor(sessionType%60) < 10){
				$(".secDisplay").html("0" + Math.floor(sessionType%60));
			}else{
				$(".secDisplay").html(Math.floor(sessionType%60));
			}
		}
		workInterval = setInterval(workCountdown, 1000);
		$(".sessTitle").html("Work Session");
		$(".display").show();
		function workCountdown(){		
			workSecs -= 1;
			if(workSecs === 0){
				sound.play();
				clearInterval(workInterval);
				displayLessThan10(breakSecs);
				breakInterval = setInterval(breakCountdown, 1000);
			}
			displayLessThan10(workSecs);
		
			function breakCountdown(){
				$(".sessTitle").html("Break Session");
				breakSecs -= 1;
				if(breakSecs === 0){
					sound.play();
					clearInterval(breakInterval);
				}
			displayLessThan10(breakSecs);
			}
		}				
	});

	$("#reset").click(function(){
		$(".display").hide();
		$(".minDisplay").html("00");
		$(".secDisplay").html("00");
		clearInterval(breakInterval);
		clearInterval(workInterval);
		$(".sessTitle").html("Work Session");
		$(".settings").show();
	});

});
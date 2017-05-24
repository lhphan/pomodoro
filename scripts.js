$(document).ready(function(){
	$(".display").hide();
	var sound = $("#alarm")[0];
	var workMinsInput = parseInt( $(".wMins").html() );
	var workSecsInput = parseInt( $(".wSecs").html() );
	var breakMinsInput = parseInt( $(".bMins").html() );
	var breakSecsInput = parseInt( $(".bSecs").html() );
	function inputLessThan10(htmlElem, quantity){
		if(quantity < 10){
			$(htmlElem).text("0" + quantity);
		}else{
			$(htmlElem).text(quantity);
		}
	}
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
				$(".minDisplay").text("0" + Math.floor(sessionType/60));
			}else{
				$(".minDisplay").text(Math.floor(sessionType/60));
			}
			if(Math.floor(sessionType%60) < 10){
				$(".secDisplay").text("0" + Math.floor(sessionType%60));
			}else{
				$(".secDisplay").text(Math.floor(sessionType%60));
			}
		}
		workInterval = setInterval(workCountdown, 1000);
		$(".display").show();
		function workCountdown(){	
			$(".sessTitle").html("Work Session");
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
		clearInterval(breakInterval);
		clearInterval(workInterval);
		$(".sessTitle").html("Work Session");
		$(".settings").show();
	});

});
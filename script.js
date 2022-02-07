
// helpers start

function lerp(a, b, t) {
    return (1 - t) * a + t * b;
};

// helpers end

var canvas = document.getElementById("c");
var ctx = canvas.getContext("2d");
ctx.canvas.width  = 512;
ctx.canvas.height = 512;

var x = 128;
var y = 128;
var sx = 64;
var sy = 64;

var desiredLocation = [x, y];

var thrusting = -1;
var sfx = new Audio('jump.wav');
var smallShakeSfx = new Audio('smallShake.wav');
var bigShakeSfx = new Audio('bigShake.wav');

var score = 0;
var roundScore = 0;
var roundScoreBig = 0;
var shakeScore = 0;
var dispSize = 64;
var shakeSize = 128;

addEventListener("click", function(){
	desiredLocation[0] = event.clientX - 40;
	desiredLocation[1] = event.clientY - 40;
	sx = 128;
	sy = 128;
	score += 1;
	
	roundScore += 1;
	
	if (roundScore == 3) {
		shakeScore = 1;
		roundScore = 0;
		roundScoreBig += 1;
		
		shakeSize = 128;
		
		if (roundScoreBig == 10) {
			shakeSize = 256;
			bigShakeSfx.play();
		} else {
			smallShakeSfx.play();
		};
		
	};
	
});

setInterval(function() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	x = lerp(x, desiredLocation[0], 0.25);
	y = lerp(y, desiredLocation[1], 0.25);
	
	// draw bg
	var img = document.getElementById("bg");
	ctx.drawImage(img, 0, 0, 512, 512);
	
	// draw score
	
	ctx.font = dispSize + 'px monospace';
	ctx.fillStyle = "black";
	ctx.fillText(score, 5, 500);
	
	if (shakeScore == 1) {
		dispSize = shakeSize;
		shakeScore = 0;
	} else {
		dispSize = lerp(dispSize, 64, 0.1);
	};
	
	// draw puff
	if (sx > 65 && thrusting == 1) {
		sfx.play();
		var puff = document.getElementById("puff");
		ctx.drawImage(puff, x, y, sx, sy);
	};
	
	// draw player
	var p = document.getElementById("p");
	ctx.drawImage(p, x, y, sx, sy);
	sx = lerp(sx, 64, 0.25);
	sy = lerp(sy, 64, 0.25);
	
});

setInterval(function() {
	thrusting = -thrusting;
}, 25);

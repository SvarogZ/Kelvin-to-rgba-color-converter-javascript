"use strict";

const defValue = 5790;
const colorFrame = document.getElementById("colorFrame");
const slider = document.getElementById("slider");
const kelvin = document.getElementById("kelvin");
const rgba = document.getElementById("rgba");

kelvin.value = slider.value = defValue;
showColor(defValue);

slider.oninput = function() {
  const normalizedValue = normalizeValue(this.value)
  kelvin.value = normalizedValue;
  showColor(normalizedValue);
}

kelvin.oninput = function() {
  const normalizedValue = normalizeValue(this.value)
  slider.value = normalizedValue;
  showColor(normalizedValue);
}

function normalizeValue(value){
	if (value < 1000) { return 1000; }
	if (value > 40000) { return 40000; }
	return value;
}

function showColor(value) {
	const rgbaString = KToRGBA(value);
	colorFrame.style.backgroundColor = rgbaString;
	rgba.value = rgbaString;
}

function KToRGBA(value){
	if (value < 1000) { value = 1000; }
	if (value > 40000) { value = 40000; }
	
	const temperature = value / 100;
	let red, green, blue;
	
	const normalize = value => value < 0 ? 0 : value > 255 ? 255 : value;
	
	if (temperature <= 66){
		red = 255;
		green = 99.4708025861 * Math.log(temperature) - 161.1195681661;
		green = normalize(green);
	} else {
		red = 329.698727446 * Math.pow(temperature - 60, -0.1332047592);
		normalize(red);
		green = 288.1221695283 * Math.pow(temperature - 60, -0.0755148492);
		normalize(green);
	}

	if (temperature >= 66){
		blue = 255;
	} else {
		if (temperature <= 19){
			blue = 0;
		} else {
			blue = 138.5177312231 * Math.log(temperature - 10) - 305.0447927307;
			blue = normalize(blue);
		}
	}

	const rgb = new Array(Math.round(red),Math.round(green),Math.round(blue));
	return `rgba(${rgb[0]},${rgb[1]},${rgb[2]},1)`;
}

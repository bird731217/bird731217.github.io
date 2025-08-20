var urlParams;
var defaultTime='325';

$(document).ready(function () {
	
	urlParams = new URLSearchParams(window.location.search);	

	if(urlParams.has('t'))
	{
		defaultTime = urlParams.get('t');
	}
	
	$('#Lesson').val(defaultTime);

	$('#Lesson').change(function () {
		var dom = $(this);

		var selectionText = dom.val();

		var distance = $('#Distance').val();

		getTrainingData(selectionText, distance);
	});

	$('#Distance').change(function () {
		var dom = $(this);

		var selectionText = dom.val();

		var lesson = $('#Lesson').val();

		getTrainingData(lesson, selectionText);
	});


	bidingCurrnetDate();


	//Week
	$('#Week').change(function () {
		var dom = $(this);

		var selectionText = dom.val();

		$('#imgTraining').attr('src', 'img/' + selectionText + '.jpg');


		var currentWK = $('#Week').val();

		bindingTime(currentWK);

	});


});

function getTrainingData(speed, distance) {
	$('#ftpZoneTable tbody').empty();

	var currentWK = $('#Week').val();

	var filterArray = trainingArray.filter(function (item) {
		return item.目標 == speed;
	});

	var text = filterArray[0][distance];

	var item = text.split(' ').filter(Boolean);

	var colorSetting = { "輕鬆跑": "#ffffff", "短間歇": "#e2ffda", "長間歇": "#ddebf7", "節奏跑": "#fce4d6", "長跑": "#fff2cc", "恢復跑": "#ffffff" };

	var html = '';
	$.each(item, function (key, value) {
		html += '<tr>';

		var trainingType = value.split('：')[0];

		html += `<td style="background-color:${colorSetting[trainingType]};">${trainingType}</td>`;
		html += `<td style="background-color:${colorSetting[trainingType]};">${value.split('：')[1]}</td>`;

		html += `<td style="background-color:${colorSetting[trainingType]};"><span id="${trainingType}"></span></td>`;
		html += '</tr>';
		console.log(html);
	});


	$('#ftpZoneTable').append(html);
}


function bidingCurrnetDate() {
	getTrainingData(defaultTime, '1k');

	let currentWK = '';
	let now = new Date();
	let currentMMdd = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;


	//currentMMdd='0101'	
	var mappingArray = weekMapping.filter(function (item) {
		return item.Date == currentMMdd;
	});

	currentWK = '01'
	if (mappingArray.length > 0) {
		currentWK = mappingArray[0].wk;
	}

	bindingTime(currentWK);

	$('#Week').val(currentWK);
	$('#imgTraining').attr('src', 'img/' + currentWK + '.jpg');
}

function bindingTime(currentWK) {
	var time = $('#Lesson').val();

	var speedArray = trainingArray.filter(function (item) {
		return item.目標 == time;
	});

	var timeSummary = weekDetail.filter(function (item) {
		return item.week == currentWK;
	});

	let sTh = speedArray[0]["1k"].split(' ')[1].split('：')[1].split(':');
	sTh = sTh[0] * 60 + sTh[1] * 1;

	console.log(speedArray[0]["1k"]);


	let lT = speedArray[0]["1k"].split(' ')[2].split('：')[1].split(':');
	lT = lT[0] * 60 + lT[1] * 1;

	let tempo = speedArray[0]["1k"].split(' ')[4].split('：')[1].split(':');
	tempo = tempo[0] * 60 + tempo[1] * 1;

	let long = speedArray[0]["1k"].split(' ')[5].split('：')[1].split(':');
	long = long[0] * 60 + long[1] * 1;


	let rest = speedArray[0]["1k"].split(' ')[6].split('：')[1].split(':');
	rest = rest[0] * 60 + rest[1] * 1;

	let tTime = 0.0;
	let rTime = 0.0;

	$('#短間歇').text('');
	if (timeSummary[0]["短間歇_Distance"]) {

		tTime = (timeSummary[0]['短間歇_Distance'] * sTh / 60);
		rTime = (timeSummary[0]['短間歇_Rest'] * rest / 60);

		$('#短間歇').text((tTime+rTime).toFixed(2));
	}

	$('#節奏跑').text('');
	if (timeSummary[0]["節奏跑_Distance"]) {		
		$('#節奏跑').text((timeSummary[0]['節奏跑_Distance'] * tempo / 60).toFixed(2));
	}


	$('#長跑').text('');
	if (timeSummary[0]["長跑_Distance"]) {
		$('#長跑').text((timeSummary[0]['長跑_Distance'] * long / 60).toFixed(2));
	}

	$('#長間歇').text('');
	if (timeSummary[0]["長間歇_Distance"]) {
		
		tTime = (timeSummary[0]['長間歇_Distance'] * lT / 60);
		rTime = (timeSummary[0]['長間歇_Rest'] * rest / 60);

		$('#長間歇').text((tTime+rTime).toFixed(2));
	}
}
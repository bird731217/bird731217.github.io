$(document).ready(function () {

    $('#Lesson').val('325');

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


function bidingCurrnetDate()
{
	getTrainingData('325', '1k');
	
	let currentWK='';
	let now = new Date();
	let currentMMdd = `${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}`;
	
	
	//currentMMdd='0101'	
	var mappingArray = weekMapping.filter(function (item) {
		return item.Date == currentMMdd;
	});
	
	currentWK='01'
	if(mappingArray.length>0)
	{
		currentWK = mappingArray[0].wk;	
	}	
		
	bindingTime(currentWK);
	
	$('#Week').val(currentWK);
	$('#imgTraining').attr('src', 'img/' + currentWK+ '.jpg');	
}

function bindingTime(currentWK)
{
	var timeSummary = weekDetail.filter(function (item) {
			return item.week == currentWK;
	});
		
	$('#短間歇').text('');
	if(timeSummary[0]["短間歇"])
	{
		$('#短間歇').text(timeSummary[0]['短間歇']);
	}
	
	$('#節奏跑').text('');
	if(timeSummary[0]["節奏跑"])
	{
		$('#節奏跑').text(timeSummary[0]['節奏跑']);
	}
	
	
	$('#長跑').text('');
	if(timeSummary[0]["長跑"])
	{
		$('#長跑').text(timeSummary[0]['長跑']);
	}
	
	$('#長間歇').text('');
	if(timeSummary[0]["長間歇"])
	{
		$('#長間歇').text(timeSummary[0]['長間歇']);
	}
}
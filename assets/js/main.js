$(document).ready(function () {
	$('#resultContainer').hide();
	$("#fileinput").on('change', (event) => {
		$('#resultContainer').text('');
		let file = event.target.files[0];
		if (file && file.name.split(".")[1] === 'txt' && file.type === 'text/plain') {
			$('#resultContainer').append(`<h1>File name: ${file.name}</h1>`)
			var reader = new FileReader();
			reader.onload = function (e) {
				var contents = e.target.result;
				var ct = reader.result;
				parseTxt(ct);
			}
			reader.readAsText(file);
		} else {
			alert("Failed to load file");
		}
	})
}); 

function parseTxt(content){
	let rowsArr = content.split('\r\n');

	rowsArr.forEach((row,index) => {
		let resultStr = '';
		let [char, count, password] = row.split(" ");
		let interval = count.match(/\d/g);
		
		let maches = password.split('').reduce((acc, curr) => {
			if(char === curr){
				acc++;
			}
			return acc;
		}, 0);
		let isValid = false;
		if(maches >= interval[0] && maches <= interval[1]){
			isValid = true;
		}
		resultStr += `<p><b>Char:</b> ${char}</p>`;
		resultStr += `<p><b>Password:</b> ${password}</p>`;
		resultStr += `<p><b>Char count:</b> from ${interval[0]} to ${interval[1]}</p>`;
		resultStr += `<p><b>Maches:</b> ${maches}</p>`;
		resultStr += `<p><b>Is valid:</b> ${isValid?'<span class="valid">valid</span>' : '<span class="not-valid">not valid</span>'}</p>`;
		
		$('#resultContainer').append(resultStr);
		$('#resultContainer').append('<hr/>');
		$('#resultContainer').show();
	});
}
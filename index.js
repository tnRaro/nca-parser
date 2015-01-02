var jsdom = require('jsdom');
var request = require('request');
var fs = require('fs');

var NAME = {
	1:'app',
	2:'board',
	3:'search',
	4:'comment',
	5:'newface'
};

function parser(start){

	var cafeid = start;
	var api = 'http://cafe.naver.com/RankingHistoryJson.nhn?clubid='+cafeid;
	var url = 'http://cafe.naver.com/CafeRankingCafeView.nhn?clubid='+cafeid;

	request(api, function(err, res, body){
		if(!err && res.statusCode == 200){
			var data = JSON.parse(body);

			var r = [];

			if(data.success){
				for(var k in data.history){
					var item = data.history[k];

					r.push({});
					var i = r.length-1;
					r[i]['total'] = item.point;
				}
				fin('', r);
			}
		}else{
			console.log('fail', cafeid);
		}
	});

	jsdom.env(url, [
		'http://code.jquery.com/jquery-2.1.3.min.js'
	], function(err, window){
		if(err){
			console.log('fail', cafeid);
			parser(start);
			return false;
		}
		var $ = window.$;

		var err_c = $('.error_content').html();

		if(err_c){
			console.log('fail', cafeid);
			parser(start);
			return false;
		}
		var table = $('.board-box').children('tbody')[0];

		var row = table.rows.length;
		var cell = table.rows[0].cells.length;

		var r = [];
		for(var i=0;i<row;i++){
			if(!table.rows[i].cells[1]) continue;
			if(i == 0) continue;
			r.push({});
			var idx = r.length-1;
			for(var j=0;j<cell;j++){
				if(!table.rows[i].cells[j]) continue;
				if(j == 0) continue;

				r[idx][NAME[j]] = (table.rows[i].cells[j].innerHTML).trim();
			}
		}
		fin('', r);
	});//*/

	var types = 0;
	var re = [];

	var fin = function(t, a){
		types++;

		for(var i in a){
			if(!re[i]) re[i] = {};
			for(var k in a[i]){
				re[i][k] = a[i][k];
			}
		}

		if(types == 2){
			var r = '';
			for(var i in re){
				r += re[i]['total']+'\t';
				r += re[i]['app']+'\t';
				r += re[i]['board']+'\t';
				r += re[i]['search']+'\t';
				r += re[i]['comment']+'\t';
				r += re[i]['newface']+'\n';
			}
			fs.appendFile('data.txt', r, function(err){
				if(err) throw err;
				console.log('done!');
			});
		}
	}
};

//parser(Math.floor(Math.random()*1000000 + 10000));

process.stdin.resume();
process.stdin.setEncoding('utf8');

process.stdin.on('data', function(url){

	request(url, function(err, res, body){
		if(!err && res.statusCode == 200){
			var m = body.match(/g_sClubId = "(.+)"/);
			parser(m[1]);
		}else{
			console.log('fail', url);
		}
	});
});
	/*
var pos = 0;
var list = [/*
	26686242,
	12424271,
	25106742,
	26667947,
	14385587,
	27009821,
	13758585,
	10050146,
	10153147,
	23703136,
	21510411,
	26412421,
	24867464,
	24233674,
	11639768,
	11192577,
	13581931,
	27656157,
	26008868,
	17045785,
	27324781,
	13292664,
	10342583,
	14308384,
	25921363,
	15135952,
	12320458,
	25693175,
	24382523,
	21138584,
	12318133,
	23683173,
	24826387,
	25315095,
	19543191,
	10526290,
	11521182,
	13719301,
	10067366,
	13255822,
	10000260,
	10080092,
	10331120,
	10298136,
	18234948,
	18321033,
	19859404,
	19799898,
	20232368,
	20573559,
	23370764,
	24967519,
	25301658,
	25780584,
	10197921,
	14674572,
	11786850,
	21480924,
	12776905,
	12843510,
	12877327,
	14770995,
	12026840,
	12753090*/
//];

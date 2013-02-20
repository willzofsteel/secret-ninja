var http = require('http');
var crypto = require('crypto');
var url = require('url');

http.createServer(function (req, res) {

	res.writeHead(200, {'Content-type': 'text/plain'});
	
	var result = url.parse(req.url, true).query;

	if (result.name){
		var name = result.name;
		res.write(encrypt(name));
	}

	if(result.secret){
		var secret = result.secret;
		res.write(decrypt(secret));
	}
		
	res.end();

}).listen(7575);


var algo = 'aes-128-cbc'
	, key = 'dogpoopy'
	, clearEncoding  = 'utf8'
	, cipherEncoding = 'hex';

function encrypt (text) {


	var cipher = crypto.createCipher(algo, key);
	var chunks = [];
	chunks.push(cipher.update(text, clearEncoding, cipherEncoding));
	chunks.push(cipher.final(cipherEncoding));
	console.log(cipherEncoding + ' cipherText:' + chunks.join(''));
	console.log(chunks);

	return chunks.join('');
}

function decrypt (cipherText) {
	var decipher = crypto.createDecipher(algo, key);
	var cipherChunks = [''];
	var plainChunks = [];

	cipherChunks.push(cipherText);

	for (var i=0; i < cipherChunks.length; i++ ){
		plainChunks.push(decipher.update(cipherChunks[i], cipherEncoding, clearEncoding));
	}

	plainChunks.push(decipher.final(clearEncoding));

	console.log(plainChunks.join(''));
	return plainChunks.join('');
}
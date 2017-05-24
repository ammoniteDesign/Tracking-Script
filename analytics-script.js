(function (window) {

	var osaIdentifier = getOsId(window.location.search);

	function getOsId(string) {
		var startParam = (string.indexOf("osa_did="));
		return string.substring((startParam + 8), (startParam + 16));
	}

	function getDataLayer(callback) {	
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.onload = function () {
			callback(JSON.parse(xmlHttp.responseText));
		}
		xmlHttp.open("GET", 'https://svc-www-local.outintern.com/api/os-analytics/v1/' + osaIdentifier, true);
		xmlHttp.send(null);
	}

	function injectData(data) {
		if (data) {
			if (data.DataiumSubscription) {
				var dataScript = document.createElement('SCRIPT');
				dataScript.src = '//vcu.collserve.com/vcu.js';
				dataScript.type = 'text/javascript';
				console.log(document.getElementsByTagName('body')[0])
				document.getElementsByTagName('body')[0].appendChild(dataScript);
			}
			if (data.SocialSubscription) {
				if (data.FacebookPixel) {
					document.getElementsByTagName('head')[0].appendChild(data.FacebookPixel);
				}
			}
		} else {
			console.log("Error retrieving data layer for client " + osaIdentifier + ".")
		}
	}
	getDataLayer(injectData);
})(this);
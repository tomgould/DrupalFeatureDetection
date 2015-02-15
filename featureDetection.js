(function($) {
    Drupal.behaviors.featureDetection = {};
    Drupal.behaviors.featureDetection.results = {};
	Drupal.behaviors.featureDetection.pluginList = {
		flash: {
			activex: "ShockwaveFlash.ShockwaveFlash",
			plugin: /flash/gim,
			name: "flash"
		},
		sl: {
			activex: ["AgControl.AgControl"],
			plugin: /silverlight/gim,
			name: "sl"
		},
		pdf: {
			activex: "PDF.PdfCtrl",
			plugin: /adobe\s?acrobat/gim,
			name: "pdf"
		},
		qtime: {
			activex: "QuickTime.QuickTime",
			plugin: /quicktime/gim,
			name: "qtime"
		},
		wmp: {
			activex: "WMPlayer.OCX",
			plugin: /(windows\smedia)|(Microsoft)/gim,
			name: "wmp"
		},
		shk: {
			activex: "SWCtl.SWCtl",
			plugin: /shockwave/gim,
			name: "shk"
		},
		rp: {
			activex: "RealPlayer",
			plugin: /realplayer/gim,
			name: "rp"
		},
		java: {
			activex: navigator.javaEnabled(),
			plugin: /java/gim,
			name: "java"
		}
	};
	Drupal.behaviors.featureDetection.isSupported = function(p) {
		if (window.ActiveXObject) {
			try {
				new ActiveXObject(Drupal.behaviors.featureDetection.pluginList[p].activex);
				Drupal.behaviors.featureDetection.results[p] = true;
			} catch (e) {
				Drupal.behaviors.featureDetection.results[p] = false;
			}
		} else {
			$.each(navigator.plugins, function() {
				if (this.name.match(Drupal.behaviors.featureDetection.pluginList[p].plugin)) {
					Drupal.behaviors.featureDetection.results[p] = true;
					return false;
				} else {
					Drupal.behaviors.featureDetection.results[p] = false;
				}
			});
		}
	};
	$.each(Drupal.behaviors.featureDetection.pluginList, function(i, n) {
		Drupal.behaviors.featureDetection.isSupported(i);
	});
	$.each(Drupal.behaviors.featureDetection.results, function(i, n) {
		$('html').addClass(i + '-' + n);
	});	
})(jQuery);


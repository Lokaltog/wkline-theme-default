// This will be created inside the WklineCtrl scope, but it will be globally
// available for data injection into the controller scope
var wkInject,
    wkHandlers,
    merge_recursive

merge_recursive = function (obj1, obj2) {
	// http://stackoverflow.com/questions/171251/how-can-i-merge-properties-of-two-javascript-objects-dynamically
	for (var p in obj2) {
		try {
			// Property in destination object set update its value.
			if (obj2[p].constructor === Object) {
				obj1[p] = merge_recursive(obj1[p], obj2[p])
			} else {
				obj1[p] = obj2[p]
			}
		}
		catch (e) {
			// Property in destination object not set create it and set its value.
			obj1[p] = obj2[p]
		}
	}

	return obj1
}

wkHandlers = {
	inject: function ($scope, data) {
		$scope.data = merge_recursive($scope.data, data)
	},
	notification: function ($scope, data) {
		var icons = {
			warning: 'fa-exclamation-triangle',
			error: 'fa-times-circle',
		}
		$scope.data.plugin.notifications = [{
			class: data.category,
			icon: data.category in icons ? 'fa icon ' + icons[data.category] : '',
			summary: data.summary,
			body: data.body,
		}]
	},
	reload: function () {
		window.location.reload()
	},
	setBackground: function ($scope, data) {
		document.getElementById('statusline-bg').className = data.cls
		if ('image' in data) {
			document.getElementById('statusline-bg').style['background-image'] = 'url(' + data.image + ')'
		}
	},
}

angular.module('Wkline', [])
	.controller('WklineCtrl', ['$scope', function ($scope) {
		$scope.data = {plugin: {}}
		wkInject = function (payload) {
			if (! payload) {
				return
			}

			$scope.$apply(function () {
				var handler, data

				if (payload instanceof Array) {
					handler = payload[0]
					data = payload[1]
				}
				else {
					handler = 'inject'
					data = payload
				}

				try {
					wkHandlers[handler]($scope, data)
				}
				catch (e) {}
			})
		}
	}])
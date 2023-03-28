(function (global) {
    var ajaxUtils = {};

    // Makes an Ajax GET REQUEST to the requested URL
    ajaxUtils.sendGetRequest = function (requestUrl, responseHandler) {
        var request = getRequestObject();
        request.onreadystatechange = function() {
            handleResponse(request, responseHandler);
        };
        request.open("GET", requestUrl, false);
        request.send(null);
    };

    // Makes an Ajax POST REQUEST to the requested URL
    ajaxUtils.sendPostRequest = function (requestUrl, responseHandler, data) {
        var request = getRequestObject();
        request.onreadystatechange = function () {
            handleResponse(request, responseHandler);
        };
        request.open("POST", requestUrl, false);
        request.setRequestHeader("Content-Type", "application/json");
        request.send(data);
    };

    // function to get Request Object
    function getRequestObject() {
        if (window.XMLHttpRequest) {
            return (new XMLHttpRequest());
        }
        else if (window.ActiveXObject) {
            return (new ActiveXObject("Microsoft.XMLHTTP"));
        }
        else {
            global.alert("AJax is not supported!");
            return (null);
        }
    }

    // ResponseHandler function
    function handleResponse(request, responseHandler) {
        if ((request.readyState == 4) && (request.status == 200)) {
            responseHandler(request);
        }
    }

    // Exposing utility to the global Object
    global.$ajaxUtils = ajaxUtils;

})(window);
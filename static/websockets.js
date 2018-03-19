var ws = new WebSocket("ws://" + location.hostname + ":8889"
                        + "/load_from_docker/"
                        + "?user_id=" + user_id.toString()
                        );
ws.onopen = function() {
    console.log("open");
};
ws.onmessage = function(evt) {
    var getjson = evt.data;
    hendlerMessage(getjson);
};
ws.onclose = function() {
    console.log("close");
};

function load(key_from_html, elem) {
    var dict = {};
    if (key_from_html == "url_address") {
    $("#print_output").empty();
    dict["method"] = key_from_html;
    dict[key_from_html] = $("#url").val();
    dict["tag_image"] = $("#tag_image").val();
    } else if (key_from_html == "create") {
    dict["method"] = key_from_html;
    dict["elem"] = elem;
    } else if (key_from_html == "start") {
    dict["method"] = key_from_html;
    dict["elem"] = elem.slice(1);
    } else if (key_from_html == "stop") {
    dict["method"] = key_from_html;
    dict["elem"] = elem.slice(1);
    } else if (key_from_html == "remove") {
    dict["method"] = key_from_html;
    dict["elem"] = elem.slice(1);
    } else {
    dict["method"] = key_from_html;
    };
    dict = JSON.stringify(dict);
    ws.send(dict);
};

function hendlerMessage(getjson) {
    var parsejson = JSON.parse(getjson);
    var key_from_html = parsejson.method;
    if (key_from_html == "images") {$("#print_images").empty();};
    if (key_from_html == "containers" || key_from_html == "create" ||
    key_from_html == "start" || key_from_html == "stop" ||
    key_from_html == "remove") {$("#print_containers").empty();};
    switch (key_from_html) {
      case "images":
         for (key in parsejson.images) {
         $("#print_images").append("<li>" + parsejson.images[key] +
         "</li>" + "<button onclick='load(\"create\", \"" + parsejson.images[key] +
         "\")'>Create Container</button>");
         };
         break;
      case "create":
      case "start":
      case "stop":
      case "remove":
      case "containers":
         for (key in parsejson.containers) {
         if (parsejson.containers[key][1].indexOf("Up") == 0) {
         $("#print_containers").append("<li>" + parsejson.containers[key][0] +
         "<br/>" + parsejson.containers[key][1] + "</li>" +
         "<button onclick='load(\"stop\", \"" + parsejson.containers[key][0] +
         "\")'>Stop Container</button>");} else {
         $("#print_containers").append("<li>" + parsejson.containers[key][0] +
         "<br/>" + parsejson.containers[key][1] + "</li>" +
         "<button onclick='load(\"start\", \"" + parsejson.containers[key][0] +
         "\")'>Start Container</button>" + "<button onclick='load(\"remove\", \"" +
         parsejson.containers[key][0] + "\")'>Remove Container</button>");}
         };
         break;
      case "url_address":
         $("#print_output").append("<li>" + parsejson.output + "</li>");
         break;
      default:
         alert(parsejson.message)
    };
};

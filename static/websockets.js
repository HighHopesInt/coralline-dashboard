var ws = new WebSocket("ws://" + location.hostname + ":8888"
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

function tag_image(user_id, tag_str){
    return user_id + "/" + (~tag_str.indexOf(":") ? tag_str : tag_str+":latest")
}

function load(key_from_html, elem) {
    var dict = {"params": {}};
    if (key_from_html == "build_image") {
        var tag_str = $("#tag_image").val().trim();
        if (!(tag_str)) {alert('Please specify a tag!'); return;}
        $("#print_output").empty();
        dict["method"] = key_from_html;
        dict["params"]["url"] = $("#url").val();
        dict["params"]["tag_image"] = tag_image(user_id, tag_str);
    } else if (key_from_html == "create") {
        dict["method"] = key_from_html;
        dict["params"]["elem"] = elem;
    } else if (key_from_html == "start") {
        dict["method"] = key_from_html;
        dict["params"]["elem"] = elem.slice(1);
    } else if (key_from_html == "stop") {
        dict["method"] = key_from_html;
        dict["params"]["elem"] = elem.slice(1);
    } else if (key_from_html == "remove") {
        dict["method"] = key_from_html;
        dict["params"]["elem"] = elem.slice(1);
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
         for (item in parsejson.result) {
             var image = parsejson.result[item];
             $("#print_images").append("<li>" +
             image["tag"].split("/")[1] + // hiding 'user_id' part of the tag
             (image["available"] ? "": " -- not available") + "</li>"
             + "<button " + (image["available"] ? "": "disabled='disabled'")
             + " onclick='load(\"create\", \"" + image["tag"] +
             "\")'>Create Container</button>");
             };
         break;
      case "create":
      case "start":
      case "stop":
      case "remove":
      case "containers":
         for (key in parsejson.result) {
         if (parsejson.result[key][1].indexOf("Up") == 0) {
         $("#print_containers").append("<li>" + parsejson.result[key][0] +
         "<br/>" + parsejson.result[key][1] + "</li>" +
         "<button onclick='load(\"stop\", \"" + parsejson.result[key][0] +
         "\")'>Stop Container</button>");} else {
         $("#print_containers").append("<li>" + parsejson.result[key][0] +
         "<br/>" + parsejson.result[key][1] + "</li>" +
         "<button onclick='load(\"start\", \"" + parsejson.result[key][0] +
         "\")'>Start Container</button>" + "<button onclick='load(\"remove\", \"" +
         parsejson.result[key][0] + "\")'>Remove Container</button>");}
         };
         break;
      case "build_image":
         $("#print_output").append("<li>" + parsejson.result + "</li>");
         break;
      default:
         alert(parsejson.error)
    };
};

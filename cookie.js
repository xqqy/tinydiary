function setcookie(cname,cvalue,exdays=0){
	var d = new Date();
	d.setTime(d.getTime()+(exdays*24*60*60*1000));
	var expires = "expires="+d.toGMTString();
	document.cookie = cname+"="+cvalue+"; "+expires;
}
function getcookie(cname){
	var name = cname + "=";
	var ca = document.cookie.split(';');
	for(var i=0; i<ca.length; i++) {
		var c = ca[i].trim();
		if (c.indexOf(name)==0) return c.substring(name.length,c.length);
	}
	return "";
}
function checkcookie(){
	var userid=getCookie("userid");
	var apikey=getCookie("apikey");
	var holderuserid=getCookie("holderuserid");
	var holderapikey=getCookie("holderapikey");
	if (userid=="" || userid==null || apikey=="" || apikey==null){
		userid = prompt("Please enter your userid:","");
		apikey = prompt("Please enter your apikey:","");
  		if (userid!="" && userid!=null && apikey!="" && apikey!=null){
    		setCookie("userid",userid,30);
			setCookie("apikey",apikey,30);
    	}
	}
		document.getElementById("userid").value=userid;
		document.getElementById("apikey").value=apikey;
		document.getElementById("holderuserid").value=holderuserid;
		document.getElementById("holderapikey").value=holderapikey;
}
!function(){
	try{
		var message=["    ##########################################\n    #░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░#\n    #░░░░░░░▄▄▀▀▀▀▀▀▀▀▀▀▄▄█▄░░░░▄░░░░█░░░░░░░#\n    #░░░░░░█▀░░░░░░░░░░░░░▀▀█▄░░░▀░░░░░░░░░▄░#\n    #░░░░▄▀░░░░░░░░░░░░░░░░░▀██░░░▄▀▀▀▄▄░░▀░░#   Checking out my code? I like you.\n    #░░▄█▀▄█▀▀▀▀▄░░░░░░▄▀▀█▄░▀█▄░░█▄░░░▀█░░░░#\n    #░▄█░▄▀░░▄▄▄░█░░░▄▀▄█▄░▀█░░█▄░░▀█░░░░█░░░#   Looking to hire me? You can reach\n    #▄█░░█░░░▀▀▀░█░░▄█░▀▀▀░░█░░░█▄░░█░░░░█░░░#   me with my contact info. Tell me\n    #██░░░▀▄░░░▄█▀░░░▀▄▄▄▄▄█▀░░░▀█░░█▄░░░█░░░#   you found this and I will be much\n    #██░░░░░▀▀▀░░░░░░░░░░░░░░░░░░█░▄█░░░░█░░░#   more interested in working for your\n    #██░░░░░░░░░░░░░░░░░░░░░█░░░░██▀░░░░█▄░░░#   company!\n    #██░░░░░░░░░░░░░░░░░░░░░█░░░░█░░░░░░░▀▀█▄#\n    #██░░░░░░░░░░░░░░░░░░░░█░░░░░█░░░░░░░▄▄██#\n    #░██░░░░░░░░░░░░░░░░░░▄▀░░░░░█░░░░░░░▀▀█▄#\n    #░▀█░░░░░░█░░░░░░░░░▄█▀░░░░░░█░░░░░░░▄▄██#\n    #░▄██▄░░░░░▀▀▀▄▄▄▄▀▀░░░░░░░░░█░░░░░░░▀▀█▄#\n    #░░▀▀▀▀░░░░░░░░░░░░░░░░░░░░░░█▄▄▄▄▄▄▄▄▄██#\n    #░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░#\n    ##########################################"].join("").split(""),i=message.length,output=[],colors=[];
		for(message.reverse();i--;)
			output.push("%c"+message[i]),
			""===message[i]?colors.push("color: #0852a0"):
			""===message[i]?colors.push("color: #e51d2e"):colors.push("")
			;console.log.apply(console,[output.join("")].concat(colors))
	}catch(err){}
}();

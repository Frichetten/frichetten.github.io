!function(){
	try{
		var message=["\t=================================================\n\t=   This is not the code you're looking for :)  =\n\t=================================================\n"].join("").split(""),i=message.length,output=[],colors=[];
		for(message.reverse();i--;)
			output.push("%s"+message[i]),
			""===message[i]?colors.push("color: red"):colors.push("")
			;console.log.apply(console,[output.join("")].concat(colors))
	}catch(err){}
}();

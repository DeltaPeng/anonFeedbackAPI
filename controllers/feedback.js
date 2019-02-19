//function copied out to separate file to make it easier to manage

const feedbackSubmit = (req, res, postgresDB) => {
 
		//destructure to prevent having to write req.body. prefix
		const {fbKey, fbLiked, fbFuture, fbMisc, dayCreated} = req.body;
		//don't assume data was properly handled in front end, run validation here too
		//run some validation, don't allow any field to be blank OR empty spaces
		
		if (fbKey === '' || fbKey.length < 6)  
		 {
			 this.setState({ statusFlag: '-1'})  
			 return res.status(400).json('Error. Key field needs to be at least 6 characters long.');	
		 } else if (fbLiked === '' && fbFuture === '' && fbMisc === '') 
		 {
			 return res.status(400).json('Error. at least one non-Key field needs data, please try again.');	
		 } 
		
		postgresDB('anonfeedback') 
		.insert(
			{ 
				fbkey: fbKey,
				fbliked: fbLiked, 
				fbfuture: fbFuture,
				fbmisc: fbMisc,
				daycreated: dayCreated
			})
			.returning('id')
			 .then( response => { 
					res.json(response[0]);
			 })   
			.catch (err => res.status(400).json('Unable to log entry.'))    
	}

module.exports = {
	feedbackSubmit: feedbackSubmit
}
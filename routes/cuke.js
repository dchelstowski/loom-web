var Cuke = require('./../models/cuke');
var Device = require('./../models/device');

module.exports = function(app){

	// Get cuke commands
	app.get('/api/cukes', function(req, res) {
		Cuke.find(function(err, cukes) {
			if (err)
				res.send(err)
			res.json(cukes);
		});
	});

	// Get cuke commands belonging to runId
	app.get('/api/:run_id/cukes', function(req, res) {
		Cuke.find({runId : req.params.run_id}, function(err, cukes) {
			if (err)
				res.send(err);
			res.json(cukes);
		})
	})

	// Create new cuke command
	app.post('/api/cukes', function(req, res) {
		console.log("ROUTE DEVICE: " + req.body.device);
		var id = req.body.runId + req.body.device.udid;
		Cuke.create({
			_id : id,
			runId : req.body.runId,
			command : req.body.command,
			status : req.body.status,
			console : req.body.console,
			device : req.body.device
		}, function(err, cuke) {
			if(err) {
				console.log(err);
				res.send(err);
				return;
			}
			Device.findOneAndUpdate({udid : cuke.device}, {
				$set: {
					cuke : cuke._id
				}
			}, function(err, device) {
				if(err) {
					res.send(err);
					console.log(err);
					return;
				}
			});
			Cuke.find(function(err, cukes) {
				if (err) {
					res.send(err);
					console.log(err);
					return;
				}
				res.json(cukes);
			});
		});
	});

	// Update status of cuke command
	app.post('/api/cukes/:cuke_id/:status', function(req, res) {
		Cuke.findByIdAndUpdate(req.params.cuke_id, {
			$set: {
				status : req.params.status
			}
		}, function(err, cuke) {
			if(err) {
				res.send(err);
				console.log(err);
				return;
			}
			Cuke.find(function(err, cukes) {
				if (err)
					res.send(err);
				res.json(cukes);
			});
		});
	});

	// update cuke console
	app.post('/api/cukes/:cuke_id/log', function(req, res) {
		Cuke.findByIdAndUpdate(req.params.cuke_id, {
			$set: {
				console : req.body.console
			}
		}, function(err, cuke) {
			if(err) {
				res.send(err);
				console.log(err);
				return;
			}
			Cuke.find(function(err, cukes) {
				if (err)
					res.send(err);
				res.json(cukes);
			});
		});
	})

	// Delete cuke command
	app.delete('/api/cukes/:cuke_id', function(req, res) {
		Cuke.remove({
			_id : req.params.cuke_id
		}, function(err, cukes) {
			if (err)
				res.send(err)
			Cuke.find(function(err, cukes) {
				if (err)
					res.send(err)
				res.json(cukes);
			});
		});
	});

	// Delete all cuke commands for runId
	app.delete('/api/:run_id/cukes', function(req, res) {
		Cuke.remove({
			runId : req.params.run_id
		}, function(err, cukes) {
			if (err)
				res.send(err)
			Cuke.find(function(err, cukes) {
				if (err)
					res.send(err)
				res.json(cukes);
			});
		});
	});

	// Delete all cuke commands
	app.delete('/api/cukes', function(req, res) {
		Cuke.remove(function(err, cukes) {
			if (err)
				res.send(err)
			Cuke.find(function(err, cukes) {
				if (err)
					res.send(err)
				res.json(cukes);
			});
		});
	});
}
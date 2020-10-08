const db = require('../models');

module.exports = app => {

    app.get('/api/workouts', (req, res) => {
        var total = 0;
        db.Workout.find({}).then(Workoutdb => {
            Workoutdb.forEach(workout => {
                workout.exercises.forEach(exercises => {
                    total += exercises.duration;
                });
                workout.totalDuration = total;
            });
            res.json(Workoutdb);
        }).catch(err => {
            res.json(err);
        });
    });

    app.put('/api/workouts/:id', (req, res) => {
        db.Workout.findOneAndUpdate({
            _id: req.params.id
        }, {
            $inc: {
                totalDuration: req.body.duration
            },
            $push: {
                exercises: req.body
            }
        }, {
            new: true
        }).then(Workoutdb => {
            res.json(Workoutdb);
        }).catch(err => {
            res.json(err);
        });

    });

    app.post('/api/workouts', (req, res) => {
        db.Workout.create(req.body).then((Workoutdb => {
            res.json(Workoutdb);
        })).catch(err => {
            res.json(err);
        });
    });

    app.get('/api/workouts/range', (req, res) => {
        db.Workout.find({}).then(Workoutdb => {
            res.json(Workoutdb);
        }).catch(err => {
            res.json(err);
        });

    });
    
}
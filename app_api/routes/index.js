/*jslint node: true */
'use strict';

var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var ctrlEvents = require('../controllers/events');
var ctrlGames = require('../controllers/games');
var ctrlTeams = require('../controllers/teams');
var ctrlUsers = require('../controllers/users');
var ctrlAuth = require('../controllers/authentication');

// /api/events

router.get('/events', ctrlEvents.getEvents);
router.post('/events', ctrlEvents.addEvent);

router.delete('/events/:id', ctrlEvents.deleteEvent);
router.get('/events/:id', ctrlEvents.getEvent);
//router.put('/events/:id', ctrlEvents.updateEvent);

router.get('/events/:id/tournaments', ctrlEvents.getTournaments);
router.post('/events/:id/tournaments', ctrlEvents.addTournament);

router.delete('/events/:eventId/tournaments/:tournamentId', ctrlEvents.deleteTournament);
router.get('/events/:eventId/tournaments/:tournamentId', ctrlEvents.getTournament);
//router.put('/events/:id/tournaments/:id', ctrlEvents.updateTournament);

router.get('/events/:eventId/tournaments/:tournamentId/matches', ctrlEvents.getMatches);
router.delete('/events/:eventId/tournaments/:tournamentId/matches/:matchId', ctrlEvents.deleteMatch);
router.get('/events/:eventId/tournaments/:tournamentId/matches/:matchId', ctrlEvents.getMatch);
//router.put('/events/:id/tournaments/:id/matches/:id', ctrlEvents.updateMatch);

// /api/games
router.get('/games', ctrlGames.getGames);
router.post('/games', ctrlGames.addGame);

router.delete('/games/:id', ctrlGames.deleteGame);
router.get('/games/:id', ctrlGames.getGame);
//router.put('/games/:id', ctrlGames.updateGame);

// /api/teams
router.get('/teams', ctrlTeams.getTeams);
router.post('/teams', ctrlTeams.addTeam);

router.delete('/teams/:id', ctrlTeams.deleteTeam);
router.get('/teams/:id', ctrlTeams.getTeam);
//router.put('/teams/:id', ctrlTeams.updateTeam);
router.post('/teams/:teamid/addplayer/:playerid', ctrlTeams.addPlayer);
//router.delete('/teams/:teamid/addplayer/:playerid', ctrlTeams.removePlayer);

// /api/users
router.get('/users', ctrlUsers.getUsers);
router.post('/users', ctrlUsers.addUser);

router.delete('/users/:id', ctrlUsers.deleteUser);
router.get('/users/:id', ctrlUsers.getUser);
router.put('/users/:id', ctrlUsers.updateUser);

// login
router.post('/login', ctrlAuth.login);

module.exports = router;

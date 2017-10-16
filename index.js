/**
 * Listen to gitter user joined rooms and proxy these to websockets.
 *
 * User is decided by token in gitter-token.js
 */
/* eslint no-console: 0 */
"use strict";
const Gitter = require("node-gitter");
const IO = require("socket.io");
const M = require("most");
const R = require("ramda");

const { normalizeMessage } = require("./src/normalize-message/normalize-message");

const token = require("./gitter-token");
const config = require("./config.js");

//////////////////////////////////////////////////////
// Helpers
//

const isPublicRoom = R.propEq("public", true);

//////////////////////////////////////////////////////
// Streams
//

const createRoom$ = gitter =>
    M.fromPromise(gitter.currentUser().then(user => user.rooms()))
        .chain(M.from)
        .filter(isPublicRoom)
        .map(({ id, name }) => ({ id, name }));

const createMessage$ = gitter => room =>
    M.fromPromise(
        gitter.rooms.find(room.id).then(r => {
            r.subscribe();
            return r;
        })
    )
        .chain(r => M.fromEvent("chatMessages", r))
        .filter(({ operation }) => operation === "create")
        .map(R.prop("model"))
        .map(m => ({ room: room.name, gitterMessageObj: m }));

//////////////////////////////////////////////////////
// Run stuff
//

process.title = config.processTitle;
const gitter = new Gitter(token);
const io = new IO(config.port);

const room$ = createRoom$(gitter);

const message$ = room$.chain(createMessage$(gitter)).map(normalizeMessage);

message$.observe(nm => io.emit("message", nm)).catch(console.error);

gitter
    .currentUser()
    .then(R.prop("username"))
    .then(username =>
        console.log(`proxy gitter messages from ${username} on port: ${config.port}`)
    );

/**
 * Listen to gitter user joined rooms and proxy these to websockets.
 *
 * User is decided by token in gitter-token.js
 */
/* eslint no-console: 0 */
"use strict";
const Gitter = require("node-gitter");
const IO = require("socket.io");
const R = require("ramda");

const { createRoom$, createMessage$ } = require("./src/streams/streams");

const { normalizeMessage } = require("./src/normalize-message/normalize-message");

const token = require("./gitter-token");
const config = require("./config.js");

//////////////////////////////////////////////////////
// Run stuff
//

process.title = config.processTitle;
const gitter = new Gitter(token);
const io = new IO(config.port);

// Stream of rooms
const room$ = createRoom$(gitter);

// Stream of normalized messages
const message$ = room$.chain(createMessage$(gitter)).map(normalizeMessage);

// Emit message
message$.observe(nm => io.emit("message", nm)).catch(console.error);

// On startup log gitter user and port
gitter
    .currentUser()
    .then(R.prop("username"))
    .then(username =>
        console.log(`proxy gitter messages from ${username} on port: ${config.port}`)
    );

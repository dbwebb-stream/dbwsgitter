/**
 * Streams
 */
"use strict";
const M = require("most");
const R = require("ramda");

//////////////////////////////////////////////////////
// Helpers
//

const isPublicRoom = R.propEq("public", true);

//////////////////////////////////////////////////////
// Streams
//

/**
 * Create room stream for a user authorized in gitter object.
 *
 * @sig createRoom$ :: Gitter -> Stream
 *  Gitter = a gitter object
 *  Stream = a most stream of { id: gitter-room-id, name: gitter-room-name }
 */
const createRoom$ = gitter =>
    M.fromPromise(gitter.currentUser().then(user => user.rooms()))
        .chain(M.from)
        .filter(isPublicRoom)
        .map(({ id, name }) => ({ id, name }));

/**
 * Create a stream of messages tagged with gitter room.
 *
 * Filters all but "create" messages (original). Disregard patch, update etc.
 *
 * @sig createMessage$ :: Gitter -> Room -> Stream
 *  Gitter = a Gitter object
 *  Room = a room object { id: gitter-room-id, name: gitter-room-name }
 *  Stream = a most stream of
 *           { room: gitter-room-name, gitterMessageObj: object-in-gitter-message-model }
 */
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

module.exports = { createRoom$, createMessage$ };

/** Normalize a message */
"use strict";
const R = require("ramda");

/**
 * Get milliseconds from date-time string. If undefined default to now.
 *
 * @sig dateTimeToMilliseconds :: DateTime -> Number
 *  DateTime = String
 */
const dateTimeToMilliseconds = dateTime => new Date(dateTime || Date.now()).valueOf();

/**
 * Construct a message according to architecture spec
 *
 * Example normalized message
 * {
 *   "service": "irc",
 *   "serviceId": "irc-putte-v0.0.1"
 *   "time": 1504276618,
 *   "to": "#db-o-webb",
 *   "from": "litemerafrukt",
 *   "fromImageUrl": null,
 *   "message": "Säg hej till putte, han bara lyssnar på kanalen",
 *   "meta": null,
 *   "original": null
 * }
 *
 * @sig normalizeMessage :: ((() -> Number), String, String, String) -> Object
 */
const normalizeMessage = ({ room, gitterMessageObj }) => ({
    service: "gitter",
    serviceId: "dbwgitter-v1.0.0",
    time: dateTimeToMilliseconds(R.prop("sent", gitterMessageObj)),
    to: room,
    from: R.pathOr("N/A", ["fromUser", "username"], gitterMessageObj),
    fromImageUrl: R.pathOr(null, ["fromUser", "avatarUrlMedium"], gitterMessageObj),
    message: R.prop("text", gitterMessageObj),
    meta: null,
    original: gitterMessageObj
});

module.exports = { normalizeMessage };

/* eslint max-len: 0 */
/*
gitterMessageObj example.

const gitterMessageObj = {
  id: '59d4a62fbbbf9f1a381ea75a',
  text:
    '@litemerafrukt Det var så jag tänkte men hur ...? typ flower..',
  html:
    '<span data-link-type="mention" data-screen-name="litemerafrukt" class="mention">@litemerafrukt</span> Det var så jag tänkte men hur ...? typ flower..',
  sent: '2017-10-04T09:13:19.271Z',
  fromUser: {
    id: '5999d39ad73408ce4f723661',
    username: 'arminza',
    displayName: 'arminza',
    url: '/arminza',
    avatarUrl: 'https://avatars-04.gitter.im/gh/uv/4/arminza',
    avatarUrlSmall:
      'https://avatars0.githubusercontent.com/u/31189647?v=4&s=60',
    avatarUrlMedium:
      'https://avatars0.githubusercontent.com/u/31189647?v=4&s=128',
    v: 1,
    gv: '4'
  },
  unread: true,
  readBy: 0,
  urls: [],
  mentions: [[Object]],
  issues: [],
  meta: [],
  v: 1
}
*/

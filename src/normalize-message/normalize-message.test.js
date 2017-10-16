/** Test normalize-message module */
/* global test, expect */
const { normalizeMessage } = require("./normalize-message");

/* eslint max-len: 0 */
const messageObj = {
    room: "dbwebb-se/webbprogrammering17",
    gitterMessageObj: {
        id: "59d4a62fbbbf9f1a381ea75a",
        text:
            "@litemerafrukt Det var så jag tänkte men hur plockar man upp det där tredje ordet? typ flower..",
        html:
            '<span data-link-type="mention" data-screen-name="litemerafrukt" class="mention">@litemerafrukt</span> Det var så jag tänkte men hur plockar man upp det där tredje ordet? typ flower..',
        sent: "2017-10-04T09:13:19.271Z",
        fromUser: {
            id: "5999d39ad73408ce4f723661",
            username: "arminza",
            displayName: "arminza",
            url: "/arminza",
            avatarUrl: "https://avatars-04.gitter.im/gh/uv/4/arminza",
            avatarUrlSmall: "https://avatars0.githubusercontent.com/u/31189647?v=4&s=60",
            avatarUrlMedium: "https://avatars0.githubusercontent.com/u/31189647?v=4&s=128",
            v: 1,
            gv: "4"
        },
        unread: true,
        readBy: 0,
        urls: [],
        mentions: [[Object]],
        issues: [],
        meta: [],
        v: 1
    }
};

const resultingNormalizedMessage = {
    service: "gitter",
    serviceId: "dbwgitter-v1.0.0",
    time: 1507108399271,
    to: "dbwebb-se/webbprogrammering17",
    from: "arminza",
    fromImageUrl: "https://avatars0.githubusercontent.com/u/31189647?v=4&s=128",
    message:
        "@litemerafrukt Det var så jag tänkte men hur plockar man upp det där tredje ordet? typ flower..",
    meta: null,
    original: messageObj.gitterMessageObj
};

test("should return normalized message", () => {
    expect(normalizeMessage(messageObj)).toEqual(resultingNormalizedMessage);
});

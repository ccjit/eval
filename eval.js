// ==UserScript==
// @name         eval
// @namespace    http://tampermonkey.net/
// @version      v1.0-alpha1
// @description  try to take over the world!
// @author       circjit
// @match        https://multiplayerpiano.org/*
// @match        https://multiplayerpiano.net/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=multiplayerpiano.org
// @grant        none
// ==/UserScript==

MPP.client.on("a", function(msg) {
    var args = msg.a.split(" ");
    var cmd = args[0];
    var send = function(m) { MPP.chat.send(m); };
    var reply = function(r, id) { MPP.client.sendArray([ { m: "a", reply_to: id, _id: "ReplyParticipantid", message: r, } ]) };
    var client = MPP.client;
  	var on = function(i) { return msg.a.substring(i).trim() }
    var id = msg.p.id;
    var color = msg.p.color;
    var name = msg.p.name;
    var log = function(txt) {console.log(txt)}
    if (MPP.client.participantId == msg.p.id) {
        if (cmd == '\'reply') {
            reply(on(6), id)
        }
        if (cmd == '.') {
            function run(code) {
                if (new String(code) == "[object Object]" == false && new String(code) == "[object JSON]" == false) {
                    try {
                        return '⧔ ' + eval(code);
                    } catch (error) {
                        return 'nope'
                    }
                }
                if (new String(code) == "[object Object]" || new String(code) == "[object JSON]") {
                    try {
                        return '⧔ ' + JSON.stringify(eval(code));
                    } catch (error) {
                        return 'nuh uh'
                    }
                }
            }
            MPP.chat.send(run(msg.a.substring(1).trim()))
        }
        if (cmd == '\'steal') {
            MPP.client.sendArray([{
                'm': 'userset',
                'set': {
                    'name': MPP.client.ppl[on(6)].name,
                    'color': MPP.client.ppl[on(6)].color
                }
            }]);
        }
        if (cmd == "'reset") {
            MPP.client.sendArray([{
                'm': 'userset',
                'set': {
                    'name': 'circuit',
                    'color': '#007bff'
                }
            }]);
        }
    }
    if (cmd == '\'stats') {
        log(`---${name}---`)
        log(`client.ppl`)
        log(JSON.stringify(MPP.client.channel))
    }
});

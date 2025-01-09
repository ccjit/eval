// ==UserScript==
// @name         eval
// @namespace    http://tampermonkey.net/
// @version      v1.0-alpha1.1
// @description  uate
// @author       circjit
// @match        https://multiplayerpiano.org/*
// @match        https://multiplayerpiano.net/*
// @icon         data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsSAAALEgHS3X78AAAAAXNSR0IArs4c6QAAAUhJREFUeF7tmskOwyAMROH/P5qKAxVCpB4kK7LLyy0pYpnMgklrKaWVi68KADAACeABF3tgwQRJAVKAFCAFSAEDgdZsktTaAyXfJcUgAMAAJGCKGw/ABEkBUyYRGxCDXtVg1r2CxACFugCQdLMEA/AApxMhPAAPyFkwYYKKCb6pb2UsZV/S2ygVqsQAZVLKYMrElbGUfgAABiABPEDxJUyQGBRqASWaFLop8aWMpfTjGoPqgB7trgfAA8STPiQTPOkwW1sAUFIg21s9mW84Bswm2JOl388Jc3pvgRESAHXBA4wZlBWglACMSQ8gdgvtbVa2jGcne5LwDJgX9fSm/54Buzf75AU7VvySQTgGWJr1/h0A2AcI1aA37SL1hwSQABLg7/L2V81IruU8F0wQE8QE7zDBtWL8lty3SGA9Uxj3V5jg7rxgPPsAQdQYDUupC18AAAAASUVORK5CYII=
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
        if (cmd == '\'stats') {
            log(`---${name}---`)
            log(`client.ppl`)
            log(JSON.stringify(MPP.client.channel))
        }
    }
});

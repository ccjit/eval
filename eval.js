// ==UserScript==
// @name         eval
// @namespace    http://tampermonkey.net/
// @version      v1.0-alpha1.3
// @description  uate
// @author       ccjt
// @match        https://multiplayerpiano.org/*
// @match        https://multiplayerpiano.net/*
// @icon         data:image/jpeg;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAAsSAAALEgHS3X78AAAAAXNSR0IArs4c6QAAAUhJREFUeF7tmskOwyAMROH/P5qKAxVCpB4kK7LLyy0pYpnMgklrKaWVi68KADAACeABF3tgwQRJAVKAFCAFSAEDgdZsktTaAyXfJcUgAMAAJGCKGw/ABEkBUyYRGxCDXtVg1r2CxACFugCQdLMEA/AApxMhPAAPyFkwYYKKCb6pb2UsZV/S2ygVqsQAZVLKYMrElbGUfgAABiABPEDxJUyQGBRqASWaFLop8aWMpfTjGoPqgB7trgfAA8STPiQTPOkwW1sAUFIg21s9mW84Bswm2JOl388Jc3pvgRESAHXBA4wZlBWglACMSQ8gdgvtbVa2jGcne5LwDJgX9fSm/54Buzf75AU7VvySQTgGWJr1/h0A2AcI1aA37SL1hwSQABLg7/L2V81IruU8F0wQE8QE7zDBtWL8lty3SGA9Uxj3V5jg7rxgPPsAQdQYDUupC18AAAAASUVORK5CYII=
// @grant        none
// ==/UserScript==
let error = [
    "failed",
    "error",
    "err",
    "nope",
    "nuh uh",
    "no",
    "uh oh",
    "yesn't",
    "oopsies",
    "oops",
    "oop",
    "fail",
    "false",
    ":(",
    ";(",
    "D:",
    "Uncaught SyntaxError",
    "Uncaught ReferenceError",
    "Uncaught TypeError",
    "Uncaught RangeError",
    "Uncaught SkillError",
    "Uncaught IntelligenceError",
    "Uncaught Error",
    "❌",
    "❎",
    "🤷"
]
MPP.client.on("a", function(msg) {
    let args = msg.a.split(" ");
    let cmd = args[0];
    let send = function(m) { MPP.chat.send(m); };
    let reply = function(r, id) { MPP.client.sendArray([ { m: "a", reply_to: id, _id: "ReplyParticipantid", message: r, } ]) };
    let client = MPP.client;
  	let on = function(i) { return msg.a.substring(i).trim() }
    let id = msg.p.id;
    let color = msg.p.color;
    let name = msg.p.name;
    let log = function(txt) {console.log(txt)}
    let err = error[Math.floor(Math.random()*error.length)]
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
                        return err
                    }
                }
                if (new String(code) == "[object Object]" || new String(code) == "[object JSON]") {
                    try {
                        return '⧔ ' + JSON.stringify(eval(code));
                    } catch (error) {
                        return err
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

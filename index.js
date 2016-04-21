var Botkit = require("botkit");
var beepboop = require("beepboop-botkit");

var token = process.env.SLACK_TOKEN

var controller = Botkit.slackbot({
  debug: false
});

if (token) {
  console.log("Starting in single-team mode")
  controller.spawn({
    token: token
  }).startRTM(function(err,bot,payload) {
    if (err) {
      throw new Error(err);
    }
  });
} else {
  console.log("Starting in Beep Boop multi-team mode")
  require('beepboop-botkit').start(controller, { debug: true })
}


// Major Keys from http://khaledipsum.com/
var majorKeys = [
  "Bless up.",
  "They don't want us to win.",
  "We the best.",
  "They don't want us to eat.",
  "Egg whites, turkey sausage, wheat toast, water. Of course they don't want us to eat our breakfast, so we are going to enjoy our breakfast.",
  "Celebrate success right, the only way, apple.",
  "You smart, you loyal, you a genius.",
  "Hammock talk come soon.",
  "Give thanks to the most high.",
  "Congratulations, you played yourself.",
  "Don't ever play yourself.",
  "The key to more success is to have a lot of pillows.",
  "The ladies always say Khaled you smell good, I use no cologne. Cocoa butter is the key.",
  "Watch your back, but more importantly when you get out the shower, dry your back, it's a cold world out there.",
  "It's on you how you want to live your life. Everyone has a choice. I pick my choice, squeaky clean.",
  "How's business? Boomin.",
  "They never said winning was easy. Some people can't handle success, I can.",
  "They will try to close the door on you, just open it.",
  "We don't see them, we will never see them.",
  "Every chance I get, I water the plants, Lion!",
  "In life there will be road blocks but we will over come it.",
  "To succeed you must believe. When you believe, you will succeed.",
  "Life is what you make it, so let's make it.",
  "To be successful you've got to work hard, to make history, simple, you've got to make it.",
  "A major key, never panic. Don't panic, when it gets crazy and rough, don't panic, stay calm.",
  "Put it this way, it took me twenty five years to get these plants, twenty five years of blood sweat and tears, and I'm never giving up, I'm just getting started.",
  "You see that bamboo behind me though, you see that bamboo? Ain't nothin' like bamboo. Bless up.",
  "In life you have to take the trash out, if you have trash in your life, take it out, throw it away, get rid of it, major key.",
  "Surround yourself with angels, positive energy, beautiful people, beautiful souls, clean heart, angel.",
  "Find peace, life is like a water fall, you've gotta flow.",
  "Let's see what Chef Dee got that they don't want us to eat.",
  "Lion!",
  "Surround yourself with angels.",
  "Major key, don't fall for the trap, stay focused. It's the ones closest to you that want to see you fail.",
  "The key to more success is to get a massage once a week, very important, major key, cloth talk.",
  "The key to success is to keep your head above the water, never give up.",
  "It's important to use cocoa butter. It's the key to more success, why not live smooth? Why live rough?",
  "They key is to have every key, the key to open every door.",
  "Learning is cool, but knowing is better, and I know the key to success.",
  "You do know, you do know that they don't want you to have lunch. I'm keeping it real with you, so what you going do is have lunch.",
  "Stay focused.",
  "I told you all this before, when you have a swimming pool, do not use chlorine, use salt water, the healing, salt water is the healing.",
  "You should never complain, complaining is a weak emotion, you got life, we breathing, we blessed.",
  "The key is to enjoy life, because they don't want you to enjoy life. I promise you, they don't want you to jetski, they don't want you to smile.",
  "The other day the grass was brown, now it's green because I ain't give up. Never surrender.",
  "The key is to drink coconut, fresh coconut, trust me.",
  "The weather is amazing, walk with me through the pathway of more success. Take this journey with me, Lion!",
  "You see the hedges, how I got it shaped up? It's important to shape up your hedges, it's like getting a haircut, stay fresh.",
  "Let me be clear, you have to make it through the jungle to make it to paradise, that's the key, Lion!",
  "Always remember in the jungle there's a lot of they in there, after you overcome they, you will make it to paradise.",
  "I'm giving you cloth talk, cloth. Special cloth alert, cut from a special cloth.",
  "Look at the sunset, life is amazing, life is beautiful, life is what you make it.",
  "The first of the month is coming, we have to get money, we have no choice. It cost money to eat and they don't want you to eat."
];



var getRandomKey = function() {
  var index = Math.floor(Math.random() * majorKeys.length);
  return majorKeys[index];
}


var replyRandomKey = function(bot, message) {
  var majorKey = getRandomKey();
  bot.reply(message, majorKey);
}


var personaliseIntro = function(userID) {
  var username = "<@"+userID+">";
  var intros = [
    "Major :key: for "+username+"",
    ""+username+", this is a special :key: just for you",
    "Hold up "+username+"! Major :key: for you",
    ""+username+", you're in need of a major :key:",
    ""+username+" listen up! Major :key: alert",
    "Wait wait wait. "+username+", major :key: for you",
  ]
  var index = Math.floor(Math.random() * intros.length);
  return intros[index]
}



var sendKeyToHandler = function(bot, message) {

  var placeholder = message.text.split("send key to ")[1],
      placeholder = placeholder ? placeholder.split(" in ") : false;

  var user = placeholder[0];
  var channel = placeholder[1],
      channel = channel ? channel.split("<#")[1] : false,
      channel = channel ? channel.split(">")[0] || channel : false;


  bot.startConversation(message,function(err,convo) {

      if ( !user | !channel ) {

        bot.reply(message, "Sorry I didn't get that. If you want me to send a key to someone, say `@khaledbot send key to @username in #channel`");

        convo.stop();

      } else {

        convo.ask("No problem! Do make sure I've been invited to that channel first though. \n Should I tell "+user+" you requested this? Say `yes` or `no`",function(response,convo) {

          if ( response.text === 'yes' | response.text === 'Yes' ) {

            bot.reply(message, "Will do! Check <#"+channel+">");
            bot.say({
              text: "Yo "+user + ", <@"+message.user+"> thinks you need a :key: right now, listen up! " + getRandomKey(),
              channel: channel
            });

          } else {

            bot.reply(message, "Sneaky! Check <#"+channel+">");
            bot.say({
              text: user + " " + getRandomKey(),
              channel: channel
            });

          }

          convo.stop();


        });

      }

  })


}











controller.on("direct_message", function(bot, message) {

  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 ) {

    var reply = "Hello. I'm khaledbot, here to deliver to you the major :key: to success in this Slack Team. Listen closely..."
    bot.reply(message, reply);

    replyRandomKey(bot, message);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {

    var reply = "You're welcome. Bless up!"
    bot.reply(message, reply);

  } else if ( message.text.indexOf("help") > -1 ) {

    var reply = "Looks like you need help. This is what I'm here for. You can send me any messages, and I'll reply with some major :key: :key: . Otherwise, go to http://khaledbot.com to get more info. Bless up!"
    bot.reply(message, reply);

  } else if ( message.text.indexOf("send key to") > -1 ) {

    // do nothing, handled elsewhere

  } else {

    var index = Math.floor(Math.random() * majorKeys.length);
    var majorKey = majorKeys[index];
    bot.reply(message, majorKey);

  }

})

controller.on("bot_channel_join", function(bot, message) {
  var intro = "I have arrived! Major :key: :key: :key: for the channel"
  bot.reply(message, intro);
  replyRandomKey(bot, message);
})

controller.on("direct_mention", function(bot, message) {

  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 ) {

    var intro = "Greetings <@"+message.user+">, I'm khaledbot, here to deliver to you the major :key: to success in this Slack Team. Listen up!";
    bot.reply(message, intro);
    replyRandomKey(bot, message);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {

    var reply = "You're welcome. Bless up!"
    bot.reply(message, reply);

  } else if ( message.text.indexOf("send key to") > -1 ) {

    sendKeyToHandler(bot, message);

  } else if ( message.text.indexOf("help") > -1 ) {

    var reply = "Looks like you need help. This is what I'm here for. You can send me any messages, and I'll reply with some major :key: :key: . Otherwise, go to http://khaledbot.com to get more info. Bless up!"
    bot.reply(message, reply);

  } else {

    var intro = personaliseIntro(message.user);
    bot.reply(message, intro);
    replyRandomKey(bot, message);

  }
})

controller.on("mention", function(bot, message) {

  if ( message.text.indexOf("hello") > -1 | message.text.indexOf("hi") > -1 | message.text.indexOf("hey") > -1 ) {

    var intro = "Greetings <@"+message.user+">, I'm khaledbot, here to deliver to you the major :key: to success in this Slack Team. Listen up!";
    bot.reply(message, intro);
    replyRandomKey(bot, message);

  } else if ( message.text.indexOf("thanks") > -1 | message.text.indexOf("thank you") > -1 ) {

    var reply = "You're welcome. Bless up!"
    bot.reply(message, reply);

  } else {
    var intro = personaliseIntro(message.user);
    bot.reply(message, intro);
    replyRandomKey(bot, message);
  }
})

/*
controller.on("user_channel_join", function(bot, message) {
  var intro = "Welcome <@"+message.user+">! Major :key: for success in this channel";
  bot.reply(message, intro);
  replyRandomKey(bot, message);
})

controller.on("user_group_join", function(bot, message) {
  var intro = "Welcome <@"+message.user+">! Major :key: for success in this group";
  bot.reply(message, intro);
  replyRandomKey(bot, message);
})*/

/*
controller.hears(["major key", "major keys", ":key:", " key", " keys"], ["ambient"], function(bot, message) {
  var intro = "Yo <@"+message.user+">! You think you can give out the :key: to success but only I have the :key:.";
  bot.reply(message, intro);
})
controller.hears(["khaled"], ["ambient"], function(bot, message) {
  var intro = "<@"+message.user+"> you spoke my name?";
  bot.reply(message, intro);
})
controller.hears(["dj"], ["ambient"], function(bot, message) {
  var intro = "<@"+message.user+"> khaledbot is the one true DJ";
  bot.reply(message, intro);
})
controller.hears(["lol", "lmao", "haha"], ["ambient"], function(bot, message) {
  var laughing = [
    "LOL", "Hilarious", ":joy:", ":laughing:", "Stay focused. It's work time.", "Hahahaha", "So funny!", "They don't want us to laugh"
  ]
  var r = Math.floor(Math.random() * 4);

  if ( r > 1 ) {
    var index = Math.floor(Math.random() * laughing.length);
    bot.reply(message, laughing[index]);
  }

})
*/

controller.hears(["send key to"], ["direct_message", "direct_mention"], function(bot, message) {
  sendKeyToHandler(bot, message);
})

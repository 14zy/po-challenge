
function getCookie(cname) {
  var name = cname + "=";
  var ca = document.cookie.split(';');
  for(var i=0; i<ca.length; i++)
    {
    var c = ca[i].trim();
    if (c.indexOf(name)==0) return c.substring(name.length,c.length);
    }
  return "";
};

function setLang(lang) {
  if (window.lang != null) {
    // document.getElementById(window.lang).className="lang";
    setCookie('lang',lang,360);
    document.cookie = "wins=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    refresh("bad",false);
  };
  window.lang = lang;
  i18n.init({ lng: lang });
  i18n.init(function(t) {
      $(".desc").i18n({lng: lang});
      $(".sets").i18n({lng: lang});
      $(".head-lang").i18n({lng: lang});
      $(".yashare-auto-init").i18n({lng: lang});
      //$(".footer").i18n({lng: lang});
  });
  // document.getElementById("langMain").src="pics/flags/" + lang.toUpperCase() + ".png";
  // document.getElementById(lang).className="lang-active";

  // if (lang == "ru") {
  //   $("#subscribe")[0].style.display="block";
  // } else {
  //   $("#subscribe")[0].style.display="none";
  // }

};

function load() {
  // var lang = window.navigator.userLanguage || window.navigator.language;
  // lang = lang.substring(0, 2).toLowerCase();
  // if (document.location.search.substring(1,5) == "lang") {
  //   lang = document.location.search.substring(6);
  //   lang = lang.substring(0, 2).toLowerCase();
  // }
  // langCookie = getCookie("lang");
  // if (langCookie != "") {
  //  lang = langCookie;
  // };
  // if (lang == "ru" || lang == "en" || lang == "de" || lang == "fr" || lang == "it" || lang == "es" ) {
  //   setLang(lang);
  // } else {
  //   lang = "en";
  //   setLang(lang);
  // };
  setLang('en');

  window.platform = "http://178.62.133.139/actresses/";
  document.cookie = "wins=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  window.errorDelay = 4000;
  window.pnotify = "";
  window.scroll = 90;
  //js magic for mobiles
  if (window.innerWidth <= 600) {
    window.errorDelay = 2000;
    window.pnotify = "stack-mobile";
    window.scroll = 0;
  };

  // if (getCookie("currentSet") == "") {
  //   window.currentSetName="basicSet";
    window.currentSet = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
    // document.getElementById("basicSet").className="lang-active";
  // } else {
  //   changeSet(getCookie("currentSet"));
  // };
  getart();
  begood(getCookie("begood"));


};

load();

function getart() {
  currentWins();

  var art = document.getElementById("art");
  window.truePainter = window.currentSet[Math.floor((Math.random()*window.currentSet.length))];

  $.getJSON("actresses/" + window.truePainter + "/data.json")
    .done(function(json) {

      // $("#currentSetImg")[0].src="pics/sets/" + window.currentSetName + ".png";
      // $("#currentSetTitle")[0].innerHTML = i18n.t("sets." + window.currentSetName, { lng: window.lang });// Этому тут совсем не место, но больше нигде не работает T_T

      window.paintings = json.pictures;
      window.image = Math.floor((Math.random()*window.paintings)+1);

      // if (window.pnotify == "stack-mobile") {
      //   art.src = window.platform + truePainter + "/thumbnails/" + window.image + ".jpg";
      // } else {
        art.src = window.platform + truePainter + "/" + window.image + ".jpg";
      // };

      // window.link = json.link.local;
      // if (window.lang == "ru") { //Временно, пока в json не будут ссылки на википедию на всех языках
      //   window.wiki = json.link.wikipedia.ru;
      // } else {
      //   window.wiki = json.link.wikipedia.en;
      // };
      // window.years = json.years;
      // if (window.lang == "ru" || window.lang == "en") {
      //   window.bio = json.bio[window.lang];
      // } else {
      //   window.bio = json.bio.ru;
      // };
      // if (window.bio == "") {
      //   window.bio = "Просим не гневаться, но биография этого художника временно отсутствует; ежели Вам известен хороший источник, будьте так любезны, сообщите его нам: <a href='mailto:report@pornchallenge.ninja'>report@pornchallenge.ninja</a>.<br><br>We beg your pardon, but temporary this painter's biography is not available; if you know the good source, please contact us: <a href='mailto:report@pornchallenge.ninja'>report@pornchallenge.ninja</a>."
      // };

      window.truePainterName = i18n.t("painters." + truePainter, { lng: window.lang });

      // window.nation = undefined;
      // json.nationality.forEach(function(entry) {
      //   if (window.nation == undefined) {
      //     window.nation = i18n.t("nation." + entry, { lng: window.lang });
      //   } else {
      //     window.nation = window.nation + ", " + i18n.t("nation." + entry, { lng: window.lang });
      //   }
      // });
      // window.genre = undefined;
      // json.genre.forEach(function(entry) {
      //   if (window.genre == undefined) {
      //     window.genre = i18n.t("genre." + entry, { lng: window.lang });
      //   } else {
      //     window.genre = window.genre + ", " + i18n.t("genre." + entry, { lng: window.lang });
      //   }
      // });





      if (window.truePainterName != "") {
        putButtons(window.truePainterName);
      } else {
        console.log("Error: window.truePainterName is empty, sleep for 1000 and retry");
        art.src = "pics/loading.gif";
        setTimeout(function () {
          refresh("bad",false);
        }, 1000);
      }
    })
    .fail(function() {
      refresh("bad",false);
    });

  puticons();

};


function currentWins() {
  if (getCookie('wins') > 1) {
    window.counter = getCookie('wins');
  }
  else {window.counter = 1}
};

function putButtons(painter) {

  function randomPainter() {
    var random = "painters." + window.currentSet[Math.floor((Math.random()*window.currentSet.length))];
    return i18n.t(random, { lng: window.lang });
  };

  var painters = [painter];
  for (var i=0;i<10;i++) {
    painters.push(randomPainter());
    if (painters[1] == "") {
      console.log("Error from painters: do refresh(bad, false)");
      refresh("bad",false);
    };
  };

  //unique
  painters = painters.reverse().filter(function (e, i, painters) {
     return painters.indexOf(e, i+1) === -1;
  }).reverse();

  var buttons = [];
  buttons.push(painters[0]);
  buttons.push(painters[1]);
  buttons.push(painters[2]);
  buttons.push(painters[3]);

  function shuffle(o){ //v1.0
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
  };

  shuffle(buttons);
  document.getElementById("btn1").innerHTML = buttons[0];
  document.getElementById("btn2").innerHTML = buttons[1];
  document.getElementById("btn3").innerHTML = buttons[2];
  document.getElementById("btn4").innerHTML = buttons[3];
};

function puticons() {
  for (var i=1; i < window.counter; i++ ) {
    document.getElementById("icon"+i).style.color = "rgb(53,115,45)";
  }
};


function checkAnswer(btn) {
var answer = document.getElementById(btn).innerHTML;

if (answer == window.truePainterName) {

  document.getElementById("btn1").onclick = function() { void(0);};
  document.getElementById("btn2").onclick = function() { void(0);};
  document.getElementById("btn3").onclick = function() { void(0);};
  document.getElementById("btn4").onclick = function() { void(0);};
  document.getElementById(btn).style.background = "blue";
  document.getElementById(btn).style.borderColor = "blue";

  var wins = parseInt(window.counter);

  if (wins == 10) {
    winner();
  }

  else {
  wins = 1 + wins;
  setCookie('wins',wins,"session");
  setTimeout(function() {refresh("good");}, 1000)

  new PNotify({
      title: goodPhrase(),
      text: i18n.t("message.right-desc", { lng: window.lang, count: parseInt(window.counter) }),
      type: 'success',
      hide: true,
      animate_speed: "normal",
      delay: 2000,
      remove: true,
      addclass: window.pnotify,
      buttons: {
        closer: false,
        sticker: false
      },
      history: {
        history: true,
        menu: false
      }

  });
  yaCounter29731625.reachGoal('WIN');
  };

}

else {
  window.truePainterNameOld = window.truePainterName;
  setTimeout(function() {refresh("bad");}, window.errorDelay)
  window.msgWrong = new PNotify({
      title: badPhrase(),
      text: "<div style='text-align: left'>" + "<img src='" + window.platform + window.truePainter + "/photo.jpg' style='width: 60%; margin: 10px 0 10px 0'><br><p style='font-size: 18px'>" + i18n.t("message.wrong-desc", { lng: window.lang }) + " " + window.truePainterName + "!<br><p></p><a id='btnLearnMore' onTouchStart='learnMore();' onclick='learnMore();' class='btn btn-primary'><span class='glyphicon glyphicon-search'></span> " + i18n.t("message.learn-more", { lng: window.lang }) + "</a></div>", //<hr><p>Обещаю выучить все произведения данного художника<br><br><a style='margin: 5px;' class='btn btn-success'><span class='glyphicon glyphicon-share-alt'></span> Дать обещание</a></p></div>
      type: 'error',
      icon: '',
      hide: true,
      animate_speed: "normal",
      delay: window.errorDelay+1000,
      remove: true,
      addclass: window.pnotify,
      mouse_reset: false,
      buttons: {
        closer: true,
        closer_hover: false,
        sticker: false
      },
      history: {
        history: true,
        menu: false
      }
  });

  document.cookie = "wins=; expires=Thu, 01 Jan 1970 00:00:00 GMT";

  document.getElementById("btn1").onclick = function() { void(0);};
  document.getElementById("btn2").onclick = function() { void(0);};
  document.getElementById("btn3").onclick = function() { void(0);};
  document.getElementById("btn4").onclick = function() { void(0);};
  document.getElementById(btn).style.background = "red";
  document.getElementById(btn).style.borderColor = "red";

  yaCounter29731625.reachGoal('FAIL');
};

yaCounter29731625.reachGoal('ANSWER-CLICK');
};

function learnMore() {
  window.msgWrong.remove();

  window.open("http://xhamster.com/search.php?q=" + window.truePainterNameOld,"_blank");

  yaCounter29731625.reachGoal('LEARN-MORE'); return true;

};

function setCookie(cname,cvalue,exdays) {
  var d = new Date();
  d.setTime(d.getTime()+(exdays*24*60*60*1000));
  var expires = "expires="+d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
};

function badPhrase() {
  if (window.goodboy == 1) {
    phrase = i18n.t("message.wrong", { lng: window.lang });
  }
  else {
    var phrase = "badPhrases." + Math.floor((Math.random()*12)+1)
    phrase = i18n.t(phrase, { lng: window.lang });
  };
  return phrase;
};


function goodPhrase() {
    var phrase = "goodPhrases." + Math.floor((Math.random()*20)+1)
    phrase = i18n.t(phrase, { lng: window.lang });
  return phrase;
};

function winner() {

  var winnerDiv = "\
  <p><a onclick='#' href='#'>\
    <img style='width: 80%; max-height: 350px' src=pics/badges/winner-badge-en-shareFB.png>\
  </a></p>\
  <p>" + i18n.t("message.winner-desc-old", { lng: window.lang }) + "</p>\
  <p>" + i18n.t("message.share", { lng: window.lang }) + "</p>" + getShares();

  window.msgWinner = new PNotify({
      title: i18n.t("message.winner", { lng: window.lang }),
      text: winnerDiv,
      type: 'note',
      hide: false,
      animate_speed: "normal",
      icon: false,
      addclass: "stack-winner",
      opacity: 0.95,
      buttons: {
        closer: true,
        sticker: false
      },
      history: {
        history: true,
        menu: false
      }
  });
  document.getElementById("icon10").style.color = "rgb(53,115,45)";
  yaCounter29731625.reachGoal('WINNER');

  document.getElementById("btn1").onclick = function() { void(0);};
  document.getElementById("btn2").onclick = function() { void(0);};
  document.getElementById("btn3").onclick = function() { void(0);};
  document.getElementById("btn4").onclick = function() { void(0);};

};

function getShares() {

  switch (window.lang)
  {
  case "ru":
    shares_old = "<a onclick='ShareVK();' href='#'> <span class='glyphicon glyphicon-share-alt'></span> ВКонтакте </a><br><a onclick='ShareFB();' href='#'><span class='glyphicon glyphicon-share-alt'></span> Facebook </a><br><a onclick='ShareOD();' href='#'><span class='glyphicon glyphicon-share-alt'></span> Одноклассники </a><br><a onclick='ShareMM();' href='#'><span class='glyphicon glyphicon-share-alt'></span> Мой Мир </a>";
    shares = "<div style='padding: 15px'>\
    <button type='button' class='btn btn-lg btn-primary btn-share' aria-label='ВКонтакте' onclick='ShareVK();'>\
     <span class='glyphicon glyphicon-share-alt' aria-hidden='true'></span> ВКонтакте\
    </button>\
    <button type='button' class='btn btn-lg btn-primary btn-share' aria-label='Facebook' onclick='ShareFB();'>\
      <span class='glyphicon glyphicon-share-alt' aria-hidden='true'></span> Facebook\
    </button>\
    <button type='button' class='btn btn-lg btn-warning btn-share' aria-label='Одноклассники' onclick='ShareOD();'>\
      <span class='glyphicon glyphicon-share-alt' aria-hidden='true'></span> Одноклассники\
    </button>\
    <button type='button' class='btn btn-lg btn-info btn-share' aria-label='Twitter' onclick='ShareTW();'>\
      <span class='glyphicon glyphicon-share-alt' aria-hidden='true'></span> Twitter\
    </button>\
    </div>";
    break;

  default:
    shares_old = "<a onclick='ShareFB();' href='#'><span class='glyphicon glyphicon-share-alt'></span> Facebook </a><br><a onclick='ShareTW();' href='#'> <span class='glyphicon glyphicon-share-alt'></span> Twitter </a><br><a onclick='ShareVK();' href='#'> <span class='glyphicon glyphicon-share-alt'></span> VKontakte </a>";
    shares = "<div style='padding: 15px'>\
    <button type='button' class='btn btn-lg btn-primary btn-share' aria-label='Facebook' onclick='ShareFB();'>\
      <span class='glyphicon glyphicon-share-alt' aria-hidden='true'></span> Facebook\
    </button>\
    <button type='button' class='btn btn-lg btn-primary btn-share' aria-label='VKontakte' onclick='ShareVK();'>\
     <span class='glyphicon glyphicon-share-alt' aria-hidden='true'></span> VKontakte\
    </button>\
    <button type='button' class='btn btn-lg btn-info btn-share' aria-label='Мой Мир' onclick='ShareTW();'>\
      <span class='glyphicon glyphicon-share-alt' aria-hidden='true'></span> Twitter\
    </button>\
    </div>";
    break;
  };

  return shares;
};

function ShareFB() {
  url = "https://www.facebook.com/dialog/feed?app_id=728840163891628&display=popup&link=http://pornchallenge.ninja/?utm_source=fb-win&redirect_uri=http://pornchallenge.ninja/1.html&picture=http://pornchallenge.ninja/pics/badges/winner-badge-en-shareFB.png&source=http://pornchallenge.ninja/pics/badges/winner-badge-en-shareFB.png&name="+i18n.t("shares.title",{lng: window.lang})+"&caption="+i18n.t("shares.caption",{lng: window.lang})+"&description="+i18n.t("shares.description",{lng: window.lang});
  window.open(url,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=604,height=401');
  yaCounter29731625.reachGoal('WINNER-SHARE-FB');
};

function ShareTW() {
  url = "http://twitter.com/share?text="+i18n.t("shares.title",{lng: window.lang})+" http://pornchallenge.ninja/pics/badges/winner-badge-en-shareTW.png&url=http://pornchallenge.ninja/&hashtags=artchallenge";
  window.open(url,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=604,height=401');
  yaCounter29731625.reachGoal('WINNER-SHARE-TW');
};

function ShareVK() {
  url = "http://vk.com/share.php?url=http://pornchallenge.ninja/?utm_source=vk-win&title="+i18n.t("shares.title",{lng: window.lang})+" %23PornChallenge&description="+i18n.t("shares.description",{lng: window.lang})+"&image=http://pornchallenge.ninja/pics/badges/winner-badge-en-shareVK.png&noparse=true";
  window.open(url,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=604,height=401');
  yaCounter29731625.reachGoal('WINNER-SHARE-VK');
};

function ShareOD() {
  url = "http://www.odnoklassniki.ru/dk?st.cmd=addShare&st.s=1&st.comments=Господа, я отлично разбираюсь в искусстве!&st._surl=http://pornchallenge.ninja/?utm_source=od-win";
  window.open(url,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=604,height=401');
  yaCounter29731625.reachGoal('WINNER-SHARE-OD');
};

function ShareMM() {
  url = "http://connect.mail.ru/share?url=http://pornchallenge.ninja/?utm_source=mm-win&title="+i18n.t("shares.title",{lng: window.lang})+"&description="+i18n.t("shares.description",{lng: window.lang})+"&image_url=http://pornchallenge.ninja/pics/badges/" + window.currentSetName + "/winner-badge-"+window.lang+"-shareVK.png";
  window.open(url,'targetWindow','toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=604,height=401');
  yaCounter29731625.reachGoal('WINNER-SHARE-MM');
};

function refresh(sign,scroll){

  document.getElementById("btn1").onclick = function() { checkAnswer('btn1'); };
  document.getElementById("btn1").style.background = "";
  document.getElementById("btn1").style.borderColor = "";
  document.getElementById("btn2").onclick = function() { checkAnswer('btn2'); };
  document.getElementById("btn2").style.background = "";
  document.getElementById("btn2").style.borderColor = "";
  document.getElementById("btn3").onclick = function() { checkAnswer('btn3'); };
  document.getElementById("btn3").style.background = "";
  document.getElementById("btn3").style.borderColor = "";
  document.getElementById("btn4").onclick = function() { checkAnswer('btn4'); };
  document.getElementById("btn4").style.background = "";
  document.getElementById("btn4").style.borderColor = "";

  document.getElementById("art").src = "pics/loading.gif";
  if (scroll != false) {
    $("html, body").animate({ scrollTop: window.scroll }, "slow");
  }
  getart();

  if (sign == "bad") {
    window.counter=1;
    for (var i=1; i <= 10; i++ ) {
      document.getElementById("icon"+i).style.color = "lightgray";
    };
  };


  try {
    window.msgThatWas.remove();
  } catch (err) {
    console.log(err)
  }


}

function begood(value){
  if (value == 1) {
    setCookie('begood',1,360);
    window.goodboy = 1;
    // document.getElementById("btnOff").style.color="black";
    // document.getElementById("btnOff").style.fontWeight="bold";
    // document.getElementById("btnOff").style.cursor="default";
    // document.getElementById("btnOn").style.color="#428BCA";
    // document.getElementById("btnOn").style.fontWeight="normal";
    // document.getElementById("btnOn").style.cursor="pointer";
  };

  if (value == 0) {
    setCookie('begood',0,360);
    window.goodboy = 0;
    // document.getElementById("btnOff").style.color="#428BCA";
    // document.getElementById("btnOff").style.fontWeight="normal";
    // document.getElementById("btnOff").style.cursor="pointer";
    // document.getElementById("btnOn").style.color="black";
    // document.getElementById("btnOn").style.fontWeight="bold";
    // document.getElementById("btnOn").style.cursor="default";
  };
};

function watchporn() {

    window.msgThatWas = new PNotify({
        title: "This is " + window.truePainterName,
        text: "<a href='#' onTouchStart='reload('bad');' onclick='refresh('bad');'><span class='glyphicon glyphicon-refresh'></span> Refresh Game</a><br>",
        type: 'note',
		icon: '',
        hide: false,
        animate_speed: "normal",
        remove: false,
        addclass: window.pnotify,
        buttons: {
          closer: false,
          sticker: false
        },
        history: {
          history: true,
          menu: false
        }
    });


    document.getElementById("btn1").onclick = function() { refresh("bad");};
    document.getElementById("btn2").onclick = function() { refresh("bad");};
    document.getElementById("btn3").onclick = function() { refresh("bad");};
    document.getElementById("btn4").onclick = function() { refresh("bad");};
    document.getElementById("btn1").style.background = "grey";
    document.getElementById("btn1").style.borderColor = "grey";
    document.getElementById("btn2").style.background = "grey";
    document.getElementById("btn2").style.borderColor = "grey";
    document.getElementById("btn3").style.background = "grey";
    document.getElementById("btn3").style.borderColor = "grey";
    document.getElementById("btn4").style.background = "grey";
    document.getElementById("btn4").style.borderColor = "grey";




	setTimeout(function() {
		yaCounter29731625.reachGoal('WATCH-PORN-WITH-HER');
		window.open("http://xhamster.com/search.php?q=" + window.truePainterName,"_blank");
	}, 1000)

}

// function changeSet(value) {
//
//     switch(value) {
//
//       case "allSet":
//         window.currentSet = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113,114,115,116,117,118];
//         setCookie('currentSet',value,360);
//         break;
//
//       case "impressionismSet":
//         window.currentSet = [2,3,9,16,17,21,30,36,49,53,57,60,61,69,77,84,94,96];
//         setCookie('currentSet',value,360);
//         break;
//
//       case "renaissanceSet":
//         window.currentSet = [24,35,39,41,42,45,50,55,87,89,90,91,92,95,98,100,101,104,106,108,110,111,112,114];
//         setCookie('currentSet',value,360);
//         break;
//
//       case "realismSet":
//         window.currentSet = [5,8,18,25,37,47,48,58,85,113,116,117];
//         setCookie('currentSet',value,360);
//         break;
//
//       case "russianSet":
//         window.currentSet = [3,4,5,6,8,10,11,12,13,16,19,20,23,25,26,27,31,37,38,44,47,48,76,81,84,85,86,103,105,107,109,113,115];
//         setCookie('currentSet',value,360);
//         break;
//
//       case "frenchSet":
//         window.currentSet = [2,9,17,30,36,40,49,53,57,58,61,64,65,69,70,73,75,77,93,94,96,97];
//         setCookie('currentSet',value,360);
//         break;
//
//       default:
//         window.currentSet = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80];
//         document.cookie = "currentSet=; expires=Thu, 01 Jan 1970 00:00:00 GMT";
//     };
//
//     document.getElementById(value).className="lang-active";
//
//     if (window.currentSetName != null) {
//       document.getElementById(window.currentSetName).className="lang";
//       window.currentSetName =value;
//       refresh("bad", false);
//     } else {
//       window.currentSetName =value;
//     }
//
//     if (window.msgWinner) { // Временно. Если была победа, а потом чувак выбирает новую коллекцию - просто перезагрузка страницы
//       location.reload();
//     }
//   };

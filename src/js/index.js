import 'babel-polyfill';
import _ from 'lodash';

import './../sass/styles.scss';
//import 'font-awesome/sass/font-awesome.min.scss';
//import { threadId } from 'worker_threads';


/*
const getHeader = () => {
  const helloWebpack = _.join(['Hello', 'webpack!'], ' ');
  console.log(helloWebpack);
  const element = document.createElement('h1');

  element.innerHTML = helloWebpack;

  return element;
};

document.body.appendChild(getHeader());

const o = {
  foo: {
    bar: null
  }
};

console.log(o?.foo?.bar?.baz ?? 'default');
*/
void function () {
    var blurVal = 40;
    var LOGIN = false;

    document.addEventListener( "DOMContentLoaded", function(){

        document.querySelector('body > div.container.clearfix').style.filter = 'blur('+blurVal+'px)';

        var requestUsers = new XMLHttpRequest(), requestMessages = new XMLHttpRequest();
        requestUsers.open('GET', 'https://studentschat.herokuapp.com/users', true);
        requestMessages.open('GET', 'https://studentschat.herokuapp.com/messages', true);

        requestUsers.onload = function() {
            if (requestUsers.status >= 200 && requestUsers.status < 400) {
            // Обработчик успещного ответа
            var response = requestUsers.responseText;
            var userList = Response;
            
            JSON.parse(response).forEach(
                function (user, i) {
                    var ulDomElement = document.getElementById('users-list');
                    var liDomElement = document.createElement('li');
                    liDomElement.innerHTML = ' ' +
                    '<li class="clearfix">' +
                    // '<img src="images/0' + Number(i+1) + '.png" alt="avatar">' +
                        '<div class="about">' +
                        '<div class="name">' + user.username + '</div>' +
                        '<div class="status">' +
                            '<i class="fa fa-circle online"></i> online 20 минут'
                        '</div>' +
                        '</div>' +
                    '</li>';
                    ulDomElement.appendChild(liDomElement);
                }
            )
            } else {
            // Обработчик ответа в случае ошибки
            }
        };
        requestUsers.onerror = function() {
            // Обработчик ответа в случае неудачного соеденения
        };
        requestUsers.send();

        requestMessages.onload = function() {
            if (requestMessages.status >= 200 && requestMessages.status < 400) {
            // Обработчик успещного ответа
            var response = requestMessages.responseText;
            var messagesList = Response;
            
            JSON.parse(response).forEach(
                function (user, i) {
                    var divChatWithElement = document.getElementsByClassName('chat-with')[0];
                    divChatWithElement.innerText = user.chatroom_id;
                    document.querySelector('body > div.container.clearfix > div.chat > div.chat-history > ul > li:nth-child(1) > div.message.my-message').innerText = user.message;
                }
            )
            } else {
            // Обработчик ответа в случае ошибки
            }
        };
        requestMessages.onerror = function() {
            // Обработчик ответа в случае неудачного соеденения
        };
        requestMessages.send();

        document.querySelector('body > div.login-modal > button').addEventListener('click', function () {
            var requestLogin = new XMLHttpRequest();
            requestLogin.open('POST', 'https://studentschat.herokuapp.com/users/register', true);

            var userName = document.querySelector('body > div.login-modal > div:nth-child(2) > input').value;

            requestLogin.onload = function() {
            // Обработчик ответа в случае удачного соеденения
            };

            requestLogin.onerror = function() {
            // Обработчик ответа в случае неудачного соеденения
                //document.querySelector('body > div.container.clearfix').style.visibility = "visible";
                var i = blurVal;
                document.querySelector('body > div.login-modal').style.display = "none";
                var blurEffectInterval = setInterval(function () {
                    if (!i) {
                        clearInterval(blurEffectInterval);
                    }
                    document.querySelector('body > div.container.clearfix').style.filter = 'blur('+i--+'px)';                    
                }, 50);
                document.querySelector('.to-display').innerText = 'Logout';
                LOGIN = true;
            };
            requestLogin.setRequestHeader('Content-Type', 'application/json');

            requestLogin.send(JSON.stringify(userName));
        });

        document.getElementById('message-to-send').addEventListener('keydown', function (e) {
            document.querySelector('#people-list > div.messageinfo > p:nth-child(1) > output').innerText =  e.target.value.length;
        });

        document.querySelector('body > div.container.clearfix > div.chat > div.chat-history > ul > li:nth-child(1) > div.message.my-message').innerText = 'privet is cosmosa';
    });

    window.onload = addListeners();
    var offX;
    var offY;
    function addListeners() {
        document.querySelector('.login-modal').addEventListener('mousedown', mouseDown, false);
        window.addEventListener('mouseup', mouseUp, false);
    }

    function mouseUp () {
    window.removeEventListener('mousemove', loginframeMove, true);
    }

    function mouseDown(e) {
        
        var loginDiv = document.querySelector('.login-modal');
        offX =  e.offsetX;
        offY =  e.offsetY;
        window.addEventListener('mousemove', loginframeMove, true);
    }

    function loginframeMove(e) {
        var loginDiv = document.querySelector('.login-modal');
        loginDiv.style.position = 'absolute';
        loginDiv.style.top = (e.clientY - offY) + 'px';
        loginDiv.style.left = (e.clientX - offX) + 'px';
    }

    var closeBtn = document.querySelector('.close-sign');

    closeBtn.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector('.login-modal').style.display =  'none';
    });

    document.querySelector('.to-display').addEventListener('click', function () {
        if (LOGIN) {
            this.innerText = 'Login';
            document.querySelector('body > div.container.clearfix').style.filter = 'blur('+blurVal+'px)';
            document.querySelector('div.login-modal').style.display = 'inline-block';
        }
    }); 
}();
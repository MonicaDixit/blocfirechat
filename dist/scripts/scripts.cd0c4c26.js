"use strict";angular.module("firechatApp",["ngAnimate","ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","firebase","firebase.utils","simpleLogin","ui.router","ui.bootstrap","ngCookies"]).run(["$cookies","$modal",function(a,b){if(a.blocChatCurrentUser&&""!==a.blocChatCurrentUser)console.log("$cookies.blocChatCurrentUser",a.blocChatCurrentUser);else{b.open({templateUrl:"/views/usermodalcontent.html",controller:["$scope","$modalInstance",function(b,c){b.ok=function(){b.username&&""!=b.username&&(a.blocChatCurrentUser=b.username,c.close())}}]})}}]),angular.module("firechatApp").controller("MainCtrl",["$scope",function(a){a.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"]}]),angular.module("firebase.config",[]).constant("FBURL","https://blocfirechat.firebaseio.com").constant("SIMPLE_LOGIN_PROVIDERS",["password"]).constant("loginRedirectPath","/login"),angular.module("firebase.utils",["firebase","firebase.config"]).factory("fbutil",["$window","FBURL","$firebase",function(a,b,c){function d(a){for(var b=0;b<a.length;b++)if(angular.isArray(a[b]))a[b]=d(a[b]);else if("string"!=typeof a[b])throw new Error("Argument "+b+" to firebaseRef is not a string: "+a[b]);return a.join("/")}function e(c){var e=new a.Firebase(b),f=Array.prototype.slice.call(arguments);return f.length&&(e=e.child(d(f))),e}function f(a,b){var d=e(a);return b=angular.extend({},b),angular.forEach(["limitToFirst","limitToLast","orderByKey","orderByChild","orderByPriority","startAt","endAt"],function(a){if(b.hasOwnProperty(a)){var c=b[a];d=d[a].apply(d,angular.isArray(c)?c:[c]),delete b[a]}}),c(d,b)}return{syncObject:function(a,b){return f.apply(null,arguments).$asObject()},syncArray:function(a,b){return f.apply(null,arguments).$asArray()},ref:e}}]),angular.module("firechatApp").controller("ChatCtrl",["$scope","$timeout","roomService","$cookies","$firebase","FBURL",function(a,b,c,d,e,f){function g(a){return moment.locale("en",{calendar:{lastDay:"D MMMM",sameDay:"h:mmA",nextDay:"D MMMM",lastWeek:"D MMMM",nextWeek:"D MMMM",sameElse:"D MMMM"}}),moment(a).calendar()}var h=new Firebase(f);a.messages=e(h.child("messages")).$asArray(),a.rooms=c.getrooms(),a.room="",a.addMessage=function(b){if(!b||!d.roomid)return console.log("room in else",d.roomid),void alert("Please select a room");console.log("room",a.room);var c={sender:d.blocChatCurrentUser,roomid:a.room.$id,roomname:a.room.$value,text:b,sentat:g(new Date)};a.messages.$add(c)["catch"]()},a.setCurrentRoom=function(b){a.room=b,d.roomid=a.room.$id},a.exitCurrentRoom=function(){a.room=""},a.isCurrentRoomMessage=function(b){return b.roomid===a.room.$id}}]),angular.module("firechatApp").filter("reverse",function(){return function(a){return angular.isArray(a)?a.slice().reverse():[]}}),function(){angular.module("simpleLogin",["firebase","firebase.utils","firebase.config"]).factory("authRequired",["simpleLogin","$q",function(a,b){return function(){return a.auth.$requireAuth().then(function(a){return a?a:b.reject({authRequired:!0})})}}]).factory("simpleLogin",["$firebaseAuth","fbutil","$q","$rootScope","createProfile",function(a,b,c,d,e){function f(){i.initialized=!0,i.user=g.$getAuth()||null,angular.forEach(h,function(a){a(i.user)})}var g=a(b.ref()),h=[],i={auth:g,user:null,initialized:!1,getUser:function(){return g.$getAuth()},login:function(a,b){return g.$authWithOAuthPopup(a,b)},anonymousLogin:function(a){return g.$authAnonymously(a)},passwordLogin:function(a,b){return g.$authWithPassword(a,b)},logout:function(){g.$unauth()},createAccount:function(a,b,c){return g.$createUser({email:a,password:b}).then(function(){return i.passwordLogin({email:a,password:b},c)}).then(function(b){return e(b.uid,a).then(function(){return b})})},changePassword:function(a,b,c){return g.$changePassword({email:a,oldPassword:b,newPassword:c})},changeEmail:function(a,b,c){return g.$changeEmail({password:a,oldEmail:c,newEmail:b})},removeUser:function(a,b){return g.$removeUser({email:a,password:b})},watch:function(a,b){h.push(a),g.$waitForAuth(a);var c=function(){var b=h.indexOf(a);b>-1&&h.splice(b,1)};return b&&b.$on("$destroy",c),c}};return g.$onAuth(f),i}]).factory("createProfile",["fbutil","$q","$timeout",function(a,b,c){return function(d,e,f){function g(a){return h(a.substr(0,a.indexOf("@"))||"")}function h(a){a+="";var b=a.charAt(0).toUpperCase();return b+a.substr(1)}var i=a.ref("users",d),j=b.defer();return i.set({email:e,name:f||g(e)},function(a){c(function(){a?j.reject(a):j.resolve(i)})}),j.promise}}])}(),angular.module("firechatApp").controller("LoginCtrl",["$scope","simpleLogin","$location",function(a,b,c){function d(){c.path("/account")}function e(b){a.err=b}a.passwordLogin=function(c,f){a.err=null,b.passwordLogin({email:c,password:f},{rememberMe:!0}).then(d,e)},a.createAccount=function(c,f,g){a.err=null,f?f!==g?a.err="Passwords do not match":b.createAccount(c,f,{rememberMe:!0}).then(d,e):a.err="Please enter a password"}}]),angular.module("firechatApp").controller("AccountCtrl",["$scope","user","simpleLogin","fbutil","$timeout",function(a,b,c,d,e){function f(a){h(a,"danger")}function g(a){h(a,"success")}function h(b,c){var d={text:b+"",type:c};a.messages.unshift(d),e(function(){a.messages.splice(a.messages.indexOf(d),1)},1e4)}function i(b){j&&j.$destroy(),j=d.syncObject("users/"+b.uid),j.$bindTo(a,"profile")}a.user=b,a.logout=c.logout,a.messages=[];var j;i(b),a.changePassword=function(b,d,e){a.err=null,b&&d?d!==e?f("Passwords do not match"):c.changePassword(j.email,b,d).then(function(){g("Password changed")},f):f("Please enter all fields")},a.changeEmail=function(b,d){a.err=null,c.changeEmail(b,d,j.email).then(function(){j.email=d,j.$save(),g("Email changed")})["catch"](f)}}]),angular.module("firechatApp").directive("ngShowAuth",["simpleLogin","$timeout",function(a,b){var c;return a.watch(function(a){c=!!a}),{restrict:"A",link:function(d,e){function f(){b(function(){e.toggleClass("ng-cloak",!c)},0)}e.addClass("ng-cloak"),a.watch(f,d),a.getUser(f)}}}]),angular.module("firechatApp").directive("ngHideAuth",["simpleLogin","$timeout",function(a,b){var c;return a.watch(function(a){c=!!a}),{restrict:"A",link:function(d,e){function f(){b(function(){e.toggleClass("ng-cloak",c!==!1)},0)}e.addClass("ng-cloak"),a.watch(f,d),a.getUser(f)}}}]),angular.module("firechatApp").config(["$routeProvider","SECURED_ROUTES",function(a,b){a.whenAuthenticated=function(c,d){return d.resolve=d.resolve||{},d.resolve.user=["authRequired",function(a){return a()}],a.when(c,d),b[c]=!0,a}}]).config(["$routeProvider",function(a){a.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).when("/login",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/chat",{templateUrl:"views/chat.html",controller:"ChatCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"LoginCtrl"}).when("/newroom",{tempateUrl:"views/newroom.html",controller:"NewRoomCtrl"}).whenAuthenticated("/account",{templateUrl:"views/account.html",controller:"AccountCtrl"}).when("/chat",{templateUrl:"views/chat.html",controller:"ChatCtrl"}).otherwise({redirectTo:"/"})}]).run(["$rootScope","$location","simpleLogin","SECURED_ROUTES","loginRedirectPath",function(a,b,c,d,e){function f(a){!a&&g(b.path())&&b.path(e)}function g(a){return d.hasOwnProperty(a)}c.watch(f,a),a.$on("$routeChangeError",function(a,c,d,f){angular.isObject(f)&&f.authRequired&&b.path(e)})}]).constant("SECURED_ROUTES",{}),angular.module("ui.bootstrap.modal",[]).constant("modalConfig",{backdrop:!0,escape:!0}).directive("modal",["$parse","modalConfig",function(a,b){var c,d=angular.element(document.getElementsByTagName("body")[0]);return{restrict:"EA",link:function(e,f,g){function h(a){27===a.which&&l()}function i(){l()}function j(){m.escape&&d.unbind("keyup",h),m.backdrop&&(c.css("display","none").removeClass("in"),c.unbind("click",i)),f.css("display","none").removeClass("in"),d.removeClass("modal-open")}function k(){m.escape&&d.bind("keyup",h),m.backdrop&&(c.css("display","block").addClass("in"),"static"!=m.backdrop&&c.bind("click",i)),f.css("display","block").addClass("in"),d.addClass("modal-open")}var l,m=angular.extend({},b,e.$eval(g.uiOptions||g.bsOptions||g.options)),n=g.modal||g.show;l=g.close?function(){e.$apply(g.close)}:function(){e.$apply(function(){a(n).assign(e,!1)})},f.addClass("modal"),m.backdrop&&!c&&(c=angular.element('<div class="modal-backdrop"></div>'),c.css("display","none"),d.append(c)),e.$watch(n,function(a,b){a?k():j()})}}}]),angular.module("firechatApp").controller("RoomCtrl",["$scope","$firebase","FBURL","$modal","$log","roomService",function(a,b,c,d,e,f){a.open=function(b){console.log("in open function");var c=d.open({animation:a.animationsEnabled,templateUrl:"/views/modalcontent.html",controller:["$scope","$modalInstance","roomService",function(a,b,c){a.ok=function(){c.addnewroom(a.newroom),b.close(a.newroom)},a.cancel=function(){b.dismiss("cancel")}}],size:b,resolve:{newroom:function(){return a.newroom}}});c.result.then(function(b){a.newroom=b},function(){e.info("Modal dismissed at: "+new Date)})}}]),angular.module("firechatApp").service("roomService",["$firebase","FBURL",function(a,b){var c=new Firebase(b),d=a(c.child("rooms")).$asArray(),e=function(a){console.log("in add room service"),d.$add(a)},f=function(){return d};return{addnewroom:e,getrooms:f}}]);
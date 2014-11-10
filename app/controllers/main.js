/*
 * Geddy JavaScript Web development framework
 * Copyright 2112 Matthew Eernisse (mde@fleegix.org)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
*/
var strategies = require('../helpers/passport/strategies')
  , authTypes = geddy.mixin(strategies, {local: {name: 'local account'}})
  , requireAuth = require('../helpers/passport').requireAuth;
var Auth = geddy.controller.create('Auth');

var Main = function () {

  this.before(requireAuth);
  this.before(function() { Auth.validate(this); });

  this.index = function (req, resp, params) {
    var self = this, session = this.session;
    geddy.model.User.first({id: session.get('userId')}, function (err, user) {
      var data = { user: null, authType: null, logged: false };
      if (user) {
        data.user = user;
        data.authType = authTypes[session.get('authType')].name;
        data.logged = self.logged;
      }
      self.respond(data, {
        format: 'html'
      , template: 'app/views/main/index'
      });
    });
  };

  this.login = function (req, resp, params) {
    this.respond(params, {
      format: 'html'
    , template: 'app/views/main/login'
    });
  };

  this.logout = function (req, resp, params) {
    this.session.unset('userId');
    this.session.unset('authType');
    params.logged = false;
    this.respond(params, {
      format: 'html'
    , template: 'app/views/main/logout'
    });
  };

};

exports.Main = Main;



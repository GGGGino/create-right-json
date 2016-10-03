/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

var React = require('react');

var TodoApp = require('./todo/components/TodoApp.react.jsx');
var SchemiJsonTable = require('./myApp/components/SchemiJsonTable.react.jsx');
var SchemaDetailBox = require('./myApp/components/SchemaDetailBox.react.jsx');
var SchemiActions = require('./myApp/actions/schemiActions');
var store = require('./myApp/reducers/schemi');

React.render(
  <TodoApp />,
  document.getElementById('todoapp')
);

React.render(
    <SchemiJsonTable/>,
    document.getElementById('elencoJsonGeneral')
);

React.render(
    <SchemaDetailBox/>,
    document.getElementById('schemaDetail')
);

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';

var React = require('react-native');
var Todo = require('./App/Todo.js');

var {
  AppRegistry,
  StyleSheet,
  NavigatorIOS
} = React;


var NativeDemo = React.createClass({
  render: function() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Todo List',
          component: Todo
        }} />
      )
  }
});

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  }
});

AppRegistry.registerComponent('NativeDemo', () => NativeDemo);

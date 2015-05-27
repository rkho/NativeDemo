var React = require('react-native');

var {
  View,
  Text,
  ListView,
  TextInput,
  TouchableHighlight,
  StyleSheet
} = React;

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonText: {
    fontSize: 18,
    color: 'white'
  },
  button: {
    height: 60,
    backgroundColor: '#48BBEC',
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  searchInput: {
    height: 60,
    padding: 10,
    fontSize: 18,
    color: '#111',
    flex: 10
  },
  rowContainer: {
    padding: 10,
  },
  footerContainer: {
    backgroundColor: '#E3E3E3',
    alignItems: 'center',
    flexDirection: 'row'
  }
});

var Todo = React.createClass({
  getInitialState: function() {
    return {
      dataSource: new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2}),
      note: '',
      error: ''
    }
  },

  handleChange: function(e) {
    this.setState({
      note: e.nativeEvent.text
    })
  },

  handleSubmit: function() {
    var note = this.state.note;
    this.setState({
      note: ''
    });

    fetch('https://nativetodo.firebaseio.com/demo.json', {
      method: 'POST',
      body: JSON.stringify(note)
    }).then((res) => res.json())
      .then((resData) => {
        fetch('https://nativetodo.firebaseio.com/demo.json')
          .then((res) => res.json())
          .then((resData) => {
            this.setState({
              dataSource: this.state.dataSource.cloneWithRows(resData)
            })
          })
      })
  },


  renderRow: function(rowData) {
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text>{rowData}</Text>
        </View>
      </View>
      )
  },

  footer: function() {
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this.handleChange}
          placeholder="New Note" />
        <TouchableHighlight
          style={styles.button}
          onPress={this.handleSubmit}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
      )
  },

  render: function() {
    return (
    <View style={styles.container}>
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow} />
      {this.footer()}
    </View>
    )
  }
})

module.exports = Todo;

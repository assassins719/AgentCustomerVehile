import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';

import AuthContext from '../../AuthContext';

class Signin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  onChangeText = (name, value) => {
    this.setState({[name]: value});
  };

  render() {
    const {username, password} = this.state;
    const {navigation} = this.props;
    return (
      <AuthContext.Consumer>
        {({signIn}) => (
          <View>
            <View>
              <TextInput
                style={styles.inputField}
                placeholder="Username"
                value={username}
                onChangeText={value => this.onChangeText('username', value)}
              />
            </View>
            <View>
              <TextInput
                style={styles.inputField}
                placeholder="Password"
                value={password}
                onChangeText={value => this.onChangeText('password', value)}
                secureTextEntry
              />
            </View>
            <View style={styles.btn_view}>
              <Button
                type="outline"
                title="Sign in"
                onPress={() => signIn({username, password})}
              />
            </View>
            <View style={styles.btn_view}>
              <Button
                style={styles.btnRound}
                title="Sign up"
                onPress={() => navigation.navigate('Signup')}
              />
            </View>
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
}

const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderRadius: 8,
    margin: 10,
  },
  btn_view: {
    borderRadius: 8,
    margin: 20,
  },
});

export default Signin;

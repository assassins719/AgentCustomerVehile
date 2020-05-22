import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  TextInput,
  Button
} from 'react-native';

import AuthContext from "../../AuthContext";

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: '',
      password: '',
      firstname: '',
      lastname: ''
    }
  }
  
  onChangeText = (name, value) => {
    this.setState({ [name]: value });
  }

  render() {
    const { username, password, firstname, lastname } = this.state;
    const { navigation } = this.props;

    return (
      <AuthContext.Consumer>
        {({ signUp }) => (
          <View>
            <TextInput
              style={styles.inputField}
              placeholder="First Name"
              value={firstname}
              onChangeText={(value) => this.onChangeText('firstname', value)}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Last Name"
              value={lastname}
              onChangeText={(value) => this.onChangeText('lastname', value)}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Username"
              value={username}
              onChangeText={(value) => this.onChangeText('username', value)}
            />
            <TextInput
              style={styles.inputField}
              placeholder="Password"
              value={password}
              onChangeText={(value) => this.onChangeText('password', value)}
              secureTextEntry
            />

            <View style={styles.btn_view}>
              <Button title="Sign up" onPress={() => signUp({ username, password, firstname, lastname })} />
            </View>
            <View style={styles.btn_view}>
              <Button title="Sign in" onPress={() => navigation.navigate('Signin')} />
            </View>
          </View>
        )}
      </AuthContext.Consumer>
    );
  }
};
const styles = StyleSheet.create({
  inputField: {
    borderWidth: 1,
    borderRadius: 8,
    margin: 10
  },
  btn_view: {
    borderRadius: 8,
    margin: 20
  }
});

export default Signup;

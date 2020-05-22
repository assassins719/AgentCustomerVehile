import React, {Component} from 'react';
import {StyleSheet, View, Button, TextInput} from 'react-native';
import {showMessage} from 'react-native-flash-message';
import {connect} from 'react-redux';
import {addCustomer} from '../../redux/actions/customers';
import {removeCustomer} from '../../redux/actions/customers';
import {updateCustomer} from '../../redux/actions/customers';

class CustomerDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      email: '',
      phone: '',
      index: -1,
    };
  }

  componentDidMount() {
    this.initialLoad();
  }

  initialLoad = () => {
    const {
      route: {params},
    } = this.props;
    const firstname =
      params && params.data && params.data.firstname
        ? params.data.firstname
        : '';
    const lastname =
      params && params.data && params.data.lastname ? params.data.lastname : '';
    const email =
      params && params.data && params.data.email ? params.data.email : '';
    const phone =
      params && params.data && params.data.phone ? params.data.phone : '';
    const index = params ? params.index : -1;
    this.setState({firstname, lastname, email, phone, index});
  };

  onChangeText = (name, value) => {
    this.setState({[name]: value});
  };

  remove = async () => {
    const {dispatch} = this.props;
    await dispatch(removeCustomer(this.state.index));
    this.props.navigation.navigate('Customers');
  };

  save = async data => {
    const {dispatch} = this.props;
    if (data.firstname && data.lastname && data.email && data.phone) {
      if (this.state.index >= 0) {
        await dispatch(updateCustomer(this.state.index, data));
      } else {
        await dispatch(addCustomer(data));
      }
      this.props.navigation.navigate('Customers');
    } else {
      showMessage({
        message: 'Warning',
        description: 'Please fill all the fields',
        type: 'warning',
      });
    }
  };
  render() {
    const {firstname, lastname, email, phone, index} = this.state;
    return (
      <View>
        <TextInput
          style={styles.inputField}
          placeholder="First Name"
          value={firstname}
          onChangeText={value => this.onChangeText('firstname', value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Last Name"
          value={lastname}
          onChangeText={value => this.onChangeText('lastname', value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Email"
          value={email}
          onChangeText={value => this.onChangeText('email', value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Phone"
          value={phone}
          onChangeText={value => this.onChangeText('phone', value)}
        />
        <View style={styles.btn_view}>
          <Button
            title="Save"
            onPress={() => this.save({email, phone, firstname, lastname})}
          />
        </View>
        {index >= 0 ? (
          <View style={styles.btn_view}>
            <Button title="Remove" onPress={() => this.remove()} />
          </View>
        ) : (
          <></>
        )}
      </View>
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

const mapStateToProps = ({customers}) => ({customers});
export default connect(mapStateToProps)(CustomerDetail);

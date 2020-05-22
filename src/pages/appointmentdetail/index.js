import React, {Component} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import DatePicker from 'react-native-datepicker';
import {showMessage} from 'react-native-flash-message';
import RNPickerSelect from 'react-native-picker-select';
import {connect} from 'react-redux';
import {
  addAppointment,
  removeAppointment,
  updateAppointment,
} from '../../redux/actions/appointments';

class Appointmentdetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: '',
      to: '',
      vehicle: '',
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
    const vehicle =
      params && params.data && params.data.vehicle ? params.data.vehicle : '';
    const from =
      params && params.data && params.data.from ? params.data.from : '';
    const to = params && params.data && params.data.to ? params.data.to : '';
    const index = params ? params.index : -1;
    this.setState({vehicle, from, to, index});
  };

  onChangeText = (name, value) => {
    this.setState({[name]: value});
  };

  remove = async () => {
    const {dispatch} = this.props;
    await dispatch(removeAppointment(this.state.index));
    this.props.navigation.navigate('Appointments');
  };

  save = async data => {
    const {dispatch} = this.props;
    if (data.from && data.to && data.vehicle) {
      if (this.state.index >= 0) {
        await dispatch(updateAppointment(this.state.index, data));
      } else {
        await dispatch(addAppointment(data));
      }

      this.props.navigation.navigate('Appointments');
    } else {
      showMessage({
        message: 'Warning',
        description: 'Please fill all the fields',
        type: 'warning',
      });
    }
  };

  render() {
    const {from, to, vehicle, index} = this.state;
    const {vehicles} = this.props;

    return (
      <View>
        <RNPickerSelect
          style={pickerSelectStyles2}
          placeholder={{
            label: 'Select Customer',
            value: null,
            color: '#000',
          }}
          MG-
          items={vehicles}
          value={this.state.vehicle}
          onValueChange={value => this.setState({vehicle: value})}
        />
        <DatePicker
          date={this.state.from}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({from: date});
          }}
        />
        <DatePicker
          date={this.state.to}
          mode="date"
          placeholder="select date"
          format="YYYY-MM-DD"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0,
            },
            dateInput: {
              marginLeft: 36,
            },
            // ... You can check the source to find the other keys.
          }}
          onDateChange={date => {
            this.setState({to: date});
          }}
        />
        <View style={styles.btn_view}>
          <Button title="Save" onPress={() => this.save({from, to, vehicle})} />
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

const pickerSelectStyles2 = StyleSheet.create({
  viewContainer: {
    borderColor: '#333',
    borderRadius: 8,
    borderWidth: 1,
    justifyContent: 'center',
    margin: 10,
  },
  iconContainer: {
    right: 10,
  },
  underline: {
    borderTopWidth: 0,
  },
  inputAndroid: {
    paddingHorizontal: 10,
    height: 40,
    color: 'black',
  },
  inputIOS: {
    paddingHorizontal: 10,
    height: 40,
    color: 'black',
  },
});

const mapStateToProps = ({vehicles, appointments}) => ({
  appointments,
  vehicles: vehicles.data.map(item => ({
    label: `${item.make} - ${item.model} - ${item.year} (${item.customer})`,
    value: `${item.make} - ${item.model} - ${item.year} (${item.customer})`,
  })),
});

export default connect(mapStateToProps)(Appointmentdetail);

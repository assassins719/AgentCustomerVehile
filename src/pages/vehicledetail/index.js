import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Button} from 'react-native';
import {connect} from 'react-redux';
import RNPickerSelect from 'react-native-picker-select';
import {showMessage} from 'react-native-flash-message';
import {
  addVehicle,
  removeVehicle,
  updateVehicle,
} from '../../redux/actions/vehicles';

class Vehicledetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      make: '',
      model: '',
      year: '',
      vin: '',
      note: '',
      customer: '',
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
    const make =
      params && params.data && params.data.make ? params.data.make : '';
    const model =
      params && params.data && params.data.model ? params.data.model : '';
    const year =
      params && params.data && params.data.year ? params.data.year : '';
    const vin = params && params.data && params.data.vin ? params.data.vin : '';
    const note =
      params && params.data && params.data.note ? params.data.note : '';
    const customer =
      params && params.data && params.data.customer ? params.data.customer : '';
    const index = params ? params.index : -1;
    this.setState({make, model, year, vin, note, customer, index});
  };

  onChangeText = (name, value) => {
    this.setState({[name]: value});
  };

  remove = async () => {
    const {dispatch} = this.props;
    await dispatch(removeVehicle(this.state.index));
    this.props.navigation.navigate('Vehicles');
  };

  save = async data => {
    const {dispatch} = this.props;
    if (data.customer && data.make && data.model && data.year && data.vin) {
      if (this.state.index >= 0) {
        await dispatch(updateVehicle(this.state.index, data));
      } else {
        await dispatch(addVehicle(data));
      }
      this.props.navigation.navigate('Vehicles');
    } else {
      showMessage({
        message: 'Warning',
        description: 'Please fill all the fields',
        type: 'warning',
      });
    }
  };

  render() {
    const {make, model, year, vin, note, customer, index} = this.state;
    const {customers} = this.props;

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
          items={customers}
          value={customer}
          onValueChange={value => this.setState({customer: value})}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Make"
          value={make}
          onChangeText={value => this.onChangeText('make', value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Model"
          value={model}
          onChangeText={value => this.onChangeText('model', value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Year"
          value={year}
          onChangeText={value => this.onChangeText('year', value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="VIN"
          value={vin}
          onChangeText={value => this.onChangeText('vin', value)}
        />
        <TextInput
          style={styles.inputField}
          placeholder="Additional note"
          value={note}
          onChangeText={value => this.onChangeText('note', value)}
        />
        <View style={styles.btn_view}>
          <Button
            title="Save"
            onPress={() => this.save({make, model, year, vin, note, customer})}
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

const mapStateToProps = ({vehicles, customers}) => ({
  vehicles,
  customers: customers.data.map(item => ({
    label: `${item.firstname} ${item.lastname}`,
    value: `${item.firstname} ${item.lastname}`,
  })),
});

export default connect(mapStateToProps)(Vehicledetail);

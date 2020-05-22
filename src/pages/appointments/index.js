import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {connect} from 'react-redux';

class Appointments extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {navigation} = this.props;
    navigation.setOptions({
      headerRight: () => (
        <View style={{flexDirection: 'row'}}>
          <TouchableOpacity
            style={{
              width: 75,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('Customers');
            }}>
            <MaterialIcons name="group" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 75,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('Vehicles');
            }}>
            <MaterialIcons name="local-taxi" size={25} color="black" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 75,
              height: 40,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              this.props.navigation.navigate('Appointmentdetail');
            }}>
            <MaterialIcons name="alarm-add" size={25} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }
  gotoAppoitndetail = (data, index) => {
    this.props.navigation.navigate('Appointmentdetail', {
      data: data,
      index: index,
    });
  };

  renderItem({item, index}) {
    return (
      <TouchableOpacity onPress={() => this.gotoAppoitndetail(item, index)}>
        <View style={styles.cell}>
          <Text>{item.vehicle}</Text>
          <Text>
            From : {item.from} To: {item.to}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {appointments} = this.props;
    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={appointments.data}
          renderItem={this.renderItem.bind(this)}
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  cell: {
    padding: 8,
    borderWidth: 1,
  },
});

const mapStateToProps = ({appointments}) => ({appointments});
export default connect(mapStateToProps)(Appointments);

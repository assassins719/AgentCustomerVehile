import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Vehicles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      vehicles: [],
    };
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
              this.props.navigation.navigate('Vehicledetail');
            }}>
            <MaterialIcons name="add" size={25} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }
  gotoVehicledetail = (data, index) => {
    this.props.navigation.navigate('Vehicledetail', {
      data: data,
      index: index,
    });
  };
  renderItem({item, index}) {
    return (
      <TouchableOpacity onPress={() => this.gotoVehicledetail(item, index)}>
        <View style={styles.cell}>
          <Text>Customer - {item.customer}</Text>
          <Text>
            {item.make} - {item.model} - {item.year}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {vehicles} = this.props;

    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={vehicles.data}
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

const mapStateToProps = ({vehicles}) => ({vehicles});

export default connect(mapStateToProps)(Vehicles);

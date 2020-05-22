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

class Customers extends Component {
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
              this.props.navigation.navigate('Customerdetail');
            }}>
            <MaterialIcons name="person-add" size={25} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }

  gotoCustomerdetail = (data, index) => {
    this.props.navigation.navigate('Customerdetail', {
      data: data,
      index: index,
    });
  };

  renderItem({item, index}) {
    return (
      <TouchableOpacity onPress={() => this.gotoCustomerdetail(item, index)}>
        <View style={styles.cell}>
          <Text>
            {item.firstname} {item.lastname}
          </Text>
          <Text>
            {item.email} {item.phone}
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    const {customers} = this.props;
    return (
      <SafeAreaView>
        <FlatList
          keyExtractor={(item, index) => `${index}`}
          data={customers.data}
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
const mapStateToProps = ({customers}) => ({customers});

export default connect(mapStateToProps)(Customers);

import React, {useState} from 'react';
import {
  TouchableOpacity,
  Text,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Modal, Portal, Button, Provider} from 'react-native-paper';
import InputTransactionPin from './inputTransactionPin';

const PaperModal = props => {
  const [visible, setVisible] = React.useState(true);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = {
    backgroundColor: 'white',
    padding: 20,
    width: '90%',
    alignSelf: 'center',
    height: '80%',
    borderRadius: 10
  };

  return (
    <View >
      <Portal>
        <Modal
          visible={props.show && visible}
          onDismiss={hideModal}
          contentContainerStyle={containerStyle}
          {...props}
          >
          <View style={[{height: '100%'}, props.modalStyle]}>
          {props.children}
            {/* <InputTransactionPin collectPin={props.collectPin}/> */}
          </View>
        </Modal>
      </Portal>
      {/* <Button style={{marginTop: 30}} onPress={showModal}>
        Show
      </Button> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    minHeight: 46,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: 5,
    paddingHorizontal: 15,
  }
});

export default PaperModal;

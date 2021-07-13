import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button } from '../../../components';
import { colors } from '../../../constants';

const SelectModal = ({
  data,
  name,
  values,
  setFieldValue,
  errors,
  touched,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const selectedItem = data.find(d => d.value === values[name]);

  const _onChangeValue = value => {
    handleModal();
    setFieldValue(name, value);
  };

  return (
    <View>
      <Button style={styles.btnOpenModal} onPress={handleModal}>
        <Text>
          {selectedItem ? (
            selectedItem.value
          ) : (
            <Text style={styles.authorSelect}>{'Select author here'}</Text>
          )}
        </Text>
        <Ionicons
          name="ios-caret-down-outline"
          size={17}
          color={colors.black}
          style={styles.buttonIcon}
        />
      </Button>
      <Modal
        useNativeDriver
        isVisible={isModalVisible}
        onBackdropPress={handleModal}
        onBackButtonPress={handleModal}>
        <View style={styles.modalContainer}>
          <Button onPress={handleModal} style={styles.btnCloseModal}>
            <Ionicons name="close" size={18} color={colors.black} />
          </Button>
          <View>
            {data.map(item => (
              <Button
                key={item.value}
                onPress={() => _onChangeValue(item.value)}
                style={styles.selectItem}>
                <Text>{item.value}</Text>
              </Button>
            ))}
          </View>
        </View>
      </Modal>
      {errors?.author && touched?.author && (
        <Text style={styles.error}>{errors.author}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  error: {
    color: colors.red,
    fontSize: 11,
  },
  btnOpenModal: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    marginTop: 10,
    borderRadius: 6,
    paddingHorizontal: 10,
    backgroundColor: colors.white,
    elevation: 2,
  },
  modalContainer: {
    backgroundColor: colors.white,
    borderRadius: 6,
  },
  btnCloseModal: {
    alignItems: 'flex-end',
    padding: 10,
  },
  selectItem: {
    paddingHorizontal: 10,
    paddingVertical: 8,
  },
  authorSelect: {
    fontSize: 14,
    color: '#a8a8a8',
  },
});

export default SelectModal;

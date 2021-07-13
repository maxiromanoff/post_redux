import React from 'react';
import { View, Text, StyleSheet, ToastAndroid } from 'react-native';
import { Input, Button } from '../../components';
import { Formik } from 'formik';
import * as yup from 'yup';
import { colors } from '../../constants';
import AUTHORS_DATA from './data';
import SelectModal from './components/SelectModal';
import { addPosts } from '../../redux/reducer';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useDispatch } from 'react-redux';

const schema = yup.object().shape({
  title: yup.string().required('Post title is required'),
  author: yup.string().required('Author is required'),
  content: yup.string().required('Content is required'),
});

const initalValues = {
  title: '',
  content: '',
  author: '',
};

const CreatePost = ({ navigation }) => {
  const dispatch = useDispatch();

  const gotoBack = () => {
    navigation.goBack();
  };

  const handleOnSubmit = (values, { resetForm }) => {
    dispatch(
      addPosts({
        id: Math.floor(Math.random() * 1000),
        title: values.title,
        content: values.content,
        author: values.author,
        created_date: new Date().toISOString(),
      }),
    );
    resetForm();

    ToastAndroid.showWithGravity(
      'Add post successfully!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button onPress={gotoBack} style={styles.btnBack}>
          <Ionicons name="chevron-back" size={22} color={colors.black} />
        </Button>
        <Text style={styles.headerTitle}>Add Post</Text>
        <View style={styles.emptyView} />
      </View>
      <Formik
        initialValues={initalValues}
        validationSchema={schema}
        onSubmit={handleOnSubmit}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          setFieldValue,
          errors,
          touched,
        }) => (
          <View style={styles.form}>
            <View>
              <Text style={styles.title}>Title</Text>
              <Input
                name="title"
                placeholder="Enter title here"
                style={styles.input}
                {...{ values, errors, touched, handleBlur, handleChange }}
              />
            </View>
            <View style={styles.picker}>
              <Text style={styles.title}>Author</Text>
              <SelectModal
                data={AUTHORS_DATA}
                name="author"
                {...{ values, setFieldValue, errors, touched }}
              />
            </View>
            <View style={styles.content}>
              <Text style={styles.title}>Content</Text>
              <Input
                name="content"
                placeholder="Enter content here"
                style={styles.input}
                {...{ values, errors, touched, handleChange, handleBlur }}
              />
            </View>
            <Button onPress={handleSubmit} style={styles.btnSavePost}>
              <Text style={styles.txtBtnSavePost}>Save post</Text>
            </Button>
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef0f1',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    elevation: 3,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  btnBack: {
    paddingVertical: 4,
    paddingHorizontal: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
  },
  emptyView: {
    width: 45,
  },
  form: {
    marginHorizontal: 15,
    marginTop: 20,
  },
  title: {
    fontWeight: '700',
    fontSize: 16,
  },
  input: {
    backgroundColor: colors.white,
    paddingLeft: 10,
    marginTop: 10,
    borderRadius: 6,
    elevation: 2,
  },
  picker: {
    marginTop: 10,
  },
  content: {
    marginTop: 10,
  },
  btnSavePost: {
    marginTop: 28,
    elevation: 2,
    borderRadius: 6,
    paddingVertical: 10,
    paddingHorizontal: 12,
    alignSelf: 'flex-start',
    backgroundColor: colors.black,
  },
  txtBtnSavePost: {
    color: colors.white,
    fontWeight: '700',
    textAlign: 'center',
  },
});

export default CreatePost;

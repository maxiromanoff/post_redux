import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Alert,
  StatusBar,
} from 'react-native';
import { colors } from '../../constants';
import { Button } from '../../components';
import routes from '../routes';
import { removePosts, updatePosts } from '../../redux/reducer';
import Entypo from 'react-native-vector-icons/Entypo';
import Item from './components/Item';
import { useSelector, useDispatch } from 'react-redux';

const HomeScreen = ({ navigation }) => {
  const postList = useSelector(state => state.posts);
  const dispatch = useDispatch();

  const gotoCreatePostScreen = () => {
    navigation.navigate(routes.CreatePost);
  };

  const handleRemovePost = item => {
    Alert.alert('Are you sure to delete the post?', `${item.title}`, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      { text: 'OK', onPress: () => dispatch(removePosts(item.id)) },
    ]);
  };

  const keyExtractor = item => String(item.id);

  const renderItem = ({ item }) => (
    <Item {...{ item, handleRemovePost, updatePosts }} />
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#000" barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.logo}>
          <Text style={styles.textLogo}>POSTS</Text>
        </View>
      </View>
      <FlatList
        data={postList}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        removeClippedSubviews={false}
        keyboardShouldPersistTaps="handled"
      />
      <View style={styles.footer}>
        <Button style={styles.btnCreatePost} onPress={gotoCreatePostScreen}>
          <Entypo
            name="plus"
            size={24}
            color={colors.white}
            style={styles.iconBtn}
          />
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eef0f1',
  },
  header: {
    backgroundColor: '#fff',
    elevation: 3,
    paddingVertical: 8,
    paddingHorizontal: 15,
  },
  logo: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: '#000',
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  textLogo: {
    fontSize: 18,
    fontWeight: '700',
    color: '#fff',
  },
  footer: {
    marginTop: 25,
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
  },
  btnCreatePost: {
    width: 50,
    height: 50,
    borderRadius: 50,
    marginHorizontal: 15,
    alignSelf: 'flex-end',
    backgroundColor: colors.black,
    elevation: 2,
  },
  iconBtn: {
    textAlign: 'center',
    top: 12,
  },
});

export default HomeScreen;

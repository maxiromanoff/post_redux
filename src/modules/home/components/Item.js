import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ToastAndroid } from 'react-native';
import TimeAgo from '../../../utils/TimeAgo';
import { Button } from '../../../components';
import { colors } from '../../../constants';
import Entypo from 'react-native-vector-icons/Entypo';
import { useDispatch } from 'react-redux';

const Item = ({ item, handleRemovePost, updatePosts }) => {
  const [isEdit, setEdit] = useState(false);
  const [titleChange, onChangeTitle] = useState(title);
  const [contentChange, onChangeContent] = useState(content);

  const title = item.title;
  const content = item.content;

  const dispatch = useDispatch();

  const handleEditPost = () => {
    setEdit(prev => !prev);
  };

  const handleUpdatePost = () => {
    let data = {
      title: titleChange || title,
      content: contentChange || content,
    };
    dispatch(
      updatePosts({
        id: item.id,
        ...data,
      }),
    );
    onChangeTitle(data.title);
    onChangeContent(data.content);

    ToastAndroid.showWithGravity(
      'Updated successfully!',
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
    );

    setEdit(prev => !prev);
  };

  return (
    <View style={styles.cards}>
      <View style={styles.card}>
        {isEdit ? (
          <TextInput
            defaultValue={title}
            onChangeText={t => onChangeTitle(t)}
            value={titleChange}
            multiline={true}
            style={styles.titlePost}
          />
        ) : (
          <Text style={styles.titlePost}>{item.title}</Text>
        )}
        <Text style={styles.authorPost}>
          {`by ${item.author}`}
          <Text style={styles.timeAgo}>{`   ${TimeAgo(
            item.created_date,
          )} ago`}</Text>
        </Text>
        {isEdit ? (
          <TextInput
            defaultValue={content}
            style={styles.content}
            onChangeText={c => onChangeContent(c)}
            value={contentChange}
            multiline={true}
          />
        ) : (
          <Text style={styles.content}>{item.content}</Text>
        )}
        <View style={styles.actions}>
          {isEdit ? (
            <Button style={styles.saveBtn} onPress={handleUpdatePost}>
              <Entypo name="save" size={20} color={colors.black} />
            </Button>
          ) : (
            <>
              <Button
                style={styles.trashBtn}
                onPress={() => handleRemovePost(item)}>
                <Entypo name="trash" size={20} color={colors.black} />
              </Button>

              <Button style={styles.editBtn} onPress={() => handleEditPost()}>
                <Entypo name="edit" size={20} color={colors.black} />
              </Button>
            </>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cards: {
    backgroundColor: colors.white,
    elevation: 2,
    marginHorizontal: 15,
    borderRadius: 7,
    marginTop: 15,
    marginBottom: 5,
  },
  card: {
    marginTop: 6,
    marginHorizontal: 10,
    marginBottom: 8,
  },
  titlePost: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 5,
  },
  authorPost: {
    fontSize: 12,
    color: colors.systemGray3,
    marginBottom: 15,
  },
  content: {
    fontSize: 14,
  },
  timeAgo: {
    fontStyle: 'italic',
    fontSize: 11,
  },
  actions: {
    flexDirection: 'row',
  },
  trashBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  editBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  saveBtn: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  reactionBtn: {
    flexDirection: 'row',
    marginRight: 10,
  },
});

export default Item;

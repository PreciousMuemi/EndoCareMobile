import React, {useState} from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

const {width} = Dimensions.get('window');

const BlogDetailScreen = ({route, navigation}) => {
  const insets = useSafeAreaInsets();
  const {postId} = route.params;
  const [comment, setComment] = useState('');

  // Mock post data - in a real app, you'd fetch this based on the postId
  const post = {
    id: postId,
    author: 'Jane Doe',
    avatar: 'https://picsum.photos/id/64/100/100',
    content:
      'Just attended an amazing workshop on campus sustainability! So inspired by all the great initiatives our university is taking. #CampusLife #Sustainability',
    image: 'https://picsum.photos/id/42/1000/1000',
    likes: 42,
    comments: [
      {
        id: 1,
        author: 'John Smith',
        content:
          "That's awesome! Which initiative did you find most interesting?",
      },
      {
        id: 2,
        author: 'Alice Johnson',
        content: 'I wish I could have attended. Thanks for sharing!',
      },
    ],
    timestamp: '2 hours ago',
  };

  const handleLike = () => {
    // Implement like functionality
    console.log('Liked post:', postId);
  };

  const handleComment = () => {
    if (comment.trim()) {
      // Implement comment submission
      console.log('New comment on post', postId, ':', comment);
      setComment('');
    }
  };

  return (
    <View style={[styles.container, {paddingTop: insets.top}]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-left" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Post</Text>
        <TouchableOpacity>
          <Icon name="dots-vertical" size={24} color="#333" />
        </TouchableOpacity>
      </View>

      <ScrollView>
        <View style={styles.postContainer}>
          <View style={styles.authorContainer}>
            <Image source={{uri: post.avatar}} style={styles.avatar} />
            <View>
              <Text style={styles.authorName}>{post.author}</Text>
              <Text style={styles.timestamp}>{post.timestamp}</Text>
            </View>
          </View>
          <Text style={styles.content}>{post.content}</Text>
          <Image source={{uri: post.image}} style={styles.postImage} />
          <View style={styles.interactionBar}>
            <TouchableOpacity
              style={styles.interactionButton}
              onPress={handleLike}>
              <Icon name="heart-outline" size={24} color="#333" />
              <Text style={styles.interactionText}>{post.likes}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionButton}>
              <Icon name="comment-outline" size={24} color="#333" />
              <Text style={styles.interactionText}>{post.comments.length}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.interactionButton}>
              <Icon name="share-outline" size={24} color="#333" />
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsSectionTitle}>Comments</Text>
          {post.comments.map(comment => (
            <View key={comment.id} style={styles.commentContainer}>
              <Text style={styles.commentAuthor}>{comment.author}</Text>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          placeholder="Add a comment..."
          placeholderTextColor="#333"
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleComment}>
          <Icon name="send" size={24} color="#4a69bd" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  postContainer: {
    padding: 15,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  authorName: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#333',
  },
  timestamp: {
    color: '#666',
    fontSize: 12,
  },
  content: {
    fontSize: 16,
    marginBottom: 10,
    color: '#333',
  },
  postImage: {
    width: width - 30,
    height: width - 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  interactionBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 10,
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  interactionText: {
    marginLeft: 5,
    color: '#333',
  },
  commentsSection: {
    padding: 15,
  },
  commentsSectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  commentContainer: {
    marginBottom: 10,
  },
  commentAuthor: {
    fontWeight: 'bold',
    marginBottom: 2,
    color: '#333',
  },
  commentContent: {
    color: '#333',
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  commentInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    color: '#333',
  },
  sendButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
  },
});

export default BlogDetailScreen;

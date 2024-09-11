import React, { useState } from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, FlatList, TextInput, useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons
import { useRouter, useLocalSearchParams } from 'expo-router';  // Use useRouter and useLocalSearchParams from expo-router
import { pinsData } from '@/constants/pinData';  // Import the local data
import { SafeAreaView } from 'react-native-safe-area-context';

interface Comment {
  id: string;
  username: string;
  comment: string;
  likes: number;
}

export default function PinDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams(); // Retrieve the id from the params

  // Detect the color scheme (dark or light mode)
  const colorScheme = useColorScheme();
  const isDarkMode = colorScheme === 'dark';

  // Find the pin data based on the id passed
  const pin = pinsData.find((p) => p.id === id);

  // Ensure the pin exists, otherwise default to empty
  if (!pin) {
    return <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>Pin not found</Text>;
  }

  const { imageUrl, title } = pin;

  const imageSource = typeof imageUrl === 'string' ? { uri: imageUrl } : imageUrl;

  // State to manage the heart status of the main post
  const [postLiked, setPostLiked] = useState(false);
  // State to manage the heart status of each comment, where keys are comment ids and values are booleans
  const [likedComments, setLikedComments] = useState<{ [key: string]: boolean }>({});

  const comments: Comment[] = [
    { id: '1', username: 'J', comment: 'I had that exact Laredo, ‘84’ Living in the Northeast the weather was not kind...', likes: 39 },
    { id: '2', username: 'K', comment: 'Nice picture! Reminds me of the old days.', likes: 25 },
    // Add more comments as needed
  ];

  const handleBackPress = () => {
    router.back();
  };

  // Toggle heart for the main post
  const togglePostHeart = () => {
    setPostLiked(!postLiked);
  };

  // Toggle heart for individual comments
  const toggleCommentHeart = (commentId: string) => {
    setLikedComments((prevLikedComments) => ({
      ...prevLikedComments,
      [commentId]: !prevLikedComments[commentId],
    }));
  };

  const renderHeader = () => (
    <View>
      {/* Image Section */}
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Pin Info Section */}
      <View style={styles.infoContainer}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={require('@/assets/images/aesthetic/face.png')} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={[styles.profileName, { color: isDarkMode ? '#fff' : '#000' }]}>Emma</Text>
          </View>
          <TouchableOpacity style={styles.heartButton} onPress={togglePostHeart}>
            <Ionicons
              name={postLiked ? 'heart' : 'heart-outline'}
              size={24}
              color={postLiked ? 'red' : '#000'}
            />
          </TouchableOpacity>
        </View>

        {/* Pin Title */}
        <Text style={[styles.pinTitle, { color: isDarkMode ? '#fff' : '#000' }]}>{title}</Text>
      </View>

      {/* Horizontal line above the comments */}
      <View style={[styles.horizontalLine, { backgroundColor: isDarkMode ? '#555' : '#ddd' }]} />

      {/* Comments Section Title */}
      <Text style={[styles.commentsTitle, { color: isDarkMode ? '#fff' : '#000' }]}>Comments</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#000' : '#fff' }]}>
      <FlatList
        data={comments}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={renderHeader}  // Header with image, title, etc.
        renderItem={({ item }) => (
          <View style={styles.commentContainer}>
            <Text style={[styles.commentUsername, { color: isDarkMode ? '#fff' : '#000' }]}>{item.username}</Text>
            <Text style={[styles.commentText, { color: isDarkMode ? '#aaa' : '#000' }]}>{item.comment}</Text>
            <View style={styles.commentMeta}>
              <TouchableOpacity onPress={() => toggleCommentHeart(item.id)}>
                <Ionicons
                  name={likedComments[item.id] ? 'heart' : 'heart-outline'}
                  size={16}
                  color={likedComments[item.id] ? 'red' : isDarkMode ? '#fff' : '#000'}
                />
              </TouchableOpacity>
              <Text style={[styles.commentLikes, { color: isDarkMode ? '#fff' : '#000' }]}>{item.likes}</Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <TextInput
            style={[styles.addCommentInput, { backgroundColor: isDarkMode ? '#333' : '#f1f1f1', color: isDarkMode ? '#fff' : '#000' }]}
            placeholder="Add a comment"
            placeholderTextColor={isDarkMode ? '#888' : '#aaa'}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  imageContainer: {
    width: '100%',
    height: 550, // Control the height of the image container
    overflow: 'hidden', // Hide anything that goes outside the border
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderTopLeftRadius: 20, // Rounded top left corner
    borderTopRightRadius: 20, // Rounded top right corner
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 5,
    borderRadius: 15,
  },
  infoContainer: {
    padding: 15,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  heartButton: {
    padding: 10,
  },
  pinTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  horizontalLine: {
    height: 1,
    marginVertical: 10,
    marginHorizontal: 15,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
    paddingLeft: 15,
  },
  commentContainer: {
    paddingHorizontal: 15,
    marginBottom: 15,
  },
  commentUsername: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  commentText: {
    fontSize: 14,
    marginBottom: 5,
  },
  commentMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  commentLikes: {
    fontSize: 12,
    marginLeft: 5,
  },
  addCommentInput: {
    marginTop: 15,
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 15,
  },
});

import React from 'react';
import { View, Image, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, FlatList, ImageSourcePropType } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons'; // For icons
import { useRouter, useLocalSearchParams } from 'expo-router';  // Use useRouter and useLocalSearchParams from expo-router

export default function PinDetailScreen() {
  const router = useRouter();
  const { imageUrl, title } = useLocalSearchParams();

  let imageSource: ImageSourcePropType;
  if (typeof imageUrl === 'string') {
    imageSource = { uri: imageUrl };
  } else {
    imageSource = imageUrl as ImageSourcePropType;
  }

  const comments = [
    { id: '1', username: 'J', comment: 'I had that exact Laredo, ‘84’ Living in the Northeast the weather was not kind...', likes: 39 },
  ];

  const handleBackPress = () => {
    router.back();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
        <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
          <Ionicons name="arrow-back" size={30} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.profileSection}>
          <Image source={{ uri: 'https://via.placeholder.com/40' }} style={styles.profileImage} />
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Bronc</Text>
            <Text style={styles.profileFollowers}>277 followers</Text>
          </View>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Follow</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.pinTitle}>{title}</Text>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.heartButton}>
            <Ionicons name="heart-outline" size={24} color="#000" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.visitButton}>
            <Text style={styles.visitButtonText}>Visit</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Save</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.commentsSection}>
        <Text style={styles.commentsTitle}>6 comments</Text>
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.commentContainer}>
              <Text style={styles.commentUsername}>{item.username}</Text>
              <Text style={styles.commentText}>{item.comment}</Text>
              <View style={styles.commentMeta}>
                <Ionicons name="heart-outline" size={16} color="#000" />
                <Text style={styles.commentLikes}>{item.likes}</Text>
              </View>
            </View>
          )}
        />
        <TextInput style={styles.addCommentInput} placeholder="Add a comment" placeholderTextColor="#888" />
      </View>

      <View style={styles.moreToExplore}>
        <Text style={styles.moreToExploreText}>More to explore</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  imageContainer: {
    width: '100%',
    height: 400,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
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
  profileFollowers: {
    fontSize: 12,
    color: '#888',
  },
  followButton: {
    backgroundColor: '#eee',
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
  },
  followButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  pinTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 15,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  heartButton: {
    padding: 10,
  },
  visitButton: {
    backgroundColor: '#eee',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  visitButtonText: {
    color: '#000',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#e60023',
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: '600',
  },
  commentsSection: {
    paddingHorizontal: 15,
    marginTop: 20,
  },
  commentsTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  commentContainer: {
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
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
  },
  moreToExplore: {
    padding: 15,
  },
  moreToExploreText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

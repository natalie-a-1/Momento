import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, TouchableOpacity, useColorScheme, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import Pin from '@/components/Pin';

type PinData = {
  id: string;
  imageUrl: any;
  title: string;
};

const initialFriendsData: PinData[] = [
  { id: '1', imageUrl: require('@/assets/images/aesthetic/cards.png'), title: 'Friends Pin 1' },
  { id: '2', imageUrl: require('@/assets/images/aesthetic/dog.png'), title: 'Friends Pin 2' },
  { id: '3', imageUrl: require('@/assets/images/aesthetic/drinks.png'), title: 'Friends Pin 3' },
  { id: '4', imageUrl: require('@/assets/images/aesthetic/home.png'), title: 'Friends Pin 4' },
];

const initialFollowingData: PinData[] = [
  { id: '5', imageUrl: require('@/assets/images/aesthetic/cards.png'), title: 'Following Pin 1' },
  { id: '6', imageUrl: require('@/assets/images/aesthetic/dog.png'), title: 'Following Pin 2' },
  { id: '7', imageUrl: require('@/assets/images/aesthetic/drinks.png'), title: 'Following Pin 3' },
  { id: '8', imageUrl: require('@/assets/images/aesthetic/home.png'), title: 'Following Pin 4' },
];

export default function FeedScreen() {
  const [selectedTab, setSelectedTab] = useState<'Friends' | 'Following'>('Friends');
  const [friendsData, setFriendsData] = useState(initialFriendsData);
  const [followingData, setFollowingData] = useState(initialFollowingData);

  const router = useRouter();
  const colorScheme = useColorScheme();

  const data = selectedTab === 'Friends' ? friendsData : followingData;

  const handlePinPress = (pin: PinData) => {
    router.push({
      pathname: '/PinDetail',
      params: {
        imageUrl: pin.imageUrl,
        title: pin.title,
      },
    });
  };

  // Infinite Scroll: Load more data
  const loadMoreData = () => {
    const moreData = data.map(item => ({
      ...item,
      id: (parseInt(item.id) + data.length).toString(),  // Unique new IDs
    }));

    if (selectedTab === 'Friends') {
      setFriendsData(prevData => [...prevData, ...moreData]);
    } else {
      setFollowingData(prevData => [...prevData, ...moreData]);
    }
  };

  const handleTabPress = (tab: 'Friends' | 'Following') => {
    setSelectedTab(tab);
  };

  return (
    <SafeAreaView style={colorScheme === 'dark' ? stylesDark.container : styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => handleTabPress('Friends')} style={styles.tabItem}>
            <Text style={[styles.tabText, selectedTab === 'Friends' ? styles.activeTab : {}]}>
              Friends
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleTabPress('Following')} style={styles.tabItem}>
            <Text style={[styles.tabText, selectedTab === 'Following' ? styles.activeTab : {}]}>
              Following
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Feed */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePinPress(item)}>
            <Pin imageUrl={item.imageUrl} title={item.title} />
          </TouchableOpacity>
        )}
        columnWrapperStyle={styles.columnWrapper}
        showsVerticalScrollIndicator={false}
        onEndReached={loadMoreData} // Infinite scroll trigger
        onEndReachedThreshold={0.5} // Trigger when 50% scrolled
      />
    </SafeAreaView>
  );
}

// Light mode styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  tabsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  tabItem: {
    marginHorizontal: 20,
  },
  tabText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#888',
  },
  activeTab: {
    color: '#000',
    borderBottomWidth: 2,
    borderBottomColor: '#000',
  },
  columnWrapper: {
    justifyContent: 'space-between',  // Space evenly between columns
    marginHorizontal: 5,  // Margin between the columns
  },
});

// Dark mode styles
const stylesDark = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
});

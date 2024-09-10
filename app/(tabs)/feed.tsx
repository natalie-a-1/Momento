import React, { useState } from 'react';
import { SafeAreaView, FlatList, StyleSheet, View, Text, TouchableOpacity, useColorScheme } from 'react-native';
import { useRouter } from 'expo-router';
import Pin from '@/components/Pin';
import { pinsData } from '@/constants/pinData';  // Ensure this is your data file path

export default function FeedScreen() {
  const [selectedTab, setSelectedTab] = useState<'Friends' | 'Following'>('Friends');
  const [friendsData, setFriendsData] = useState(pinsData);  // Data for friends
  const [followingData, setFollowingData] = useState(pinsData);  // Data for following

  const router = useRouter();
  const colorScheme = useColorScheme();

  // Determine which data to show based on the selected tab
  const data = selectedTab === 'Friends' ? friendsData : followingData;

  const handlePinPress = (pinId: string) => {
    router.push({
      pathname: '/PinDetail',
      params: {
        id: pinId,  // Pass only the id
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

  // Handle tab switching between Friends and Following
  const handleTabPress = (tab: 'Friends' | 'Following') => {
    setSelectedTab(tab);
  };

  return (
    <SafeAreaView style={colorScheme === 'dark' ? stylesDark.container : styles.container}>
      {/* Header for Friends and Following Tabs */}
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

      {/* Pinterest-style Feed */}
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handlePinPress(item.id)}>
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

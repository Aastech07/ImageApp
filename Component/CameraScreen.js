import React, { useState, useEffect, useRef } from 'react';
import { View, FlatList, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import Icon from 'react-native-vector-icons/FontAwesome';

const CameraScreen = () => {
  const { width, height } = Dimensions.get('screen');
  const [data, setData] = useState([]);
  const topRef = useRef();
  const thumRef = useRef();
       const ACCESS_KEY = 'V4DbfvefLLULRV4wsl_3gkumCrujX0hrSCXV9yHrI5U';
      const BASE_URL = 'https://api.unsplash.com/photos/';
      const PER_PAGE = 60;
      const searchTerm = 'food';

  const fetchData = () => {
    try {
      

      const xhr = new XMLHttpRequest();
      const url = `${BASE_URL}?query=${searchTerm}&client_id=${ACCESS_KEY}&per_page=${PER_PAGE}&page=${1}`;
  
      xhr.open('GET', url, true);
  
      xhr.onload = function () {
        if (xhr.status >= 200 && xhr.status < 300) {
          const result = JSON.parse(xhr.responseText);
          setData(result);
        } else {
          console.error('Error fetching images:', xhr.statusText);
        }
      };
  
      xhr.onerror = function () {
        console.error('Network error while fetching images');
      };
  
      xhr.send();
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };
  
  useEffect(() => {
    fetchData();
  }, []);
  



  const [selectedImageId, setSelectedImageId] = useState(null);
 
  const PhotosData = async (imageId, imageUrl) => {
    const filename = "image.jpg";
    const fileUri = FileSystem.documentDirectory + filename;
  
    try {
      // Request MEDIA_LIBRARY permissions
      const { status } = await MediaLibrary.requestPermissionsAsync();
  
      if (status === 'granted') {
        const result = await FileSystem.downloadAsync(imageUrl, fileUri);
  
        if (result.status === 200) {
          await MediaLibrary.saveToLibraryAsync(fileUri);
          console.log('Image saved to gallery');
        } else {
          console.log('Failed to download image');
        }
      } else {
        console.log('Permission denied for saving to the library');
      }
    } catch (error) {
      console.error('Error downloading image:', error);
    }
  };
  
  const IMAGE_SIZE = 80
  const [indexs, setIndexs] = useState(0)
  const setActiveIndex = (index) => {
    setIndexs(index)
    topRef?.current?.scrollToOffset({
      offset: index * width,
      animated: true
    })
    if (index * (IMAGE_SIZE + 10) - IMAGE_SIZE / 2 > width / 2) {
      thumRef?.current?.scrollToOffset({
        offset: index * (IMAGE_SIZE + 10) - width / 2 + IMAGE_SIZE / 2,
        animated: true
      })
    } else {
      thumRef?.current?.scrollToOffset({
        offset: 0,
        animated: true
      })
    }
  }

  const [isDownloading, setIsDownloading] = useState(false);
  const [isDownloading1, setIsDownloading1] = useState(false);

  const Hides = () => {
    setIsDownloading1(!isDownloading1)

    setTimeout(() => {
      setIsDownloading1(false)

    }, 3000);
  }


  const handleDownload = () => {
    setIsDownloading(true);

    setTimeout(() => {
      setIsDownloading(false);
    }, 3000);
  };


  return (
    <View style={{ flex: 1, backgroundColor: '#0000' }}>
      <FlatList
        ref={topRef}
        data={data}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        pagingEnabled
        onMomentumScrollEnd={ev => {
          setActiveIndex(Math.floor(ev.nativeEvent.contentOffset.x / width))
        }}
        renderItem={({ item }) => (
          <View style={{ width, height }}>
            <Image source={{ uri: item.urls.regular }} style={[StyleSheet.absoluteFillObject]} />
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleDownload() +
                setSelectedImageId(item.id) +
                setTimeout(() => {
                  PhotosData(item.id, item.urls.regular)
                }, 3000) + Hides()
              }
              activeOpacity={0.7}
              disabled={isDownloading}>
              <Icon name="cloud-download" size={15} color="white" />
            </TouchableOpacity>
            {isDownloading1 ? <Text style={styles.buttonText}>{isDownloading ? 'Downloading...' : 'rgba(0, 0, 0, 0.5)'}</Text> : null}
          </View>
        )} />

      <FlatList
        ref={thumRef}
        style={{ position: 'absolute', top: 620 }}
        data={data}
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => setActiveIndex(index)}>
            <Image source={{ uri: item.urls.small }}
              style={{ width: IMAGE_SIZE, height: IMAGE_SIZE, margin: 5, borderRadius: 12, borderWidth: 1.5, borderColor: indexs === index ? '#fff' : null }} />
          </TouchableOpacity>
        )}
      />

    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    position: 'absolute', top: 40,
    left: 300,
  },
  buttonText: {
    color: '#4CAF50',
    position: 'absolute',
    fontSize: 14, left: 270, top: 80
  },
});
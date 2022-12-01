import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, ImageBackground, RefreshControl, ScrollView, Text, ToastAndroid, TouchableOpacity, View} from 'react-native';
import styles from './styles/styles';
import axios from 'axios';
import Login from './screens/Login';
import SignUp from './screens/SignUp';

export default function App() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  let getProducts = () => {
    axios.get('https://fakestoreapi.com/products').then(res => {
      setProducts([...res.data])
    });
  };

  let handleRefresh = () => {
    setRefresh(true);
    // getProducts()
    setTimeout(() => {
      setRefresh(false);
      ToastAndroid.show('Refreshed Successfully', 2000);
    }, 1500);
  };
  
  useEffect(() => {
    getProducts();
    products ? console.log(products) : null
  }, []);
  return (
    <>
      <ImageBackground blurRadius={0.5} source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQC79Yy4bMqUkPW3pAI42XkwqaGS9OhXuVUYAPLIBbxvKS54qgAYJKQAi4j_43awDobtuk&usqp=CAU',
        }} style={styles.wrapper}>
        <Text style={styles.heading}>Products</Text>
        <ScrollView refreshControl={
              <RefreshControl onRefresh={handleRefresh} refreshing={refresh} />
            } style={styles.container}>
          {
            products && products.length > 0 ? products.map(x => (
              <View key={x.id} style={styles.container}>
                <TouchableOpacity style={styles.productContainer}>
                  <Text style={styles.category}>{x.category.toUpperCase()}</Text>
                  <Image resizeMode='contain' style={styles.image} source={{uri:x.image}} />
                  <Text style={styles.title}>{x.title}</Text>
                  <Text style={styles.price}>${x.price}</Text>
                  <View style={styles.ratingContainer}>
                    <Text style={styles.ratings}>Rating: {x.rating.rate}</Text>
                    <Text style={styles.quantityAvailable}>Quantity Available: {x.rating.count}</Text>
                  </View>
                </TouchableOpacity>
              </View>
            )) : <ActivityIndicator size={90}/>
          }
        </ScrollView>
      </ImageBackground>
      {/* <Login/> */}
      {/* <SignUp/> */}
    </>
  );
}

import React from 'react';
import { StyleSheet, Text, View, Image, Button, Linking, SafeAreaView } from 'react-native';
import star from '../assets/star.png';

//Shows info of selected anime
export default function AnimeInfo({ route, item = route.params.item }) {

  return (
    <SafeAreaView style={styles.container}>

      <Text style={{ width: "80%", fontSize: 20, marginLeft: "5%", marginRight: "5%", color: "#A16E83", fontStyle: "italic", fontWeight: "bold" }}>{item.title}</Text>

      <Text style={{ width: "80%", fontSize: 15, marginLeft: "5%", marginRight: "5%", color: "#A16E83", fontStyle: "italic" }}>{item.synopsis}</Text>

      <Text style={{ width: "80%", height: 40, fontSize: 25, marginLeft: "5%", marginRight: "5%", color: "#A16E83", fontStyle: "italic", fontWeight: "bold" }}>{item.score}{" "}
        <Image
          source={star}
          style={{ width: 30, height: 30 }}
        />
      </Text>

      <Image
        style={{ width: "45%", height: 300, marginTop: 20, marginBottom: 10, borderRadius: 10 }}
        source={{
          uri: item.image_url
        }}
      />

      <Button
        title="Verkkosivulle"
        color="#A16E83"
        onPress={() => { Linking.openURL(item.url) }} 
        />

    </SafeAreaView>
  );
}

//Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E7E3D4',
    alignItems: 'center',
    justifyContent: 'center',
  }
})
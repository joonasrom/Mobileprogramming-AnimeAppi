import React, { useState, useEffect } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet, Text, View, Alert, FlatList, Button, TextInput, Image, TouchableOpacity, SafeAreaView, LogBox } from 'react-native';

//Short 10 item list so for now warning ignored...
LogBox.ignoreLogs(['VirtualizedLists should never be nested']); 

export default function AnimeList({ navigation }) {
  const [animeList, setAnimeList] = useState([]);
  const [bestAnimes, setBestAnimes] = useState([]);
  const [query, setQuery] = useState('')

  useEffect(() => {
    GetAnimes();
    GetBestAnimes();
  }, []);

  //Fetches data from API and sets it to animeList
  const GetAnimes = () => {
    const url = 'https://api.jikan.moe/v3/search/anime?q=' + query + '&order_by=title&sort=asc&limit=10'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setAnimeList(data.results)
      })
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }

  //Fetches most popular data from API and sets it to bestAnimes
  const GetBestAnimes = () => {
    const url = 'https://api.jikan.moe/v3/top/anime/1/bypopularity'
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setBestAnimes(data.top.slice(0, 5));
      })
      .catch((error) => {
        Alert.alert('Error', error)
      })
  }

  //Forwards query to GetAnimes
  const FindAnimes = () => {
    GetAnimes(query);
  }

  //List separator
  const listSeparator = () => {
    return (
      <View style={
        { height: 3, width: '90%', backgroundColor: '#E7E3D4', marginVertical: 10 }
      } />
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <TextInput
          placeholderTextColor="#A16E83"
          selectionColor="#A16E83"
          color="#A16E83"
          style={styles.inputField}
          value={query} placeholder='Hae animea... esim. Naruto'
          onChangeText={(query) => setQuery(query)}
          textAlign={'center'}
        />
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginLeft: "33%" }}>
            <Button
              title="Hae"
              color="#A16E83"
              onPress={FindAnimes}
            />
          </View>
          <View style={{ marginLeft: "5%" }}>
            <Button
              title="Chatti"
              color="#A16E83"
              onPress={() => { navigation.navigate("Chatti") }}
            />
          </View>
        </View>


        <View style={{ flexDirection: "row" }}>

          <View style={styles.sideContainer}>
            <Text style={{ fontSize: 20, color: "white", fontStyle: "italic", fontWeight: "bold" }}>Top 5</Text>
            <FlatList
              style={{ marginTop: 20 }}
              keyExtractor={item => item.url}
              renderItem={({ item }) =>
                <View>
                  <Text style={{ color: "white", fontStyle: "italic", fontWeight: "bold" }} onPress={() => { navigation.navigate("Info", { item: item }) }}>{item.title}</Text>
                </View>
              }
              ItemSeparatorComponent={listSeparator}
              data={bestAnimes}
            />
          </View>

          <View style={{ justifyContent: 'flex-end' }}>
            <FlatList
              style={{ marginLeft: '5%', marginTop: 20 }}
              keyExtractor={item => item.url}
              renderItem={({ item }) =>
                <View>
                  <Text
                    onPress={() => { navigation.navigate("Info", { item: item }) }}
                    style={{ width: 200, fontSize: 20, marginBottom: 5, borderRadius: 3, color: "#A16E83", textDecorationLine: "underline", fontStyle: "italic" }}>
                    {item.title}
                  </Text>
                  <TouchableOpacity onPress={() => { navigation.navigate("Info", { item: item }) }}>
                    <Image
                      style={{ width: "100%", height: 300, borderRadius: 10 }}
                      source={{
                        uri: item.image_url
                      }}
                    />
                  </TouchableOpacity>
                </View>
              }
              ItemSeparatorComponent={listSeparator}
              data={animeList}
            />
          </View>

        </View>

      </ScrollView>
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
  },
  inputField: {
    marginLeft: "15%",
    alignItems: 'center',
    width: 250,
    height: 40,
    borderColor: '#A16E83',
    borderWidth: 2,
    margin: 15,
    fontSize: 20,
    borderRadius: 10,
    backgroundColor: "#E7E3D4",
    fontStyle: "italic",
  },
  sideContainer: {
    justifyContent: 'flex-start',
    width: 100,
    marginRight: '5%',
    backgroundColor: "#A16E83",
    paddingTop: 10,
    paddingLeft: 5,
    paddingRight: 5,
    height: 350,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E7E3D4',
    paddingBottom: 15,
  }
});

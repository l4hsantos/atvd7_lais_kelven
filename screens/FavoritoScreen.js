import React, { useState, useEffect } from 'react';
import {View,Text,StyleSheet,TouchableOpacity,Image,FlatList,ActivityIndicator,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {collection,getDocs,} from 'firebase/firestore';
import {auth,db,} from '../firebase/firebaseConfig';

export default function FavoritoScreen({ navigation }) {

  const [lista, setLista] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    buscarFavoritos();

  }, []);

  async function buscarFavoritos() {

    try {

      const user = auth.currentUser;

      if (!user) return;

      const querySnapshot = await getDocs(
        collection(
          db,
          'usuarios',
          user.uid,
          'favoritos'
        )
      );

      const favoritos = [];

      querySnapshot.forEach((doc) => {

        favoritos.push(doc.data());

      });

      setLista(favoritos);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  }

  function renderItem({ item }) {

    return (

      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate('Detalhe', {
            codigo: item.cca2,
          })
        }
      >

        <Image
          source={{
            uri: item.bandeira,
          }}
          style={styles.image}
        />

        <View style={{ flex: 1 }}>

          <Text style={styles.country}>
            {item.nome}
          </Text>

          <Text style={styles.capital}>
            Capital: {item.capital}
          </Text>

        </View>

        <Ionicons
          name="heart"
          size={22}
          color="#FF3B30"
        />

      </TouchableOpacity>
    );
  }

  if (loading) {

    return (

      <View style={styles.loadingContainer}>

        <ActivityIndicator
          size="large"
          color="#0057FF"
        />

      </View>
    );
  }

  return (

    <View style={styles.container}>

      <View style={styles.header}>

        <Ionicons
          name="heart"
          size={22}
          color="#FFF"
        />

        <Text style={styles.headerTitle}>
          Favoritos
        </Text>

        <View style={{ width: 24 }} />

      </View>

      {

        lista.length === 0 ? (

          <View style={styles.emptyContainer}>

            <Ionicons
              name="heart-outline"
              size={80}
              color="#CCC"
            />

            <Text style={styles.emptyText}>
              Nenhum país favoritado
            </Text>

          </View>

        ) : (

          <FlatList
            data={lista}
            renderItem={renderItem}
            keyExtractor={(item) => item.cca2}
            contentContainerStyle={{
              padding: 15,
              paddingBottom: 120,
            }}
          />

        )
      }

      <View style={styles.bottomTab}>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate('Home')}
        >

          <Ionicons
            name="home-outline"
            size={22}
            color="#999"
          />

          <Text style={styles.inactiveTab}>
            Home
          </Text>

        </TouchableOpacity>

        <TouchableOpacity style={styles.tabItem}>

          <Ionicons
            name="heart"
            size={22}
            color="#0057FF"
          />

          <Text style={styles.activeTab}>
            Favoritos
          </Text>

        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          onPress={() =>
            navigation.navigate('Perfil')
          }
        >

          <Ionicons
            name="person-outline"
            size={22}
            color="#999"
          />

          <Text style={styles.inactiveTab}>
            Perfil
          </Text>

        </TouchableOpacity>

      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#F4F7FF',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  header: {
    backgroundColor: '#0057FF',
    paddingTop: 60,
    paddingBottom: 25,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerTitle: {
    color: '#FFF',
    fontSize: 22,
    fontWeight: 'bold',
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    elevation: 2,
  },

  image: {
    width: 75,
    height: 75,
    borderRadius: 12,
    marginRight: 15,
  },

  country: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  capital: {
    color: '#666',
    marginTop: 4,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  emptyText: {
    color: '#999',
    marginTop: 15,
    fontSize: 16,
  },

  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingVertical: 15,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 15,
  },

  tabItem: {
    alignItems: 'center',
  },

  activeTab: {
    color: '#0057FF',
    fontSize: 12,
    marginTop: 4,
    fontWeight: 'bold',
  },

  inactiveTab: {
    color: '#999',
    fontSize: 12,
    marginTop: 4,
  },

});
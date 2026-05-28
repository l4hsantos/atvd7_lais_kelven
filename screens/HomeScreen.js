import React, { useEffect, useState } from 'react';
import {View,Text,StyleSheet,TextInput,TouchableOpacity,Image, ActivityIndicator,ScrollView,} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  const [paises, setPaises] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    buscarPaises();
  }, []);

  async function buscarPaises() {
    try {
      const response = await fetch(
        'https://restcountries.com/v3.1/all?fields=name,capital,cca2'
      );
      const data = await response.json();
      const filtrados = data.filter(
        (item) => item?.name?.common && item?.cca2
      );
      const ordenados = filtrados.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );
      setPaises(ordenados);
    } catch (error) {
      console.log('ERRO API:', error);
    } finally {
      setLoading(false);
    }
  }

  const paisesFiltrados = paises.filter((item) =>
    item.name.common.toLowerCase().includes(pesquisa.toLowerCase())
  );

  function renderItem({ item }) {
    return (
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.8}
        onPress={() =>
          navigation.navigate('Detalhe', { codigo: item.cca2 })
        }
      >
        <View style={styles.cardLeft}>
          <Image
            source={{
              uri: `https://flagsapi.com/${item.cca2}/flat/64.png`,
            }}
            style={styles.flag}
          />
          <View>
            <Text style={styles.countryName}>{item.name.common}</Text>
            <Text style={styles.capital}>
              Capital: {item.capital?.[0] || 'N/A'}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#999" />
      </TouchableOpacity>
    );
  }

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0057FF" />
      </View>
    );
  }

  return (
    <View style={styles.wrapper}>

      {/* HEADER */}
      <View style={styles.header}>
        <Ionicons name="menu" size={24} color="#FFF" />
        <Text style={styles.headerTitle}>Países</Text>
        <Ionicons name="notifications-outline" size={24} color="#FFF" />
      </View>

      <View style={styles.searchContainer}>

        <Ionicons
          name="search-outline"
          size={20}
          color="#999"
        />

        <TextInput
          placeholder="Pesquisar país..."
          style={styles.searchInput}
          value={pesquisa}
          onChangeText={setPesquisa}
        />

      </View>

      <ScrollView
        style={styles.scroll}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >

        {
          paisesFiltrados.map((item) => (

            <TouchableOpacity
              key={item.cca2}
              style={styles.card}
              activeOpacity={0.8}
              onPress={() =>
                navigation.navigate('Detalhe', {
                  codigo: item.cca2,
                })
              }
            >

              <View style={styles.cardLeft}>

                <Image
                  source={{
                    uri: `https://flagsapi.com/${item.cca2}/flat/64.png`,
                  }}
                  style={styles.flag}
                />

                <View>

                  <Text style={styles.countryName}>
                    {item.name.common}
                  </Text>

                  <Text style={styles.capital}>
                    Capital: {item.capital?.[0] || 'N/A'}
                  </Text>

                </View>

              </View>

              <Ionicons
                name="chevron-forward"
                size={20}
                color="#999"
              />

            </TouchableOpacity>

          ))
        }

      </ScrollView>

      {/* FOOTER */}
      <View style={styles.bottomTab}>
        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Home')}
        >
          <Ionicons name="home" size={22} color="#0057FF" />
          <Text style={styles.activeTab}>Início</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Favoritos')}
        >
          <Ionicons name="heart-outline" size={22} color="#999" />
          <Text style={styles.inactiveTab}>Favoritos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.tabItem}
          activeOpacity={0.7}
          onPress={() => navigation.navigate('Perfil')}
        >
          <Ionicons name="person-outline" size={22} color="#999" />
          <Text style={styles.inactiveTab}>Perfil</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({

  wrapper: {
    flex: 1,
    backgroundColor: '#F4F7FF',
  },

  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F4F7FF',
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

  searchContainer: {
    backgroundColor: '#FFF',
    marginHorizontal: 15,
    marginTop: 15,
    marginBottom: 5,
    borderRadius: 14,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    height: 55,
    elevation: 3,
  },

  searchInput: {
    flex: 1,
    marginLeft: 10,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 15,
    paddingTop: 15,
    paddingBottom: 30,
  },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 16,
    padding: 15,
    marginBottom: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 2,
  },

  cardLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flag: {
    width: 55,
    height: 40,
    borderRadius: 6,
    marginRight: 15,
  },

  countryName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
  },

  capital: {
    color: '#777',
    marginTop: 4,
  },

  bottomTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFF',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    elevation: 20,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 10,
  },

  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
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
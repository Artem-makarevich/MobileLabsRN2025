import React from 'react';
import { View, FlatList, Text, StyleSheet, Image } from 'react-native';

const news = [
  {
    id: '1',
    title: 'Новий електричний автомобіль Tesla',
    date: '12.05.2025',
    summary: 'Tesla анонсувала випуск нової моделі електричного автомобіля, який може досягти 100 км/год за 3 секунди.',
    image: require('@/assets/images/image1.jpg')
  },
  {
    id: '2',
    title: 'Автономне водіння: революція чи міф?',
    date: '11.05.2025',
    summary: 'Багато компаній працюють над створенням автомобілів з автономним водінням. Що це означає для майбутнього автомобільної індустрії?',
    image: require('@/assets/images/image2.png')
  },
  {
    id: '3',
    title: 'Електромобілі vs бензинові авто: що обрати?',
    date: '10.05.2025',
    summary: 'Вибір між електромобілем та бензиновим авто стає все складнішим. Порівнюємо основні переваги та недоліки кожного варіанту.',
    image: require('@/assets/images/image3.jpeg')
  },
  {
    id: '4',
    title: 'Нове покоління гібридних автомобілів',
    date: '09.05.2025',
    summary: 'Гібридні автомобілі стають популярнішими завдяки поєднанню бензинових двигунів та електричних батарей для зменшення витрат пального.',
    image: require('@/assets/images/image4.jpg')
  },
  {
    id: '5',
    title: 'Як вибрати кращий автомобіль для сім’ї?',
    date: '08.05.2025',
    summary: 'Як правильно вибрати автомобіль для сім’ї, зважаючи на безпеку, комфорт та економічність?',
    image: require('@/assets/images/image1.jpg')
  },
];


const NewsItem = ({ item }) => (
  <View style={styles.newsItem}>
    <Image source={item.image} style={styles.image} />
    <View style={styles.textContainer}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.date}>{item.date}</Text>
      <Text style={styles.summary}>{item.summary}</Text>
    </View>
  </View>
);

const HomeScreen = () => (
  <View style={styles.container}>
    <Text style={styles.header}>Новини</Text>
    <FlatList
      data={news}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <NewsItem item={item} />}
    />
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 30,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  newsItem: {
    flexDirection: 'row',
    marginBottom: 15,
    alignItems: 'flex-start',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 6,
    marginRight: 10,
    backgroundColor: '#ccc',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontWeight: 'bold',
  },
  date: {
    color: '#888',
    fontSize: 12,
  },
  summary: {
    fontSize: 14,
    color: '#444',
  },
});

export default HomeScreen;

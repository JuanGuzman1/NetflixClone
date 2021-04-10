import * as React from "react";
import styles from "./styles";
import { Text, Image, FlatList, Pressable } from "react-native";
import categories from "../../assets/data/categories";
import {useNavigation} from '@react-navigation/native';
const firstCategory = categories.items[0];

interface HomeCategoryProps {
  category: {
    id: String;
    title: String;
    movies: {
      id: String;
      poster: String;
    }[];
  };
}

const HomeCategory = (props: HomeCategoryProps) => {
  const { category } = props;
  const navigation = useNavigation();
  const onMoviePress = (movie) => {
    navigation.navigate('MovieDetailsScreen', {id: movie.id});
  }
  return (
    <>
      <Text style={styles.title}>{category.title}</Text>
      <FlatList
        data={category.movies}
        renderItem={({ item }) => (
          <Pressable onPress={()=>onMoviePress(item)}>
            <Image style={styles.image} source={{ uri: item.poster }} />
          </Pressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HomeCategory;

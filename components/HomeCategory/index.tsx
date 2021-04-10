import * as React from "react";
import styles from "./styles";
import { Text, Image, FlatList } from "react-native";
import categories from "../../assets/data/categories";

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
  return (
    <>
      <Text style={styles.title}>{category.title}</Text>
      <FlatList
        data={category.movies}
        renderItem={({ item }) => (
          <Image style={styles.image} source={{ uri: item.poster }} />
        )}
        horizontal
        showsHorizontalScrollIndicator= {false}
      />
    </>
  );
};

export default HomeCategory;

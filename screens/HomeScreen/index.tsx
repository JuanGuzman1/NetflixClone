import * as React from "react";
import styles from "./styles";
import { Text, View, Image, FlatList } from "react-native";
import categories from "../../assets/data/categories";
import HomeCategory from "../../components/HomeCategory";

const firstCategory = categories.items[2];

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      {/** list of categories */}
      <FlatList
        data={categories.items}
        renderItem={({ item }) => <HomeCategory category={item} />}
      />
    </View>
  );
};

export default HomeScreen;

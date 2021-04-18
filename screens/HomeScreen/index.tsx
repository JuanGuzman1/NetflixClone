import React, {useEffect, useState} from "react";
import styles from "./styles";
import { Text, View, Image, FlatList } from "react-native";
import categories from "../../assets/data/categories";
import HomeCategory from "../../components/HomeCategory";
import {DataStore} from 'aws-amplify';
import {Category} from '../../models';


const firstCategory = categories.items[2];

const HomeScreen = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(()=>{
    const fetchCategories = async () => {
      setCategories(await DataStore.query(Category));
      //console.log(response);
    }

    fetchCategories();
  },[])

  return (
    <View style={styles.container}>
      {/** list of categories */}
      <FlatList
        data={categories}
        renderItem={({ item }) => <HomeCategory category={item} />}
      />
    </View>
  );
};

export default HomeScreen;

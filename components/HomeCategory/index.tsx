import React, {useEffect,useState} from "react";
import styles from "./styles";
import { Text, Image, FlatList, Pressable } from "react-native";
import categories from "../../assets/data/categories";
import {useNavigation} from '@react-navigation/native';
import {Category, Movie} from '../../models';
import { DataStore } from "@aws-amplify/datastore";

interface HomeCategoryProps {
  category: Category,
}

const HomeCategory = (props: HomeCategoryProps) => {
  const { category } = props;
  const navigation = useNavigation();
  const [movies, setMovies] = useState<Movie[]>([]);

  const onMoviePress = (movie: Movie) => {
    navigation.navigate('MovieDetailsScreen', {id: movie.id});
  }

  useEffect(()=>{
    const fetchMovies = async()=>{
      const result = (await DataStore.query(Movie)).filter((movie)=> movie.categoryID === category.id);
      setMovies(result)
    } 
    fetchMovies();
  },[])

  return (
    <>
      <Text style={styles.title}>{category.title}</Text>
      <FlatList
        data={movies}
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

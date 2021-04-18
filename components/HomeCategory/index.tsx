import React, {useEffect,useState} from "react";
import styles from "./styles";
import { Text, FlatList,} from "react-native";
import {Category, Movie} from '../../models';
import { DataStore } from "@aws-amplify/datastore";
import MovieItem from "../MovieItem";

interface HomeCategoryProps {
  category: Category,
}

const HomeCategory = (props: HomeCategoryProps) => {
  const { category } = props;
  const [movies, setMovies] = useState<Movie[]>([]);

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
        renderItem={({ item }) => 
         <MovieItem movie={item}/>
        }
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </>
  );
};

export default HomeCategory;

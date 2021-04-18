import React, { useState, useEffect } from "react";
import {
  View,
  Image,
  Text,
  Pressable,
  FlatList,
  ActivityIndicator,
} from "react-native";
import styles from "./styles";
import { DataStore } from "@aws-amplify/datastore";
import { useRoute } from "@react-navigation/native";
import { Movie, Season, Episode } from "../../models";
import movie from "../../assets/data/movie";
import { Picker } from "@react-native-picker/picker";
import {
  AntDesign,
  Entypo,
  Feather,
  Ionicons,
  MaterialIcons,
} from "@expo/vector-icons";
import EpisodeItem from "../../components/EpisodeItem";
import VideoPlayer from "../../components/VideoPlayer";

const firstSeason = movie.seasons.items[0];
const firstEpisode = firstSeason.episodes.items[0];

const MovieDetailsScreen = () => {
  const [movie, setMovie] = useState<Movie | undefined>(undefined);
  const [seasons, setSeasons] = useState<Season[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);

  const [currentSeason, setCurrentSeason] = useState<Season | undefined>(
    undefined
  );
  const [currentEpisode, setCurrentEpisode] = useState<Episode | undefined>(
    undefined
  );

  const seasonNames = seasons ? seasons.map((season) => season.name) : [];
  const route = useRoute();

  useEffect(() => {
    const fetchMovie = async () => {
      setMovie(await DataStore.query(Movie, route?.params?.id));
    };
    fetchMovie();
  }, []);

  useEffect(() => {
    if (!movie) {
      return;
    }
    const fetchSeasons = async () => {
      const movieSeasons = (await DataStore.query(Season)).filter(
        (s) => s.movie.id === movie.id
      );
      setSeasons(movieSeasons);
      setCurrentSeason(movieSeasons[0]);
    };
    fetchSeasons();
  }, [movie]);

  useEffect(()=>{
    if(!currentSeason){
      return;
    }

    const fetchEpisodes = async () => {
      const seasonEpisode = (await DataStore.query(Episode)).filter(e => e.season.id === currentSeason?.id);
      setEpisodes(seasonEpisode);
      setCurrentEpisode(seasonEpisode[0]);
    }

    fetchEpisodes();
  },[currentSeason])

  if (!movie) {
    return <ActivityIndicator />;
  }

  return (
    <View>
      {currentEpisode && <VideoPlayer episode={currentEpisode} />}

      <FlatList
        data={episodes}
        renderItem={({ item }) => (
          <EpisodeItem episode={item} onPress={setCurrentEpisode} />
        )}
        style={{ marginBottom: 250 }}
        ListHeaderComponent={
          <View style={{ padding: 12 }}>
            <Text style={styles.title}>{movie.title}</Text>
            <View style={{ flexDirection: "row" }}>
              <Text style={styles.match}>98% match</Text>
              <Text style={styles.year}>{movie.year}</Text>
              <View style={styles.ageContainer}>
                <Text style={styles.age}>12+</Text>
              </View>
              <Text style={styles.year}>{movie.numberOfSeasons} seasons</Text>
              <MaterialIcons name="hd" size={24} color="white" />
            </View>
            <Pressable
              onPress={() => console.warn("play")}
              style={styles.playButton}
            >
              <Text style={styles.playButtonText}>
                <Entypo name="controller-play" size={16} color={"black"} /> Play
              </Text>
            </Pressable>
            <Pressable
              onPress={() => console.warn("download")}
              style={styles.downloadButton}
            >
              <Text style={styles.downloadButtonText}>
                <AntDesign name="download" size={16} color={"white"} /> Download
              </Text>
            </Pressable>

            <Text style={{ color: "white", marginVertical: 10 }}>
              {movie.plot}
            </Text>
            <Text style={styles.year}>Cast: {movie.cast}</Text>
            <Text style={styles.year}>Creator: {movie.creator}</Text>

            {/*row with icons buttons */}
            <View style={{ flexDirection: "row", marginTop: 20 }}>
              <View style={{ alignItems: "center", marginHorizontal: 20 }}>
                <AntDesign name="plus" size={24} color={"white"} />
                <Text style={{ color: "darkgrey", marginTop: 5 }}>My List</Text>
              </View>
              <View style={{ alignItems: "center", marginHorizontal: 20 }}>
                <Feather name="thumbs-up" size={24} color={"white"} />
                <Text style={{ color: "darkgrey", marginTop: 5 }}>Rate</Text>
              </View>
              <View style={{ alignItems: "center", marginHorizontal: 20 }}>
                <Ionicons name="share-social" size={24} color={"white"} />
                <Text style={{ color: "darkgrey", marginTop: 5 }}>Share</Text>
              </View>
            </View>
            {currentSeason && (
              <Picker
                style={{ color: "white", width: 130 }}
                dropdownIconColor={"white"}
                selectedValue={currentSeason.name}
                onValueChange={(itemValue, itemIndex) => {
                  setCurrentSeason(seasons[itemIndex]);
                }}
              >
                {seasonNames.map((seasonName) => (
                  <Picker.Item
                    label={seasonName}
                    value={seasonName}
                    key={seasonName}
                  />
                ))}
              </Picker>
            )}
          </View>
        }
      />
    </View>
  );
};

export default MovieDetailsScreen;

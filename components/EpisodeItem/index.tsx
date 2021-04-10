import { AntDesign } from '@expo/vector-icons';
import React from 'react';
import {View,Text, Image} from 'react-native';
import styles from './styles';

interface EpisodeItemProps{
    episode: {
        id: String,
        title: String,
        poster: String,
        duration: String,
        plot: String,
        video: String
    }
}

const EpisodeItem = (props: EpisodeItemProps) => {
    const {episode} = props;
    return (
        <View style={{margin: 10}}>
            <View style={styles.row}>
                <Image style={styles.image} source={{uri: episode.poster}}/>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{episode.title}</Text>
                    <Text style={styles.duration}>{episode.duration}</Text>
                </View>
                <AntDesign name="download" size={24} color={'white'}/>
            </View>
            <Text style={styles.plot}>{episode.plot}</Text>
        </View>
    );
}

export default EpisodeItem;
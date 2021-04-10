import React, { useEffect, useRef, useState } from "react";
import { View, Text } from "react-native";
import { Episode } from "../../types";
import { Video } from "expo-av";
import { Playback } from "expo-av/build/AV";
import styles from "./styles";

interface VideoPlayerProps {
  episode: Episode;
}

const VideoPlayer = (props: VideoPlayerProps) => {
  const { episode } = props;
  const [status, setStatus] = useState({});
  const video = useRef<Playback>(null);
 

  useEffect(() => {
    if (!video) {
      return;
    }
    (async () => {
      await video?.current?.unloadAsync();
      await video?.current?.loadAsync({ uri: episode.video }, {}, false);
    })();
  }, [episode]);


  return (
    <View>
      <Video
        ref={video}
        style={styles.video}
        source={{ uri: episode.video }}
        resizeMode="contain"
        posterSource={{ uri: episode.poster }}
        usePoster
        posterStyle={{ resizeMode: "cover" }}
        useNativeControls
        onPlaybackStatusUpdate={(status) => setStatus(() => status)}
      />
    </View>
  );
};

export default VideoPlayer;

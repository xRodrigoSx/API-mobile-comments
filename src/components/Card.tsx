import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { Comment, Post } from "../types/Post";
import { useState } from "react";
import axios from "axios";
import { baseUrl } from "../utils/constants";

interface Props {
  post: Post;
}

const Card = ({ post }: Props) => {
  const [openComment, setOpenComments] = useState<boolean>(false);
  const [commentsList, setCommentsList] = useState<Comment[]>([]);

  const getComments = async () => {
    try {
      const response = await axios.get<Comment[]>(
        `${baseUrl}/comments?postId=${post.id}`
      );
      setCommentsList(response.data);
    } catch (error) { }
  };

  const handleOpen = async () => {
    if (!openComment) {
      await getComments();
    }
    setOpenComments(!openComment);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.title}</Text>
      <Text style={styles.body}>{post.body}</Text>
      <TouchableOpacity onPress={handleOpen}>
        <AntDesign
          name="message1"
          size={30}
          color="#fff"
          style={{ marginBottom: 10 }}
        />
      </TouchableOpacity>
      {openComment && (
        <FlatList
          data={commentsList}
          renderItem={({ item }) => (
            <View style={styles.comments}>
              <Text style={styles.comment}>
                {item.name} - {item.email}
              </Text>
              <View style={styles.comm}>
                <Text style={styles.comment}>{item.body}</Text>
                <View>
                <AntDesign name="hearto" size={24} color="gray"/>
                <Text style={{color:"gray"}}>210</Text>
              </View>
              </View>
              <Text style={styles.actions}>Responder        Ver tradução</Text>
              <Text style={styles.morecomments}> Ver mais 3 respostas </Text>
            </View>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {

    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginRight: 30,
    marginLeft: 5,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    color: "#fff",
    marginBottom: 10,
  },
  body: {
    fontSize: 18,
    marginBottom: 10,
    color: "#fff",
  },
  comments: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
  },
  comment: {
    fontSize: 16,
    color: "#fff",
    marginBottom: 5,
    marginRight: 38
  },
  actions: {
    marginBottom: 10,
    color: "gray"
  },
  morecomments: {
    color: "gray",
    left: "5%",
    justifyContent: "center",
    marginBottom: 10,
  },
  comm: {
    flexDirection: "row",
  }
});

export default Card;
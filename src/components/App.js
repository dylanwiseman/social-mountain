import React, { Component } from "react";
import axios from "axios";
import Post from "./Post/Post.js";

import "./App.css";

import Header from "./Header/Header";
import Compose from "./Compose/Compose";

class App extends Component {
  state = {
    posts: [],
    input: "",
  };

  handleChange = (val) => {
    this.setState({ input: val });
  };

  handleClick = (element) => {
    let newPosts = this.state.posts.filter((post) =>
      post.text.includes(element)
    );
    this.setState({ posts: newPosts, input: "" });
  };

  async componentDidMount() {
    try {
      const { data } = await axios.get(
        `https://practiceapi.devmountain.com/api/posts`
      );
      this.setState({ posts: data });
    } catch (error) {
      console.log("error");
    }
  }

  async updatePost(id, text) {
    try {
      const { data } = await axios.put(
        `https://practiceapi.devmountain.com/api/posts?id=${id}`,
        { text }
      );
      this.setState({ posts: data });
    } catch (error) {
      console.log(error);
    }
  }

  async deletePost(id) {
    try {
      const { data } = await axios.delete(
        `https://practiceapi.devmountain.com/api/posts?id=${id}`
      );
      this.setState({ posts: data });
    } catch (error) {
      console.log(error);
    }
  }

  async createPost(text) {
    try {
      const { data } = await axios.post(
        `https://practiceapi.devmountain.com/api/posts`,
        { text }
      );
      this.setState({ posts: data });
    } catch (error) {
      console.log(error);
    }
  }

  async searchPost(searchTerm) {
    try {
      const { data } = await axios.get(
        `https://practiceapi.devmountain.com/api/posts?=${searchTerm}`
      );
      this.setState({ posts: data });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { posts } = this.state;

    return (
      <div className="App__parent">
        <Header
          searchPost={this.searchPost}
          handleChange={this.handleChange}
          handleClick={this.handleClick}
          input={this.state.input}
        />

        <section className="App__content">
          <Compose createPostFn={this.createPost} />
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                id={post.id}
                text={post.text}
                date={post.date}
                updatePostFn={this.updatePost}
                deletePostFn={this.deletePost}
              />
            );
          })}
        </section>
      </div>
    );
  }
}

export default App;

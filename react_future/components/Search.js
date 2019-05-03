import React from 'react'
import { StyleSheet, View, TextInput, Button, FlatList, Text, ActivityIndicator } from 'react-native'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText } from '../API/TMDBApi'
import GradientButton from 'react-native-gradient-buttons';
import * as firebase from 'firebase';

class Search extends React.Component {

    constructor(props) {
        super(props);

        this.page = 0
        this.totalPages = 0
        this.state = {
            films: [],
            isLoading: false
        }
        this.searchedText = ""
    }

    _loadFilms() {
        if (this.searchedText.length > 0) {

            this.setState({ isLoading: true })

            firebase.database().ref('/offers/')
                .once('value').then((snapshot) => {

                    snapshot.forEach(offer => {
                        this.setState({
                            films: this.state.films.concat(offer.val()),
                        })
                    });

                    this.setState({ isLoading: false })

                }, (err) => {
                    console.log(err);
                    this.setState({ isLoading: true });
                });

        }
    }


    /*   _loadFilms() {
          if (this.searchedText.length > 0) {
              this.setState({ isLoading: true })
              getFilmsFromApiWithSearchedText(this.searchedText, this.page + 1).then(data => {
                  this.page = data.page
                  this.totalPages = data.total_pages
                  console.log(data.results);
                  this.setState({
                      films: this.state.films.concat(data.results),
                      isLoading: false
                  })
              }
              )
          }
      } */

    _searchTextInputChanged(text) {
        this.searchedText = text
    }

    _searchFilms() {
        this.page = 0
        this.totalPages = 0
        this.setState({
            films: []
        }, () => {
            this._loadFilms()
        })
    }

    _displayDetailForFilm = (idFilm) => {
        this.props.navigation.navigate("FilmDetail", { idFilm: idFilm })
    }

    render() {

        if (this.state.isLoading) {
            return (
                <View style={styles.loading_container}>
                    <ActivityIndicator size='large' />
                </View>
            )
        }

        if (this.state.films.length > 0)
            return (
                <View style={styles.main_container}>
                    <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textInput} placeholder="Quoi ?" />
                    <TextInput style={styles.textInput_city} placeholder="Où ?" />

                    <GradientButton
                        style={{ marginVertical: 8, marginLeft: 80 }}
                        text="Rechercher"
                        textSyle={{ fontSize: 10 }}
                        gradientBegin="#1f99ca"
                        gradientEnd="#52f7ff"
                        gradientDirection="diagonal"
                        height={30}
                        width={250}
                        radius={30}
                        impact
                        impactStyle='Light'
                        onPressAction={() => this._searchFilms()}
                    />

                    <FlatList
                        data={this.state.films}
                        extraData={this.state.films}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm} />}
                    />

                </View>
            )
        else {
            console.log(this.state.films);
            return (
                <View style={styles.main_container}>
                    <TextInput onSubmitEditing={() => this._searchFilms()} onChangeText={(text) => this._searchTextInputChanged(text)} style={styles.textInput} placeholder="Quoi ?" />
                    <TextInput style={styles.textInput_city} placeholder="Où ?" />

                    <GradientButton
                        style={{ marginVertical: 8, marginLeft: 80 }}
                        text="Rechercher"
                        textSyle={{ fontSize: 10 }}
                        gradientBegin="#1f99ca"
                        gradientEnd="#52f7ff"
                        gradientDirection="diagonal"
                        height={30}
                        width={250}
                        radius={30}
                        impact
                        impactStyle='Light'
                        onPressAction={() => this._searchFilms()}
                    />

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    main_container: {
        flex: 1,
        backgroundColor: '#dddddd'
    },
    textInput: {
        borderRadius: 30, backgroundColor: '#fafafa', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, width: 400, marginTop: 25, marginLeft: 6
    },
    textInput_city: {
        borderRadius: 30, backgroundColor: '#fafafa', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, width: 400, marginTop: 5, marginLeft: 6, marginBottom: 5
    },
    loading_container: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 100,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
})

export default Search
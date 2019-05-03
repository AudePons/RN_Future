// Loading.js
import React from 'react'
import {
    StyleSheet, Text, TextInput, View, Button, ActivityIndicator
} from 'react-native'
import * as firebase from 'firebase';

export default class Loading extends React.Component {

    constructor(props) {
        super(props);
    }

    componentWillMount() {

        firebase.auth().onAuthStateChanged((user) => {
            if (user != null) {
                let userId = firebase.auth().currentUser.uid;
                firebase.database().ref('/users/' + userId).once('value').then((snapshot) => {

                    let prenom = (snapshot.val() && snapshot.val().prenom);
                    let nom = (snapshot.val() && snapshot.val().nom);
                    let cp = (snapshot.val() && snapshot.val().cp);
                    let ville = (snapshot.val() && snapshot.val().ville);
                    let telephone = (snapshot.val() && snapshot.val().telephone);

                    if (
                        prenom !== null
                        && nom !== null
                        && cp !== null
                        && telephone !== null
                    )
                        this.props.navigation.navigate('Main');
                    else
                        this.props.navigation.navigate('CompleteProfile');

                });
            } else {
                this.props.navigation.navigate('Auth');
            }

            return user;
        });

    }

    render() {
        return (<View style={styles.container}>
            <ActivityIndicator size="large" color="#0000ff" />
        </View>);
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textInput: {
        height: 40,
        width: '90%',
        borderColor: 'gray',
        borderWidth: 1,
        marginTop: 8
    }
})
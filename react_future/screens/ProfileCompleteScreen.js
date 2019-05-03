import * as React from 'react';
import { TextInput, StyleSheet, Text, View, Image, Button, ScrollView, TouchableHighlight } from 'react-native';
import * as firebase from 'firebase';
import GradientButton from 'react-native-gradient-buttons';
import { ImagePicker } from 'expo';
import { Permissions } from 'expo';

export default class CompleteProfile extends React.Component {
    state = {
        prenom: '',
        nom: '',
        telephone: '',
        cp: '',
        ville: '',
        adresse: '',
        position: '',
        description: '',
        website: '',
        image: ''
    };

    constructor(props) {
        super(props);
        userId = firebase.auth().currentUser.uid;
    }

    handleProfileSave() {

        const { prenom,
            nom,
            telephone,
            cp,
            ville,
            adresse,
            position,
            description,
            website
        } = this.state;

        if (prenom != "" && nom != "" && telephone != "" && cp != "") {
            firebase.database().ref().child('users').child(userId).set({
                prenom,
                nom,
                telephone,
                cp,
                ville,
                adresse,
                position,
                description,
                website
            }).then(() => {
                this.props.navigation.navigate('Main');
            });
        } else {
            console.log(this.state);
        }
    }

    handleLogout() {
        firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        }, function (error) {
            console.error('Sign Out Error', error);
        });
    }

    componentWillMount() {
        let userId = firebase.auth().currentUser.uid;
        return firebase.database().ref('/users/' + userId).once('value').then(function (snapshot) {
            let name = (snapshot.val() && snapshot.val().name) || 'Anonymous';

            if (name === 'Anonymous')
                this.props.navigation.navigate('Auth');
            else
                this.setState({ name });
        });
    }

    async handleImagePicker() {
        let permission = await Permissions.askAsync(Permissions.CAMERA_ROLL);
        if (permission.status === 'granted') {
            let imagePicker = await ImagePicker.launchImageLibraryAsync();
            let userId = firebase.auth().currentUser.uid;

            if (!imagePicker.cancelled) {
                this.uploadImage(imagePicker.uri, userId)
                    .then((success) => {
                        this.setState({ image: 'images/' + userId });
                        console.log(success.getDownloadURL());
                        console.log('success');
                    }, (err) => {
                        console.log(err);
                        console.log('Photo did not upload.');
                    })
            }
        } else {
            console.log(permission);
            console.log('Permission denied to access camera roll');
        }
    }

    async uploadImage(uri, name) {
        const resp = await fetch(uri);
        const blob = await resp.blob();

        let firestore = firebase.storage().ref().child('images/' + name + '.jpg');
        return firestore.put(blob);
    }

    render() {
        return (
            <ScrollView style={styles.container}>

                <View style={styles.header}>
                    <View style={styles.headerContent}>

                        <TouchableHighlight onPress={() => this.handleImagePicker()}>
                            <Image style={styles.avatar}
                                source={{ uri: 'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png' }}
                            />
                        </TouchableHighlight>
                        <Text style={styles.name}>Choisissez votre photo</Text>

                    </View>
                </View>

                <View style={styles.body}>

                    <View>
                        <TextInput
                            style={{
                                marginBottom: 15,
                                borderRadius: 30,
                                backgroundColor: '#fafafa',
                                paddingTop: 10,
                                paddingBottom: 10,
                                paddingLeft: 20,
                                width: 330,
                                marginTop: 20
                            }}
                            autoCapitalize="none"
                            placeholder="Prénom*"
                            onChangeText={prenom => { this.setState({ prenom }) }}
                            value={this.state.prenom}
                        />
                    </View>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Nom*"
                            onChangeText={nom => this.setState({ nom })}
                            value={this.state.nom}
                        />
                    </View>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Télépone*"
                            onChangeText={telephone => this.setState({ telephone })}
                            value={this.state.telephone}
                        />
                    </View>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Code postal*"
                            onChangeText={cp => this.setState({ cp })}
                            value={this.state.cp}
                        />
                    </View>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Ville"
                            onChangeText={ville => this.setState({ ville })}
                            value={this.state.ville}
                        />
                    </View>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Adresse"
                            onChangeText={adresse => this.setState({ adresse })}
                            value={this.state.adresse}
                        />
                    </View>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Position"
                            onChangeText={position => this.setState({ position })}
                            value={this.state.position}
                        />
                    </View>

                    <View>
                        <TextInput
                            style={styles.textInput}
                            autoCapitalize="none"
                            placeholder="Site internet"
                            onChangeText={website => this.setState({ website })}
                            value={this.state.website}
                        />
                    </View>

                    <View>
                        <TextInput
                            style={{
                                marginBottom: 15, borderRadius: 30, backgroundColor: '#fafafa', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, width: 330, height: 200
                            }}
                            multiline={true}
                            numberOfLines={4}
                            autoCapitalize="none"
                            placeholder="Description"
                            onChangeText={description => this.setState({ description })}
                            value={this.state.description}
                        />
                    </View>

                    <View>
                        <GradientButton
                            style={{ marginVertical: 8 }}
                            text="Enregistrer"
                            textSyle={{ fontSize: 8 }}
                            gradientBegin="#1f99ca"
                            gradientEnd="#52f7ff"
                            gradientDirection="diagonal"
                            height={50}
                            width={330}
                            radius={30}
                            impact
                            impactStyle='Light'
                            onPressAction={this.handleProfileSave.bind(this)}
                        />
                    </View>

                    <View>
                        <GradientButton
                            style={{ marginVertical: 8 }}
                            text="Se déconnecter"
                            textSyle={{ fontSize: 12 }}
                            gradientBegin="#e74c3c"
                            gradientEnd="#c0392b"
                            gradientDirection="diagonal"
                            height={50}
                            width={330}
                            radius={30}
                            impact
                            impactStyle='Light'
                            onPressAction={this.handleLogout}
                        />
                    </View>
                </View>

            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    textInput: {
        marginBottom: 15, borderRadius: 30, backgroundColor: '#fafafa', paddingTop: 10, paddingBottom: 10, paddingLeft: 20, width: 330
    },
    header: {
        backgroundColor: "#3a3a3a",
    },
    headerContent: {
        padding: 30,
        alignItems: 'center',
    },
    avatar: {
        width: 130,
        height: 130,
        borderRadius: 63,
        borderWidth: 4,
        borderColor: "white",
        marginBottom: 10,
    },
    name: {
        fontSize: 22,
        color: "white",
        fontWeight: '600',
    },
    userInfo: {
        fontSize: 16,
        color: "#d2d2d2",
        fontWeight: '600',
    },
    body: {
        backgroundColor: "#efefef",
        alignItems: 'flex-start',
        paddingLeft: 40,
        paddingRight: 40,
        paddingBottom: 15,

    },
    item: {
        flexDirection: 'row',
        backgroundColor: "#dddddd",
        marginTop: 10,
        paddingBottom: 10,
        paddingRight: 10,
        paddingLeft: 10,
        borderRadius: 10,

    },
    infoContent: {
        flex: 1,
        alignItems: 'flex-start',
        paddingLeft: 5
    },
    iconContent: {

        alignItems: 'flex-end',
        paddingRight: 5,
    },
    icon: {
        width: 30,
        height: 30,
        marginTop: 18,
    },
    info: {
        fontSize: 18,
        marginTop: 20,
        color: "black",
    },
    bouton: {
        flexDirection: "row", justifyContent: "center", alignItems: 'center'
    }
});
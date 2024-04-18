import firebase from 'firebase/compat';
import { getDatabase, ref, set } from 'firebase/database';
import { useEffect, useState } from "react";
import { Alert, Platform, FlatList, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Card, Text, TextInput } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import { StoreList } from './StoreList';

export type Store = {
    id?: string,
    name?: string,
    city?: string,
    address?: string,
    phoneNumber?: string
}

const StoreManager = () => {

    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [city, setCity] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [phoneNumber, setPhoneNumber] = useState<string>('');

    const [loading, setLoading] = useState(true);

    const [stores, setStores] = useState<Store[]>([]);

    const [post, setPost] = useState(false);

    const [submitted, setSubmitted] = useState(false);

    useEffect(() => {
        setSubmitted(false);
        const fetchStores = async () => {
            firebase.database().ref('/stores').on('value', (snapshot) => {
                setStores([]);

                snapshot.forEach((item) => {
                    const store: Store = {
                        id: item.key,
                        name: item.val().name,
                        address: item.val().address,
                        city: item.val().city,
                        phoneNumber: item.val().phoneNumber
                    }
                    setStores(old => [...old, store].reverse());
                });
                setLoading(false);
            })
        }
        fetchStores();
    }, [post])

    const postStore = async () => {

        let store: Store;

        setSubmitted(true);

        if (address === '' || city === '' || name === '' || phoneNumber === '') {
            return;
        }

        if (id === '') {
            store = {
                address: address,
                city: city,
                name: name,
                phoneNumber: phoneNumber
            }
        } else {
            store = {
                id: id,
                address: address,
                city: city,
                name: name,
                phoneNumber: phoneNumber
            }
        }


        const uuid = id === '' ? uuidv4() : id;

        const database = getDatabase();
        const storeRef = ref(database, 'stores/' + uuid);
        set(storeRef, store);

        setId('');
        setName('');
        setCity('');
        setAddress('');
        setPhoneNumber('');

        setPost(!post);

    }

    const loadStore = (key: string, data: Store) => {
        setId(key);
        setName(data.name!);
        setCity(data.city!);
        setAddress(data.address!);
        setPhoneNumber(data.phoneNumber!);
    }

    const deleteStore = async (data: Store) => {
        if (Platform.OS === 'web') {
            const result = window.confirm(['Aviso', 'Deseja realmente excluir a loja?'].filter(Boolean).join('\n'));
            if (result) {
                await firebase.database().ref('/stores').child(data.id!).remove();
                setPost(!post);
            } else {
                return;
            }
        } else {
            Alert.alert('Aviso', 'Deseja realmente excluir a loja?', [{
                text: 'Não',
                onPress: () => { },
                style: 'cancel'
            },
            {
                text: 'Sim',
                onPress: async () => {
                    await firebase.database().ref('/stores').child(data.id!).remove();
                    setPost(!post);
                }
            }])
        }

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Nova loja</Text>
                </View>
                <View style={{ width: '100%' }}>
                    <Card mode="contained" style={{ backgroundColor: '#fff' }}>
                        <Card.Content>
                            <Text variant="bodyMedium" children></Text>
                            <TextInput
                                mode="outlined"
                                label="Nome"
                                outlineColor="#3a7dc9"
                                activeOutlineColor="#3a7dc9"
                                onChangeText={(value) => setName(value)}
                                value={name}
                            />
                            {submitted && name === '' ?
                                <View>
                                    <Text>O nome não pode estar em branco!</Text>
                                </View>
                                : null
                            }
                            <TextInput
                                style={styles.margin}
                                mode="outlined"
                                label="Cidade"
                                outlineColor="#3a7dc9"
                                activeOutlineColor="#3a7dc9"
                                onChangeText={(value) => setCity(value)}
                                value={city}
                            />
                            {submitted && city === '' ?
                                <View>
                                    <Text>A cidade não pode estar em branco!</Text>
                                </View>
                                : null
                            }
                            <TextInput
                                style={styles.margin}
                                mode="outlined"
                                label="Endereço"
                                outlineColor="#3a7dc9"
                                activeOutlineColor="#3a7dc9"
                                onChangeText={(value) => setAddress(value)}
                                value={address}
                            />
                            {submitted && address === '' ?
                                <View>
                                    <Text>O endereço não pode estar em branco!</Text>
                                </View>
                                : null
                            }
                            <TextInput
                                style={styles.margin}
                                mode="outlined"
                                label="Telefone"
                                outlineColor="#3a7dc9"
                                activeOutlineColor="#3a7dc9"
                                onChangeText={(value) => setPhoneNumber(value)}
                                value={phoneNumber}
                            />
                            {submitted && phoneNumber === '' ?
                                <View>
                                    <Text>O telefone não pode estar em branco!</Text>
                                </View>
                                : null
                            }
                        </Card.Content>
                    </Card>
                </View>
                <View style={{}}>
                    <TouchableOpacity activeOpacity={0.8} style={{
                        backgroundColor: '#3a7dc9',
                        padding: 15,
                        borderRadius: 5,
                        marginTop: 20
                    }}
                        onPress={postStore}>
                        <Text style={{ color: '#fff' }}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%' }}>
                    <Text style={styles.listar}>Listagem de lojas</Text>
                    {loading ?
                        (
                            <ActivityIndicator color="#121212" size={45} />
                        ) :
                        (
                            <FlatList
                                keyExtractor={item => item.id!}
                                data={stores}
                                renderItem={({ item }) => (
                                    <StoreList data={item} deleteItem={() => deleteStore(item)}
                                        editItem={() => loadStore(item.id!, item)} />
                                )}
                            />
                        )
                    }
                </View>


            </View>
        </ScrollView>
    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'
    },
    title: {
        marginTop: 50,
        marginBottom: 20,
        fontSize: 30
    },
    margin: {
        marginTop: 15
    },
    listar: {
        fontSize: 20,
        marginTop: 30,
        textAlign: 'center'
    }
})

export default StoreManager;
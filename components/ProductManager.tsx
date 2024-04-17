import firebase from 'firebase/compat';
import { getDatabase, ref, set } from 'firebase/database';
import { useEffect, useState } from "react";
import { Alert, FlatList, Platform, ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { ActivityIndicator, Card, Text, TextInput } from 'react-native-paper';
import { v4 as uuidv4 } from 'uuid';
import { ProductList } from './ProductList';

export type Product = {
    id?: string,
    name?: string,
    price?: string,
    category?: string,
    quantity?: string
}

const ProductManager = () => {

    const [id, setId] = useState<string>('');
    const [name, setName] = useState<string>('');
    const [price, setPrice] = useState<string>('');
    const [category, setCategory] = useState<string>('');
    const [quantity, setQuantity] = useState<string>('');

    const [loading, setLoading] = useState(true);

    const [products, setProducts] = useState<Product[]>([]);

    const [post, setPost] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            firebase.database().ref('/products').on('value', (snapshot) => {
                setProducts([]);

                snapshot.forEach((item) => {
                    const product: Product = {
                        id: item.key,
                        name: item.val().name,
                        price: item.val().price,
                        category: item.val().category,
                        quantity: item.val().quantity
                    }
                    setProducts(old => [...old, product].reverse());
                });
                setLoading(false);
            })
        }
        fetchProducts();
    }, [post])

    const postProduct = async () => {

        let product: Product;

        if (id === '') {
            product = {
                price: price,
                category: category,
                name: name,
                quantity: quantity
            }
        } else {
            product = {
                id: id,
                price: price,
                category: category,
                name: name,
                quantity: quantity
            }
        }


        const uuid = id === '' ? uuidv4() : id;

        const database = getDatabase();
        const productRef = ref(database, 'products/' + uuid);
        set(productRef, product);

        setId('');
        setName('');
        setPrice('');
        setCategory('');
        setQuantity('');

        setPost(true);

    }

    const loadProduto = (key: string, data: Product) => {
        setId(key);
        setName(data.name!);
        setPrice(data.price!);
        setCategory(data.category!);
        setQuantity(data.quantity!);
    }

    const deleteProduto = async (data: Product) => {
        if (Platform.OS === 'web') {
            const result = window.confirm(['Aviso', 'Deseja realmente excluir o produto?'].filter(Boolean).join('\n'));
            if (result) {
                await firebase.database().ref('/products').child(data.id!).remove();
                setPost(true);
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
                    await firebase.database().ref('/products').child(data.id!).remove();
                    setPost(true);
                }
            }])
        }

    }

    return (
        <ScrollView>
            <View style={styles.container}>
                <View>
                    <Text style={styles.title}>Novo produto</Text>
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
                            <TextInput
                                style={styles.margin}
                                mode="outlined"
                                label="Preço"
                                outlineColor="#3a7dc9"
                                activeOutlineColor="#3a7dc9"
                                onChangeText={(value) => setPrice(value)}
                                value={price}
                            />
                            <TextInput
                                style={styles.margin}
                                mode="outlined"
                                label="Categoria"
                                outlineColor="#3a7dc9"
                                activeOutlineColor="#3a7dc9"
                                onChangeText={(value) => setCategory(value)}
                                value={category}
                            />
                            <TextInput
                                style={styles.margin}
                                mode="outlined"
                                label="Quantidade"
                                outlineColor="#3a7dc9"
                                activeOutlineColor="#3a7dc9"
                                onChangeText={(value) => setQuantity(value)}
                                value={quantity}
                            />
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
                        onPress={postProduct}>
                        <Text style={{ color: '#fff' }}>Cadastrar</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ width: '100%' }}>
                    <Text style={styles.listar}>Listagem de produtos</Text>
                    {loading ?
                        (
                            <ActivityIndicator color="#121212" size={45} />
                        ) :
                        (
                            <FlatList
                                keyExtractor={item => item.id!}
                                data={products}
                                renderItem={({ item }) => (
                                    <ProductList data={item} deleteItem={() => deleteProduto(item)}
                                        editItem={() => loadProduto(item.id!, item)} />
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

export default ProductManager;
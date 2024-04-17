import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome5';
import StoreManager from './StoreManager';
import ProductManager from './ProductManager';

type Produto = {
    id: any,
    nome: string,
    descricao: string,
    preco: string
}

function HomeScreen() {

    const [produtos, setProdutos] = useState<Produto[]>([
        {
            id: 1,
            nome: 'Furadeira',
            descricao: 'Duração da bateria: 3 semanas',
            preco: 'R$ 99,90'
        },
        {
            id: 2,
            nome: 'Geladeira Eletrolux',
            descricao: 'Possui função inverter',
            preco: 'R$ 2699,90'
        },
        {
            id: 3,
            nome: 'Air frier MONDIAL',
            descricao: 'Alimentos preparados com 0% de gordura',
            preco: 'R$ 999,90'
        },
    ])

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Catálogo de produtos</Text>
            <View style={{marginTop: 20}}></View>
            <ScrollView>
                <View style={{ flexDirection: 'row', gap: 10, flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center' }}>
                    {produtos.map(p => {
                        return (
                            <Card key={p.id} mode='contained' style={{ backgroundColor: '#fff', width: '80%' }}>
                                <Card.Title title={p.nome} titleVariant='titleLarge' />
                                <Card.Content>
                                    <View style={{ flexWrap: 'wrap' }}>
                                        <Text>{p.descricao}</Text>
                                    </View>
                                    <View style={{ marginTop: 50 }}>

                                    </View>
                                </Card.Content>
                                <Card.Actions style={{ marginTop: 20, width: '100%' }}>
                                    <View style={{flexDirection: 'row', alignItems: 'center', gap: 10}}>
                                        <Text style={{ fontSize: 20 }}>{p.preco}</Text>
                                        <Pressable style={{ backgroundColor: '#000', padding: 10, borderRadius: 5, flexDirection: 'row', alignItems: 'baseline', gap: 20 }}>
                                            <Text style={{ color: '#fff' }}>Comprar</Text>
                                            <Icon name='cart-plus' color={'white'} />
                                        </Pressable>
                                    </View>
                                </Card.Actions>
                            </Card>
                        )
                    })}
                </View>

            </ScrollView>
        </View>
    );
}

function ListScreen() {
    return (
        <View style={styles.container}>
            <Text>List</Text>
        </View>
    );
}

function StoresScreen() {
    return <StoreManager />

}

function ProdutosScreen() {
    return <ProductManager />;
}

const Tab = createBottomTabNavigator();

export default function Menu() {
    return (
        <NavigationContainer>
            <Tab.Navigator
                screenOptions={({ route }) => ({
                    tabBarIcon: ({ color, size }) => {
                        let iconName;

                        switch (route.name) {
                            case 'Home':
                                iconName = 'home';
                                break;
                            case 'Listar':
                                iconName = 'list';
                                break;
                            case 'Lojas':
                                iconName = 'shopping-bag';
                                break;
                            case 'Produtos':
                                iconName = 'tag';
                                break;
                            default:
                                iconName = 'add-circle-outline';
                                break;
                        }

                        return <Icon name={iconName} size={size} color={color} />;
                    },
                    tabBarStyle: {
                        height: 60,
                    },
                    tabBarShowLabel: false,
                    tabBarActiveTintColor: '#000'
                })}
            >
                <Tab.Screen name="Home" component={HomeScreen} />
                <Tab.Screen name="Listar" component={ListScreen} />
                <Tab.Screen
                    name="Lojas"
                    component={StoresScreen}
                />
                <Tab.Screen name="Produtos" component={ProdutosScreen} />
            </Tab.Navigator>
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    iconTabRound: {
        width: 60,
        height: 90,
        borderRadius: 30,
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        shadowColor: '#9C27B0',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    title: {
        fontSize: 40,
        marginTop: 15,
        marginBottom: 40,
        textAlign: 'center'
    }
});
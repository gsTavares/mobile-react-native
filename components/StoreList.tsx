import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { Store } from './StoreManager';

const StoreList = ({ data, deleteItem, editItem }: {data: Store, deleteItem: any, editItem: any}) => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Nome: {data.name}</Text>
            <Text style={styles.text}>Cidade: {data.city}</Text>
            <Text style={styles.text}>Endereço: {data.address}</Text>
            <Text style={styles.text}>Telefone: {data.phoneNumber}</Text>

            <View style={styles.item}>
                <TouchableOpacity onPress={() => deleteItem(data)}>
                    <Icon name="trash" color="#A52A2A" size={20}>Excluir</Icon>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => editItem(data)}>
                    <Icon name="create" color="blue" size={20}>Editar</Icon>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 10,
        marginBottom: 5,
        padding: 10,
        backgroundColor: '#FAFAD2',
    },
    text: {
        color: 'black',
        fontSize: 17
    },
    item: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
});

export {StoreList};
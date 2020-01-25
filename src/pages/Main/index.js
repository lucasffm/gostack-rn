import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Keyboard, ToastAndroid, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/MaterialIcons';

import api from '../../services/api';

import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
  Remove,
} from './styles';

const Main = ({ navigation }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newUser, setNewUser] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('users').then(data => {
      if (data) setUsers(JSON.parse(data));
    });
  }, []);

  useEffect(() => {
    async function saveUsers() {
      await AsyncStorage.setItem('users', JSON.stringify(users));
    }
    saveUsers();
  }, [users]);

  const handleAddUser = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/users/${newUser}`);
      const data = {
        name: response.data.name,
        login: response.data.login,
        bio: response.data.bio,
        avatar: response.data.avatar_url,
      };

      const alreadyExist = users.find(user => user.login === data.login);
      if (!alreadyExist) setUsers([...users, data]);
      setNewUser('');
      setLoading(false);
      Keyboard.dismiss();
    } catch (error) {
      ToastAndroid.show('Usuário não encontrado', ToastAndroid.LONG);
      setLoading(false);
      setNewUser('');
    }
  };

  const removeHandler = login => {
    setUsers(users.filter(user => user.login !== login));
  };

  const handleNavite = user => {
    navigation.navigate('User', { user });
  };

  return (
    <Container>
      <Form>
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          value={newUser}
          placeholder="Adicionar Usuário"
          onChangeText={setNewUser}
          returnKeyType="send"
          onSubmitEditing={handleAddUser}
        />
        <SubmitButton loading={loading} onPress={handleAddUser}>
          {loading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Icon name="add" size={20} color="#FFF" />
          )}
        </SubmitButton>
      </Form>
      <List
        data={users}
        keyExtractor={user => user.login}
        renderItem={({ item }) => (
          <User>
            <Remove>
              <Icon
                name="close"
                size={20}
                color="#fc0303"
                onPress={() => removeHandler(item.login)}
              />
            </Remove>
            <Avatar source={{ uri: item.avatar }} />
            <Name>{item.name}</Name>
            <Bio>{item.bio || 'Sem bio'}</Bio>
            <ProfileButton onPress={() => handleNavite(item)}>
              <ProfileButtonText>Ver Perfil</ProfileButtonText>
            </ProfileButton>
          </User>
        )}
      />
    </Container>
  );
};

Main.navigationOptions = {
  title: 'Usuários',
};

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func,
  }).isRequired,
};

export default Main;

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import api from '../../services/api'

import {
  Container,
  Header,
  Avatar,
  Name,
  Bio,
  Stars,
  Starred,
  OwnerAvatar,
  Info,
  Title,
  Author,
  Activity,
} from './styles'

export default class User extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: navigation.getParam('user').name,
  })

  state = {
    stars: [],
    loading: true,
    page: 1,
    refreshing: false,
  }

  async componentDidMount() {
    const { navigation } = this.props
    const { page } = this.state

    this.setState({ loading: true })

    const user = navigation.getParam('user')

    const response = await api.get(`/users/${user.login}/starred?page=${page}`)

    this.setState({ stars: response.data, loading: false })
  }

  handleNavigate = repository => {
    const { navigation } = this.props

    navigation.navigate('Repository', { repository })
  }

  loadMore = async () => {
    const { navigation } = this.props
    const { page, stars } = this.state

    const user = navigation.getParam('user')

    const response = await api.get(
      `/users/${user.login}/starred?page=${page + 1}`
    )
    this.setState({
      stars: [...stars, ...response.data],
      page: page + 1,
      refreshing: false,
    })
  }

  refreshList = () => {
    this.setState({ refreshing: true, page: 0, stars: [] }, this.loadMore)
  }

  render() {
    const { navigation } = this.props
    const { stars, loading, refreshing } = this.state
    const user = navigation.getParam('user')

    return (
      <Container>
        <Header>
          <Avatar source={{ uri: user.avatar }} />
          <Name>{user.name}</Name>
          <Bio>{user.bio}</Bio>
        </Header>
        {loading ? (
          <Activity color="fff" />
        ) : (
          <Stars
            onRefresh={this.refreshList}
            refreshing={refreshing}
            onEndReachedThreshold={0.2}
            onEndReached={this.loadMore}
            data={stars}
            keyExtractor={star => String(star.id)}
            renderItem={({ item }) => (
              <Starred onPress={() => this.handleNavigate(item)}>
                <OwnerAvatar source={{ uri: item.owner.avatar_url }} />
                <Info>
                  <Title>{item.name}</Title>
                  <Author>{item.owner.login}</Author>
                </Info>
              </Starred>
            )}
          />
        )}
      </Container>
    )
  }
}

User.propTypes = {
  navigation: PropTypes.shape({
    getParam: PropTypes.func,
    navigate: PropTypes.func,
  }).isRequired,
}

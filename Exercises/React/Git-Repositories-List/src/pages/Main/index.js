import React, { Component } from 'react'
import { FaGithubAlt, FaPlus, FaSpinner } from 'react-icons/fa/'
import { Link } from 'react-router-dom'

import api from '../../services/api'

import Container from '../../components/Container/index'
import { Form, SubmitButton, List, Error } from './styles'

export default class Main extends Component {
  state = {
    newRepo: '',
    repositories: [],
    loading: false,
    apiError: { error: false, errorDesc: '' },
  }

  componentDidMount() {
    const repositories = localStorage.getItem('repositories')

    if (repositories) {
      this.setState({ repositories: JSON.parse(repositories) })
    }
  }

  componentDidUpdate(_, prevState) {
    const { repositories } = this.state

    if (prevState.repositories !== repositories) {
      localStorage.setItem('repositories', JSON.stringify(repositories))
    }
  }

  handleInputChange = e => {
    this.setState({ newRepo: e.target.value })
  }

  handleSubmit = async e => {
    e.preventDefault()

    this.setState({ loading: true, apiError: { error: false, errorDesc: '' } })

    const { newRepo, repositories } = this.state

    try {
      // if (newRepo === '') throw 'Você precisa indicar um repositório'
      if (newRepo === '') throw new Error('fjhbh')

      const hasRepo = repositories.find(r => r.name === newRepo)

      if (hasRepo) {
        throw 'Duplicated Repository'
      }

      const response = await api.get(`repos/${newRepo}`)

      const data = {
        name: response.data.full_name,
      }

      this.setState({
        repositories: [...repositories, data],
        newRepo: '',
      })
    } catch (error) {
      let errorTxt = ''

      if (error.response) {
        errorTxt = error.response.data.message
      } else {
        errorTxt = error.message
      }
      this.setState({
        apiError: { error: true, errorDesc: errorTxt },
      })
    } finally {
      this.setState({
        loading: false,
      })
    }
  }

  render() {
    const { newRepo, loading, repositories, apiError } = this.state

    return (
      <Container>
        <h1>
          <FaGithubAlt />
          Repositories
        </h1>
        <Form onSubmit={this.handleSubmit} error={apiError.error}>
          <input
            type="text"
            placeholder="Add Repo"
            value={newRepo}
            onChange={this.handleInputChange}
          />
          <SubmitButton loading={loading ? 1 : 0}>
            {loading ? (
              <FaSpinner color="#fff" size={14} />
            ) : (
              <FaPlus color="#fff" size={14} />
            )}
          </SubmitButton>
        </Form>
        <Error>{apiError.errorDesc}</Error>
        <List>
          {repositories.map(repo => (
            <li key={repo.name}>
              <span>{repo.name}</span>
              <Link to={`/repository/${encodeURIComponent(repo.name)}`}>
                Details
              </Link>
            </li>
          ))}
        </List>
      </Container>
    )
  }
}

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import api from '../../services/api'

import Container from '../../components/Container/index'
import { Loading, Owner, IssueList, IssueFilter, PageActions } from './styles'

export default class Repository extends Component {
  state = {
    repository: {},
    issues: [],
    loading: true,
    filters: [
      { state: 'all', label: 'Todas', active: true },
      { state: 'open', label: 'Abertas', active: false },
      { state: 'closed', label: 'Fechadas', active: false },
    ],
    filterIndex: 0,
    page: 1,
  }

  async componentDidMount() {
    const { match } = this.props
    const { filters } = this.state

    const repoName = decodeURIComponent(match.params.repository)

    const [repository, issues] = await Promise.all([
      api.get(`/repos/${repoName}`),
      api.get(`/repos/${repoName}/issues`, {
        params: {
          state: filters.find(f => f.active).state,
          per_page: 5,
        },
      }),
    ])

    this.setState({
      repository: repository.data,
      issues: issues.data,
      loading: false,
    })
  }

  handleFilter = async index => {
    console.log(index)

    await this.setState({ filterIndex: index, page: 1 })

    this.loadIssues()
  }

  loadIssues = async () => {
    const { match } = this.props
    const { filters, filterIndex, page } = this.state

    const repoName = decodeURIComponent(match.params.repository)

    const response = await api.get(`/repos/${repoName}/issues`, {
      params: {
        state: filters[filterIndex].state,
        per_page: 5,
        page,
      },
    })

    this.setState({ issues: response.data })
  }

  handlePage = async action => {
    const { page } = this.state
    await this.setState({
      page: action === 'back' ? page - 1 : page + 1,
    })
    this.loadIssues()
  }

  render() {
    const {
      repository,
      issues,
      loading,
      filters,
      filterIndex,
      page,
    } = this.state

    if (loading) {
      return <Loading>Loading</Loading>
    }

    return (
      <Container>
        <Owner>
          <Link to="/">Back to Repos</Link>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <h1>{repository.name}</h1>
          <p>{repository.description}</p>
        </Owner>

        <IssueList>
          <IssueFilter active={filterIndex}>
            {filters.map((filter, index) => (
              <button
                key={filter.label}
                type="button"
                onClick={() => this.handleFilter(index)}
              >
                {filter.label}
              </button>
            ))}
          </IssueFilter>
          {issues.map(issue => (
            <li key={String(issue.id)}>
              <img src={issue.user.avatar_url} alt={issue.user.login} />
              <div>
                <strong>
                  <a href={issue.html_url}>{issue.title}</a>
                  {issue.labels.map(label => (
                    <span key={String(label.id)}>{label.name}</span>
                  ))}
                </strong>
                <p>{issue.user.login}</p>
              </div>
            </li>
          ))}
        </IssueList>
        <PageActions>
          <button
            type="button"
            disabled={page < 2}
            onClick={() => this.handlePage('back')}
          >
            Anterior
          </button>
          <span>Página {page}</span>
          <button
            type="button"
            onClick={() => this.handlePage('next')}
            disabled={issues.length < 5}
          >
            Próximo
          </button>
        </PageActions>
      </Container>
    )
  }
}

Repository.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      repository: PropTypes.string,
    }),
  }).isRequired,
}

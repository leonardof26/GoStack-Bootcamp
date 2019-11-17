import styled from 'styled-components'

export const Container = styled.div`
  background: #fff;
  padding: 0 20px;
`

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
    }

    a {
      font-weight: bold;
      color: #bbb;
      margin-left: 20px;
    }

    .currentPage {
      color: #000;
    }
  }

  aside {
    display: flex;
    align-items: center;
  }
`

export const Profile = styled.div`
  display: flex;
  flex-direction: column;

  strong {
    color: #4c4c4c;
    font-size: 13px;
  }

  button {
    background: none;
    border: none;
    margin-top: 5px;
    font-size: 11px;
    text-align: right;
    color: #ee4d64;
  }
`

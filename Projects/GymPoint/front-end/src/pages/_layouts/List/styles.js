import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  padding: 20px 130px;

  .teste {
    margin-top: 10px;
  }
`

export const PageHeader = styled.div`
  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;

  h1 {
    color: #444444;
    font-size: 21px;
  }

  aside {
    display: flex;
    align-items: center;

    .AddButton {
      background: #ee4d64;
      border-radius: 4px;
      font-weight: bold;
      transition: background 0.2s;

      &:hover {
        background: ${darken(0.06, '#ee4d64')};
      }

      a {
        color: #fff;
      }

      div {
        display: flex;
        align-items: center;
        padding: 10px;
      }

      svg {
        margin-right: 10px;
      }
      span {
        margin-right: 10px;
      }
    }

    .SearchInput {
      margin-left: 10px;
      background: #fff;
      border: 1px solid #bbb;
      border-radius: 3px;

      display: flex;
      align-items: center;

      button {
        border: none;
        background: #fff;

        svg {
          margin-left: 10px;
        }
      }

      input {
        border: none;
        padding: 10px;
      }
    }
  }
`
export const StudentList = styled.table`
  background: #fff;
  width: 100%;
  table-layout: fixed;

  thead {
    th {
      padding: 20px 15px;
      text-align: left;
      font-size: 16px;
      color: #444444;
    }
  }
  tbody {
    tr {
      border-bottom: 1px solid #eee;

      a {
        color: #4d85ee;
      }

      td:last-of-type {
        button {
          color: #de3b3b;
        }
      }
    }
    td {
      padding: 20px 15px;
      text-align: left;
    }
    button {
      border: none;
      background: #fff;
    }
  }
`

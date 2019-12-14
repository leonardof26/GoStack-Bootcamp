import styled from 'styled-components'
import { darken } from 'polished'

export const Container = styled.div`
  padding: 20px 130px;

  .tableContent {
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
    width: 100%;
    th {
      padding: 20px 15px;
      text-align: left;
      font-size: 16px;
      color: #444444;
    }
  }
  tbody {
    width: 100%;
    tr {
      a {
        color: #4d85ee;
      }

      td:last-of-type {
        button {
          color: #de3b3b;
        }

        .modalButton {
          color: #4d85ee;
        }
      }
    }

    td {
      padding: 10px 15px;
      text-align: left;
      width: 100%;
      border-bottom: 1px solid #f1f1f1;
    }

    button {
      border: none;
      background: #fff;
    }

    tr:last-of-type {
      td {
        border-bottom: 0;
      }
    }
  }
`
export const Buttons = styled.div`
  align-self: right;
  text-align: right;

  button {
    margin-left: 20px;
  }
`
export const Pagination = styled.div`
  margin-top: 10px;
  display: flex;
  align-items: center;
  justify-content: center;

  span {
    padding: 0 5px;
  }

  button {
    border: none;
    background: none;

    :disabled {
      cursor: initial;
    }
  }
`

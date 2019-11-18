import styled from 'styled-components'

import { darken } from 'polished'

export const Container = styled.div`
  padding: 20px 250px;
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
    }
  }
`
export const Button = styled.button`
  background: ${props => props.backGround};
  border: none;
  border-radius: 4px;
  font-weight: bold;
  transition: background 0.2s;
  margin-left: 20px;

  &:hover {
    background: ${props => darken(0.06, props.backGround)};
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
    color: #fff;
    margin-right: 10px;
  }
`

export const StudentsForm = styled.div`
  background: #fff;
  margin-top: 25px;
  border-radius: 4px;

  form {
    padding: 20px 20px;

    > div {
      margin-bottom: 10px;
    }

    p {
      margin-bottom: 7px;
      font-size: 14px;
      font-weight: bold;
      color: #444;
    }

    input {
      border: 1px solid #ddd;
      border-radius: 4px;
      height: 30px;
      width: 100%;
      padding: 10px;
    }

    input:disabled {
      background: #f5f5f5;
    }

    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
      margin-bottom: 10px;
    }
  }
`
export const BottomInputs = styled.div`
  display: flex;

  .inputField {
    padding-right: 10px;
    justify-content: space-between;
  }

  > div {
    width: fill-available;
  }

  div {
    align-self: stretch;

    input {
      margin-bottom: 0px;

      text-field {
        padding: 5px;
      }
    }
  }

  div:last-of-type {
    margin-right: 0px;
  }

  .css-2b097c-container {
    /* background: #7159c1; */
    height: 30px;
  }

  .css-yk16xz-control {
    /* background: #9157c1; */
    min-height: 30px;
    height: 30px;
  }
`

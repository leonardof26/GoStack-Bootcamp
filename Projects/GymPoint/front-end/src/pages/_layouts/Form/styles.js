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
  width: 100%;

  .inputField {
    padding-right: 10px;
  }

  > div {
    width: fill-available;

    &:last-of-type {
      padding-right: 0;
    }
  }

  .css-yk16xz-control {
    min-height: 30px;
    height: 30px;
  }

  .css-1hwfws3 {
    min-height: 30px;
    height: 30px;

    div {
      align-self: none;
    }
  }

  .css-1hwfws3 {
    align-items: center;
    align-content: center;
  }

  .css-1pahdxg-control {
    min-height: 30px;
    height: 30px;
  }
`

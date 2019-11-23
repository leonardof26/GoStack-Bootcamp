import styled from 'styled-components'

export const Container = styled.div`
  padding: 10px 100px;
`

export const Question = styled.div`
  h3 {
    font-weight: bold;
    color: #444444;
    font-size: 12px;
  }

  p {
    color: #666666;
    font-size: 11px;
  }
`

export const Answer = styled.div`
  h3 {
    font-weight: bold;
    color: #444444;
    font-size: 12px;
  }

  textarea {
    width: 100%;
    border: 1px solid #f1f1f1;
    border-radius: 4px;
    height: 100px;
    padding: 4px;
    color: #777;
    font-size: 11px;

    &:disabled {
      color: #000;
    }
  }

  span {
    color: #fb6f91;
    align-self: flex-start;
    margin: 0 0 10px;
    font-weight: bold;
    margin-bottom: 10px;
  }
`

export const Button = styled.button`
  margin-top: 10px;
  width: 100%;
  background: #ee4d64;
  border: none;
  border-radius: 4px;
  padding: 8px;
  color: #fff;
  font-weight: bold;
`

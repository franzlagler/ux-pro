import styled from 'styled-components';

export const Form = styled.form`
  display: grid;
`;

export const Label = styled.label`
  display: block;
  margin: 10px 0 5px 10px;
  font-size: 20px;
  font-weight: 800;
`;

export const FieldContainer = styled.div`
  position: relative;
  margin: 0 auto;
  width: 100%;
`;

export const Field = styled.input`
  display: block;
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  border: 3px solid #212529;
  border-radius: 15px;
  font-size: 20px;
  &:disabled {
    background-color: #dee2e6;
    opacity: 0.7;
  }
`;

export const ErrorMessage = styled.div`
  position: absolute;
  top: 100%;
  left: 5%;
  width: 80%;
  margin: 0 auto;
  z-index: 1;
  padding: 10px;
  background-color: #f85555;
  border: 2px solid #212529;
  border-radius: 5px;
  &::before {
    content: '';
    position: absolute;
    width: 0;
    z-index: 0;
    border-style: solid;
    border-color: #212529 transparent;
    border-width: 0 14px 14px;
    top: -15px;
    left: 10%;
    margin-left: -14px;
    display: block;
  }
  &::after {
    content: '';
    position: absolute;
    display: block;
    width: 0;
    z-index: 1;
    border-style: solid;
    border-color: #f85555 transparent;
    border-width: 0 12px 12px;
    top: -12px;
    left: 10%;
    margin-left: -12px;
  }
`;

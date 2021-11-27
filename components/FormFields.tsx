import styled from 'styled-components';

export const Form = styled.form`
  display: grid;
  margin-top: 20px;
`;

export const Label = styled.label`
  display: block;
  margin: 10px 0 10px 5px;
  font-size: 24px;
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
  height: 60px;

  padding: 10px;
  margin-bottom: 20px;
  background-color: #fff;
  border: 5px solid #212529;
  border-radius: 15px;
  font-size: 20px;
  &:disabled {
    background-color: #dee2e6;
    opacity: 0.7;
  }
`;

export const ErrorMessage = styled.div`
  margin: 0 0 14px 5px;
  color: #f85555;
  font-size: 20px;
  font-weight: 600;
`;

export const ToggleRadioButton = styled.input`
  position: relative;
  appearance: none;
  width: 120px;
  height: 60px;
  border: 5px solid #212529;
  border-radius: 15px;
  &::before {
    content: '';
    position: absolute;
    left: 2px;
    top: 50%;
    transform: translateY(-50%);
    width: 35px;
    height: 35px;
    background-color: #fff;
    border: 5px solid #212529;
    border-radius: 15px;
  }
  &:checked {
    background-color: #76f5c0;
    &::before {
      content: '';
      position: absolute;
      left: auto;
      right: 2px;
      top: 50%;
      transform: translateY(-50%);
      width: 35px;
      height: 35px;

      border: 5px solid #212529;
      border-radius: 15px;
    }
  }
`;

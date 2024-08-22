import styled from 'styled-components';

export const ContentGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
  grid-column-gap: 1.5rem;
  grid-row-gap: 1rem;

  grid-template-rows: 30px;

  img {
    grid-row: span 2;
    height: 300px;
    width: 100%;
    border: 1px solid var(--secondary-color);
    border-radius: 5px;

    @media (max-width: 1400px) {
      height: 250px;
    }
  }

  @media (max-width: 925px) {
    grid-template-columns: 1fr;
    grid-row-gap: 5px;
  }
`;

export const TitleMobile = styled.h2`
  margin-top: -0.1rem;

  @media (min-width: 925px) {
    display: none;
  }
`;

export const Description = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  box-sizing: border-box;

  grid-row: span 2;

  p {
    box-sizing: border-box;
    margin: 0 0 20px;
    max-height: 20000;
    text-indent: 3rem;
    text-align: justify;
    overflow: auto;
  }
`;

export const Title = styled.h2`
  width: 100%;
  font-size: 28px !important;
  font-size: 1px;
  height: 0px !important;
  display: none;
  font-size: 1.5rem;
  margin-top: 0;
  margin-bottom: -1rem;

  @media (min-width: 925px) {
    display: block;
  }
`;

export const TagsDiv = styled.div`
  padding: 0 0 2rem;
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  gap: 0.5rem;
`;

export const Tag = styled.div`
  padding: 0.2rem 1rem;
  border-radius: 20px;
  background: var(--secondary-color);
  color: var(--primary-color);
`;

export const ButtonDiv = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  width: 100%;

  @media (max-width: 450px) {
    justify-content: center;
  }
`;

interface IButtonProps {
  fill?: boolean;
}
export const Button = styled.button<IButtonProps>`
  width: 145px;
  height: 43px;
  border-radius: 5px;
  border: 1px solid var(--secondary-color);
  background: ${(props) => (props.fill ? 'var(--secondary-color)' : 'none')};
  color: ${(props) =>
    props.fill ? 'var(--primary-color)' : 'var(--secondary-color)'};
`;

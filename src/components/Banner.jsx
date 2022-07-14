import styled from 'styled-components';
import { useSelector } from 'react-redux';
import { selectUser } from '../store/user/selectors';

const Banner = ({ message }) => {
  const user = useSelector(selectUser);

  return (
    <div style={{ height: '150px' }}>
      <h2>Hello, {user && user.name}</h2>
    </div>
  );
};

export { Banner };

const BannerContainer = styled.div`
  // display: flex;
  // justify-content: space-between;
  // background-color: #C2DED1
  height: 100px;
  // border-bottom: 1px solid #6D8B74;
`;

const Text = styled.p`
  color: #6d8b74;
  font-weight: bold;
  margin-top: 0px;
  padding: 15px;
`;

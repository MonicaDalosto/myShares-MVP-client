import styled from 'styled-components';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';
const Footer = () => {
  return (
    <MyFooter>
      <div className="footerContent">
        <p>&copy; 2022 Mônica Dalosto - Codaisseur</p>
        <ul>
          <li>
            <a
              target="blank"
              href="https://www.linkedin.com/in/monica-dalosto/"
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a target="blank" href="https://github.com/MonicaDalosto">
              <FaGithubSquare />
            </a>
          </li>
        </ul>
      </div>
    </MyFooter>
  );
};

export { Footer };

const MyFooter = styled.div`
  position: absolute;
  width: 100%;
  bottom: 0;
  background-position: center bottom;
  background-color: var(--color-primary);
  color: var(--color-secondary);

  .footerContent {
    height: 80px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  ul {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
  }

  li {
    list-style-type: none;
  }

  a {
    padding: 1em;
    color: var(--color-secondary);
    font-size: 150%;
  }
`;

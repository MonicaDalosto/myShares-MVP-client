import styled from 'styled-components';
import { FaLinkedin, FaGithubSquare } from 'react-icons/fa';
const Footer = () => {
  return (
    <MyFooter>
      <div className="footerContent">
        <p>&copy; 2022 Mônica Dalosto - Codaisseur</p>
        <ul class="setDisplayFlex">
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
  background-position: center bottom;
  background-color: var(--color-primary);
  color: var(--color-secondary);
  margin: 50px 0 0 0;

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
    // text-decoration: none;

    padding: 1em;
    color: var(--color-secondary);
    font-size: 150%;
  }
`;

import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Particles from "react-particles-js";
import Description from "./components/Description/Description";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "./components/Description/CustomTableDesign.css";
function App() {
  const [cryptos, setCryptos] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [showList, setShowList] = useState(true);
  const [selectedCoin, setSelectedCoin] = useState("");

  useEffect(() => {
    axios
      .get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      )
      .then((res) => {
        setCryptos(res.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const coinClick = (id) => {
    setSelectedCoin(id);
    setShowList(false);
  };
  const handleChange = (e) => {
    setSearchInput(e.target.value);
  };

  const filteredCryptos = cryptos.filter((coin) =>
    coin.name.toLowerCase().includes(searchInput.toLowerCase())
  );
  return (
    <>
      {/*  <Particles
        className="particles-canvas"
        params={{
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 900,
              },
            },
            shape: {
              type: "circle",
              stroke: {
                width: 6,
                color: "#f9ab00",
              },
            },
          },
        }}
      /> */}
      {showList && (
        <div className="main-page">
          <div className="search">
            <h1 className="search-text">Căutați după denumire</h1>
            <div className="search-input-div">
              <form>
                <input
                  type="text"
                  placeholder="Caută"
                  className="search-input"
                  onChange={handleChange}
                />
              </form>
            </div>
          </div>
          <Table>
            <Thead>
              <Tr>
                <Th>Image</Th>
                <Th>Name</Th>
                <Th>Alias</Th>
                <Th>Price</Th>
                <Th>Volume</Th>
                <Th>Price Change</Th>
                <Th>Marketcap</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredCryptos.map((coin) => {
                return (
                  <Tr onClick={() => coinClick(coin.id)}>
                    <Td>
                      <img id="coin_image" src={coin.image} alt="crypto" />
                    </Td>
                    <Td className="table-data">{coin.name}</Td>
                    <Td className="table-data">{coin.symbol}</Td>
                    <Td className="table-data">
                      $ {coin.current_price?.toFixed(2)}
                    </Td>
                    <Td className="table-data">
                      $ {coin.total_volume?.toLocaleString()}
                    </Td>
                    <Td className="table-data">
                      {coin.price_change_percentage_24h < 0 ? (
                        <p className="change-percent red">
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </p>
                      ) : (
                        <p className="change-percent green">
                          {coin.price_change_percentage_24h?.toFixed(2)}%
                        </p>
                      )}
                    </Td>
                    <Td className="table-data">
                      ${coin.market_cap?.toLocaleString()}
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </div>
      )}
      {!showList && (
        <>
          <a
            id="back"
            onClick={(e) => {
              e.preventDefault();
              setShowList(true);
              setSearchInput("");
            }}
          >
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            Înapoi
          </a>
          <div className="coin-description">
            <Description coin={selectedCoin} />
          </div>
        </>
      )}
    </>
  );
}

export default App;

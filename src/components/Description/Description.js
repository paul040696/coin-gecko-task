import React, { useState, useEffect } from "react";
import axios from "axios";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "./CustomTableDesign.css";
import "./Description.css";

function Description({ coin }) {
  const [coinInformation, setCoinInformation] = useState([]);
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    var exch = [];
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${coin}`)
      .then((res) => {
        setCoinInformation(res);
      })
      .catch((error) => console.log(error));

    axios
      .get("https://api.coingecko.com/api/v3/exchanges/list")
      .then((res) => {
        var exchanges = [];
        res.data.map((exchange) => exchanges.push(exchange.id));

        //use res.data     https://api.coingecko.com/api/v3/coins/bitcoin/tickers?exchange_ids=binance%2Cgdax
        axios
          .get(
            `https://api.coingecko.com/api/v3/coins/${coin}/tickers?order=trust_score_desc`
          )
          .then((res) => {
            var ticks = [];

            console.log(res.data.tickers);
            res.data.tickers.map((tick) => {
              ticks.push({
                name: tick.market.name,
                trade_url: tick.trade_url,
                base: tick.base,
                target: tick.target,
                status: tick.is_stale,
              });
            });

            setTickers(ticks);
          });
      })
      .catch((error) => console.log(error));

    const script = document.createElement("script");

    /* script.src =
      "https://widgets.coingecko.com/coingecko-coin-market-ticker-list-widget.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }; */
  }, []);

  useEffect(() => {
    console.log(tickers);
  }, [tickers]);

  return (
    <div style={{ width: "100%" }}>
      <div className="coin">
        <div className="coin-description">
          <img src={coinInformation?.data?.image?.small} alt="crypto" />
          <h1>Nume: {coinInformation?.data?.name}</h1>
        </div>
        <div className="coin-price-d">
          <h1>
            Pretul produsului: ${" "}
            {coinInformation?.data?.market_data?.current_price?.usd}
          </h1>
        </div>
      </div>
      <div className="table">
        <Table>
          <Thead>
            <Tr>
              <Th>Exchange</Th>
              <Th>Schimb</Th>
              <Th>Page</Th>
              <Th>status</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.keys(tickers).map((key) => {
              console.log(tickers[key].name);
              if (tickers[key] != null) {
                return (
                  <Tr key={key}>
                    <Td>{tickers[key].name}</Td>
                    <Td>{tickers[key].base + "/" + tickers[key].target}</Td>
                    <Td>
                      <a href={tickers[key].trade_url}>Link</a>
                    </Td>
                    <Td>
                      {tickers[key].status == false ? (
                        <p style={{ color: "#008000" }}>Online</p>
                      ) : (
                        <p style={{ color: "#ff0000" }}>Offline</p>
                      )}
                    </Td>
                  </Tr>
                );
              } else {
                return (
                  <Tr>
                    <Td>{key}</Td>
                    <Td>Pagină indisponibilă</Td>
                  </Tr>
                );
              }
            })}
          </Tbody>
        </Table>
      </div>

      {/*    <div className="delimiter"> Coin-Gecko widget </div>

      <coingecko-coin-market-ticker-list-widget
        coin-id={coinInformation.name}
        currency="usd"
        locale="en"
        background-color="#1a1a1c"
      ></coingecko-coin-market-ticker-list-widget> */}
    </div>
  );
}

export default Description;

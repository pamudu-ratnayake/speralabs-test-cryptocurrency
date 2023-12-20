import { useEffect, useState } from "react";
import axios from "axios";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { FaRegStar, FaStar } from "react-icons/fa";
import API from "../variables/tokenURL";
// import "../css/HomePageCSS.css";

const highlightRowStyle = {
  backgroundColor: "yellow", // Change this to your desired highlight color
  transition: "background-color 1s ease", // Smooth transition effect
};

function HomePage(props) {
  const coinListURL = "https://api.coingecko.com/api/v3/coins/list?x_cg_demo_api_key=CG-1UbDhhWdnchL76SFqQ7cvRU3";
  const coinPriceURL = "https://api.coingecko.com/api/v3/simple/price?x_cg_demo_api_key=CG-1UbDhhWdnchL76SFqQ7cvRU3";
  const [coins, setCoins] = useState([]);
  const [priceOfCoins, setPriceOfCoins] = useState({});
  const [assetsString, setAssetsString] = useState("");
  const [activeButton, setActiveButton] = useState("AllCoins");
  const [allCoins, setAllCoins] = useState([]);
  const [highlightedRows, setHighlightedRows] = useState([]);

  const getFavoriteCoins = async () => {
    return await API.get("/auth-user/getFavoriteCoins")
  };

  useEffect(() => {
    if (!coins || coins.length === 0) {
      const getCoinList = async () => {
        const axiosConfig = {
          headers: {
            "Access-Control-Allow-Origin": "*",
          },
        };
        let favCoins = await getFavoriteCoins();
        axios
          .get(coinListURL, axiosConfig)
          .then((res) => {
            const slicedArray = res.data.slice(0, 100);
            const updatedArray = slicedArray.map(item1 => {
              const matchingItem2 = favCoins.data.find(item2 => item2.id === item1.id);
              if (matchingItem2) {
                return { ...item1, isFavorite: matchingItem2.isFavorite };
              }
              return item1;
            });
            setCoins(updatedArray);
            const newArray = updatedArray.map((coin) => coin.id);
            setAssetsString(newArray.join(","));
          })
          .catch((error) => {
            console.error(error);
          });
      };

      getCoinList();
    }
  }, [coins]);

  useEffect(() => {
    const setCoinPrice = () => {
      axios
        .get(coinPriceURL + `&ids=${assetsString}&vs_currencies=usd`)
        .then((res) => {
          setPriceOfCoins(res.data);
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {});
    };

    setCoinPrice();
  }, [coins]);

  const openWS = () => {
    const pricesWs = new WebSocket(`wss://ws.coincap.io/prices?assets=${assetsString}`);

    pricesWs.onmessage = function (msg) {
      const newData = JSON.parse(msg.data);

      setPriceOfCoins((prevPriceOfCoins) => {
        const updatedPriceOfCoins = { ...prevPriceOfCoins };

        for (const key in newData) {
          if (updatedPriceOfCoins.hasOwnProperty(key)) {
            updatedPriceOfCoins[key] = { usd: parseFloat(newData[key]) };
            setHighlightedRows((prevHighlightedRows) => [...prevHighlightedRows, key]);
            setTimeout(() => {
              setHighlightedRows((prevHighlightedRows) =>
                prevHighlightedRows.filter((id) => id !== key)
              );
            }, 1000);
          }
        }

        return updatedPriceOfCoins;
      });
    };
  };

  if (Object.keys(priceOfCoins).length > 0) {
    openWS();
  }

  const addToFavorite = (coin) => {
    coin.isFavorite = true;

    API.put("/auth-user/addToFavorite", coin)
      .then((res) => {
        setCoins((prevCoins) => {
          const updatedCoins = [...prevCoins];
          return updatedCoins;
        });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const removeFromFavorite = (coin) => {
    coin.isFavorite = false;
    API.delete("/auth-user/removeFavorite", {
      data: coin,
    })
      .then((res) => {
        setCoins((prevCoins) => {
          const updatedCoins = [...prevCoins];
          return updatedCoins;
        });
        if(activeButton === 'FavoriteCoins') {
          allCoins.find(item => item.id === coin.id).isFavorite = false;
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleButtonClick = async (buttonType) => {
    setActiveButton(buttonType);
    if(activeButton !== buttonType && buttonType === "FavoriteCoins") {
      let response = await getFavoriteCoins()
      if(response.data.length === 0) {
        alert("There are no any Favorite coins. PLease add!");
        setActiveButton("AllCoins");
      } else {
        setCoins((prevCoins) => {
          setAllCoins(prevCoins);
          const updatedCoins = [...response.data];
          return updatedCoins;
        });
      }
    } else if(activeButton !== buttonType && buttonType === "AllCoins") {
      setCoins((prevCoins) => {
        const updatedCoins = [...allCoins];
        return updatedCoins;
      });
    }
  };

  return (
    <div>
      <div style={{ margin: "20px" }}>
        <Button
          style={{ margin: "5px" }}
          variant="outline-primary"
          active={activeButton === "AllCoins"}
          onClick={() => handleButtonClick("AllCoins")}
        >
          All Coins
        </Button>
        <Button variant="outline-primary" active={activeButton === "FavoriteCoins"} onClick={() => handleButtonClick("FavoriteCoins")}>
          Favorite Coins
        </Button>
      </div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th></th>
            <th>Coin</th>
            <th>Symbol</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {coins &&
            coins.map((coin, index) => (
              <tr key={coin.id}>
                <td>{index}</td>
                <td>
                  {coin.isFavorite ? (
                    <FaStar
                      onClick={() => {
                        removeFromFavorite(coin);
                      }}
                      color="gold"
                    />
                  ) : (
                    <FaRegStar
                      onClick={() => {
                        addToFavorite(coin);
                      }}
                      color="gold"
                    />
                  )}
                </td>
                <td style={highlightedRows.includes(coin.id) ? highlightRowStyle : {}}>{coin.name}</td>
                <td style={highlightedRows.includes(coin.id) ? highlightRowStyle : {}}>{coin.symbol}</td>
                <td style={highlightedRows.includes(coin.id) ? highlightRowStyle : {}}>{priceOfCoins && priceOfCoins[coin.id] ? (priceOfCoins[coin.id].usd ? priceOfCoins[coin.id].usd : 0) : 0}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </div>
  );
}

export default HomePage;

import { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../navbar/navbar";
import Card from "../card/card";
import './styles.css'
import { useNavigate } from "react-router-dom";


function Dashboard(props) {
  const [error, setError] = useState('');
  const [products, setProducts] = useState([]);
  const [temp, setTemp] = useState(products);
  const [searchName, setSearchName] = useState('');
  const [parseParameters, setParseparameters] = useState({
    lPrice: "",
    hPrice: ""
  });


  async function fetchProducts() {
    try {
      await fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(json => {
          setProducts(json.products)
          setTemp(json.products)
        })

    } catch (err) {
      setError('Couldnt fecth data');
    }
  }
  useEffect(() => {
    fetchProducts();
  }, []);

  const navigate = useNavigate();

  function handleLogout() {
    localStorage.removeItem('auth');
    navigate('/');
  }


  function handleChange(event) {
    if (event.target.name === "lprice") {
      setParseparameters(prevValue => {
        return {
          lPrice: event.target.value,
          hPrice: prevValue.hPrice
        }
      });
    }
    else if (event.target.name === "hprice") {
      setParseparameters(prevValue => {
        return {
          lPrice: prevValue.lPrice,
          hPrice: event.target.value
        }
      });
    }
    if (event.target.name === 'name') {
      setSearchName(event.target.value);
      setProducts(temp);
    }
  }


  function handleSearch() {
    let newResult = null;
    if (searchName !== "") {
      setProducts(temp);
      newResult = products.filter(product => {
        return product.title.toLowerCase().substring(0, searchName.length) === searchName.toLowerCase();
      });
    }
    if (parseParameters.lPrice !== '') {
      if (newResult === null) {
        newResult = products.filter(product => {
          return parseParameters.lPrice <= product.price;
        })
      }
      else {
        newResult = newResult.filter(product => {
          return parseParameters.lPrice <= product.price;
        })
      }
    }
    if (parseParameters.hPrice !== '') {
      if (newResult === null) {
        newResult = products.filter(property => {
          return parseParameters.hPrice >= property.price;
        })
      }
      else {
        newResult = newResult.filter(property => {
          return parseParameters.hPrice >= property.price;
        })
      }

    }
    setProducts(newResult);
  }



  const [cartProducts, setCartProducts] = useState([]);

  function addToCart(event) {
    insertData(event);
  }


  async function insertData(value) {
    const { data, error } = await props.supabase
      .from('cartItem')
      .insert([{ id: value.id, data: value }]);

    if (error) {
      console.error('Error inserting data:', error.message);
    } else {
      console.log('Data inserted successfully:', data);
    }
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await props.supabase.from('cartItem').select('id');

        if (error) {
          console.error('Error fetching data:', error.message);
        } else {
          setCartProducts(data);
        }
      } catch (error) {
        console.error('Error fetching data:', error.message);
      }
    };
    fetchData();
  }, []);



  return (
    <div>
      <Navbar
        handleLogout={handleLogout}
        items={cartProducts.length}
      />
      <div className="searchbox">
        <h1>Browse our products</h1>
        <h3>Search</h3>
        <Row>
          <Col sm={4}>
            <label>Name</label><br />
            <input name="name" onChange={handleChange} type="text" />
          </Col>
          <Col sm={4}>
            <label>Price</label><br />
            <input name="lprice" onChange={handleChange} type="number" placeholder="min" /> to <input name="hprice" onChange={handleChange} type="number" placeholder="max" />
          </Col>
          <Col sm={2}>
            <center>
              <button className="button" onClick={handleSearch}>Search</button>
            </center>
          </Col>
          <Col sm={2}>
            <center>
              <button className="button" onClick={props.refreshPage}>Reset</button>
            </center>
          </Col>
        </Row>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Container>
        <Row>
          {
            products.map(product => {
              return <>
                <Col lg={3} md={6} sm={12}>
                  <Card
                    product={product}
                    addToCart={addToCart}
                  />
                </Col>
              </>
            })
          }
        </Row>
      </Container>
    </div>

  );
};

export default Dashboard;
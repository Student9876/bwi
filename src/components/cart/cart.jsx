import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Navbar from "../navbar/navbar";
import Card from "../card/card";
import './styles.css'


function Cart(props) {

    const [data, setData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data, error } = await props.supabase.from('cartItem').select('data');

                if (error) {
                    console.error('Error fetching data:', error.message);
                } else {
                    setData(data);
                }
            } catch (error) {
                console.error('Error fetching data:', error.message);
            }
        };

        fetchData();
    }, []);




    async function removeCart(event) {
        const { data, error } = await props.supabase.from('cartItem').delete().eq('id', event.target.value);

        if (error) {
            console.error('Error deleting data:', error.message);
        } else {
            console.log('Data deleted successfully:', data);
        }
        props.refreshPage();
    };


    let actualCost = 0, discount = 0, finalCost = 0;
    data.forEach(item => {
        actualCost = actualCost + item.data.price;
        discount = discount + item.data.price * item.data.discountPercentage / 100;
        finalCost = finalCost + item.data.price * (100 - item.data.discountPercentage) / 100;
    })
    return <>
        <div className="cart">
            <Navbar items={data.length} />
            <div className="cost">
                <h3>Actual Cost</h3>
                <h4>{actualCost}</h4>
                <h3>Total Discount</h3>
                <h4>{discount}</h4>
                <h3>Final Cost</h3>
                <h4>{finalCost}</h4>
            </div>

            <Container>
                <Row>
                    {
                        data.map(product => {
                            return <>
                                <Col lg={3} md={6} sm={12}>
                                    <Card
                                        product={product.data}
                                        removeCart={removeCart}
                                    />
                                </Col>
                            </>
                        })
                    }
                </Row>
            </Container>
        </div>
    </>
}

export default Cart;
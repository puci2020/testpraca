import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col} from 'react-bootstrap'
import Product from '../components/Product'
import Message from '../components/Message'
import Loader from '../components/Loader'

import { listProducts } from '../features/productList/productListSlice'



const HomeScreen = () => {
const dispatch = useDispatch()

const { isLoading, isError, products } = useSelector(
  (state) => state.productList,
)

  useEffect(() => {
  
    dispatch(listProducts())

  }, [dispatch])

  return (
    <>
      <h1>Najnowsze przedmioty</h1>
      {isLoading ? ( <Loader>Wczytywanie...</Loader> ) : isError ? (<Message variant='danger'>{isError}</Message>) 
      : (
      <Row>
        {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                <Product product={product} />
            </Col>
            ))}
      </Row> 
      )}
    </>
    )
  }


export default HomeScreen
